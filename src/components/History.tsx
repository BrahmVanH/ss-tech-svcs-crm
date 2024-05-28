import { useState, useEffect } from 'react';
import { FormattedEntry } from '../types';
import { formatAllDates } from '../utils/helpers';
import { HistoryWrapper, EntriesContainer } from '../utils/styled';
import EntryCard from './EntryCard';
import { useQuery } from '@apollo/client';
import { GET_ENTRIES } from '../utils/queries';
import Loading from './Loading';

export default function History() {
	const [entries, setEntries] = useState<FormattedEntry[] | null>(null);

	const { data, loading, error } = useQuery(GET_ENTRIES);

	useEffect(() => {
		if (error) {
			console.error(error);
		}
		if (!loading && data?.allEntries) {
			const formattedEntries = formatAllDates(data.allEntries.filter((entry: any): entry is FormattedEntry => entry !== null));
			setEntries(formattedEntries);
		}
	}, [data, error, loading]);

	return (
		<>
			{loading ? (
				<Loading />
			) : (
				<HistoryWrapper>
					<h1 style={{ textAlign: 'center', width: '60%', borderBottom: '1px solid white', paddingBottom: '0.5rem' }}>History</h1>
					{entries ? (
						<EntriesContainer>
							{entries.map((entry, index) => (
								<EntryCard key={index} entry={entry} />
							))}
						</EntriesContainer>
					) : (
						<></>
					)}
				</HistoryWrapper>
			)}
		</>
	);
};

