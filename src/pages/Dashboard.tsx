import styled from 'styled-components';
import * as Auth from '../lib/auth';
import Login from '../components/Login';
import SideNav from '../components/SideNav';

const DashboardWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: transparent;
`;
const DashboardContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 75%;
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

	return <DashboardWrapper>{!Auth.loggedIn() ? <Login /> : 
  <>
  <SideNav />
  <DashboardContent>{renderedComponent}</DashboardContent>}</DashboardWrapper>;
  </>
}
