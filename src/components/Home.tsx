import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { QUERY_WORK_ORDERS, QUERY_INVOICES } from '../lib/queries';
import { WorkOrder, Invoice } from '../lib/__generated__/graphql';

const ContentWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: transparent;
`;

const WorkOrdersCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: transparent;
  border-radius: 6px;
  border: 1px solid white;
`;

const InvoicesCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: transparent;
  border-radius: 6px;
  border: 1px solid white;
`;


export default function Home() {
	const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
	const [invoices, setInvoices] = useState<Invoice[]>([]);

	const { data: workOrderData, loading: workOrderLoading, error: workORderError } = useQuery(QUERY_WORK_ORDERS);
	const { data: invoiceData, loading: invoiceLoading, error: invoiceError } = useQuery(QUERY_INVOICES);

	// TODO: Add error handling
	useEffect(() => {
		if (workORderError) {
			console.error(workORderError);
		}
	}, [workORderError]);

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
    <ContentWrapper>
      <h1>Home</h1>
      <WorkOrdersCont>
      <h2>Work Orders</h2>

      {workOrders.map((workOrder) => (
        <div key={workOrder._id}>
          <p>{workOrder.type}</p>
          <p>{workOrder.description}</p>
          <p>{workOrder.quote}</p>
          <p>{workOrder.total}</p>
        </div>
      ))}
      </WorkOrdersCont>
      <InvoicesCont>
      <h2>Invoices</h2>
      {invoices.map((invoice) => (
        <div key={invoice._id}>
          <p>{invoice.invoiceNumber}</p>
          <p>{invoice.date}</p>
        </div>
      ))}
      </InvoicesCont>
    </ContentWrapper>
  );
}
