import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useQuery } from '@apollo/client';
import { QUERY_PROPERTIES } from '../lib/queries';
import { PlusIcon, Icon, DeleteIcon, CrossIcon } from 'evergreen-ui';

import Loading from './Loading';

import { Property } from '../lib/__generated__/graphql';
import NewPropertyForm from './NewPropertyForm';

const PropertiesWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	width: 100%;
	height: 100%;
	overflow-y: hidden;
	background-color: transparent;
`;

const PropertyList = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;
	background-color: transparent;
`;

const PropertyLI = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 75%;
	background-color: transparent;
	border-radius: 6px;
	border: 1px solid white;
	margin: 1rem 0;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: transparent;
	border: none;
	cursor: pointer;
	margin: 1rem 0;
`;

export default function Properties() {
	const [properties, setProperties] = useState<Property[]>([]);
	const [enableCreateProperty, setEnableCreateProperty] = useState<boolean>(false);

	const { data, loading, error } = useQuery(QUERY_PROPERTIES);

	const toggleEnableCreateProperty = () => {
		setEnableCreateProperty(!enableCreateProperty);
	};

	useEffect(() => {
		if (error) {
			console.error(error);
		}
	}, [error]);

	useEffect(() => {
		if (data?.queryProperties) {
			setProperties(data.queryProperties as Property[]);
		}
	}, [data]);

  

	return (
		<PropertiesWrapper>
			{enableCreateProperty ? (
				<>
					<Icon icon={CrossIcon} size={40} onClick={toggleEnableCreateProperty} />
					<NewPropertyForm />
				</>
			) : (
				<>
					<h2>Properties</h2>
					<Button onClick={toggleEnableCreateProperty}>
						<Icon icon={PlusIcon} size={40} />
					</Button>
					{data && !loading ? (
						<PropertyList>
							{properties.map((property) => (
								<PropertyLI key={property._id}>
									<p>{property.propertyName}</p>
									<p>{property.agent._id}</p>
									<p>{property.agent.firstName}</p>
									<p>{property.agent.lastName}</p>
									<p>{property.agent.email}</p>
									<p>{property.agent.phone}</p>

									<p>{property.propertyAddress.street}</p>
									<p>{property.propertyAddress.city}</p>
									<p>{property.propertyAddress.state}</p>
									<p>{property.propertyAddress.zip}</p>
									<p>{property.propertyAddress.country}</p>
								</PropertyLI>
							))}
						</PropertyList>
					) : (
						<Loading />
					)}
				</>
			)}
		</PropertiesWrapper>
	);
}
