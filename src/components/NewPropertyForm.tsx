import { useEffect, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import styled from 'styled-components';

import { FieldValues, useForm } from 'react-hook-form';

import { CREATE_PROPERTY } from '../lib/mutations';
import { QUERY_CUSTOMERS } from '../lib/queries';
import { Customer } from '../lib/__generated__/graphql';

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

export default function NewPropertyForm() {
	// Write out array of all 50 USA states' 2-letter codes
	const states = [
		'AL',
		'AK',
		'AZ',
		'AR',
		'CA',
		'CO',
		'CT',
		'DE',
		'FL',
		'GA',
		'HI',
		'ID',
		'IL',
		'IN',
		'IA',
		'KS',
		'KY',
		'LA',
		'ME',
		'MD',
		'MA',
		'MI',
		'MN',
		'MS',
		'MO',
		'MT',
		'NE',
		'NV',
		'NH',
		'NJ',
		'NM',
		'NY',
		'NC',
		'ND',
		'OH',
		'OK',
		'OR',
		'PA',
		'RI',
		'SC',
		'SD',
		'TN',
		'TX',
		'UT',
		'VT',
		'VA',
		'WA',
		'WV',
		'WI',
		'WY',
	];
	const [formInput, setFormInput] = useState<FieldValues | null>(null);
	const [customers, setCustomers] = useState<Customer[]>([]);
	const [createProperty] = useMutation(CREATE_PROPERTY);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { data: customerData, loading: customerLoading, error: customerError } = useQuery(QUERY_CUSTOMERS);

	const handleCreateProperty = async (formData: FieldValues) => {
		if (!formData) {
			throw new Error('Form data is missing');
		}

		try {
			const newProperty = await createProperty({
				variables: {
					input: {
						propertyName: formData.propertyName,
						propertyAddress: {
							street: formData.street,
							city: formData.city,
							unit: formData.unit ?? '',
							state: formData.state,
							zip: formData.zip,
							country: formData.country,
						},
						propertyDescription: formData.propertyDescription,
						agent: formData.agent,
						s3FolderKey: '',
					},
				},
			});

			if (!newProperty) {
				throw new Error('New customer not created');
			}

			console.log(newProperty);
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
			handleCreateProperty(formInput);
		}
	}, [formInput]);

	const formRef = useRef<HTMLFormElement>(null);
	return (
		<>
			{!customerLoading ? (
				<Form ref={formRef} onSubmit={handleSubmit((data) => setFormInput(data))}>
					<h1>New Property</h1>

					<Label htmlFor='propertyName'>Property Name</Label>
					<Input type='text' id='propertyName' {...register('propertyName')} />
					{errors.propertyName && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a property name.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='street'>Street</Label>
					<Input type='text' id='street' {...register('street')} />
					{errors.street && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a street.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='city'>City</Label>
					<Input type='text' id='city' {...register('city')} />
					{errors.city && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a city.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='unit'>Unit</Label>
					<Input type='text' id='unit' {...register('unit')} />
					<Label htmlFor='state'>State</Label>
					{/* <Input type='text' id='state' {...register('state')} /> */}

					<select id='state' {...register('state')}>
						{states.map((state) => (
							<option key={state} value={state}>
								{state}
							</option>
						))}
					</select>
					{errors.state && (
						<AlertRect>
							<AlertMessage role='alert'>You must select a state.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='zip'>Zip</Label>
					<Input type='text' id='zip' {...register('zip')} />
					{errors.zip && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a zip code.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='country'>Country</Label>
					<Input type='text' id='country' {...register('country')} />
					{errors.country && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a country.</AlertMessage>
						</AlertRect>
					)}

					<Label htmlFor='agent'>Property Description</Label>
					<Input type='text' id='propertyDescription' {...register('propertyDescription')} />
					{errors.propertyDescription && (
						<AlertRect>
							<AlertMessage role='alert'>You must enter a property description.</AlertMessage>
						</AlertRect>
					)}
					<Label htmlFor='customerId'>Agent</Label>
					<select id='agent' {...register('agent')}>
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

					<Button type='submit'>Submit</Button>
				</Form>
			) : (
				<p>loading</p>
			)}
		</>
	);
}
