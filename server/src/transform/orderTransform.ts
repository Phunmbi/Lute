import {Edge, OrderResponse} from "../graphql/code_generated";
import {firestore} from "firebase-admin";

export const orderTransform = (t: firestore.DocumentData): OrderResponse => {
	return {
		uid: t.uid,
		address: t.address,
		bookingDate: t.bookingDate,
		customer: t.customer,
		title: t.title
	}
}

export const cleanDataTrans = (transFunc: (t: firestore.DocumentData) => OrderResponse, collSnap: firestore.QuerySnapshot): Edge[] => {
	const trans: Edge[] = []
	
	collSnap.forEach(doc => {
		const data = doc.data()
		const parsOrd: Edge = {node: transFunc({...data, uid: doc.id}), cursor: doc.id}
		trans.push(parsOrd)
	})
	
	return trans;
}


export const paginateTransform = (slicedEdges: Edge[], hasNextPage: boolean, hasPreviousPage: boolean) => {
	return {
		pageInfo: {
			endCursor: slicedEdges[slicedEdges.length - 1].cursor as string,
			startCursor: slicedEdges[0].cursor as string,
			hasNextPage,
			hasPreviousPage,
		},
		totalCount: slicedEdges.length,
		edges: slicedEdges
	}
}
