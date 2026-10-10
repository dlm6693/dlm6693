// Shapes shared by fetch.ts (writes data/) and render.ts (reads it).

export type GitHubStats = {
	created_at: string;
	followers: number;
	public_repos: number;
	prs: number;
	prs_merged: number;
	year: number;
	contributions_year: number;
	contributions_all: number;
	streak_current: number;
	streak_longest: number;
	languages: Record<string, number>;
	/** Contributions per calendar year, oldest first. The current year is partial. */
	years: Record<string, number>;
};

export type Snapshot = {
	github: GitHubStats | null;
};

// One [date, contributions] pair per day for the last 53 weeks, starting on a Sunday.
export type Calendar = [string, number][];
