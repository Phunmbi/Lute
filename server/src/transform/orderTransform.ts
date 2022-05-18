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