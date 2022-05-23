import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import express from "express";
import { Server } from "http";
import { firestore } from "firebase-admin";
import resolvers, { ResolverContext } from "./resolvers";
import authMiddleware from "./middleware/auth";
import Firestore = firestore.Firestore;

const GRAPHQL_SCHEMA_PATH = "../schema.graphql";
export const SCHEMA = loadSchemaSync(GRAPHQL_SCHEMA_PATH, {
	loaders: [new GraphQLFileLoader()],
});

export default async function createApolloServer(
	db: Firestore,
	httpServer: Server,
	app: express.Application
): Promise<ApolloServer> {
	const server = new ApolloServer({
		schema: addResolversToSchema({
			schema: SCHEMA,
			resolvers,
		}),
		context: async ({ req }): Promise<ResolverContext> => ({
			db,
			user: await authMiddleware(req.headers.authorization || ""),
		}),
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	});

	await server.start();
	server.applyMiddleware({ app });
	return server;
}
