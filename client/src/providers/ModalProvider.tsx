import React, {createContext,  useContext, useState} from 'react';

interface IModalContext {
    state: boolean,
    dispatch: (args: boolean) => void
}

const ModalContext = createContext<IModalContext>({
	state: false,
    dispatch: (status: boolean) => false
});

const ModalProvider = ({children}:{ children: React.ReactNode}) => {
	const [modalStatus, setModalStatus] = useState<boolean>(false);
	
	return (
		<ModalContext.Provider
			value={{state: modalStatus, dispatch: setModalStatus}}
		>
			{children}
		</ModalContext.Provider>
	);
};

export const useModalProvider = () => useContext(ModalContext)
export default ModalProvider;