// Fetches GitHub contribution calendar + stats into data/.
// Public contributions with GITHUB_TOKEN; PROFILE_TOKEN PAT adds private ones.
import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {type Calendar, type GitHubStats, type Snapshot} from './data.ts';
import {LOGIN} from './content.ts';

const token = process.env.GITHUB_TOKEN;

function warn(title: string, message: string): void {
	console.warn(process.env.GITHUB_ACTIONS ? `::warning title=${title}::${message}` : `warn: ${title}: ${message}`);
}

let graphqlToken = process.env.PROFILE_TOKEN || token;

async function graphql<T>(query: string, variables: Record<string, unknown>, attempt = 1): Promise<T> {
	if (!graphqlToken) throw new Error('GraphQL needs GITHUB_TOKEN or PROFILE_TOKEN');
	const res = await fetch('https://api.github.com/graphql', {
		method: 'POST',
		headers: {authorization: `bearer ${graphqlToken}`, 'content-type': 'application/json'},
		body: JSON.stringify({query, variables}),
		signal: AbortSignal.timeout(60_000),
	});
	if ((res.status === 401 || res.status === 403) && graphqlToken !== token && token) {
		warn('PROFILE_TOKEN', `GraphQL returned HTTP ${res.status}; using GITHUB_TOKEN (public contributions only)`);
		graphqlToken = token;
		return graphql(query, variables);
	}
	if (res.status >= 500 && attempt < 3) {
		await new Promise(r => setTimeout(r, 3000 * attempt));
		return graphql(query, variables, attempt + 1);
	}
	if (!res.ok) throw new Error(`GraphQL: HTTP ${res.status}`);
	const body = (await res.json()) as {data: T; errors?: {message: string}[]};
	if (body.errors?.length) throw new Error(`GraphQL: ${body.errors.map(e => e.message).join('; ')}`);
	return body.data;
}

const PROFILE_QUERY = `query($login: String!) {
  user(login: $login) {
    createdAt
    followers { totalCount }
    repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) { totalCount }
    pullRequests { totalCount }
    merged: pullRequests(states: MERGED) { totalCount }
    contributionsCollection { contributionYears }
    top: repositories(ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC, first: 100, orderBy: {field: STARGAZERS, direction: DESC}) {
      nodes { languages(first: 20) { edges { size node { name } } } }
    }
  }
}`;

type Profile = {
	user: {
		createdAt: string;
		followers: {totalCount: number};
		repositories: {totalCount: number};
		pullRequests: {totalCount: number};
		merged: {totalCount: number};
		contributionsCollection: {contributionYears: number[]};
		top: {nodes: {languages: {edges: {size: number; node: {name: string}}[]}[]}[]};
	};
};
type YearData = {
	contributionCalendar: {
		totalContributions: number;
		weeks: {contributionDays: {date: string; contributionCount: number}[]}[];
	};
};

function iso(d: Date): string {
	return d.toISOString().slice(0, 10);
}

function addDays(d: Date, n: number): Date {
	return new Date(d.getTime() + n * 864e5);
}

function streaks(days: Map<string, number>, today: Date): [number, number] {
	let longest = 0;
	let run = 0;
	for (const d of [...days.keys()].filter(d => d <= iso(today)).sort()) {
		run = days.get(d)! > 0 ? run + 1 : 0;
		longest = Math.max(longest, run);
	}
	let current = 0;
	let d = today;
	if (!days.get(iso(d))) d = addDays(d, -1);
	while ((days.get(iso(d)) ?? 0) > 0) {
		current++;
		d = addDays(d, -1);
	}
	return [current, longest];
}

async function fetchGitHub(today: Date): Promise<{github: GitHubStats; calendar: Calendar}> {
	const {user: u} = await graphql<Profile>(PROFILE_QUERY, {login: LOGIN});
	const years = [...u.contributionsCollection.contributionYears].sort();
	const ydata: Record<string, YearData> = {};
	for (let i = 0; i < years.length; i += 4) {
		const query = `query($login: String!) { user(login: $login) {${years
			.slice(i, i + 4)
			.map(
				y => `
    y${y}: contributionsCollection(from: "${y}-01-01T00:00:00Z", to: "${y}-12-31T23:59:59Z") {
      contributionCalendar { totalContributions weeks { contributionDays { date contributionCount } } }
    }`,
			)
			.join('')}
  } }`;
		Object.assign(ydata, (await graphql<{user: Record<string, YearData>}>(query, {login: LOGIN})).user);
	}

	const days = new Map<string, number>();
	let all = 0;
	for (const y of years) {
		const cal = ydata[`y${y}`].contributionCalendar;
		all += cal.totalContributions;
		for (const w of cal.weeks) for (const day of w.contributionDays) days.set(day.date, day.contributionCount);
	}
	const [current, longest] = streaks(days, today);
	let start = addDays(today, -52 * 7);
	start = addDays(start, -start.getUTCDay());
	const calendar: Calendar = [];
	for (let d = start; d <= today; d = addDays(d, 1)) calendar.push([iso(d), days.get(iso(d)) ?? 0]);

	const langs = new Map<string, number>();
	for (const r of u.top.nodes) for (const e of r.languages.edges) langs.set(e.node.name, (langs.get(e.node.name) ?? 0) + e.size);
	const year = today.getUTCFullYear();
	return {
		calendar,
		github: {
			created_at: u.createdAt,
			followers: u.followers.totalCount,
			public_repos: u.repositories.totalCount,
			prs: u.pullRequests.totalCount,
			prs_merged: u.merged.totalCount,
			year,
			contributions_year: ydata[`y${year}`]?.contributionCalendar.totalContributions ?? 0,
			contributions_all: all,
			streak_current: current,
			streak_longest: longest,
			years: Object.fromEntries(years.map(y => [String(y), ydata[`y${y}`].contributionCalendar.totalContributions])),
			languages: Object.fromEntries([...langs].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))),
		},
	};
}

async function main() {
	await mkdir('data', {recursive: true});
	const prev: Snapshot = JSON.parse(await readFile('data/snapshot.json', 'utf8').catch(() => '{"github":null}'));
	const today = new Date();
	today.setUTCHours(0, 0, 0, 0);

	let github = prev.github;
	let calendar: Calendar | null = JSON.parse(await readFile('data/calendar.json', 'utf8').catch(() => 'null'));
	try {
		const fresh = await fetchGitHub(today);
		github = fresh.github;
		calendar = fresh.calendar;
		await writeFile('data/calendar.json', `${JSON.stringify(calendar)}\n`);
	} catch (e) {
		warn('fetchGitHub', String(e));
		if (!calendar) throw e;
	}

	const snapshot: Snapshot = {github};
	await writeFile('data/snapshot.json', `${JSON.stringify(snapshot, null, '\t')}\n`);
	console.log(`fetched calendar (${calendar?.length ?? 0} days) and snapshot for ${LOGIN}`);
}

await main();
