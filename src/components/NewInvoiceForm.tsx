import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';

import { FieldValues, useForm } from 'react-hook-form';

import { CREATE_INVOICE } from '../lib/mutations';
import { QUERY_CUSTOMERS, QUERY_WORK_ORDERS } from '../lib/queries';
import { Customer, WorkOrder } from '../lib/__generated__/graphql';

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: transparent;
`;

const Label = styled.label`
	color: white;
	font-size: 1.5rem;
	margin: 0.5rem 0;
`;

const Input = styled.input`
	width: 75%;
	height: 2rem;
	margin: 0.5rem 0;
`;

const Button = styled.button`
	width: 75%;
	height: 2rem;
	margin: 0.5rem 0;
	background-color: white;
	color: black;
	border: none;
	border-radius: 6px;
`;

export const AlertRect = styled.div`
	border-radius: 6px;
	border: 1px solid red;
	background-color: #ff000081;
	padding: 0rem 0.25rem;
`;

export const AlertMessage = styled.p`
	font-family: 'Open Sans', sans-serif;
	font-size: 10px;
	margin: 0.25rem;
`;

export default function NewInvoiceForm() {
	const [formInput, setFormInput] = useState<FieldValues | null>(null);
	const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [workOrdersForSelectedCustomer, setWorkOrdersForSelectedCustomer] = useState<WorkOrder[]>([]);
	const [createInvoice] = useMutation(CREATE_INVOICE);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { data: customerData, loading: customerLoading, error: customerError } = useQuery(QUERY_CUSTOMERS);
	const { data: workOrderData, loading: workOrderLoading, error: workOrderError } = useQuery(QUERY_WORK_ORDERS);

	const getWorkOrdersForThisCustomer = (customerId: string) => {
		if (!workOrders) {
			console.error('Work orders are not available');
		}
		return workOrders.filter((workOrder) => workOrder.customerId._id === customerId);
	};

	const handleCustomerIdSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (!(typeof event.target.value === 'string')) {
			console.error('Customer ID is not a string');
		}
		const workOrders = getWorkOrdersForThisCustomer(event.target.value);

		if (!workOrders) {
			console.error('No work orders available');
		}

		setWorkOrdersForSelectedCustomer(workOrders);
	};

	const handleCreateInvoice = async (formData: FieldValues) => {
		if (!formData) {
			throw new Error('Form data is missing');
		}

		try {
			const newInvoice = await createInvoice({
				variables: {
					input: {
						date: formData.date,
						invoiceNumber: formData.invoiceNumber,
						customerId: formData.customerId,
						workOrders: formData.workOrders,
						quote: formData.quote,
						total: formData.total,
						charged: formData.charged,
						paid: formData.paid,
					},
				},
			});

			if (!newInvoice) {
				throw new Error('New customer not created');
			}

			console.log(newInvoice);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (customerError) {
			console.error(customerError);
		}
	}, [customerError]);

	useEffect(() => {
		if (workOrderError) {
			console.error(workOrderError);
		}
	}, [workOrderError]);

	useEffect(() => {
		if (customerData?.queryCustomers) {
			setCustomers(customerData.queryCustomers as Customer[]);
		}
	}, [customerData]);

	useEffect(() => {
		if (workOrderData?.queryWorkOrders) {
			setWorkOrders(workOrderData.queryWorkOrders as WorkOrder[]);
		}
	}, [workOrderData]);

	useEffect(() => {
		if (formInput) {
			handleCreateInvoice(formInput);
		}
	}, [formInput]);

	const formRef = useRef<HTMLFormElement>(null);
	return (
		<>
			{!customerLoading && !workOrderLoading ? (
				<Form ref={formRef} onSubmit={handleSubmit((data) => setFormInput(data))}>
					<h1>New Invoice</h1>

					<Label htmlFor='date'>Date</Label>
					<Input type='date' id='date' {...register('date')} />
					{errors.date && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a date.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='invoiceNumber'>Invoice Number</Label>
					<Input type='text' id='invoiceNumber' {...register('invoiceNumber')} />
					{errors.invoiceNumber && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter an invoice number.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='customerId'>Customer</Label>
					<select id='customerId' {...(register('customerId'), { onChange: handleCustomerIdSelect })}>
						{customers.map((customer) => (
							<option key={customer._id} value={customer._id}>
								{customer.firstName} {customer.lastName}
							</option>
						))}
					</select>
					{errors.customerId && (
						<AlertRect>
							<AlertMessage role='alert'>You must select a customer.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='workOrders'>Work Orders</Label>
					<select id='workOrders' {...register('workOrders')}>
						{workOrdersForSelectedCustomer.map((workOrder) => (
							<option key={workOrder._id} value={workOrder._id}>
								{workOrder.date} {workOrder.type}
							</option>
						))}
					</select>
					{errors.workOrders && (
						<AlertRect>
							<AlertMessage role='alert'>You must select a work order.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='quote'>Quote</Label>
					<Input type='text' id='quote' {...register('quote')} />
					{errors.quote && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a quote.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='total'>Total</Label>
					<Input type='text' id='total' {...register('total')} />
					{errors.total && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a total.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='charged'>Charged</Label>
					<select id='charged' {...register('charged')}>
						<option value='true'>True</option>
						<option value='false'>False</option>
					</select>
					{errors.charged && (
						<AlertRect>
							<AlertMessage role='alert'>You must select a charged status.</AlertMessage>
						</AlertRect>
					)}

					<Label htmlFor='paid'>Paid</Label>
					<select id='paid' {...register('paid')}>
						<option value='true'>True</option>
						<option value='false'>False</option>
					</select>
					{errors.paid && (
						<AlertRect>
							<AlertMessage role='alert'>You must select a paid status.</AlertMessage>
						</AlertRect>
					)}

					<Button type='submit'>Submit</Button>
				</Form>
			) : (
				<p>loading</p>
			)}
		</>
	);
}
