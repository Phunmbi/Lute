import { orders} from "../localdb";
import {firestore} from "firebase-admin";
import Firestore = firestore.Firestore;
import {OrderResponse} from "../graphql/code_generated";

const OrdersService = (db: Firestore) => {
	let database = db;
	
	const getOrder = async(id: string):Promise<OrderResponse> => {
			let orderDocRef = await database.collection('orders').doc(id)
			// await orderDocRef.set(inputOrder[0], {merge: true})
			let orderDoc = await orderDocRef.get();
			
			if (!orderDoc.exists) {
				throw new Error("Document does not exist")
			} else {
				const respData = {...orderDoc.data(), uid: id}
				return respData as OrderResponse
			}
	}
	
	return {
		getOrder: getOrder
	}
}

export default OrdersService;
