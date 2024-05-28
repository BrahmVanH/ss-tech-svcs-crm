import { useCallback, useRef, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../lib/mutations';
import { useForm, FieldValues } from 'react-hook-form';
import * as Auth from '../lib/auth';
import styled from 'styled-components';
import { Icon, TickCircleIcon } from 'evergreen-ui';

import { LoginUserInput } from '../lib/__generated__/graphql';

export interface IButtonSCProps {
	$margin?: string;
	$width?: string;
	$useBorder?: boolean;
	$fontSize?: string;
}

const LoginCard = styled.div`
	height: min-content;
	margin: 2rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: transparent;
	border-radius: 6px;

	@media (min-width: 1024px) {
		width: 33.33%;
	}
	@media (min-width: 768px) {
		width: 30%;
	}
	@media (max-width: 480px) {
		width: calc(11 / 12);
	}
`;

const Form = styled.form`
	display: flex;
	align-items: center;
	flex-direction: column;
	padding: 0.5rem;
	margin: 0.5rem;
	border-radius: 65px;
	border: 1px solid white;

	@media (min-width: 768px) {
		width: 30%;
		margin-top: 7.5%;
		height: 60%;
	}
`;

const AlertRect = styled.div`
	border-radius: 6px;
	border: 1px solid red;
	background-color: #ff000081;
	padding: 0rem 0.25rem;
`;

const HeaderContainer = styled.div(
	({ theme }) => `
  margin-bottom: 0.5rem;
  width: 100%;
  border-bottom: 2px solid transparent;
  border-image-source: linear-gradient( to right, ${theme.primaryStroke});
	border-image-slice: 1;
	border-image-outset: 0;
	border-image-repeat: stretch;
`
);

const InputWrapper = styled.div`
	margin-top: 1rem;
	padding: 0.5rem;
	border-color: 1px solid white;
	border-radius: 6px;
`;

const Input = styled.input<{ $width?: string }>`
	height: 2rem;
	width: ${(props) => props.$width ?? ''};
	@media (max-width: 1400) {
		height: 3rem;
	}
`;

const AlertMessage = styled.p`
	font-family: 'Open Sans', sans-serif;
	font-size: 10px;
	margin: 0.25rem;
`;

export const ButtonWrapper = styled.div`
	margin-top: 2rem;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	width: 100%;
`;

const Button = styled.button<IButtonSCProps>(({ theme, $margin, $width, $fontSize, $useBorder }) => ({
	width: $width || '30%',
	height: '50%',
	margin: $margin || '0rem',
	padding: '0rem',
	backgroundColor: 'transparent',
	color: theme.stroke,
	fontSize: $fontSize || '1.5rem',
	border: $useBorder ? `1px solid ${theme.stroke}` : 'none',
	borderRadius: $useBorder ? '10px' : '',
}));

// ({
// 	margin: '0.5rem !important',
// 	color: `black !important`,
// 	borderColor: `${theme.secondary} !important`,
// }));

export default function Login() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [input, setInput] = useState<FieldValues | null>(null);
	const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

	const form = useRef<HTMLFormElement>(null);
	const [loginUser] = useMutation(LOGIN_USER);

	const handleResetForm = () => {
		setInput(null);
		form.current?.reset();
	};

	const handleSetSubmitted = () => {
		setFormSubmitted(true);
	};

	const handleLogin = useCallback(
		async (loginFormData: FieldValues) => {
			const formattedLoginData = {
				username: loginFormData.username.toLowerCase(),
				userPassword: loginFormData.userPassword,
			};
			try {
				const { data } = await loginUser({
					variables: {
						input: {
							...(formattedLoginData as LoginUserInput),
						},
					},
				});

				if (!data?.loginUser) {
					throw new Error('No data returned from server');
				}
				handleSetSubmitted();

				const { token } = data.loginUser;

				if (!token) {
					throw new Error('No token returned from server');
				}

				Auth.login(token);
				handleResetForm();
			} catch (error) {
				console.error(error);
			}
		},
		[loginUser]
	);

	useEffect(() => {
		if (input) {
			console.log('input:', input);
			handleLogin(input);
		}
	}, [input, handleLogin]);

	return (
		<LoginCard>
			<HeaderContainer>
				<h2 style={{ textAlign: 'center', paddingTop: '1rem' }}>Login</h2>
			</HeaderContainer>
			{formSubmitted ? (
				<div style={{ margin: '2rem' }}>
					<Icon icon={TickCircleIcon} color='success' size={24} />
				</div>
			) : (
				<Form ref={form} onSubmit={handleSubmit((data) => setInput(data))}>
					<InputWrapper>
						<Input autoComplete='username' type='text' minLength={5} maxLength={25} placeholder='username' {...register('username', { required: true })} />
					</InputWrapper>
					<InputWrapper>
						<Input autoComplete='current-password' type='password' minLength={5} maxLength={25} placeholder='password' {...register('userPassword', { required: true })} />
					</InputWrapper>

					{(errors.username && errors.username.type === 'required') || (errors.password && errors.password.type === 'required') ? (
						<AlertRect>
							<AlertMessage style={{ fontSize: '10px' }} role='alert'>
								You must fill all fields.
							</AlertMessage>
						</AlertRect>
					) : (
						<></>
					)}
					<ButtonWrapper>
						<Button type='submit'>Login</Button>
					</ButtonWrapper>
				</Form>
			)}
		</LoginCard>
	);
}
