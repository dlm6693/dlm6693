// Editable profile copy. Render reads this; no fetch required.

export const SITE_URL = 'https://dlm6693.github.io';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/david-l-miller';
export const GITHUB_URL = 'https://github.com/dlm6693';
export const LOGIN = 'dlm6693';

export const NAME = 'DAVID MILLER';
// Billing / Queens flavored chrome — not the ENTIRE.IO / OSS console voice.
export const BAR_LEFT = 'METER://BILLING // LOC:QNS';
export const BAR_RIGHT = 'LEDGER SYNCED · OK';

export const TAGLINE = [
	'backend engineer · Go · Kubernetes · cloud-native',
	'Queens, NY · three cats · billing platforms',
	'shipping meters & ledgers at ',
];

export const EMPLOYER = 'COREWEAVE';

export const ABOUT_LINES = [
	'I build billing systems for AI infrastructure at CoreWeave — mostly Go',
	'on Kubernetes: services, APIs, the meters and ledgers finance trusts.',
	'Earlier: AWS boto3 (Python), then backend at The New York Times.',
	'NYC native. Not an OSS celebrity — just someone who ships reliable systems.',
];

export const EXPERIENCE = [
	{
		role: 'Software Engineer',
		org: 'CoreWeave',
		when: 'present',
		blurb: 'Go services on k8s — billing, metering, credits',
	},
	{
		role: 'Maintainer',
		org: 'AWS boto3',
		when: 'past',
		blurb: 'Python SDK used across the cloud',
	},
	{
		role: 'Engineer',
		org: 'The New York Times',
		when: 'past',
		blurb: 'Backend systems at news scale',
	},
];

// Industry-familiar cloud-native suite — lead with what you actually touch.
export const STACK = [
	{name: 'runtime', value: 'Go · Kubernetes · containers'},
	{name: 'data', value: 'Postgres · Kafka · Redis'},
	{name: 'apis', value: 'gRPC · Connect · REST'},
	{name: 'ops', value: 'Prometheus · Grafana · CI/CD'},
	{name: 'also', value: 'Python · Java when the job asks'},
];
