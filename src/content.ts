// Editable profile copy. Render reads this; no fetch required.

export const SITE_URL = 'https://dlm6693.github.io';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/david-l-miller';
export const GITHUB_URL = 'https://github.com/dlm6693';
export const LOGIN = 'dlm6693';

export const NAME = 'DAVID MILLER';
export const BAR_LEFT = 'METER://BILLING // LOC:QNS';
export const BAR_RIGHT = 'HP OK · ALERTS ARMED';

export const TAGLINE = [
	'senior engineer · Go · Kubernetes · DevX-minded',
	'Queens, NY · three cats · CI that stays green',
	'shipping meters & ledgers at ',
];

export const EMPLOYER = 'COREWEAVE';

export const ABOUT_LINES = [
	'Senior engineer on CoreWeave billing — mostly Go on Kubernetes.',
	'Not a tools team. Still the one asking why that alert did not page.',
	'Earlier: AWS boto3 maintainer, then backend at The New York Times.',
	'NYC native. Dry humor. Freshly caffeinated preferred.',
];

export const EXPERIENCE = [
	{
		role: 'Senior Engineer',
		org: 'CoreWeave',
		when: 'present',
		blurb: 'Go on k8s — billing, metering, CI/DevX care',
	},
	{
		role: 'Maintainer',
		org: 'AWS boto3',
		when: 'past',
		blurb: 'Python SDK — developer tooling at scale',
	},
	{
		role: 'Engineer',
		org: 'The New York Times',
		when: 'past',
		blurb: 'Backend at news scale — publish every day',
	},
];

export const STACK = [
	{name: 'runtime', value: 'Go · Kubernetes · containers'},
	{name: 'data', value: 'Postgres · Kafka · Redis'},
	{name: 'apis', value: 'gRPC · Connect · REST'},
	{name: 'devx', value: 'CI/CD · local loops · green merges'},
	{name: 'ops', value: 'Prometheus · Grafana · alerts that page'},
	{name: 'also', value: 'Python · Java when the job asks'},
];
