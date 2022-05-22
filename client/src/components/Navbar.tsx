import React, { useState } from "react";
import { useAuthProvider } from "../providers/AuthProvider";
import { firebaseApp } from "../utils/firebase";
import { toast, ToastContainer } from "react-toastify";

const Navbar = () => {
	const { isLoggedIn, email, fullName } = useAuthProvider();
	const [loading, setLoading] = useState<boolean>(false);

	const logout = () => {
		setLoading(true);
		firebaseApp
			.auth()
			.signOut()
			.then(() => {
				setLoading(false);
			})
			.catch((e) => {
				setLoading(false);
				toast.error("Error logging out", {
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
		<nav
			className="navbar is-link is-flex-desktop is-align-items-center is-fixed-top"
			role="navigation"
			aria-label="navigation"
		>
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
			<div className="navbar-brand">
				<a className="navbar-item">
					<h3 className="title is-3 is-family-code has-text-white">Lute</h3>
				</a>
				<a
					role="button"
					className="navbar-burger"
					aria-label="menu"
					aria-expanded="false"
				>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
					<span aria-hidden="true"></span>
				</a>
			</div>

			<div className="navbar-menu is-justify-content-space-between">
				<div className="navbar-end">
					<div className="navbar-item  is-align-items-start">
						{isLoggedIn ? (
							<>
								<div className="pr-3">
									<p>{fullName}</p>
									<p>{email}</p>
								</div>
								<a
									className={`${loading ? "is-loading " : ""} button is-light`}
									onClick={() => logout()}
								>
									Log out
								</a>
							</>
						) : (
							<a className="button is-light">Login</a>
						)}
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
