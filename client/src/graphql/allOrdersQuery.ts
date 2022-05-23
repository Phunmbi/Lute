import {gql} from '@apollo/client';

const GET_ALL_ORDERS = gql`
	query GetAllOrder($first: Int, $last: Int, $before: String, $after: String,) {
		allOrders(first: $first, last: $last, before: $before, after: $after) {
			totalCount,
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
				endCursor
			}
			edges {
				node {
					title
					customer {
						name
						email
						phone
					}
					address {
						city
						country
						street
						zip
					}
					bookingDate
					uid
				}
				cursor
			}
		}
	}
`;

export default GET_ALL_ORDERS;
