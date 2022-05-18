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
  city: Scalars['String'];
  country: Scalars['String'];
  street: Scalars['String'];
  zip: Scalars['String'];
};

export type AddressInput = {
  city: Scalars['String'];
  country: Scalars['String'];
  street: Scalars['String'];
  zip: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createOrder?: Maybe<OrderResponse>;
};


export type MutationCreateOrderArgs = {
  orderRequest?: InputMaybe<OrderRequestBody>;
};

export type OrderRequestBody = {
  Customer: UserInput;
  address: AddressInput;
  bookingDate: Scalars['Date'];
  title: Scalars['String'];
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  address: Address;
  bookingDate: Scalars['Date'];
  customer: User;
  title: Scalars['String'];
  uid: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getOrder?: Maybe<OrderResponse>;
};


export type QueryGetOrderArgs = {
  id: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type GetSingleOrderQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSingleOrderQuery = { __typename?: 'Query', getOrder?: { __typename?: 'OrderResponse', title: string, uid: string, bookingDate: any, customer: { __typename?: 'User', name: string, email: string, phone: string }, address: { __typename?: 'Address', city: string, zip: string, street: string, country: string } } | null };


export const GetSingleOrderDocument = gql`
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