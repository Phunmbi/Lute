import {firestore} from 'firebase-admin';
import {
	MutationCreateOrderArgs,
	MutationUpdateOrderArgs,
	OrderResponse,
	QueryOrderArgs
} from '../graphql/code_generated';
import {cleanDataTrans, orderTransform} from "../transform/orderTransform";
import Firestore = firestore.Firestore;

const OrdersService = (db: Firestore) => {
	const getOrder = async (args: QueryOrderArgs): Promise<OrderResponse> => {
		const ordersDoc = db.collection('orders').doc(args.id);
		const orderDocSnap = await ordersDoc.get();
		const data = orderDocSnap.data()
		
		if (orderDocSnap.exists && data) {
			return orderTransform({...data, uid: args.id})
		} else {
			throw new Error(`Could not find order`)
		}
	};
	
	const getAllOrders = async () => {
		const orderColl = db.collection('orders')
		const orderCollSnap = await orderColl.get();
		
		return cleanDataTrans(orderTransform, orderCollSnap)
	}
	
	const createOrder = async ({orderRequest}: MutationCreateOrderArgs) => {
		const newDocRef = db.collection('orders').doc();
		await newDocRef.set({...orderRequest})
		
		const retrieveSavedDoc = await newDocRef.get()
		const data = retrieveSavedDoc.data()
		
		if (!data) throw new Error(`Failed to save order`)
		return orderTransform({...data, uid: newDocRef.id})
	}
	
	const updateOrder = async ({id, orderRequest}: MutationUpdateOrderArgs) => {
		const orderDocR = db.collection('orders').doc(id);
		const orderD = await orderDocR.get()
		const dataBefUpd = orderD.data()
		
		if (!orderD.exists || !dataBefUpd) throw new Error('Order to be updated does not exist')
		
		const updateObj = {
			...orderRequest,
			customer: {
				...dataBefUpd.customer,
				...orderRequest.customer,
			},
			address: {
				...dataBefUpd.address,
				...orderRequest.address,
			}
		}
		
		await orderDocR.update({...updateObj})
		const retrieveSavedDoc = await orderDocR.get()
		const updatedData = retrieveSavedDoc.data()
		
		if (!retrieveSavedDoc.exists || !updatedData) throw new Error('Error fetching updated order')
		
		return orderTransform({...updatedData, uid: id})
	};
	
	return {
		getOrder: getOrder,
		createOrder: createOrder,
		getAllOrders: getAllOrders,
		updateOrder: updateOrder
	};
};

export default OrdersService;
