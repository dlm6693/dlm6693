// Console chrome: header, about, footer, and link buttons.
import {siGithub} from 'simple-icons';
import {
	FL,
	FR,
	M,
	PHONE,
	W,
	X,
	type Theme,
	esc,
	f1,
	heading,
	headingG,
	prompt,
	promptG,
	segment,
	segmentG,
	slice,
	sliceG,
	stagger,
	wrap,
} from '../console.ts';

// LinkedIn removed from simple-icons; hand-drawn "in" mark.
function linkedInIcon(t: Theme, x: number, y: number): string {
	return `<rect x="${x}" y="${y}" width="18" height="18" rx="2" fill="${t.accent}"/>
<text x="${x + 9}" y="${y + 13}" text-anchor="middle" font-weight="800" fill="${t.bg}" style="font-size:9px">in</text>`;
}
import {
	ABOUT_LINES,
	BAR_LEFT,
	BAR_RIGHT,
	EMPLOYER,
	EXPERIENCE,
	GITHUB_URL,
	LINKEDIN_URL,
	LOGIN,
	NAME,
	SITE_URL,
	TAGLINE,
} from '../content.ts';

const HEADER_CSS = `@keyframes type{from{width:0}}
@keyframes flicker{0%{opacity:0}10%{opacity:1}14%{opacity:.2}22%{opacity:1}30%{opacity:.4}40%,100%{opacity:1}}
@keyframes gm{0%,92%,100%{transform:translate(0,0)}93%{transform:translate(5px,-1px)}95%{transform:translate(-3px,1px)}97%{transform:translate(2px,0)}}
@keyframes gc{0%,92%,100%{transform:translate(0,0)}93%{transform:translate(-5px,1px)}95%{transform:translate(4px,-1px)}97%{transform:translate(-2px,0)}}
.typing{animation:type .7s steps(8) .3s both}
.name{animation:flicker .9s linear 1.1s both}
.gm{animation:gm 6s linear 2s infinite}.gc{animation:gc 6s linear 2s infinite}`;

export function headerAlt(): string {
	return `David Miller (@${LOGIN}). Backend software engineer at CoreWeave building the billing platform. Formerly AWS boto3 maintainer and The New York Times. Queens, NY.`;
}

export async function header(t: Theme): Promise<[string, string]> {
	const name = NAME;
	const lines = TAGLINE;
	const h = 240;
	const css = HEADER_CSS;
	const scan = `<pattern id="scan" width="4" height="3" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" fill-opacity=".2"/></pattern>
<filter id="sglow" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="3"/></filter>`;
	const defs = `${scan}
<filter id="tglow" x="-5%" y="-40%" width="110%" height="180%"><feGaussianBlur stdDeviation="9"/></filter>
<clipPath id="typeclip"><rect class="typing" x="${X}" y="80" width="140" height="30"/></clipPath>`;
	const dotx = FR - 20 - BAR_RIGHT.length * 8.2 - 16;
	const rows = [
		`<text class="fg" x="${X}" y="{y}"><tspan class="cy">&gt;&gt;</tspan> ${esc(lines[0])}</text>`,
		`<text class="fg" x="${X}" y="{y}"><tspan class="cy">&gt;&gt;</tspan> ${esc(lines[1])}</text>`,
		`<text class="fg" x="${X}" y="{y}"><tspan class="cy">&gt;&gt;</tspan> ${esc(lines[2])}<tspan class="cy" font-weight="700">${EMPLOYER}</tspan></text>`,
	];
	const [descLines] = stagger(rows.slice(0, 2), h - 6 - 24, 24, 1.75, 0.25);
	const [employerLine] = stagger(rows.slice(2), 18, 24, 2.25, 0.25);
	const big = (x: number, fill: string, extra = '') =>
		`<text x="${x}" y="172" fill="${fill}"${extra} style="font-size:52px">${name}</text>`;
	const body = `<rect x="${FL}" y="${M}" width="${FR - FL}" height="34" fill="${t.accent}" fill-opacity=".08"/>
<line x1="${FL}" y1="${M + 34}" x2="${FR}" y2="${M + 34}" stroke="${t.accent}" stroke-opacity=".5"/>
<text x="${FL + 16}" y="${M + 22}" letter-spacing="1" class="cy" style="font-size:12px">${esc(BAR_LEFT)}</text>
<text x="${FR - 20}" y="${M + 22}" letter-spacing="1" class="dim" text-anchor="end" style="font-size:12px">${esc(BAR_RIGHT)}</text>
<circle class="dot" cx="${f1(dotx)}" cy="${M + 18}" r="4" fill="${t.ok}"/>
<circle class="dot" cx="${f1(dotx)}" cy="${M + 18}" r="4" fill="${t.ok}" filter="url(#sglow)"/>
<g clip-path="url(#typeclip)"><text x="${X}" y="102" class="dim"><tspan class="gr">$</tspan> whoami</text></g>
<g class="name" font-weight="800" letter-spacing="2" style="font-size:52px">
${big(X, t.accent, ' opacity=".55" filter="url(#tglow)"')}
<g class="gm">${big(X + 3, t.accent2, ' opacity=".75"')}</g>
<g class="gc">${big(X - 3, t.accent, ' opacity=".85"')}</g>
${big(X, t.bright)}
</g>
${descLines}
<rect x="${FL}" y="${M + 35}" width="${FR - FL}" height="${h - M - 35}" fill="url(#scan)"/>`;
	const tail = `${employerLine}
<g class="ln" style="animation-delay:2.8s">
<text x="${X}" y="56" class="gr">$</text>
<rect class="cursor" x="${X + 18}" y="43" width="10" height="17" fill="${t.accent}"/>
<rect class="cursor" x="${X + 18}" y="43" width="10" height="17" fill="${t.accent}" filter="url(#sglow)"/>
</g>
<rect x="${FL}" y="0" width="${FR - FL}" height="${80 - M}" fill="url(#scan)"/>`;
	return Promise.all([
		slice(t, h, body, {
			title: 'David Miller',
			desc: headerAlt(),
			text: BAR_LEFT + BAR_RIGHT + name + '$ whoami>>' + lines.slice(0, 2).join(''),
			top: true,
			css,
			defs,
			weights: [400, 700, 800],
		}),
		slice(t, 80, tail, {
			title: 'CoreWeave',
			desc: 'Building the billing platform at CoreWeave',
			css: HEADER_CSS,
			defs: scan,
			text: '>>' + lines[2] + EMPLOYER + '$',
		}),
	]);
}

export async function phoneHeader(t: Theme): Promise<[string, string]> {
	const {FL, FR, M, X, R} = PHONE;
	const name = NAME;
	const nameSize = 40;
	const css = HEADER_CSS;
	const scan = `<pattern id="scan" width="4" height="3" patternUnits="userSpaceOnUse"><rect width="4" height="1" fill="#000" fill-opacity=".2"/></pattern>
<filter id="sglow" x="-20%" y="-60%" width="140%" height="220%"><feGaussianBlur stdDeviation="3"/></filter>`;
	const defs = `${scan}
<filter id="tglow" x="-5%" y="-40%" width="110%" height="180%"><feGaussianBlur stdDeviation="8"/></filter>
<clipPath id="typeclip"><rect class="typing" x="${X}" y="64" width="140" height="30"/></clipPath>`;
	const barRight = 'ONLINE · NOMINAL';
	const barLeft = 'SYS://CW // DLM';
	const dotx = FR - 14 - barRight.length * 8.2 - 16;
	const row = (markup: string) => `<text class="fg" x="${X}" y="{y}"><tspan class="cy">&gt;&gt;</tspan> ${markup}</text>`;
	const rows = [
		row(esc('backend engineer · Python · Java · Go')),
		row(esc('Queens, NY · three cats')),
		row(`billing platform at <tspan class="cy" font-weight="700">${EMPLOYER}</tspan>`),
	];
	const upper = rows.slice(0, -1);
	const h = 200;
	const [descLines] = stagger(upper, h - 6 - (upper.length - 1) * 22, 22, 1.75, 0.25);
	const [employerLine] = stagger(rows.slice(-1), 18, 22, 2.25, 0.25);
	const big = (x: number, fill: string, extra = '') =>
		`<text x="${x}" y="140" fill="${fill}"${extra} style="font-size:${nameSize}px">${name}</text>`;
	const body = `<rect x="${FL}" y="${M}" width="${FR - FL}" height="34" fill="${t.accent}" fill-opacity=".08"/>
<line x1="${FL}" y1="${M + 34}" x2="${FR}" y2="${M + 34}" stroke="${t.accent}" stroke-opacity=".5"/>
<text x="${FL + 12}" y="${M + 22}" letter-spacing="1" class="cy" style="font-size:11px">${esc(barLeft)}</text>
<text x="${FR - 14}" y="${M + 22}" letter-spacing="1" class="dim" text-anchor="end" style="font-size:11px">${esc(barRight)}</text>
<circle class="dot" cx="${f1(dotx)}" cy="${M + 18}" r="4" fill="${t.ok}"/>
<circle class="dot" cx="${f1(dotx)}" cy="${M + 18}" r="4" fill="${t.ok}" filter="url(#sglow)"/>
<g clip-path="url(#typeclip)"><text x="${X}" y="86" class="dim"><tspan class="gr">$</tspan> whoami</text></g>
<g class="name" font-weight="800" letter-spacing="1" style="font-size:${nameSize}px">
${big(X, t.accent, ' opacity=".55" filter="url(#tglow)"')}
<g class="gm">${big(X + 2, t.accent2, ' opacity=".75"')}</g>
<g class="gc">${big(X - 2, t.accent, ' opacity=".85"')}</g>
${big(X, t.bright)}
</g>
${descLines}
<rect x="${FL}" y="${M + 35}" width="${FR - FL}" height="${h - M - 35}" fill="url(#scan)"/>`;
	const tail = `${employerLine}
<g class="ln" style="animation-delay:2.8s">
<text x="${X}" y="52" class="gr">$</text>
<rect class="cursor" x="${X + 18}" y="39" width="10" height="17" fill="${t.accent}"/>
<rect class="cursor" x="${X + 18}" y="39" width="10" height="17" fill="${t.accent}" filter="url(#sglow)"/>
</g>
<rect x="${FL}" y="0" width="${FR - FL}" height="${80 - M}" fill="url(#scan)"/>`;
	return Promise.all([
		sliceG(t, PHONE, h, body, {
			title: 'David Miller',
			desc: headerAlt(),
			text: barLeft + barRight + name + '$ whoami',
			top: true,
			css,
			defs,
			weights: [400, 700, 800],
		}),
		sliceG(t, PHONE, 80, tail, {
			title: 'CoreWeave',
			desc: 'Building the billing platform at CoreWeave',
			css,
			defs: scan,
			text: '>>billing at COREWEAVE$',
		}),
	]);
}

export async function about(t: Theme, counter: string): Promise<string> {
	const parts: string[] = [heading(t, 44, 'about', counter), prompt('cat ~/README.md', 0.15, '# the short version')];
	const wrapped = ABOUT_LINES.flatMap(l => wrap(l, 72));
	const rows = wrapped.map(
		l => `<text class="fg" x="${X}" y="{y}" style="font-size:14px">${esc(l)}</text>`,
	);
	const [lines, yAfter] = stagger(rows, 118, 22, 0.35, 0.1);
	parts.push(lines);

	let y = yAfter + 16;
	parts.push(
		`<text x="${X}" y="${y}" class="dim" style="font-size:12px"><tspan class="cy">$</tspan> history --experience</text>`,
	);
	y += 28;
	for (const [i, e] of EXPERIENCE.entries()) {
		parts.push(`<g class="ln" style="animation-delay:${(0.8 + i * 0.12).toFixed(2)}s">
<text x="${X}" y="${y}" class="fg" style="font-size:13px"><tspan class="cy">${esc(e.when.padEnd(7))}</tspan> <tspan font-weight="700" class="wh">${esc(e.role)}</tspan> <tspan class="dim">@</tspan> <tspan class="cy">${esc(e.org)}</tspan></text>
<text x="${X + 16}" y="${y + 18}" class="dim" style="font-size:12px">${esc(e.blurb)}</text>
</g>`);
		y += 44;
	}
	const h = Math.ceil((y + 24) / 40) * 40;
	return slice(t, h, parts.join('\n'), {
		title: 'About',
		desc: ABOUT_LINES.join(' '),
		text: ABOUT_LINES.join('') + EXPERIENCE.map(e => e.role + e.org + e.blurb).join(''),
	});
}

export async function phoneAbout(t: Theme, counter: string): Promise<string> {
	const g = PHONE;
	const parts: string[] = [
		headingG(t, g, 44, 'about', counter),
		promptG(g, 'cat ~/README.md', 0.15, '# short version', 90, 13),
	];
	const wrapped = ABOUT_LINES.flatMap(l => wrap(l, 36));
	const rows = wrapped.map(
		l => `<text class="fg" x="${g.X}" y="{y}" style="font-size:12px">${esc(l)}</text>`,
	);
	const [lines, yAfter] = stagger(rows, 118, 18, 0.35, 0.1);
	parts.push(lines);
	let y = yAfter + 12;
	for (const [i, e] of EXPERIENCE.entries()) {
		parts.push(`<g class="ln" style="animation-delay:${(0.8 + i * 0.12).toFixed(2)}s">
<text x="${g.X}" y="${y}" class="cy" style="font-size:11px">${esc(e.org)}</text>
<text x="${g.X}" y="${y + 16}" class="fg" style="font-size:12px">${esc(e.role)}</text>
<text x="${g.X}" y="${y + 32}" class="dim" style="font-size:11px">${esc(e.blurb)}</text>
</g>`);
		y += 52;
	}
	const h = Math.ceil((y + 20) / 40) * 40;
	return sliceG(t, g, h, parts.join('\n'), {
		title: 'About',
		desc: ABOUT_LINES.join(' '),
		text: ABOUT_LINES.join('') + EXPERIENCE.map(e => e.role + e.org).join(''),
	});
}

export async function footer(t: Theme): Promise<string> {
	const credit = '// console after @georgekobaidze';
	const body = `<text x="${X}" y="30" class="dim"><tspan class="gr">$</tspan> exit</text>
<text x="${X}" y="52" class="dim">connection to <tspan class="cy">${LOGIN}</tspan> closed. <tspan class="fainter">// EOF</tspan></text>
<text x="${FR - 36}" y="52" text-anchor="end" class="fainter" style="font-size:11px">${esc(credit)}</text>`;
	return slice(t, 80, body, {
		title: 'End of profile',
		desc: 'Connection closed.',
		text: `$ exit connection to ${LOGIN} closed. // EOF${credit}`,
		bottom: true,
	});
}

export async function phoneFooter(t: Theme): Promise<string> {
	const {X, R} = PHONE;
	const credit = '// console after @georgekobaidze';
	const body = `<text x="${X}" y="32" class="dim"><tspan class="gr">$</tspan> exit</text>
<text x="${X}" y="56" class="dim">connection to <tspan class="cy">${LOGIN}</tspan> closed.</text>
<text x="${R}" y="88" text-anchor="end" class="fainter" style="font-size:11px">${esc(credit)}</text>`;
	return sliceG(t, PHONE, 120, body, {
		title: 'End of profile',
		desc: 'Connection closed.',
		text: `$ exit connection to ${LOGIN} closed. // EOF${credit}`,
		bottom: true,
	});
}

export type Button = {
	label: string;
	handle: string;
	url: string;
	icon: (t: Theme, x: number, y: number) => string;
};

function pathIcon(d: string) {
	return (t: Theme, x: number, y: number) =>
		`<path transform="translate(${x} ${y}) scale(${18 / 24})" d="${d}" fill="${t.accent}"/>`;
}

export const LINKS: Button[] = [
	{
		label: 'Site',
		handle: 'dlm6693.github.io',
		url: SITE_URL,
		icon: (t, x, y) =>
			`<rect x="${x}" y="${y}" width="18" height="18" rx="3" fill="${t.accent}"/><text x="${x + 9}" y="${y + 13}" text-anchor="middle" font-weight="700" fill="${t.bg}" style="font-size:10px">&gt;_</text>`,
	},
	{label: 'LinkedIn', handle: 'david-l-miller', url: LINKEDIN_URL, icon: linkedInIcon},
	{label: 'GitHub', handle: '@dlm6693', url: GITHUB_URL, icon: pathIcon(siGithub.path)},
];

export async function sectionHead(t: Theme, name: string, counter: string, cmd: string, comment = ''): Promise<string> {
	return slice(t, 120, heading(t, 44, name, counter) + '\n' + prompt(cmd, 0.15, comment), {
		title: name,
		desc: name,
		text: `~/${name}${counter}$ ${cmd} ${comment}`,
	});
}

export async function phoneSectionHead(
	t: Theme,
	name: string,
	counter: string,
	cmd: string,
	comment = '',
): Promise<string> {
	return sliceG(t, PHONE, 120, headingG(t, PHONE, 44, name, counter) + '\n' + promptG(PHONE, cmd, 0.15, comment, 96, 13), {
		title: name,
		desc: name,
		text: `~/${name}${counter}$ ${cmd} ${comment}`,
	});
}

export async function button(t: Theme, b: Button, k: number, n: number, delay0 = 0.25): Promise<string> {
	const seg = W / n;
	const bw = FR - 36 - (n - 1) * seg;
	const gap = ((n - 1) * seg - X) / (n - 1) - bw;
	const lx = X + k * (bw + gap) - seg * k;
	const h = 80;
	const by = 12;
	const bh = 56;
	const cut = 12;
	const box = `M${f1(lx)} ${by}H${f1(lx + bw - cut)}L${f1(lx + bw)} ${by + cut}V${by + bh}H${f1(lx)}Z`;
	const maxHandle = Math.floor((bw - 24) / 6);
	const handle = b.handle.length > maxHandle ? `${b.handle.slice(0, maxHandle - 1)}…` : b.handle;
	const maxLabel = Math.floor((bw - 44) / 7.8);
	const label = b.label.length > maxLabel ? `${b.label.slice(0, maxLabel - 1)}…` : b.label;
	const body = `<g class="ln" style="animation-delay:${(delay0 + k * 0.08).toFixed(2)}s">
<path d="${box}" fill="${t.accent}" fill-opacity=".05"/>
<path d="${box}" fill="none" stroke="${t.accent}" stroke-opacity=".55"/>
<path d="M${f1(lx + bw - cut)} ${by}L${f1(lx + bw)} ${by + cut}" stroke="${t.accent}" stroke-width="2"/>
<g filter="url(#g)" opacity=".5">${b.icon(t, Math.round(lx + 12), by + 11)}</g>
${b.icon(t, Math.round(lx + 12), by + 11)}
<text x="${f1(lx + 38)}" y="${by + 25}" font-weight="700" class="cy" style="font-size:13px">${esc(label)}</text>
<text x="${f1(lx + 12)}" y="${by + 46}" class="dim" style="font-size:10px">${esc(handle)}</text>
</g>`;
	return segment(t, k, n, h, body, {title: b.label, desc: `${b.label}: ${b.url}`, text: b.label + handle + '>_'});
}

export async function phoneButton(t: Theme, b: Button, k: number, n: number, delay0 = 0.25): Promise<string> {
	const {X, R} = PHONE;
	const seg = PHONE.W / n;
	const x0 = X - 8;
	const bw = R + 8 - (n - 1) * seg - 1;
	const gap = ((n - 1) * seg + 1 - x0) / (n - 1) - bw;
	const lx = x0 + k * (bw + gap) - seg * k;
	const h = 80;
	const by = 12;
	const bh = 56;
	const cut = 10;
	const box = `M${f1(lx)} ${by}H${f1(lx + bw - cut)}L${f1(lx + bw)} ${by + cut}V${by + bh}H${f1(lx)}Z`;
	const size = 12;
	const maxLabel = Math.floor((bw - 8) / (size * 0.6));
	const label = b.label.length > maxLabel ? `${b.label.slice(0, maxLabel - 1)}…` : b.label;
	const ix = Math.round(lx + bw / 2 - 9);
	const body = `<g class="ln" style="animation-delay:${(delay0 + k * 0.08).toFixed(2)}s">
<path d="${box}" fill="${t.accent}" fill-opacity=".05"/>
<path d="${box}" fill="none" stroke="${t.accent}" stroke-opacity=".55"/>
<path d="M${f1(lx + bw - cut)} ${by}L${f1(lx + bw)} ${by + cut}" stroke="${t.accent}" stroke-width="2"/>
<g filter="url(#g)" opacity=".5">${b.icon(t, ix, by + 10)}</g>
${b.icon(t, ix, by + 10)}
<text x="${f1(lx + bw / 2)}" y="${by + 45}" text-anchor="middle" font-weight="700" class="cy" style="font-size:${size}px">${esc(label)}</text>
</g>`;
	return segmentG(t, PHONE, k, n, h, body, {title: b.label, desc: `${b.label}: ${b.url}`, text: label + '>_'});
}
