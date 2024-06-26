import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Button, Icon, PinIcon, UnpinIcon, DeleteIcon, MultiSelectIcon, Tooltip, MenuIcon, AddIcon } from 'evergreen-ui';
// import { SideBarSCProps, MenuItemsSCProps } from '../../types';
import { Link } from 'react-router-dom';
import * as Auth from '../lib/auth';

// Styled component that accepts global theme object and isOpen boolean prop to conditionally transition/pin the sidebar
const SidebarContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
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

	${SidebarContainer}:hover & {
		display: flex;
	}
`;
const NavLink = styled(Link)`
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

export default function SideNav() {
	// Default state is not logged in, nav items default to disabled
	const menuRef = useRef<HTMLDivElement>(null);

	return (
		<SidebarContainer ref={menuRef}>
			<MenuItems>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/workorders'>Work Orders</NavLink>
				<NavLink to='/invoices'>Invoices</NavLink>
				<NavLink to='/customers'>Customers</NavLink>
				<NavLink to='/properties'>Properties</NavLink>
			</MenuItems>
		</SidebarContainer>
	);
}
