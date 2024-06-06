import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';

import { FieldValues, set, useForm } from 'react-hook-form';

import { CREATE_WORK_ORDER } from '../lib/mutations';
import { QUERY_CUSTOMERS, QUERY_PROPERTIES } from '../lib/queries';
import { Customer, Property, WorkOrder } from '../lib/__generated__/graphql';

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

export default function NewWorkOrderForm() {
	const [formInput, setFormInput] = useState<FieldValues | null>(null);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [properties, setProperties] = useState<Property[]>([]);
	const [propertiesForSelectedCustomer, setPropertiesForSelectedCustomer] = useState<Property[]>([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { data: customerData, loading: customerLoading, error: customerError } = useQuery(QUERY_CUSTOMERS);

	const [createWorkOrder] = useMutation(CREATE_WORK_ORDER);

	const getPropertiesForThisCustomer = (customerId: string) => {
		if (!customerId || customers) {
			console.error('Customer ID is missing');
		}

		const customer = customers.find((customer) => customer._id === customerId);
		if (!customer) {
			console.error('Customer not found');
		}

		return customer?.properties;
	};

	const handleCustomerIdSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (!(typeof event.target.value === 'string')) {
			console.error('Customer ID is not a string');
		}
		const properties = getPropertiesForThisCustomer(event.target.value) as Property[];

		if (!properties) {
			console.error('No work orders available');
		}

		setPropertiesForSelectedCustomer(properties);
	};

	const handleCreateWorkOrder = async (formData: FieldValues) => {
		if (!formData) {
			throw new Error('Form data is missing');
		}

		try {
			const newWorkOrder = await createWorkOrder({
				variables: {
					input: {
						date: formData.date,
						customerId: formData.customerId,
						propertyId: formData.propertyId,
						type: formData.type,
						description: formData.description,
						completedBy: formData.completedBy ?? '',
						quote: formData.quote,
						total: formData.total,
						charged: formData.charged,
						paid: formData.paid,
						comments: formData.comments ?? '',
					},
				},
			});

			if (!newWorkOrder) {
				throw new Error('New customer not created');
			}

			console.log(newWorkOrder);
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
		if (customerData?.queryCustomers) {
			setCustomers(customerData.queryCustomers as Customer[]);
		}
	}, [customerData]);

	useEffect(() => {
		if (formInput) {
			handleCreateWorkOrder(formInput);
		}
	}, [formInput]);

	const formRef = useRef<HTMLFormElement>(null);
	return (
		<>
			{!customerLoading ? (
				<Form ref={formRef} onSubmit={handleSubmit((data) => setFormInput(data))}>
					<h1>New Work Order</h1>
					<Label htmlFor='date'>Date</Label>
					<Input type='date' id='date' {...register('date')} />
					{errors.date && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a date.</AlertMessage>
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

					<Label htmlFor='workOrders'>Property</Label>
					<select id='propertyId' {...register('propertyId')}>
						{propertiesForSelectedCustomer.map((property) => (
							<option key={property._id} value={property._id}>
								{property.propertyName}
							</option>
						))}
					</select>
					{errors.workOrders && (
						<AlertRect>
							<AlertMessage role='alert'>You must select a property.</AlertMessage>
						</AlertRect>
					)}

					<Label htmlFor='type'>Type</Label>
					<Input type='text' id='type' {...register('type')} />
					{errors.type && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a type.</AlertMessage>
						</AlertRect>
					)}

					<Label htmlFor='description'>Completed By</Label>
					<Input type='text' id='completedBy' {...register('completedBy')} />

					<Label htmlFor='description'>Description</Label>
					<Input type='text' id='description' {...register('description')} />
					{errors.description && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a description.</AlertMessage>
						</AlertRect>
					)}

					<Label htmlFor='quote'>Quote</Label>
					<Input type='text' id='quote' {...register('quote')} />

					<Label htmlFor='total'>Total</Label>
					<Input type='text' id='total' {...register('total')} />

					<Label htmlFor='agent'>Charged</Label>
					<select id='charged' {...register('charged')}>
						<option value='true'>True</option>
						<option value='false'>False</option>
					</select>
					{errors.charged && (
						<AlertRect>
							<AlertMessage role='alert'>You must select a charged.</AlertMessage>
						</AlertRect>
					)}

					<Label htmlFor='comments'>Paid</Label>
					<select id='paid' {...register('paid')}>
						<option value='true'>True</option>
						<option value='false'>False</option>
					</select>
					{errors.paid && (
						<AlertRect>
							<AlertMessage role='alert'>You must select a paid.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='comments'>Comments</Label>
					<Input type='text' id='comments' {...register('comments')} />

					<Button type='submit'>Submit</Button>
				</Form>
			) : (
				<p>loading</p>
			)}
		</>
	);
}
