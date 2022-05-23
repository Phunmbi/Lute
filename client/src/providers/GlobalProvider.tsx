import React, { createContext, useContext, useState } from "react";

interface IGlobalContext {
	state: IGlobalState;
	dispatch: (args: IGlobalState) => void;
}

interface IGlobalState {
	count: number;
}

const GlobalContext = createContext<IGlobalContext>({
	state: { count: 10 },
	dispatch: (args) => 10,
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
	const [perPageCount, setPerPageCount] = useState<IGlobalState>({
		count: 10,
	});

	return (
		<GlobalContext.Provider
			value={{
				state: perPageCount,
				dispatch: setPerPageCount,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export const useGlobalProvider = () => useContext(GlobalContext);
export default GlobalProvider;
