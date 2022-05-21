import firebase from 'firebase/compat/app';
import 'firebaseui/dist/firebaseui.css';
import * as firebaseui from "firebaseui";

export const firebaseApp = firebase.initializeApp({
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: process.env.FIREBASE_AUTH_DOMAIN,
	databaseURL: process.env.FIREBASE_DATABASE_URL,
	projectId: process.env.FIREBASE_PROJECT_ID,
	storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
	appId: process.env.FIREBASE_APP_ID
})

export const firebaseUI = new firebaseui.auth.AuthUI(firebaseApp.auth());
