import styled from 'styled-components';
import { IButtonSCProps, ILabelSCProps, ILinkProps } from '../types';
import {Link as RouterLink} from 'react-router-dom';









export const HiddenInput = styled.input`
	display: none;
`;

export const Button = styled.button<IButtonSCProps>(({ theme, $margin, $width, $fontSize, $useBorder }) => ({
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

export const StyledLink = styled(RouterLink)<ILinkProps>(({ theme, $margin, $width, $fontSize, $useBorder }) => ({
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

export const Label = styled.label<ILabelSCProps>(({ theme, $fontSize }) => ({
	color: theme.stroke,
	fontSize: $fontSize || '1.5rem',
}));

export const AppWrapper = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: transparent;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
`;

export const HistoryWrapper = styled.div(({ theme }) => ({
	marginTop: '10%',
	width: '80%',
	height: 'min-content',
	maxHeight: '75%',
	backgroundColor: 'transparent',
	border: `1px solid ${theme.stroke}`,
	borderRadius: '40px',
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	alignItems: 'center',
}));

export const EntriesContainer = styled.div`
	height: 70%;
	width: 90%;
	margin: 1rem;
	border-radius: 30px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	margin: 0.5rem;
	overflow-y: scroll;
	padding: 1rem 0rem;

	@media (min-width: 768px) {
		width: 30%;
		height: 50%;
	}
`;

export const StarRatingContainer = styled.div(
	({ theme }) => `
		width: 80%;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		align-self: center;
		color: ${theme.stroke};
 `
);

