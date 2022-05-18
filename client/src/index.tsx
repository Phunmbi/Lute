import React from 'react';
import {createRoot} from 'react-dom/client';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import App from './App';

const client = new ApolloClient({
	uri: process.env.APOLLO_CLIENT_URI,
	cache: new InMemoryCache(),
});

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
	<ApolloProvider client={client}>
		<App/>
	</ApolloProvider>,
);
