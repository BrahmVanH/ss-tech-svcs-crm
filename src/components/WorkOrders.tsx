import { useEffect, useState } from 'react';
import { WorkOrder } from '../lib/__generated__/graphql';
import { useQuery } from '@apollo/client';
import { QUERY_WORK_ORDERS } from '../lib/queries';
import Loading from './Loading';
import styled from 'styled-components';


const WorkOrderList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: transparent;
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
		<>
			{data && !workOrdersLoading ? (
				<WorkOrderList>
					{workOrders.map((workOrder) => (
						<WorkOrderLI key={workOrder._id}>
							<p>{workOrder.date}</p>
							<p>{workOrder.lastUpdated}</p>
							<p>{workOrder.customerId.firstName}</p>
							<p>{workOrder.customerId.lastName}</p>
							<p>{workOrder.customerId.email}</p>
							<p>{workOrder.customerId.phone}</p>
							<p>{workOrder.customerId.businessName}</p>
							<p>{workOrder.propertyId.propertyName}</p>
							<p>{workOrder.propertyId.propertyAddress.street}</p>
							<p>{workOrder.propertyId.propertyAddress.city}</p>
							<p>{workOrder.propertyId.propertyAddress.state}</p>
							<p>{workOrder.propertyId.propertyAddress.zip}</p>
							<p>{workOrder.propertyId.propertyDescription}</p>
						</WorkOrderLI>
					))}
				</WorkOrderList>
			) : (
				<Loading />
			)}
		</>
	);
}
