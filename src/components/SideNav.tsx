import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Icon, PinIcon, UnpinIcon, DeleteIcon, MultiSelectIcon, Tooltip, MenuIcon, AddIcon } from 'evergreen-ui';
// import { SideBarSCProps, MenuItemsSCProps } from '../../types';
import { Link } from 'react-router-dom';

// Styled component that accepts global theme object and isOpen boolean prop to conditionally transition/pin the sidebar
const SidebarContainer = styled.div`
	grid-column: 1 / 2;

	display: flex;
	flex-direction: column;
	width: 7.5rem;
	height: 30vh;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	border-top: 1px solid white;
	border-bottom: 1px solid white;
	border-right: 1px solid white;
	border-top-right-radius: 6px;
	border-bottom-right-radius: 6px;
`;

// Styled component that accepts isOpen boolean prop to conditionally display the menu items
const MenuItems = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-evenly;
	height: 75%;
	width: 100%;

	${SidebarContainer}:hover & {
		display: flex;
	}
`;
const NavButton = styled(Button)`
	width: 80%;
	color: white;
	border: 1px solid white;
	&:hover,
	&:active,
	&:focus,
	&:visited {
		background-color: transparent;
	}
`;

const ToolTipTxt = styled.p`
	font-size: 12px;
	color: white;
	line-height: 0;
`;

export default function SideNav({
	handleRenderHome,
	handleRenderWorkOrders,
	handleRenderInvoices,
	handleRenderCustomers,
	handleRenderProperties,
}: Readonly<{
	handleRenderHome: () => void;
	handleRenderWorkOrders: () => void;
	handleRenderInvoices: () => void;
	handleRenderCustomers: () => void;
	handleRenderProperties: () => void;
}>) {
	const menuRef = useRef<HTMLDivElement>(null);

	return (
		<SidebarContainer ref={menuRef}>
			<MenuItems>
				<NavButton onClick={handleRenderHome} appearance='minimal'>
					Home
				</NavButton>
				<NavButton onClick={handleRenderWorkOrders} appearance='minimal'>
					Work Orders
				</NavButton>
				<NavButton onClick={handleRenderInvoices} appearance='minimal'>
					Invoices
				</NavButton>
				<NavButton onClick={handleRenderCustomers} appearance='minimal'>
					Customers
				</NavButton>
				<NavButton onClick={handleRenderProperties} appearance='minimal'>
					Properties
				</NavButton>
			</MenuItems>
		</SidebarContainer>
	);
}
