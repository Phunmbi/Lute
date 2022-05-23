import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthProvider } from "../providers/AuthProvider";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
	const { isLoggedIn } = useAuthProvider();

	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	}

	return children;
};
export default ProtectedRoute;
