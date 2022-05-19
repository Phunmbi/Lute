import {ApolloClient, ApolloLink, concat, HttpLink, InMemoryCache} from "@apollo/client";
import {relayStylePagination} from "@apollo/client/utilities";
import {onError} from "@apollo/client/link/error";
import {firebaseApp} from "./firebase";

const httpLink = new HttpLink({uri: process.env.APOLLO_CLIENT_URI});
const token = localStorage.getItem('luteToken') || "";
const authMiddleware = new ApolloLink((operation, forward) => {
	// add the authorization to the headers
	operation.setContext(({headers = {}}) => ({
		headers: {
			...headers,
			authorization: `Bearer ${token}`,
		}
	}));
	
	return forward(operation);
})

const logoutLink = onError(({networkError}) => {
	// @ts-ignore
	if (networkError.statusCode === 401) {
		firebaseApp.auth().signOut().then(() => client.clearStore()).catch(e => console.log(e))
	}
})

const client = new ApolloClient({
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					allOrders: relayStylePagination()
				}
			}
		}
	}),
	link: concat(authMiddleware, logoutLink.concat(httpLink))
});

export default client