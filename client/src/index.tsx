import React from 'react';
import {createRoot} from 'react-dom/client';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import App from './App';
import {relayStylePagination} from "@apollo/client/utilities";

const client = new ApolloClient({
	uri: process.env.APOLLO_CLIENT_URI,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					allOrders: relayStylePagination()
				}
			}
		}
	}),
});

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
	<ApolloProvider client={client}>
		<App/>
	</ApolloProvider>,
);
