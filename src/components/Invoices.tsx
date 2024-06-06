import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Invoice } from '../lib/__generated__/graphql';
import { useQuery } from '@apollo/client';
import { QUERY_INVOICES } from '../lib/queries';
import { PlusIcon, Icon, DeleteIcon, CrossIcon } from 'evergreen-ui';

import Loading from './Loading';
import NewInvoiceForm from './NewInvoiceForm';

const InvoicesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	background-color: transparent;
`;

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

export default function Invoices() {
	const [invoices, setInvoices] = useState<Invoice[]>([]);
	const [enableCreateInvoice, setEnableCreateInvoice] = useState<boolean>(false);

	const { data: invoiceData, loading: invoiceLoading, error: invoiceError } = useQuery(QUERY_INVOICES);

	const toggleEnableCreateInvoice = () => {
		setEnableCreateInvoice(!enableCreateInvoice);
	};

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

	useEffect(() => {
		if (invoices) {
			invoices.forEach((invoice) => {
				invoice.workOrders.forEach((workOrder) => {
					console.log(workOrder?.customerId._id);
				});
			});
		}
	}, [invoiceData]);
	return (
		<InvoicesWrapper>
			{enableCreateInvoice ? (
				<>
					<Icon icon={CrossIcon} size={40} onClick={toggleEnableCreateInvoice} />
					<NewInvoiceForm />
				</>
			) : (
				<>
					<h2>Invoices</h2>
					<Button onClick={toggleEnableCreateInvoice}>
						<Icon icon={PlusIcon} size={40} />
					</Button>
					<Icon icon={DeleteIcon} size={40} />
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
												{workOrder ? (
													<WorkOrderLI key={workOrder._id}>
														<p>{workOrder.date}</p>
														<p>{workOrder.type}</p>
														<p>{workOrder.description}</p>
														<p>{workOrder.quote}</p>
														<p>{workOrder.total}</p>
														<p>{workOrder.charged}</p>
													</WorkOrderLI>
												) : (
													<></>
												)}
											</>
										))}
									</WorkOrderList>
									<p>{invoice.quote}</p>
									<p>{invoice.charged}</p>
									<p>{invoice.paid}</p>
								</InvoiceLI>
							))}
						</InvoiceList>
					) : (
						<Loading />
					)}
				</>
			)}
		</InvoicesWrapper>
	);
}
