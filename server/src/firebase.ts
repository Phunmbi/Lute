import admin, {credential, firestore, ServiceAccount} from 'firebase-admin';
import serviceAccount from '../../serviceAccountKey.json';
import Firestore = firestore.Firestore;

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
admin.initializeApp({
	credential: credential.cert(serviceAccount as ServiceAccount),
	databaseURL: 'https://construyo-coding-challenge.firebaseio.com',
});

export const db: Firestore = firestore();
