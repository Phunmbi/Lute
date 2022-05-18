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

export type Mutation = {
  __typename?: 'Mutation';
  createOrder: OrderResponse;
};


export type MutationCreateOrderArgs = {
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

export type Query = {
  __typename?: 'Query';
  allOrders?: Maybe<Array<OrderResponse>>;
  order?: Maybe<OrderResponse>;
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

export type GetAllOrderQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllOrderQuery = { __typename?: 'Query', allOrders?: Array<{ __typename?: 'OrderResponse', title?: string | null, uid: string, bookingDate?: any | null, customer?: { __typename?: 'User', name?: string | null, email?: string | null, phone?: string | null } | null, address?: { __typename?: 'Address', city?: string | null, zip?: string | null, street?: string | null, country?: string | null } | null }> | null };

export type GetSingleOrderQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetSingleOrderQuery = { __typename?: 'Query', order?: { __typename?: 'OrderResponse', title?: string | null, uid: string, bookingDate?: any | null, customer?: { __typename?: 'User', name?: string | null, email?: string | null, phone?: string | null } | null, address?: { __typename?: 'Address', city?: string | null, zip?: string | null, street?: string | null, country?: string | null } | null } | null };


export const GetAllOrderDocument = gql`
    query GetAllOrder {
  allOrders {
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