// Editable profile copy. Render reads this; no fetch required.
// Keep the facts in step with the site (dlm6693.github.io/src/content.ts).

export const SITE_URL = 'https://dlm6693.github.io';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/david-l-miller';
export const GITHUB_URL = 'https://github.com/dlm6693';
export const LOGIN = 'dlm6693';

export const NAME = 'DAVID MILLER';
export const BAR_LEFT = 'BILLING // USAGE METERING // LOC:QNS';
export const BAR_RIGHT = 'STATUS OK';

export const TAGLINE = [
	'senior software engineer · backend infrastructure',
	'Go · Kubernetes · Queens, NYC · three cats',
	'billing and usage metering for GPU cloud at ',
];

export const EMPLOYER = 'COREWEAVE';

export const ABOUT_LINES = [
	'Senior software engineer at CoreWeave, on billing infrastructure for',
	'GPU cloud computing: metering usage and processing usage data reliably',
	'enough to bill from. Mostly Go, on Kubernetes.',
	'Before: The New York Times (subscription platform) and AWS (boto3).',
	'Into distributed systems, developer productivity, and language design.',
];

/** Reverse chronological. */
export const EXPERIENCE = [
	{
		role: 'Senior Software Engineer',
		org: 'CoreWeave',
		when: 'now',
		blurb: 'Billing and usage metering for GPU cloud. Go on Kubernetes',
	},
	{
		role: 'Senior Software Engineer',
		org: 'The New York Times',
		when: 'before',
		blurb: 'Backend systems for the subscription platform',
	},
	{
		role: 'Software Development Engineer',
		org: 'AWS',
		when: 'earlier',
		blurb: 'Worked on boto3, the AWS SDK for Python',
	},
];

export const STACK = [
	{name: 'languages', value: 'Go · Python · Java'},
	{name: 'runtime', value: 'Kubernetes · containers'},
	{name: 'data', value: 'PostgreSQL · Kafka'},
	{name: 'interests', value: 'distributed systems · reliability · observability'},
	{name: 'also', value: 'developer productivity · language design'},
];
