import React, { FormEvent, useContext, useEffect, useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import api from '../../services/api';
import { Error, Form, Repositories, Title } from './Dashboard.styles';
import { Repository } from '../../models/Repository';
import { DataContext } from '../../providers/DataProvider';

interface Credits {
	limit: number | 60;
	remaining: number;
	used: number;
}

const DashboardComponent: React.FC = () => {
	const [, setRepo] = useContext(DataContext);

	const [repoInput, setRepoInput] = useState('');
	const [inputError, setInputError] = useState('');
	const [credits, setCredits] = useState(() => {
		const sessionCredits = localStorage.getItem('@GithubExplorer:Credits');
		if (sessionCredits) {
			return JSON.parse(sessionCredits) as Credits;
		}
		return {} as Credits;
	});
	const [repositories, setRepositories] = useState<Repository[]>(() => {
		const sessionRepos = localStorage.getItem('@GithubExplorer:Repositories');
		if (sessionRepos) {
			// setrepo(JSON.parse(sessionRepos));
			return JSON.parse(sessionRepos);
		}
		return [];
	});

	useEffect(() => {
		localStorage.setItem('@GithubExplorer:Repositories', JSON.stringify(repositories));
	}, [repositories]);

	async function handleAddRepository(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		if (!repoInput) {
			setInputError('Digite o author/nome-do-repositorio');
			return;
		}
		try {
			const response = await api.get<Repository>(`/repos/${repoInput}`);
			console.log(repoInput);
			console.log(response);
			console.log(response.headers);

			const credit: Credits = {
				limit: response.headers['x-ratelimit-limit'],
				remaining: response.headers['x-ratelimit-remaining'],
				used: response.headers['x-ratelimit-used'],
			};
			setCredits(credit);
			localStorage.setItem('@GithubExplorer:Credits', JSON.stringify(credit));

			const repository = response.data as Repository;
			setRepositories([...repositories, repository]);
			setRepoInput('');
			setInputError('');
		} catch (error) {
			setInputError('Erro na busca por esse repositorio');
		}
	}

	function handleClick(repo: Repository){
		setRepo(repo);
	}

	return (
		<>
			<img src={logo} alt="Github Explorer" />
			<Title>Explore repositórios no Github</Title>
			<Form $haserror={!!inputError} onSubmit={handleAddRepository}>
				<input
					placeholder="Digite o nome do repositório"
					value={repoInput}
					onChange={(e) => setRepoInput(e.target.value)}
				/>
				<button type="submit">Pesquisar</button>
			</Form>
			<small>
				{`credits: ${credits.limit || 60} | remaining: ${credits.remaining || '?'} | used: ${
					credits.used || '?'
				}`}
			</small>
			{inputError && <Error>{inputError}</Error>}
			<Repositories>
				{repositories.map((repo: Repository) => (
					<Link onClick={() => handleClick(repo)} key={repo.full_name} to={`/repository/${repo.full_name}`}>
						<img src={repo.owner.avatar_url} alt={repo.owner.login} />
						<div>
							<strong>{repo.full_name}</strong>
							<p>{repo.description}</p>
						</div>
						<FiChevronRight size={20} />
					</Link>
				))}
			</Repositories>
		</>
	);
};

export default DashboardComponent;
