import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { QUERY_WORK_ORDERS, QUERY_INVOICES } from '../lib/queries';
import { WorkOrder, Invoice } from '../lib/__generated__/graphql';
import Loading from './Loading';

const ContentWrapper = styled.div`
	color: white;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	width: 100%;
	height: 100%;
	background-color: transparent;
`;

const Content = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	height: 70%;
	background-color: transparent;
`;

const WorkOrdersCont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 0.5rem;
	width: 100%;
	height: 100%;
	background-color: transparent;
	border-radius: 6px;
	border: 1px solid white;
`;

const WorkOrdersList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: transparent;
	overflow-y: scroll;
	scrollbar-width: none;
`;

const WorkOrdersLI = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	background-color: transparent;
`;

const InvoiceList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: transparent;
	overflow-y: scroll;
	scrollbar-width: none;
`;

const InvoiceLI = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-evenly;
	width: 100%;
	background-color: transparent;
`;

const InvoicesCont = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	margin: 0.5rem;
	width: 100%;
	height: 100%;
	background-color: transparent;
	border-radius: 6px;
	border: 1px solid white;
`;

export default function Home() {
	const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
	const [invoices, setInvoices] = useState<Invoice[]>([]);

	const { data: workOrderData, loading: workOrderLoading, error: workOrderError } = useQuery(QUERY_WORK_ORDERS);
	const { data: invoiceData, loading: invoiceLoading, error: invoiceError } = useQuery(QUERY_INVOICES);

	// TODO: Add error handling
	useEffect(() => {
		if (workOrderError) {
			console.error(workOrderError);
		}
	}, [workOrderError]);

	// TODO: Add error handling

	useEffect(() => {
		if (invoiceError) {
			console.error(invoiceError);
		}
	}, [invoiceError]);

	useEffect(() => {
		if (workOrderData?.queryWorkOrders && !workOrderLoading) {
			setWorkOrders(workOrderData.queryWorkOrders as WorkOrder[]);
		}
	}, [workOrderData]);

	useEffect(() => {
		if (invoiceData) {
			setInvoices(invoiceData.queryInvoices as Invoice[]);
		}
	}, [invoiceData]);

	return (
		<>
			{workOrders && invoices && !workOrderLoading && !invoiceLoading ? (
				<ContentWrapper>
					<h1 style={{ marginTop: '2rem' }}>Home</h1>
					<Content>
						<WorkOrdersCont>
							<h2>Work Orders</h2>
							<WorkOrdersList>
								{workOrders.map((workOrder) => (
									<WorkOrdersLI key={workOrder._id}>
										<p>{workOrder.type}</p>
										<p>{workOrder.description}</p>
										<p>Quote: {workOrder.quote}</p>
										<p>Billed: {workOrder.total}</p>
									</WorkOrdersLI>
								))}
							</WorkOrdersList>
						</WorkOrdersCont>
						<InvoicesCont>
							<h2>Invoices</h2>
							<InvoiceList>
								{invoices.map((invoice) => (
									<InvoiceLI key={invoice._id}>
										<p>Invoice No. {invoice.invoiceNumber}</p>
										<p>{invoice.date}</p>
										<p>{invoice.paid ? 'Paid' : 'Unpaid'}</p>
									</InvoiceLI>
								))}
							</InvoiceList>
						</InvoicesCont>
					</Content>
				</ContentWrapper>
			) : (
				<Loading />
			)}
		</>
	);
}
