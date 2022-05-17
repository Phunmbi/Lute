import express from 'express';
import {createServer} from 'http'
import {createApolloServer} from "./apollo-server";
import {db} from "./firebase";

const app = express();

async function start() {
	const httpServer = createServer(app)
	const apolloServer = await createApolloServer(db, httpServer, app)
	
	app.listen('4000', () => {
		console.log('GraphQL API Server listening on 4000')
		console.log(`sandbox: http://localhost:4000${apolloServer.graphqlPath}`)
	})
}

start().catch(e => {
	console.error(e)
})

