import { gql } from '@apollo/client';

const ADD_PROJECT = gql`
	mutation addProject(
		$name: String!
		$description: String
		$status: String
		$clientId: ID
	) {
		addProject(
			name: $name
			description: $description
			status: $status
			clientId: $clientId
		) {
			name
			description
			status
			clientId
		}
	}
`;

export { ADD_PROJECT };
