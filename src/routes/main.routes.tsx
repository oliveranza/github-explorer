import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Repository from '../pages/Repository/Repository.component';
import Dashboard from '../pages/Dashboard/Dashboard.component';

const MainRoutes: React.FC = () => {
	return (
		<Routes>
			<Route path="/" Component={Dashboard}></Route>
			<Route path="/repository/*" Component={Repository}></Route>
		</Routes>
	);
};

export default MainRoutes;
