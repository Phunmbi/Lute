import admin, {firestore, ServiceAccount} from 'firebase-admin';
import serviceAccount from "../../serviceAccountKey.json";


admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as ServiceAccount),
	databaseURL: 'https://construyo-coding-challenge.firebaseio.com'
})

export const db: firestore.Firestore = firestore();

