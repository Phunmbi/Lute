import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  zip?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  zip?: InputMaybe<Scalars['String']>;
};

export type AllOrdersResponse = {
  __typename?: 'AllOrdersResponse';
  count?: Maybe<Scalars['Int']>;
  cursor?: Maybe<Scalars['String']>;
  limit?: Maybe<Scalars['Int']>;
  orders?: Maybe<Array<OrderResponse>>;
};

export type Edge = {
  __typename?: 'Edge';
  cursor?: Maybe<Scalars['String']>;
  node?: Maybe<OrderResponse>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: OrderResponse;
  updateOrder: OrderResponse;
};


export type MutationCreateOrderArgs = {
  orderRequest: OrderRequestBody;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['String'];
  orderRequest: OrderRequestBody;
};

export type OrderRequestBody = {
  address?: InputMaybe<AddressInput>;
  bookingDate?: InputMaybe<Scalars['Date']>;
  customer?: InputMaybe<UserInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  address?: Maybe<Address>;
  bookingDate?: Maybe<Scalars['Date']>;
  customer?: Maybe<User>;
  title?: Maybe<Scalars['String']>;
  uid: Scalars['String'];
};

export type OrdersConnection = {
  __typename?: 'OrdersConnection';
  edges?: Maybe<Array<Maybe<Edge>>>;
  pageInfo?: Maybe<PageInfo>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allOrders?: Maybe<OrdersConnection>;
  order?: Maybe<OrderResponse>;
};


export type QueryAllOrdersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
};


export type QueryOrderArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type UserInput = {
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type GetAllOrderQueryVariables = Exact<{
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  before?: InputMaybe<Scalars['String']>;
  after?: InputMaybe<Scalars['String']>;
}>;


export type GetAllOrderQuery = { __typename?: 'Query', allOrders?: { __typename?: 'OrdersConnection', totalCount?: number | null, pageInfo?: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, endCursor: string } | null, edges?: Array<{ __typename?: 'Edge', cursor?: string | null, node?: { __typename?: 'OrderResponse', title?: string | null, bookingDate?: any | null, uid: string, customer?: { __typename?: 'User', name?: string | null, email?: string | null, phone?: string | null } | null, address?: { __typename?: 'Address', city?: string | null, country?: string | null, street?: string | null, zip?: string | null } | null } | null } | null> | null } | null };

export type CreateOrderMutationVariables = Exact<{
  orderRequest: OrderRequestBody;
}>;


export type CreateOrderMutation = { __typename?: 'Mutation', createOrder: { __typename?: 'OrderResponse', title?: string | null, uid: string, customer?: { __typename?: 'User', email?: string | null, name?: string | null, phone?: string | null } | null, address?: { __typename?: 'Address', city?: string | null, country?: string | null, street?: string | null, zip?: string | null } | null } };

export type GetSingleOrderQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSingleOrderQuery = { __typename?: 'Query', order?: { __typename?: 'OrderResponse', title?: string | null, uid: string, bookingDate?: any | null, customer?: { __typename?: 'User', name?: string | null, email?: string | null, phone?: string | null } | null, address?: { __typename?: 'Address', city?: string | null, zip?: string | null, street?: string | null, country?: string | null } | null } | null };


export const GetAllOrderDocument = gql`
    query GetAllOrder($first: Int, $last: Int, $before: String, $after: String) {
  allOrders(first: $first, last: $last, before: $before, after: $after) {
    totalCount
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

/**
 * __useGetAllOrderQuery__
 *
 * To run a query within a React component, call `useGetAllOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllOrderQuery({
 *   variables: {
 *      first: // value for 'first'
 *      last: // value for 'last'
 *      before: // value for 'before'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useGetAllOrderQuery(baseOptions?: Apollo.QueryHookOptions<GetAllOrderQuery, GetAllOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllOrderQuery, GetAllOrderQueryVariables>(GetAllOrderDocument, options);
      }
export function useGetAllOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllOrderQuery, GetAllOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllOrderQuery, GetAllOrderQueryVariables>(GetAllOrderDocument, options);
        }
export type GetAllOrderQueryHookResult = ReturnType<typeof useGetAllOrderQuery>;
export type GetAllOrderLazyQueryHookResult = ReturnType<typeof useGetAllOrderLazyQuery>;
export type GetAllOrderQueryResult = Apollo.QueryResult<GetAllOrderQuery, GetAllOrderQueryVariables>;
export const CreateOrderDocument = gql`
    mutation createOrder($orderRequest: OrderRequestBody!) {
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
    `;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      orderRequest: // value for 'orderRequest'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const GetSingleOrderDocument = gql`
    query GetSingleOrder($id: String!) {
  order(id: $id) {
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

/**
 * __useGetSingleOrderQuery__
 *
 * To run a query within a React component, call `useGetSingleOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSingleOrderQuery(baseOptions: Apollo.QueryHookOptions<GetSingleOrderQuery, GetSingleOrderQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSingleOrderQuery, GetSingleOrderQueryVariables>(GetSingleOrderDocument, options);
      }
export function useGetSingleOrderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleOrderQuery, GetSingleOrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSingleOrderQuery, GetSingleOrderQueryVariables>(GetSingleOrderDocument, options);
        }
export type GetSingleOrderQueryHookResult = ReturnType<typeof useGetSingleOrderQuery>;
export type GetSingleOrderLazyQueryHookResult = ReturnType<typeof useGetSingleOrderLazyQuery>;
export type GetSingleOrderQueryResult = Apollo.QueryResult<GetSingleOrderQuery, GetSingleOrderQueryVariables>;