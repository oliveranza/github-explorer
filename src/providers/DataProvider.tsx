import { ReactNode, createContext, useState } from 'react';
import { Repository } from '../models/Repository';

type DataProviderProps = {
	children: ReactNode;
};

type prov = [
	Repository | undefined,
	React.Dispatch<React.SetStateAction<Repository | undefined>>,
];

export const DataContext = createContext<prov>({} as prov);

// eslint-disable-next-line react/prop-types
const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
	const [repo, setRepo] = useState<Repository>();
	// const data = [repos, setRepos];

	// eslint-disable-next-line react/react-in-jsx-scope
	return <DataContext.Provider value={[repo, setRepo]}>{children}</DataContext.Provider>;
};

export default DataProvider;
