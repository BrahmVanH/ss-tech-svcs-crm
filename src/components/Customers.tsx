import { useEffect, useState } from 'react';
import { Customer } from '../lib/__generated__/graphql';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_CUSTOMERS } from '../lib/queries';
import styled from 'styled-components';
import { PersonIcon, NewPersonIcon, DeleteIcon, CrossIcon, Icon } from 'evergreen-ui';
import { CREATE_CUSTOMER } from '../lib/mutations';
import NewCustomerForm from './NewCustomerForm';

const CustomerWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	background-color: transparent;
`;

const CustomerList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: transparent;
`;

const CustomerLI = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 75%;
	background-color: transparent;
	border-radius: 6px;
	border: 1px solid white;
	margin: 1rem 0;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: transparent;
	border: none;
	cursor: pointer;
	margin: 1rem 0;
`;

export default function Customers() {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [enableCreateCustomer, setEnableCreateCustomer] = useState<boolean>(false);

	const { data: customerData, loading: customerLoading, error: customerError } = useQuery(QUERY_CUSTOMERS);

	const toggleEnableCreateCustomer = () => {
		setEnableCreateCustomer(!enableCreateCustomer);
	};

	useEffect(() => {
		if (customerError) {
			console.error(customerError);
		}
	}, [customerError]);

	useEffect(() => {
		if (customerData?.queryCustomers) {
			setCustomers(customerData.queryCustomers as Customer[]);
		}
	}, [customerData]);

	return (
		<CustomerWrapper>
			{enableCreateCustomer ? (
				<>
					<Icon icon={CrossIcon} size={40} onClick={toggleEnableCreateCustomer} />
					<NewCustomerForm />
				</>
			) : (
				<>
					<h2>Customers</h2>
					<Button onClick={toggleEnableCreateCustomer}>
						<Icon icon={NewPersonIcon} onClick={toggleEnableCreateCustomer} />
					</Button>
					<Icon icon={DeleteIcon} />
					{customerData && !customerLoading ? (
						<CustomerList>
							{customers.map((customer) => (
								<CustomerLI key={customer._id}>
									<Icon icon={PersonIcon} />
									<p>{customer.firstName}</p>
									<p>{customer.lastName}</p>
									<p>{customer.email}</p>
									<p>{customer.phone}</p>
									<p>{customer.businessName}</p>
									{customer.workOrders.map((workOrder) => (
										<>
											{workOrder?._id ? (
												<div key={workOrder._id}>
													<p>{workOrder.date}</p>
												</div>
											) : (
												<></>
											)}
										</>
									))}
								</CustomerLI>
							))}
						</CustomerList>
					) : (
						<div>Loading...</div>
					)}
				</>
			)}
		</CustomerWrapper>
	);
}
