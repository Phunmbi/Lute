import { gql } from '@apollo/client';

const GET_SINGLE_ORDER = gql`
	query GetSingleOrder($id: String!) {
		getOrder(id: $id) {
			title
			customer {
				name
				email
				phone
			}
			uid
			bookingDate
			address {
				city
				zip
				street
				country
			}
		}
	}
`;

export default GET_SINGLE_ORDER;
