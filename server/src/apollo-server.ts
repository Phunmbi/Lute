import {ApolloServerPluginDrainHttpServer} from "apollo-server-core"
import {ApolloServer, ExpressContext} from "apollo-server-express"
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader"
import { loadSchemaSync } from "@graphql-tools/load"
import { addResolversToSchema } from "@graphql-tools/schema"
import  express from "express"
import { Server } from "http"
import resolvers, {ResolverContext} from "./resolvers";
import { firestore} from "firebase-admin";
import Firestore = firestore.Firestore;

const GRAPHQL_SCHEMA_PATH = '../schema.graphql'
const SCHEMA = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
	loaders: [new GraphQLFileLoader()],
})

export async function createApolloServer(
	db: Firestore,
	httpServer: Server,
	app: express.Application
): Promise<ApolloServer<ExpressContext>> {
	const server = new ApolloServer({
		schema: addResolversToSchema({
			schema: SCHEMA, resolvers
		}),
		context: ():ResolverContext => ({ db }),
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
		],
	})
	
	await server.start()
	server.applyMiddleware({ app })
	return server
}