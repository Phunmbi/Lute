import admin, { app, firestore, ServiceAccount } from "firebase-admin";
import App = app.App;

let firebase: App;

if (process.env.NODE_ENV === "test") {
	firebase = admin.initializeApp({
		credential: admin.credential.cert({
			type: process.env.FIREBASE_SERVICE_TYPE,
			project_id: process.env.FIREBASE_SERVICE_PROJECT_ID,
			private_key_id: process.env.FIREBASE_SERVICE_PRIVATE_KEY_ID,
			private_key: (process.env.FIREBASE_SERVICE_PRIVATE_KEY as string).replace(
				/\\n/g,
				"\n"
			),
			client_email: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
			client_id: process.env.FIREBASE_SERVICE_CLIENT_ID,
			auth_uri: process.env.FIREBASE_SERVICE_AUTH_URI,
			token_uri: process.env.FIREBASE_SERVICE_TOKEN_URI,
			auth_provider_x509_cert_url: process.env.FIREBASE_SERVICE_AUTH_PROVIDER,
			client_x509_cert_url: process.env.FIREBASE_SERVICE_CLIENT_CERT,
		} as ServiceAccount),
		databaseURL: "https://construyo-coding-challenge.firebaseio.com",
	});
} else {
	const serviceAccount = require("../../serviceAccountKey.json");

	firebase = admin.initializeApp({
		credential: admin.credential.cert(serviceAccount as ServiceAccount),
		databaseURL: "https://construyo-coding-challenge.firebaseio.com",
	});
}

export const db: firestore.Firestore = firestore();
export default firebase;
