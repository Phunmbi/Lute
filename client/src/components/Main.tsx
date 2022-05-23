import React from "react";
import { useModalProvider } from "../providers/ModalProvider";
import Dashboard from "./Dashboard";
import BaseModal from "./Modal/BaseModal";

const Main = () => {
	const { dispatch } = useModalProvider();

	return (
		<>
			<div className="container">
				<div className="" />
				<div className="mt-6 is-flex is-justify-content-space-between is-align-items-center">
					<h3 className="subtitle is-5 is-capitalized mb-0 has-text-weight-bold">
						Orders history
					</h3>
					<button
						id="cy-create-button"
						className="button is-success"
						type="button"
						onClick={() => dispatch({ open: true, type: "create" })}
					>
						Create Orders
					</button>
				</div>
				<BaseModal />
				<Dashboard />
			</div>
		</>
	);
};

export default Main;
