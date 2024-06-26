import { useEffect, useState } from 'react';
import styled from 'styled-components';
import * as Auth from '../lib/auth';
import Login from '../components/Login';
import SideNav from '../components/SideNav';
import Home from '../components/Home';
import WorkOrders from '../components/WorkOrders';
import Customers from '../components/Customers';
import Invoices from '../components/Invoices';
import Properties from '../components/Properties';

const DashboardWrapper = styled.div`
	display: grid;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: transparent;
	grid-template-columns: [line1] 5rem [line2] 1fr [line3];
	grid-template-rows: [row1] 100vh [row2];
`;
const DashboardContent = styled.div`
	grid-column: line2 / line3;
	margin: auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 90%;
	height: 70%;
	background-color: transparent;
	border-radius: 6px;
	border: 1px solid white;
`;

export default function Dashboard() {
	const [renderHome, setRenderHome] = useState<boolean>(true);
	// Work orders, invoices, customers, properties
	const [renderWorkOrders, setRenderWorkOrders] = useState<boolean>(false);
	const [renderInvoices, setRenderInvoices] = useState<boolean>(false);
	const [renderCustomers, setRenderCustomers] = useState<boolean>(false);
	const [renderProperties, setRenderProperties] = useState<boolean>(false);
	const [renderedComponent, setRenderedComponent] = useState<React.ReactNode>(<Home />);

	const handleRenderHome = () => {
		setRenderHome(true);
		setRenderWorkOrders(false);
		setRenderInvoices(false);
		setRenderCustomers(false);
		setRenderProperties(false);
	};

	const handleRenderWorkOrders = () => {
		setRenderHome(false);
		setRenderWorkOrders(true);
		setRenderInvoices(false);
		setRenderCustomers(false);
		setRenderProperties(false);
	};

	const handleRenderInvoices = () => {
		setRenderHome(false);
		setRenderWorkOrders(false);
		setRenderInvoices(true);
		setRenderCustomers(false);
		setRenderProperties(false);
	};

	const handleRenderCustomers = () => {
		setRenderHome(false);
		setRenderWorkOrders(false);
		setRenderInvoices(false);
		setRenderCustomers(true);
		setRenderProperties(false);
	};

	const handleRenderProperties = () => {
		setRenderHome(false);
		setRenderWorkOrders(false);
		setRenderInvoices(false);
		setRenderCustomers(false);
		setRenderProperties(true);
	};

	useEffect(() => {
		if (renderHome) {
			setRenderedComponent(<Home />);
		} else if (renderWorkOrders) {
			setRenderedComponent(<WorkOrders />);
		} else if (renderInvoices) {
			setRenderedComponent(<Invoices />);
		} else if (renderCustomers) {
			setRenderedComponent(<Customers />);
		} else if (renderProperties) {
			setRenderedComponent(<Properties />);
		}
	}, [renderHome, renderWorkOrders, renderInvoices, renderCustomers, renderProperties]);

	return (
		<>
			{!Auth.loggedIn() ? (
				<Login />
			) : (
				<DashboardWrapper>
					<SideNav
						handleRenderHome={handleRenderHome}
						handleRenderWorkOrders={handleRenderWorkOrders}
						handleRenderInvoices={handleRenderInvoices}
						handleRenderCustomers={handleRenderCustomers}
						handleRenderProperties={handleRenderProperties}
					/>
					<DashboardContent>{renderedComponent}</DashboardContent>
				</DashboardWrapper>
			)}
		</>
	);
}
