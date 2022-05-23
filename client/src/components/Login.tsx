import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { firebaseApp } from "../utils/firebase";

const Login = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
		setLoading(true);
		e.preventDefault();

		firebaseApp
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
				setLoading(false);
			})
			.catch(() => {
				setLoading(false);
				toast.error("Incorrect Email/Password", {
					theme: "colored",
					position: "top-right",
					autoClose: 4000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
				});
			});
	};

	return (
		<div className="section is-fluid has-text-centered">
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
			/>

			<div className="column is-one-third is-offset-4">
				<h2 className="title is-3 is-family-code">Lute</h2>
				<h3 className="subtitle">Login</h3>
				<form onSubmit={(e) => handleLogin(e)} className="block">
					<div className="field">
						<label className="label">Email</label>
						<div className="control">
							<input
								id="cy-login-input-email"
								className="input"
								type="email"
								placeholder="Email"
								value={email}
								onChange={(e) => setEmail(e.currentTarget.value)}
								required
							/>
						</div>
					</div>
					<div className="field">
						<label className="label">Password</label>
						<div className="control">
							<input
								id="cy-login-input-password"
								className="input"
								type="password"
								placeholder="Password"
								value={password}
								onChange={(e) => setPassword(e.currentTarget.value)}
								required
							/>
						</div>
					</div>
					<div className="field">
						<div className="control">
							<button
								id="cy-login-input-submit"
								type="submit"
								className={`${loading ? "is-loading " : ""} button is-primary`}
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
			<h3 className="block">
				<Link to="/signup">Sign up</Link>, if you don't have an account.
			</h3>
		</div>
	);
};

export default Login;
