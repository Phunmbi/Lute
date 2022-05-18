import {firestore} from 'firebase-admin';
import {MutationCreateOrderArgs, OrderResponse, QueryOrderArgs} from '../graphql/code_generated';
import {orderTransform} from "../transform/orderTransform";
import Firestore = firestore.Firestore;

const OrdersService = (db: Firestore) => {
	const getOrder = async ({id}: QueryOrderArgs) => {
		const orderDocRef = db.collection('orders').doc(id);
		// await orderDocRef.set(inputOrder[0], {merge: true})
		const orderDoc = await orderDocRef.get();
		const data = orderDoc.data();
		
		if (orderDoc.exists && orderDoc.data()) {
			return orderTransform({...data, uid: id})
		} else {
			throw new Error(`Order ${id} does not exist`);
		}
	};
	
	const getAllOrders = async () => {
		const orderColl = db.collection('orders')
		const orderCollSnap = await orderColl.get();
		const transOrders: OrderResponse[] = []
		
		orderCollSnap.forEach(doc => {
			const data = doc.data()
			const parsOrd = orderTransform({...data, uid: doc.id})
			transOrders.push(parsOrd)
		})
		
		return transOrders;
	}
	
	const createOrder = async ({orderRequest}: MutationCreateOrderArgs) => {
		const {bookingDate, title, customer, address} = orderRequest
		const newDocRef = db.collection('orders').doc();
		await newDocRef.set({bookingDate, title, customer, address})
		
		const retrieveSavedDoc = await newDocRef.get()
		const data = retrieveSavedDoc.data()
		
		if (!data) throw new Error(`Failed to save order`)
		return orderTransform(data)
	}
	
	return {
		getOrder: getOrder,
		createOrder: createOrder,
		getAllOrders: getAllOrders
	};
};

export default OrdersService;
