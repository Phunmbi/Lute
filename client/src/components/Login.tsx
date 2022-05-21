import React, {useEffect} from "react";
import firebase from "firebase/compat";
import {firebaseUI} from "../utils/firebase";

const Login = () => {
	useEffect(() => {
		firebaseUI.start(".login-firebase-lute",
			{
				signInSuccessUrl: '/',
				signInOptions: [{
					provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
				}],
			}
		)
	}, [])
	
	return (
		<div>
			<h3>Lute Order Management assistant</h3>
			<div className="login-firebase-lute"></div>
		</div>
	)
}

export default Login
