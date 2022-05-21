import React from "react";
import { useModalProvider } from "../providers/ModalProvider";

interface IActionButton {
	order: any;
	buttonClass: string;
	buttonType: "edit" | "view";
}

const ActionButton = ({ order, buttonType, buttonClass }: IActionButton) => {
	const { dispatch } = useModalProvider();
	return (
		<button
			className={`button ${buttonClass}`}
			onClick={(e) => dispatch({ open: true, type: buttonType, order })}
		>
			{buttonType.charAt(0).toUpperCase() + buttonType.slice(1)}
		</button>
	);
};

export default ActionButton;
