export const CREDIT_URL = 'https://github.com/georgekobaidze/georgekobaidze';
export const CREDIT_POST =
	'https://dev.to/georgekobaidze/i-turned-my-github-profile-into-a-cyberpunk-console-with-a-city-built-from-my-contributions-h4c';

export function monthDay(iso: string, long = false): string {
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-US', {
		month: long ? 'long' : 'short',
		day: 'numeric',
		timeZone: 'UTC',
	});
}

export function short(n: number): string {
	const r = Number(n.toPrecision(3));
	const [div, unit] = r >= 1e6 ? [1e6, 'M'] : r >= 1e3 ? [1e3, 'k'] : [1, ''];
	return `${Number((r / div).toPrecision(3))}${unit}`;
}
