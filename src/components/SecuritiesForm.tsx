import { useState, useRef, useEffect, useCallback } from 'react';
import { Button, Label } from '../lib/styled';
import { useForm, FieldValues } from 'react-hook-form';
import { CREATE_ENTRY } from '../utils/mutations';
import { convertMdFileToString } from '../utils/helpers';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';
import { IoSendOutline, IoCloseCircleOutline } from 'react-icons/io5';
import { EntryInput, SecuritiesRatingInput } from '../__generated__/graphql';
import Slider from '@mui/material/Slider';
import Loading from './Loading';

const Form = styled.form`
	margin-top: 10%;
	height: min-content;
	padding: 3rem 2rem;
	width: 80%;
	border: 1px solid white;
	border-radius: 65px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	@media (min-width: 768px) {
		width: 30%;
		margin-top: 7.5%;
		height: 60%;
	}
`;

export const SliderWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 80%;
`;

export const InputSlider = styled(Slider)(({ theme }) => ({
	color: `${theme.stroke} !important`,
}));

export const ButtonWrapper = styled.div`
	margin-top: 2rem;
	display: flex;
	justify-content: space-around;
	align-items: flex-end;
	width: 100%;
`;

export default function SecuritiesForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>();

	const [loading, setLoading] = useState<boolean>(false);
	const [financial, setFinancial] = useState<number>(0);
	const [fitness, setFitness] = useState<number>(0);
	const [mental, setMental] = useState<number>(0);
	const [dietary, setDietary] = useState<number>(0);
	const [social, setSocial] = useState<number>(0);
	const [professional, setProfessional] = useState<number>(0);
	const formRef = useRef<HTMLFormElement | null>(null);
	const [formInput, setFormInput] = useState<FieldValues | null>(null);

	const handleFinChange = (event: Event, newValue: number | number[]) => {
		event.preventDefault();
		setFinancial(newValue as number);
	};
	const handleFitChange = (event: Event, newValue: number | number[]) => {
		event.preventDefault();

		setFitness(newValue as number);
	};
	const handleDietChange = (event: Event, newValue: number | number[]) => {
		event.preventDefault();

		setDietary(newValue as number);
	};
	const handleSocChange = (event: Event, newValue: number | number[]) => {
		event.preventDefault();

		setSocial(newValue as number);
	};
	const handleProfChange = (event: Event, newValue: number | number[]) => {
		event.preventDefault();
		setProfessional(newValue as number);
	};

	const handleMentalChange = (event: Event, newValue: number | number[]) => {
		event.preventDefault();
		setMental(newValue as number);
	};

	const handleResetForm = useCallback(() => {
		formRef.current?.reset();
		setFormInput(null);
		setFinancial(0);
		setFitness(0);
		setMental(0);
		setDietary(0);
		setSocial(0);
		setProfessional(0);
	}, []);

	const [createEntry] = useMutation(CREATE_ENTRY);

	const handleSendForm = async (formInput: FieldValues) => {
		setLoading(true);
		try {
			if (!formInput.file || !formInput.financial || !formInput.fitness || !formInput.dietary || !formInput.social || !formInput.professional) {
				throw new Error('file and financial fields are required');
			}

			const mdString = await convertMdFileToString(formInput.file[0]);
			const securitiesRating: SecuritiesRatingInput = {
				dietary: parseInt(formInput.dietary),
				financial: parseInt(formInput.financial),
				fitness: parseInt(formInput.fitness),
				mental: parseInt(formInput.mental),
				professional: parseInt(formInput.professional),
				social: parseInt(formInput.social),
			};
			const entry: EntryInput = {
				text: mdString,
				securitiesRating,
			};

			const newEntry = await createEntry({
				variables: {
					entry,
				},
			});

			if (!newEntry) {
				throw new Error('error in sending form');
			}

			handleResetForm();
			setLoading(false);
		} catch (error) {
			console.error('error', error);
			throw new Error('error in sending form');
		}
	};

	useEffect(() => {
		if (formInput) {
			handleSendForm(formInput);
		}
	}, [formInput]);

	return (
		<Form onSubmit={handleSubmit((data) => setFormInput(data))} ref={formRef}>
			{loading ? (
				<Loading />
			) : (
				<>
					<SliderWrapper>
						<Label $fontSize={'1.25rem'} htmlFor='financial'>
							Financial
						</Label>
						<InputSlider {...register('financial')} value={financial} min={0} max={5} onChange={handleFinChange} />
						{errors.financial && errors.financial.type === 'required' && <span>financial is required</span>}

						<Label $fontSize={'1.25rem'} htmlFor='fitness'>
							Fitness
						</Label>
						<InputSlider {...register('fitness')} value={fitness} min={0} max={5} onChange={handleFitChange} />
						{errors.fitness && errors.fitness.type === 'required' && <span>fitness is required</span>}

						<Label $fontSize={'1.25rem'} htmlFor='mental'>
							Mental
						</Label>
						<InputSlider {...register('mental')} value={mental} min={0} max={5} onChange={handleMentalChange} />
						{errors.mental && errors.mental.type === 'required' && <span>mental is required</span>}

						<Label $fontSize={'1.25rem'} htmlFor='dietary'>
							Dietary
						</Label>
						<InputSlider {...register('dietary')} value={dietary} min={0} max={5} onChange={handleDietChange} />
						{errors.dietary && errors.dietary.type === 'required' && <span>dietary is required</span>}

						<Label $fontSize={'1.25rem'} htmlFor='social'>
							Social
						</Label>
						<InputSlider {...register('social')} value={social} min={0} max={5} onChange={handleSocChange} />
						{errors.social && errors.social.type === 'required' && <span>social is required</span>}

						<Label $fontSize={'1.25rem'} htmlFor='professional'>
							Professional
						</Label>
						<InputSlider {...register('professional')} value={professional} min={0} max={5} onChange={handleProfChange} />
						{errors.professional && errors.professional.type === 'required' && <span>professional is required</span>}

						{/* <HiddenInput ref={hiddenInputRef} type='file' {...fields} /> */}
						<input type='file' {...register('file', { required: { value: true, message: 'all fields are required' } })} />
						{errors.file && errors.file.type === 'required' && <span>file is required</span>}

						{/* <Button type='submit' $fontSize={'1.25rem'} $margin={'2rem 0rem 0rem 0rem'} $width={'75%'} $useBorder={true} onClick={triggerHiddenInput}>
					Upload Markdown
				</Button> */}
					</SliderWrapper>

					<ButtonWrapper>
						<Button onClick={handleResetForm}>
							<IoCloseCircleOutline size={'32px'} />
						</Button>
						<Button type='submit'>
							<IoSendOutline size={'32px'} />
						</Button>
					</ButtonWrapper>
				</>
			)}
		</Form>
	);
}
