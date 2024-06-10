import { ApolloClient, HttpLink, InMemoryCache, ApolloProvider } from '@apollo/client';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import * as Auth from './lib/auth';
import styled, { ThemeProvider } from 'styled-components';
import Navbar from './components_old/Navbar';
import Loading from './components_old/LoadingAnimation';
import Login from './components/Login';
import SideNav from './components/SideNav';
import Home from './components/Home';
import WorkOrders from './components/WorkOrders';
import Customers from './components/Customers';
import Invoices from './components/Invoices';
import Properties from './components/Properties';

import Dashboard from './pages/Dashboard';
// const Dashboard = lazy(() => import('./pages/Dashboard'));
// const EditPhotos = lazy(() => import('./pages/EditPhotos'));

// const cache = new InMemoryCache({
// 	typePolicies: {
// 		Query: {
// 			fields: {
// 				getPropertyInfo: {
// 					keyArgs: false,
// 					merge(incoming, existing = []) {
// 						return [...existing, ...incoming];
// 					},
// 				},
// 				getHideawayImgs: {
// 					keyArgs: false,

// 					merge(incoming, existing = []) {
// 						return [...existing, ...incoming];
// 					},
// 				},
// 				getCottageImgs: {
// 					keyArgs: false,
// 					merge(incoming, existing = []) {
// 						return [...existing, ...incoming];
// 					},
// 				},
// 				getHomeImgs: {
// 					keyArgs: false,
// 					merge(incoming, existing = []) {
// 						return [...existing, ...incoming];
// 					},
// 				},
// 			},
// 		},
// 	},
// });

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: import.meta.env.PROD ? import.meta.env.VITE_LAMBDA_FUNCTION_URI : import.meta.env.VITE_LOCALHOST,
	}),
});

const RouteWrapper = styled.div`
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

function App() {
	const theme = {
		primary: '#57779d',
		primaryStroke: '#fff',
		secondary: '#c7a96e',
	};

	return (
		<Router>
			<ApolloProvider client={client}>
				<ThemeProvider theme={theme}>
					{Auth.loggedIn() ? <SideNav /> : <></>}
					<RouteWrapper>
						<Routes>
							// To-Do: MAke all routes dynamic (is that good for perf in gatsby?)
							<Route path='/' element={Auth.loggedIn() ? <Home /> : <Login />} />
							<Route path='/workorders' element={Auth.loggedIn() ? <WorkOrders /> : <Login />} />
							<Route path='/invoices' element={Auth.loggedIn() ? <Invoices /> : <Login />} />
							<Route path='/customers' element={Auth.loggedIn() ? <Customers /> : <Login />} />
							<Route path='/properties' element={Auth.loggedIn() ? <Properties /> : <Login />} />
						</Routes>
					</RouteWrapper>
				</ThemeProvider>
			</ApolloProvider>
		</Router>
	);
}

export default App;
