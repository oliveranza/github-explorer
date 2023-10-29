import React, { useContext, useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Header, RepositoryInfo, Issues } from './Repository.styles';

import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import { DataContext } from '../../providers/DataProvider';

interface Issue {
	id: string;
	title: string;
	html_url: string;
	user: {
		login: string;
		avatar_url: string;
	};
}

const Repository: React.FC = () => {
	const [repo] = useContext(DataContext);
	const [issues, setIssues] = useState<Issue[]>([]);

	useEffect(() => {
		api.get<Issue[]>(`/repos/${repo?.full_name}/issues`).then((response) => {
			if (response) {
				console.log(response.data);
				setIssues(response.data);
			}
			console.log(issues);
		});
	}, [repo?.full_name]);

	return (
		<>
			{console.log(issues)}
			<Header>
				<img src={logo} alt="Github Explorer" />
				<Link to="/">
					<FiChevronLeft size={16}></FiChevronLeft>
					Voltar
				</Link>
			</Header>
			<RepositoryInfo>
				<header>
					<img src={repo?.owner.avatar_url} alt="avatar" />
					<div>
						<strong>{repo?.full_name}</strong>
						<p>{repo?.description}</p>
					</div>
				</header>
				<ul>
					<li>
						<strong>{repo?.stargazers_count}</strong>
						<span>Starts</span>
					</li>
					<li>
						<strong>{repo?.forks_count}</strong>
						<span>Forks</span>
					</li>
					<li>
						<strong>{repo?.open_issues}</strong>
						<span>Issues abertos</span>
					</li>
				</ul>
			</RepositoryInfo>
			<Issues>
				{issues && issues.map((issue) => (
					<Link key={issue.id} target='_blank' reloadDocument to={issue.html_url}>
						<img src={issue.user.avatar_url} alt={issue.user.login} />
						<div>
							<strong>{issue.title}</strong>
							<p>{issue.user.login}</p>
						</div>
						<FiChevronRight size={20} />
					</Link>
				))}
			</Issues>
		</>
	);
};

export default Repository;
