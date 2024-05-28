import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Invoice } from '../lib/__generated__/graphql';
import { useQuery } from '@apollo/client';
import { QUERY_INVOICES } from '../lib/queries';
import Loading from './Loading';

const InvoiceList = styled.div`
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

const InvoiceLI = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: transparent;
	border-radius: 6px;
	border: 1px solid white;
	margin: 1rem 0;
`;

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

export default function Invoices() {
	const [invoices, setInvoices] = useState<Invoice[]>([]);
	const { data: invoiceData, loading: invoiceLoading, error: invoiceError } = useQuery(QUERY_INVOICES);

	useEffect(() => {
		if (invoiceError) {
			console.error(invoiceError);
		}
	}, [invoiceError]);

	useEffect(() => {
		if (invoiceData?.queryInvoices) {
			setInvoices(invoiceData.queryInvoices as Invoice[]);
		}
	}, [invoiceData]);
	return (
		<>
			{invoiceData && !invoiceLoading ? (
				<InvoiceList>
					{invoices.map((invoice) => (
						<InvoiceLI key={invoice._id}>
							<p>{invoice.invoiceNumber}</p>
							<p>{invoice.date}</p>
							<p>{invoice.total}</p>
							<WorkOrderList>
								{invoice?.workOrders.map((workOrder) => (
									<>
										{workOrder?._id ? (
											<WorkOrderLI key={workOrder._id}>
												<p>{workOrder.date}</p>
												<p>{workOrder.propertyId.propertyName}</p>
												<p>{workOrder.propertyId.propertyAddress.street}</p>
												<p>{workOrder.type}</p>
												<p>{workOrder.description}</p>
												<p>{workOrder.quote}</p>
												<p>{workOrder.total}</p>

												<p>{workOrder.customerId.firstName}</p>
												<p>{workOrder.customerId.lastName}</p>
												<p>{workOrder.customerId.email}</p>
												<p>{workOrder.customerId.phone}</p>
												<p>{workOrder.customerId.businessName}</p>
											</WorkOrderLI>
										) : (
											<></>
										)}
									</>
								))}
							</WorkOrderList>
						</InvoiceLI>
					))}
				</InvoiceList>
			) : (
				<Loading />
			)}
		</>
	);
}
