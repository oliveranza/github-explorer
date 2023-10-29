import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import MainRoutes from './routes/main.routes';
import GlobalStyle from './styles/global.styles';
import ContextDataProvider from './providers/DataProvider';

const App: React.FC = () => (
	<>
		<BrowserRouter>
			<ContextDataProvider>
				<MainRoutes />
			</ContextDataProvider>
		</BrowserRouter>
		<GlobalStyle />
	</>
);

export default App;
