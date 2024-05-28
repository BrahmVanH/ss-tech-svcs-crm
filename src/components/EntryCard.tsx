import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiBarChart2 } from 'react-icons/fi';
import styled from 'styled-components';
import { FormattedEntry, IEntryCardFCProps, ISecuritiesRating } from '../types';
import { getObjValuesAverage } from '../utils/helpers';
import StarRating from './StarRating';

const WrapperLink = styled(Link)`
	text-decoration: none;
	&:focus,
	&:hover,
	&:visited,
	&:link,
	&:active {
		text-decoration: none;
	}
`;

const CardWrapper = styled.div(({ theme }) => ({
	minWidth: '80%',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	alignItems: 'center',
	backgroundColor: 'transparent',
	padding: '0.5rem',
	borderBottom: `1px solid ${theme.stroke}`,
	borderRight: `1px solid ${theme.stroke}`,
	borderRadius: '10px',
}));

const Preview = styled.div`
	color: white;
	width: 100%;
	display: flex;
	flex-direction: row !important;
	justify-content: space-between;
	align-items: center;
`;

const EntryCard: React.FC<IEntryCardFCProps> = (props: IEntryCardFCProps) => {
	const entry: FormattedEntry | undefined = props?.entry;

	const [averageRating, setAverageRating] = useState<number>(1);

	useEffect(() => {
		if (entry) {
			const ratings: ISecuritiesRating = {
				dietary: entry.securitiesRating?.dietary ?? 1,
				financial: entry.securitiesRating?.financial ?? 1,
				mental: entry.securitiesRating?.mental ?? 1,
				fitness: entry.securitiesRating?.fitness ?? 1,
				professional: entry.securitiesRating?.professional ?? 1,
				social: entry.securitiesRating?.social ?? 1,
			};
			const averageRating = getObjValuesAverage(ratings);
			setAverageRating(averageRating);
		}
	}, [entry]);

	return (
		<CardWrapper>
			<WrapperLink to={`/entry/${entry?._id}`} state={{ entryId: entry?._id }}>
				<Preview>
					<FiBarChart2 style={{ margin: '0.5rem' }} size={'36px'} />
					{entry && entry.formattedDate && averageRating ? (
						<>
							<p style={{ margin: '0.5rem' }}>{entry.formattedDate}</p>
							<StarRating rating={averageRating} />
						</>
					) : (
						<></>
					)}
				</Preview>
			</WrapperLink>
		</CardWrapper>
	);
};

export default EntryCard;
