import React from 'react';
import {createRoot} from 'react-dom/client';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import App from './App';

const client = new ApolloClient({
	uri: 'http://localhost:4000/graphql',
	cache: new InMemoryCache(),
});

const container = document.getElementById('app');
const root = createRoot(container!);
root.render(
	<ApolloProvider client={client}>
		<App/>
	</ApolloProvider>,
);
