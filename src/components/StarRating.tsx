import { FiZap } from 'react-icons/fi';
import { IStarRatingFCProps } from '../types';
import { StarRatingContainer } from '../utils/styled';



export default function StarRating(props: IStarRatingFCProps) {
	// This component renders a number of filled x unfilled starts
	// based on the value of the overallRating var passed in

	const { rating } = props;

	return (
		<>
			{rating === 1 ? (
				<StarRatingContainer>
					<FiZap size={'12px'} />
				</StarRatingContainer>
			) : rating === 2 ? (
				<StarRatingContainer>
					<FiZap size={'12px'} />
					<FiZap size={'12px'} />
				</StarRatingContainer>
			) : rating === 3 ? (
				<StarRatingContainer>
					<FiZap size={'12px'} />
					<FiZap size={'12px'} />
					<FiZap size={'12px'} />
				</StarRatingContainer>
			) : rating === 4 ? (
				<StarRatingContainer>
					<FiZap size={'12px'} />
					<FiZap size={'12px'} />
					<FiZap size={'12px'} />
					<FiZap size={'12px'} />
				</StarRatingContainer>
			) : rating === 5 ? (
				<StarRatingContainer>
					<FiZap size={'12px'} />
					<FiZap size={'12px'} />
					<FiZap size={'12px'} />
					<FiZap size={'12px'} />
					<FiZap size={'12px'} />
				</StarRatingContainer>
			) : (
				<></>
			)}
		</>
	);
}
