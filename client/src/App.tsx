import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/layout";
import "firebaseui/dist/firebaseui.css";
import ErrorFallback from "./components/ErrorBoundary";
import Login from "./components/Login";
import AuthProvider from "./providers/AuthProvider";
import ModalProvider from "./providers/ModalProvider";
import GlobalProvider from "./providers/GlobalProvider";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				window.location.reload();
			}}
		>
			<Router>
				<AuthProvider>
					<ModalProvider>
						<GlobalProvider>
							<Routes>
								<Route
									path="/"
									element={<ProtectedRoute children={<Layout />} />}
								/>
								<Route path="/login" element={<Login />} />
								<Route path="/signup" element={<Signup />} />
							</Routes>
						</GlobalProvider>
					</ModalProvider>
				</AuthProvider>
			</Router>
		</ErrorBoundary>
	);
};

export default App;
