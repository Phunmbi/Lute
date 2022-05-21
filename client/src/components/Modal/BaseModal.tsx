import React from "react";
import UpdateOrderModal from "./UpdateOrderModal";
import CreateOrderModal from "./CreateOrderModal";
import { useModalProvider } from "../../providers/ModalProvider";
import ViewOrderDetailsModal from "./ViewOrderDetailsModal";

const BaseModal = () => {
	const {
		state: { open, type, order },
		dispatch,
	} = useModalProvider();

	function renderModal(type: "create" | "edit" | "view", order?: any) {
		switch (type) {
			case "create":
				return <CreateOrderModal />;
			case "edit":
				return <UpdateOrderModal order={order} />;
			case "view":
				return <ViewOrderDetailsModal order={order} />;
			default:
				return;
		}
	}

	return (
		<>
			<div className={open ? "modal is-active" : "modal"}>
				<div
					className="modal-background"
					onClick={() => dispatch({ open: false, type: "create" })}
				/>
				{renderModal(type, order)}
				<button
					type="button"
					className="modal-close"
					aria-label="close"
					onClick={() => dispatch({ open: false, type: "create" })}
				>
					close
				</button>
			</div>
		</>
	);
};

export default BaseModal;
