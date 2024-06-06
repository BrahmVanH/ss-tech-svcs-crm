import { useEffect, useRef, useState } from 'react';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { FieldValues, useForm } from 'react-hook-form';

import { CREATE_CUSTOMER } from '../lib/mutations';

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

export default function NewCustomerForm() {
	const [formInput, setFormInput] = useState<FieldValues | null>(null);
	const [createCustomer] = useMutation(CREATE_CUSTOMER);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handleCreateCustomer = async (formData: FieldValues) => {
		if (!formData) {
			throw new Error('Form data is missing');
		}

		try {
			const newCustomer = await createCustomer({
				variables: {
					input: {
						firstName: formData.firstName,
						lastName: formData.lastName,
						email: formData.email,
						phone: formData.phone,
						businessName: formData.businessName,
					},
				},
			});

			if (!newCustomer) {
				throw new Error('New customer not created');
			}

			console.log(newCustomer);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (formInput) {
			handleCreateCustomer(formInput);
		}
	}, [formInput]);

	const formRef = useRef<HTMLFormElement>(null);
	return (
		<Form ref={formRef} onSubmit={handleSubmit((data) => setFormInput(data))}>
			<h1>New Customer</h1>
			<Label htmlFor='firstName'>First Name</Label>
			<Input type='text' id='firstName' {...register('firstName')} />
			{errors.firstName && (
				<AlertRect>
					<AlertMessage role='alert'>You must enter a first name.</AlertMessage>
				</AlertRect>
			)}
			<Label htmlFor='lastName'>Last Name</Label>
			<Input type='text' id='lastName' {...register('lastName')} />
			{errors.lastName && (
				<AlertRect>
					<AlertMessage role='alert'>You must enter a last name.</AlertMessage>
				</AlertRect>
			)}
			<Label htmlFor='email'>Email</Label>
			<Input type='email' id='email' {...register('email')} />
			{errors.email && (
				<AlertRect>
					<AlertMessage role='alert'>You must enter an email address.</AlertMessage>
				</AlertRect>
			)}
			<Label htmlFor='phone'>Phone</Label>
			<Input type='tel' id='phone' {...register('phone')} />
			{errors.phone && (
				<AlertRect>
					<AlertMessage role='alert'>You must enter a phone number.</AlertMessage>
				</AlertRect>
			)}
			<Label htmlFor='businessName'>Business Name</Label>
			<Input type='text' id='businessName' {...register('businessName')} />
			{errors.businessName && (
				<AlertRect>
					<AlertMessage role='alert'>You must enter a business name.</AlertMessage>
				</AlertRect>
			)}
			<Button type='submit'>Submit</Button>
		</Form>
	);
}
