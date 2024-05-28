import { useEffect, useState } from 'react';
import { Customer } from '../lib/__generated__/graphql';
import { useQuery } from '@apollo/client';
import { QUERY_CUSTOMERS } from '../lib/queries';
import styled from 'styled-components';

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
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 75%;
	background-color: transparent;
	border-radius: 6px;
	border: 1px solid white;
	margin: 1rem 0;
`;
export default function Customers() {
	const [customers, setCustomers] = useState<Customer[]>([]);
	const { data: customerData, loading: customerLoading, error: customerError } = useQuery(QUERY_CUSTOMERS);

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
		<>
			{customerData && !customerLoading ? (
				<CustomerList>
					{customers.map((customer) => (
						<CustomerLI key={customer._id}>
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
											<p>{workOrder.propertyId.propertyName}</p>
											<p>{workOrder.propertyId.propertyAddress.street}</p>
											<p>{workOrder.propertyId.propertyAddress.city}</p>
											<p>{workOrder.propertyId.propertyAddress.state}</p>
											<p>{workOrder.propertyId.propertyAddress.zip}</p>
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
	);
}
