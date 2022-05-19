import React from 'react';
import {ErrorBoundary} from 'react-error-boundary'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Layout from "./components/layout";
import 'firebaseui/dist/firebaseui.css';
import ErrorFallback from "./components/ErrorBoundary";
import Login from "./components/Login";
import AuthProvider from "./providers/AuthProvider";

function App() {
	return (
		<ErrorBoundary
			FallbackComponent={ErrorFallback}
			onReset={() => {
				window.location.reload()
			}}
		>
			<Router>
				<AuthProvider>
					<Routes>
						<Route path="/" element={<Layout/>}/>
						<Route path="/login" element={<Login/>}/>
					</Routes>
				</AuthProvider>
			</Router>
		</ErrorBoundary>
	);
}

export default App;
