import React from "react";
import Main from "./Main";
import "firebaseui/dist/firebaseui.css";
import Navbar from "./Navbar";

const Layout = () => {
	return (
		<div>
			<Navbar />
			<Main />
		</div>
	);
};

export default Layout;
