import { gql, useQuery } from '@apollo/client';
import ClientRow from './ClientRow';
import { GET_CLIENTS } from '../queries/clientQueries';
import Spinner from './Spinner';

export default function Clients() {
	const { loading, data, error } = useQuery(GET_CLIENTS);

	if (loading) return <Spinner />;
	if (error) return `Error: ${error.message}`;
	return (
		<>
			{!loading && !error && (
				<table className='table table-hover mt-3'>
					<thead className='bg-success text-light'>
						<tr>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{data.clients.map((client) => (
							<ClientRow key={client.id} client={client} />
						))}
					</tbody>
				</table>
			)}
		</>
	);
}
