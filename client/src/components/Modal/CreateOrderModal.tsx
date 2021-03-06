import React, { FormEvent, useState } from "react";
import GET_ALL_ORDERS from "../../graphql/allOrdersQuery";
import { useCreateOrderMutation } from "../../graphql/generated";
import { useModalProvider } from "../../providers/ModalProvider";
import { useGlobalProvider } from "../../providers/GlobalProvider";

const CreateOrderModal = () => {
	const {
		state: { count },
	} = useGlobalProvider();
	const [title, setTitle] = useState<string>("");
	const [bookingDate, setBookingDate] = useState<string>("");
	const [address, setAddress] = useState({
		street: "",
		city: "",
		country: "",
		zip: "",
	});
	const [customer, setCustomer] = useState({ email: "", phone: "", name: "" });
	const [createOrder, { error, loading }] = useCreateOrderMutation();
	const { state, dispatch } = useModalProvider();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createOrder({
			variables: {
				orderRequest: {
					title,
					bookingDate: new Date(bookingDate).getTime(),
					address,
					customer,
				},
			},
			refetchQueries: [{ query: GET_ALL_ORDERS, variables: { first: count } }],
		})
			.then((resp) => {
				setTitle("");
				setBookingDate("");
				setCustomer({ email: "", phone: "", name: "" });
				setAddress({ street: "", city: "", country: "", zip: "" });

				dispatch({ open: false, type: "create" });
			})
			.catch((e) => {
				console.error("Problem creating order", e);
			});
	};

	return (
		<>
			<div className="modal-content is-large">
				<form className="box" onSubmit={handleSubmit}>
					<h3 className="subtitle has-text-centered has-text-weight-bold">
						Create order
					</h3>

					<div className="field">
						<label className="label">Title</label>
						<div className="field-body">
							<div className="field">
								<div className="control">
									<input
										id="cy-create-input-title"
										className="input"
										type="text"
										placeholder="Title"
										value={title}
										onChange={(e) => setTitle(e.currentTarget.value)}
										required
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="field">
						<label className="label">Address</label>
						<div className="field-body">
							<div className="field">
								<p className="control is-expanded">
									<input
										className="input"
										type="text"
										value={address.street}
										onChange={(e) =>
											setAddress({
												...address,
												street: e.currentTarget.value,
											})
										}
										placeholder="Street"
									/>
								</p>
							</div>
							<div className="field">
								<p className="control is-expanded">
									<input
										className="input"
										type="text"
										value={address.city}
										onChange={(e) =>
											setAddress({ ...address, city: e.currentTarget.value })
										}
										placeholder="City"
									/>
								</p>
							</div>
						</div>
					</div>
					<div className="field">
						<div className="field-body">
							<div className="field">
								<p className="control is-expanded">
									<input
										id="cy-create-input-address-country"
										className="input"
										type="text"
										value={address.country}
										onChange={(e) =>
											setAddress({
												...address,
												country: e.currentTarget.value,
											})
										}
										placeholder="Country"
									/>
								</p>
							</div>
							<div className="field">
								<p className="control is-expanded">
									<input
										className="input"
										type="text"
										value={address.zip}
										onChange={(e) =>
											setAddress({ ...address, zip: e.currentTarget.value })
										}
										placeholder="Zip"
									/>
								</p>
							</div>
						</div>
					</div>

					<div className="field">
						<label className="label">Customer</label>
						<div className="field-body">
							<div className="field">
								<p className="control is-expanded">
									<input
										id="cy-create-input-customer-name"
										className="input"
										type="text"
										value={customer.name}
										onChange={(e) =>
											setCustomer({
												...customer,
												name: e.currentTarget.value,
											})
										}
										placeholder="Name"
									/>
								</p>
							</div>
						</div>
					</div>
					<div className="field">
						<div className="field-body">
							<div className="field">
								<p className="control is-expanded">
									<input
										className="input"
										type="tel"
										value={customer.phone}
										onChange={(e) =>
											setCustomer({
												...customer,
												phone: e.currentTarget.value,
											})
										}
										placeholder="Phone"
									/>
								</p>
							</div>
							<div className="field">
								<p className="control is-expanded">
									<input
										className="input"
										type="email"
										value={customer.email}
										onChange={(e) =>
											setCustomer({
												...customer,
												email: e.currentTarget.value,
											})
										}
										placeholder="email"
									/>
								</p>
							</div>
						</div>
					</div>

					<div className="field">
						<label className="label">Booking Date</label>
						<div className="field-body">
							<div className="field">
								<p className="control is-expanded">
									<input
										id="cy-create-input-bookingDate"
										className="input"
										type="date"
										placeholder="Booking date"
										value={bookingDate}
										onChange={(e) => setBookingDate(e.currentTarget.value)}
										required
									/>
								</p>
							</div>
						</div>
					</div>

					<div className="field">
						<div className="control is-flex is-justify-content-center">
							<button
								id="cy-create-input-submit"
								className={`button is-link ${loading ? "is-loading" : ""}`}
								type="submit"
							>
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};

export default CreateOrderModal;
