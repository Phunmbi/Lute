import { QueryAllOrdersArgs } from "../../graphql/code_generated";
import { UserInputError } from "apollo-server-express";
import { cleanDataTrans, orderTransform } from "../../transform/orderTransform";

export const applyCursorToEdges = async (
	ordersDoc: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>,
	args: QueryAllOrdersArgs
) => {
	const { after, first, before, last } = args;

	if (after) {
		const afterEdgeDoc = await ordersDoc.doc(after).get();

		if (afterEdgeDoc.exists) {
			const edges = await ordersDoc.startAfter(afterEdgeDoc).get();
			const otherDirDoc = await ordersDoc
				.endBefore(afterEdgeDoc)
				.limit(1)
				.get();
			const parsedOrderEdges = cleanDataTrans(orderTransform, edges);

			if (first) {
				if (first < 0)
					throw new UserInputError(
						"argument 'first' cannot accept a negative number"
					);
				if (edges.size > first) {
					const slicedEdges = parsedOrderEdges.slice(0, first);
					return {
						slicedEdges,
						hasNextPage: true,
						hasPreviousPage: otherDirDoc.size === 1,
					};
				} else {
					const slicedEdges = parsedOrderEdges.slice(0, edges.size - 1);
					return {
						slicedEdges,
						hasNextPage: false,
						hasPreviousPage: otherDirDoc.size === 1,
					};
				}
			}
		}
	}

	// to support bi-directional pagination
	if (before) {
		const beforeEdgeDoc = await ordersDoc.where("uid", "==", before).get();

		if (!beforeEdgeDoc.empty) {
			const edges = await ordersDoc.endBefore(beforeEdgeDoc).get();
			const otherDirDoc = await ordersDoc
				.startAfter(beforeEdgeDoc)
				.limit(1)
				.get();
			const parsedOrderEdges = cleanDataTrans(orderTransform, edges);

			if (last) {
				if (last < 0)
					throw new UserInputError(
						"argument 'last' cannot accept a negative number"
					);
				if (edges.size > last) {
					const slicedEdges = parsedOrderEdges.slice(
						edges.size - last - 1,
						edges.size - 1
					);
					return {
						slicedEdges,
						hasNextPage: otherDirDoc.size === 1,
						hasPreviousPage: true,
					};
				} else {
					const slicedEdges = parsedOrderEdges.slice(0, edges.size - 1);
					return {
						slicedEdges,
						hasNextPage: otherDirDoc.size === 1,
						hasPreviousPage: false,
					};
				}
			}
		}
	}

	// handle initial request without a cursor
	if (first && !after && first && !before) {
		const edges = await ordersDoc.limit(first).get();

		if (!edges) throw new Error("unable to fetch orders");
		const parsedOrderEdges = cleanDataTrans(orderTransform, edges);
		const slicedEdges = parsedOrderEdges.slice(0, first);
		return { slicedEdges, hasNextPage: true, hasPreviousPage: false };
	}

	throw new UserInputError("Invalid cursor");
};
