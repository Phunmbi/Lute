import React from "react";
import { useModalProvider } from "../providers/ModalProvider";
import Dashboard from "./Dashboard";
import BaseModal from "./Modal/BaseModal";

function Main() {
	const { dispatch } = useModalProvider();

	return (
		<>
			<div className="section">
				<h2 className="title is-1 has-text-centered is-family-code has-text-weight-light">
					Lute
				</h2>
				<div className="is-flex is-justify-content-space-between">
					<h3 className="subtitle is-family-code is-capitalized">
						Unorganized orders history
					</h3>
					<button
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
}

export default Main;
