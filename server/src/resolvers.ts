import {firestore} from 'firebase-admin';
import Query from './graphql/resolvers/Query';
import {Resolvers} from './graphql/code_generated';
import Mutation from "./graphql/resolvers/Mutation";
import Firestore = firestore.Firestore;

export interface ResolverContext {
	db: Firestore
	user: { uid: string }
}

const resolvers: Resolvers<ResolverContext> = {
	Query,
	Mutation
};

export default resolvers;
