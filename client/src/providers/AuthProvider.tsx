import React, {createContext, useContext, useEffect, useState} from 'react';
import {firebaseApp} from '../utils/firebase';
import {ICurrentUser} from "../utils/types";
import {useNavigate} from "react-router-dom";
import client from "../utils/apolloClient";

const AuthContext = createContext<ICurrentUser>({
	isLoggedIn: false
});

const AuthProvider = ({children}: any) => {
	const [currentUser, setCurrentUser] = useState<ICurrentUser>({isLoggedIn: false});
	const navigate = useNavigate()
	
	useEffect(() => {
		firebaseApp.auth().onAuthStateChanged(async (firebaseUser) => {
			const token = await firebaseUser?.getIdToken();
			const email = firebaseUser?.email;
			const fullName = firebaseUser?.displayName;
			
			if (token) {
				setCurrentUser({
					isLoggedIn: true,
					email: email ? email : '',
					fullName: fullName ? fullName : '',
				})
				localStorage.setItem('luteToken', token)
				await client.resetStore()
				return navigate('/')
			} else {
				localStorage.removeItem('luteToken')
				await client.clearStore()
				return navigate('/login')
			}
		})
	}, []);
	
	return (
		<AuthContext.Provider
			value={currentUser}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthProvider = () => useContext(AuthContext)
export default AuthProvider;