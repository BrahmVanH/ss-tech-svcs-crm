import { useCallback, useRef, useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../lib/mutations';
import { useForm, FieldValues } from 'react-hook-form';
import * as Auth from '../lib/auth';
import styled from 'styled-components';
import { Icon, TickCircleIcon, LogInIcon, SendMessageIcon } from 'evergreen-ui';

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
		width: 50%;
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
	border-radius: 36px;
	border: 1px solid white;
`;

const AlertRect = styled.div`
	border-radius: 6px;
	border: 1px solid red;
	background-color: #ff000081;
	padding: 0rem 0.25rem;
`;

const HeaderContainer = styled.div`
	width: 100%;
	text-align: center;
	color: white;
`;
const InputWrapper = styled.div`
	margin: 1rem 0.5rem 0rem;
	padding: 4px;
	border: 1px solid white;
	border-radius: 6px;
`;

const Input = styled.input<{ $width?: string }>`
	background-color: transparent;
	border-radius: 6px;
	border: none;
	color: #ffffff;
	width: ${(props) => props.$width ?? ''};
	&::placeholder {
		text-align: center;
		padding: none;
		color: #ffffff5c;
	}
	@media (max-width: 1400) {
		height: 3rem;
	}

	&:focus {
		outline: #ffffff63;
		box-shadow: 0 0 0 2px #ffffff63;
	}
`;

const AlertMessage = styled.p`
	font-family: 'Open Sans', sans-serif;
	font-size: 10px;
	margin: 0.25rem;
`;

export const ButtonWrapper = styled.div`
	margin: 1rem;
	padding: 4px;

	/* add on hover attribute that highlights the button in a very transparent white */

	&:active {
		transform: scale(0.95);
	}
`;

const Button = styled.button<IButtonSCProps>(({ theme, $margin, $width, $fontSize, $useBorder }) => ({
	width: $width || '30%',
	height: '50%',
	margin: $margin || '0rem',
	padding: '0rem',
	backgroundColor: 'transparent',
	color: 'white',
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
			{formSubmitted ? (
				<div style={{ margin: '2rem' }}>
					<Icon icon={TickCircleIcon} color='success' size={24} />
				</div>
			) : (
				<Form ref={form} onSubmit={handleSubmit((data) => setInput(data))}>
					<HeaderContainer>
						<h2>Login</h2>
					</HeaderContainer>
					<InputWrapper>
						<Input autoComplete='username' type='text' minLength={5} maxLength={25} placeholder='username' {...register('username', { required: true })} />
					</InputWrapper>
					<InputWrapper>
						<Input autoComplete='current-password' type='password' minLength={5} maxLength={25} placeholder='password' {...register('userPassword', { required: true })} />
					</InputWrapper>

					{(errors.username && errors.username.type === 'required') || (errors.userPassword && errors.userPassword.type === 'required') ? (
						<AlertRect>
							<AlertMessage style={{ fontSize: '10px' }} role='alert'>
								You must fill all fields.
							</AlertMessage>
						</AlertRect>
					) : (
						<></>
					)}
					<ButtonWrapper>
						<Button type='submit'>
							<Icon icon={SendMessageIcon} size={18} />
						</Button>
					</ButtonWrapper>
				</Form>
			)}
		</LoginCard>
	);
}
