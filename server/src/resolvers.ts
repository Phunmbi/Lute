import Query from "./graphql/resolvers/Query";
import {Resolvers} from "./graphql/code_generated";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;

export interface ResolverContext {
	db: Firestore
}

const resolvers: Resolvers<ResolverContext> = {
	Query
}

export default resolvers;
