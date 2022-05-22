import { ApolloClient, concat, HttpLink, InMemoryCache } from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({ uri: process.env.APOLLO_CLIENT_URI });

const authMiddleware = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: `Bearer ${localStorage.getItem("luteToken") as string}`,
		},
	};
});

const client = new ApolloClient({
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					allOrders: relayStylePagination(),
				},
			},
		},
	}),
	link: concat(authMiddleware, httpLink),
});

export default client;
