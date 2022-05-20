import React from "react";
import { useModalProvider } from "../providers/ModalProvider";
import Dashboard from "./Dashboard";
import BaseModal from "./Modal/BaseModal";

function Main() {
	const { dispatch } = useModalProvider();

	return (
		<>
			<div className="section">
				<h2 className="title">Lute</h2>
				<div className="is-flex is-justify-content-space-between">
					<h3 className="subtitle">Orders History</h3>
					<button
						className="button is-success"
						type="button"
						onClick={() => dispatch({ open: true, type: "create" })}
					>
						Create Orders
					</button>
				</div>
				<BaseModal />
			</div>
			<Dashboard />
		</>
	);
}

export default Main;
