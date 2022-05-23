import React from "react";
import { IUpdateOrderModal } from "./UpdateOrderModal";
import { useModalProvider } from "../../providers/ModalProvider";

const ViewOrderDetailsModal = ({ order }: IUpdateOrderModal) => {
	const { dispatch } = useModalProvider();
	return (
		<>
			<div className="modal-content is-large box">
				<h3 className="subtitle has-text-centered has-text-weight-bold">
					Order details
				</h3>
				<div>
					<div className="block">
						<h4 className="title is-4">Title</h4>
						<div className="subtitle">
							<span className="subtitle">{order.title}</span>
						</div>
					</div>
					<div className="block">
						<h4 className="title is-4">Booking date</h4>
						<div className="subtitle">
							<span>{new Date(order.bookingDate).toDateString()}</span>
						</div>
					</div>
					<div className="block">
						<h4 className="title is-4">Customer</h4>
						<div className="subtitle">
							<h5> {order.customer?.name}</h5>
							<h5> {order.customer?.phone}</h5>
							<h5> {order.customer?.email}</h5>
						</div>
					</div>
					<div className="block">
						<h4 className="title is-4">Address</h4>
						<div className="subtitle">
							<h5>{order.address?.street}</h5>
							<h5> {order.address?.city}</h5>
							<h5> {order.address?.country}</h5>
							<h5> {order.address?.zip}</h5>
						</div>
					</div>
					<div className="is-flex is-justify-content-center">
						<button
							className="button is-danger"
							onClick={() => dispatch({ type: "create", open: false })}
						>
							Close
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ViewOrderDetailsModal;
