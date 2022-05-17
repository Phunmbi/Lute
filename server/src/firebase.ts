import {credential, firestore, initializeApp, ServiceAccount} from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json';
import Firestore = firestore.Firestore;

initializeApp({
	credential: credential.cert(serviceAccount as ServiceAccount),
	databaseURL: 'https://construyo-coding-challenge.firebaseio.com',
});

export const db: Firestore = firestore();
