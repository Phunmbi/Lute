import { ApolloServer } from "apollo-server-express";
import resolvers from "../src/resolvers";
import { SCHEMA } from "../src/apollo-server";
import GET_ALL_ORDERS from "client/src/graphql/allOrdersQuery";
import GET_SINGLE_ORDER from "client/src/graphql/singleOrderQuery";
import { CREATE_ORDER } from "client/src/graphql/createOrderMutation";
import { inputOrder } from "../src/localdb";

const server = new ApolloServer({
	schema: SCHEMA,
	resolvers,
	context: () => ({ user: { id: 1, email: "a@a.a" } }),
});

describe("Queries", () => {
	it("should fetch all orders", async () => {
		const res = await server.executeOperation({
			query: GET_ALL_ORDERS,
			variables: { first: 10 },
		});

		expect(res.errors).toBeUndefined();
		expect(res).toMatchSnapshot();
	});

	it("should fetch a single Order", async () => {
		const res = await server.executeOperation({
			query: GET_SINGLE_ORDER,
			variables: { id: "CeAmCcbx0JJ5QNWgFTDW" },
		});

		expect(res.errors).toBeUndefined();
		expect(res).toMatchSnapshot();
	});
});

describe("Mutations", () => {
	it("should create order", async () => {
		const res = await server.executeOperation({
			query: CREATE_ORDER,
			variables: { orderRequest: { ...inputOrder[0] } },
		});

		// expect(res.errors).toBeUndefined();
		expect(res).toMatchSnapshot();
	});
});
