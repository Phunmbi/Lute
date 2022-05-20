import React, { createContext, useContext, useState } from "react";
import { OrderResponse } from "../graphql/generated";

interface IModalContext {
	state: IModalState;
	dispatch: (args: IModalState) => void;
}

interface IModalState {
	open: boolean;
	type: "create" | "edit" | "view";
	order?: Omit<OrderResponse, "__typename">;
}

const ModalContext = createContext<IModalContext>({
	state: {open: false, type: "create"},
	dispatch: (args) => false,
});

const ModalProvider = ({children}: { children: React.ReactNode }) => {
	const [modalStatus, setModalStatus] = useState<IModalState>({
		open: false,
		type: "create",
	});
	
	return (
		<ModalContext.Provider
			value={{
				state: modalStatus,
				dispatch: setModalStatus,
			}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export const useModalProvider = () => useContext(ModalContext);
export default ModalProvider;
