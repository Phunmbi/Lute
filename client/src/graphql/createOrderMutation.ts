import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`
mutation createOrder ($orderRequest: OrderRequestBody!) {
    createOrder(orderRequest: $orderRequest) {
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
`

