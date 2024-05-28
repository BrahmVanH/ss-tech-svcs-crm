import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { IButtonSCProps, ILinkProps } from '../types';


import { IoBarChartOutline, IoAddCircleOutline } from 'react-icons/io5';

const NavpadWrapper = styled.div`
	width: 100%;
	background-color: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	overflow-y: hidden;
`;

export const Navpad = styled.nav(({ theme }) => ({
	position: 'fixed',
	zIndex: 1000 /* Ensure nav drawer is above other content */,
	
	bottom: 0,
	width: '75%',
	height: '10%',
	backgroundColor: theme.sanMarino,
	border: `1px solid ${theme.stroke}`,
	borderTopLeftRadius: '45px',
	borderTopRightRadius: '45px',
	display: 'flex',
	justifyContent: 'space-evenly',
	alignItems: 'center',
	
	transition: 'transform 0.3s ease' /* Transition for smooth animation */,
	'&.closed': {
		transform: 'translateY(100%)' /* Move nav drawer off-screen when closed */,
	},

	'&.open': {
		transform: 'translateY(0)' /* Move nav drawer back on-screen when open */,
	},
}));

export const Button = styled.button<IButtonSCProps>(({ theme, $margin, $width, $fontSize, $useBorder }) => ({
	width: $width ?? '30%',
	height: '50%',
	margin: $margin ?? '0rem',
	padding: '0rem',
	backgroundColor: 'transparent',
	color: theme.stroke,
	fontSize: $fontSize ?? '1.5rem',
	border: $useBorder ? `1px solid ${theme.stroke}` : 'none',
	borderRadius: $useBorder ? '10px' : '',
}));

export const StyledLink = styled(RouterLink)<ILinkProps>(({ theme, $margin, $width, $fontSize, $useBorder }) => ({
	width: $width ?? '30%',
	height: '50%',
	margin: $margin ?? '0rem',
	padding: '0rem',
	backgroundColor: 'transparent',
	color: theme.stroke,
	fontSize: $fontSize ?? '1.5rem',
	border: $useBorder ? `1px solid ${theme.stroke}` : 'none',
	borderRadius: $useBorder ? '10px' : '',
	textAlign: 'center',
}));


export default function Nav() {
	const [isNavOpen, setIsNavOpen] = useState(true); // Initial state of nav drawer
	const [prevScrollPos, setPrevScrollPos] = useState(0); // Previous scroll position

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;
			const scrollThreshold = 50; 

			if (prevScrollPos < currentScrollPos && currentScrollPos > scrollThreshold) {
				setIsNavOpen(false); 
			} else {
				setIsNavOpen(true); 
			}

			setPrevScrollPos(currentScrollPos);
		};

		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [prevScrollPos]);

	return (
		<NavpadWrapper>
			<Navpad className={`nav-drawer ${isNavOpen ? 'open' : 'closed'}`}>
				<StyledLink $margin={'0.5rem 0rem 0rem 0rem'} to={'/history'}>
					<IoBarChartOutline size={'40px'} />
				</StyledLink>
				<span style={{ fontSize: '48px', color: 'white', fontWeight: '100' }}>|</span>
				<StyledLink $margin={'0.5rem 0rem 0rem 0rem'} to={'/'}>
					<IoAddCircleOutline size={'42px'} />
				</StyledLink>
			</Navpad>
		</NavpadWrapper>
	);
};

