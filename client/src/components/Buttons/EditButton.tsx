import React from "react";
import { useModalProvider } from "../../providers/ModalProvider";

interface IEditButton {
	order: any;
}

const EditButton = ({ order }: IEditButton) => {
	const { dispatch } = useModalProvider();
	return (
		<button
			className="button is-warning"
			onClick={(e) => dispatch({ open: true, type: "edit", order })}
		>
			Edit
		</button>
	);
};

export default EditButton;
