import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseApp } from "../utils/firebase";
import { ICurrentUser } from "../utils/types";
import { useNavigate } from "react-router-dom";
import client from "../utils/apolloClient";

const AuthContext = createContext<ICurrentUser>({
	isLoggedIn: false,
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [currentUser, setCurrentUser] = useState<ICurrentUser>({
		isLoggedIn: false,
	});
	const navigate = useNavigate();

	const signup = (email: string, password: string) =>
		firebaseApp.auth().createUserWithEmailAndPassword(email, password);
	const login = (email: string, password: string) =>
		firebaseApp.auth().signInWithEmailAndPassword(email, password);
	const logout = () => firebaseApp.auth().signOut();

	useEffect(() => {
		const unsubscribe = firebaseApp.auth().onAuthStateChanged(
			async (firebaseUser) => {
				const token = await firebaseUser?.getIdToken();
				const email = firebaseUser?.email;
				const fullName = firebaseUser?.displayName;
				if (token) {
					await client.resetStore();
					setCurrentUser({
						isLoggedIn: true,
						email: email ? email : "",
						fullName: fullName ? fullName : "",
					});
					localStorage.setItem("luteToken", token);
					navigate("/");
				} else {
					await client.clearStore();
					localStorage.removeItem("luteToken");
					navigate("/login");
				}
			},
			(e) => {
				console.log(e, e.message);
			}
		);

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
	);
};

export const useAuthProvider = () => useContext(AuthContext);
export default AuthProvider;
