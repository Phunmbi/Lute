import {firestore} from 'firebase-admin';
import {
	MutationCreateOrderArgs,
	MutationUpdateOrderArgs,
	OrderResponse,
	OrdersConnection,
	QueryAllOrdersArgs,
	QueryOrderArgs
} from '../../graphql/code_generated';
import {orderTransform, paginateTransform} from "../../transform/orderTransform";
import {applyCursorToEdges} from "./ordersHelpers";
import Firestore = firestore.Firestore;
import FieldValue = firestore.FieldValue;


const OrdersService = (db: Firestore) => {
	const getOrder = async (args: QueryOrderArgs): Promise<OrderResponse> => {
		const ordersDoc = await db.collection('orders').doc(args.id).get();
		const data = ordersDoc.data()
		
		if (ordersDoc.exists && data) {
			return orderTransform({...data, uid: args.id})
		} else {
			throw new Error(`Could not find order`)
		}
	};
	
	const getAllOrders = async (args: QueryAllOrdersArgs): Promise<OrdersConnection> => {
		const ordersDoc = db.collection('orders')
		const {slicedEdges, hasNextPage, hasPreviousPage} = await applyCursorToEdges(ordersDoc, args);
		
		return paginateTransform(slicedEdges, hasNextPage, hasPreviousPage)
	}
	
	const createOrder = async ({orderRequest}: MutationCreateOrderArgs) => {
		const newDocRef = db.collection('orders').doc();
		await newDocRef.set({...orderRequest, createdAt: FieldValue.serverTimestamp()})
		
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
		
		await orderDocR.update({...updateObj, updatedAt: FieldValue.serverTimestamp()})
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
