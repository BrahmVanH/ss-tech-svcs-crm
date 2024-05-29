import { useEffect, useState } from 'react';
import { WorkOrder } from '../lib/__generated__/graphql';
import { useQuery } from '@apollo/client';
import { QUERY_WORK_ORDERS } from '../lib/queries';
import Loading from './Loading';
import styled from 'styled-components';
import { formatDate } from '../lib/helpers';

const WorkOrdersWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	background-color: transparent;
`;

const WorkOrderList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 30%;
	padding-top: 40rem;
	background-color: transparent;
	overflow-y: auto;
	scrollbar-width: none;
`;

const WorkOrderLI = styled.div`
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
const WOInfo = styled.div`
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`;

const Main = styled.div`
	width: 90%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
`;

const CustomerInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
`;

const PropertyInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: start;
`;

export default function WordOrders() {
	const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
	const { data, loading: workOrdersLoading, error } = useQuery(QUERY_WORK_ORDERS);

	useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);

	useEffect(() => {
		if (data?.queryWorkOrders) {
			setWorkOrders(data.queryWorkOrders as WorkOrder[]);
		}
	}, [data]);

	return (
		<WorkOrdersWrapper>
			<h2>Work Orders</h2>
			{data && !workOrdersLoading ? (
				<WorkOrderList>
					{workOrders.map((workOrder) => (
						<WorkOrderLI key={workOrder._id}>
							<WOInfo>
								<p style={{ fontSize: '12px' }}>ID: {workOrder._id}</p>
								<p>{formatDate(workOrder.date)}</p>
							</WOInfo>
							<Main>
								<CustomerInfo>
									<p>
										Customer: {workOrder.customerId.firstName} {workOrder.customerId.lastName}
									</p>
									<p>Email: {workOrder.customerId.email}</p>
									<p>Phone: {workOrder.customerId.phone}</p>
								</CustomerInfo>
								<PropertyInfo>
									<p>Property: {workOrder.propertyId.propertyName}</p>
									<p>{workOrder.propertyId.propertyDescription}</p>
									<p>
										Address: {workOrder.propertyId.propertyAddress.street}, {workOrder.propertyId.propertyAddress.city}, {workOrder.propertyId.propertyAddress.state}{' '}
										{workOrder.propertyId.propertyAddress.zip}
									</p>
								</PropertyInfo>
							</Main>
						</WorkOrderLI>
					))}
				</WorkOrderList>
			) : (
				<Loading />
			)}
		</WorkOrdersWrapper>
	);
}
