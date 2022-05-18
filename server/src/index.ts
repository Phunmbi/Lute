import express, {Express} from 'express';
import {createServer} from 'http';
import createApolloServer from './apollo-server';
import {db} from './firebase';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const app: Express = express();
const port = 4000 || process.env.PORT;

async function start() {
	const httpServer = createServer(app);
	const apolloServer = await createApolloServer(db, httpServer, app);
	
	app.listen(port, () => {
		console.log(`GraphQL API Server listening on ${port}`);
		console.log(`sandbox: http://localhost:${port}${apolloServer.graphqlPath}`);
	});
}

start().catch((e) => {
	console.error(e);
});

app.get("/health", (req, res) => {
	return res.status(200).send({message: "lute graphql server is healthy"});
});