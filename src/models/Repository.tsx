export interface Repository {
	full_name: string;
	description: string;
	stargazers_count: number;
	forks_count: number;
	open_issues: number;
	owner: {
		login: string;
		avatar_url: string;
	};
}
