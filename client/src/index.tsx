import React from 'react';
import {createRoot} from 'react-dom/client';
import {ApolloProvider} from '@apollo/client';
import App from './App';
import client from "./utils/apolloClient"

const container = document.getElementById('app');

const root = createRoot(container!);
root.render(
	<ApolloProvider client={client}>
		<App/>
	</ApolloProvider>,
);
