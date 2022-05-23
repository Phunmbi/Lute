import { gql } from "@apollo/client";

export const UPDATE_ORDER = gql`
	mutation updateOrder(
		$updateOrderId: String!
		$orderRequest: OrderRequestBody!
	) {
		updateOrder(id: $updateOrderId, orderRequest: $orderRequest) {
			title
			customer {
				email
				name
				phone
			}
			address {
				city
				country
				street
				zip
			}
			uid
		}
	}
`;
