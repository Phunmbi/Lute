import {OrderResponse} from "../graphql/code_generated";
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

export const cleanDataTrans = (transFunc: (t: firestore.DocumentData) => OrderResponse, collSnap: firestore.QuerySnapshot) => {
	const trans: OrderResponse[] = []
	
	collSnap.forEach(doc => {
		const data = doc.data()
		const parsOrd = transFunc({...data, uid: doc.id})
		trans.push(parsOrd)
	})
	
	return trans;
}