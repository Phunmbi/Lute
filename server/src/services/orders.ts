import { firestore } from 'firebase-admin';
import Firestore = firestore.Firestore;
import { OrderResponse } from '../graphql/code_generated';

const OrdersService = (db: Firestore) => {
  const database = db;

  const getOrder = async (id: string):Promise<OrderResponse> => {
    const orderDocRef = await database.collection('orders').doc(id);
    // await orderDocRef.set(inputOrder[0], {merge: true})
    const orderDoc = await orderDocRef.get();

    if (!orderDoc.exists) {
      throw new Error(`Order ${id} does not exist`);
    } else {
      const respData = { ...orderDoc.data(), uid: id };
      return respData as OrderResponse;
    }
  };

  return {
    getOrder,
  };
};

export default OrdersService;
