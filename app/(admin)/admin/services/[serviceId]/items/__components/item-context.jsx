"use client";

import { createContext, useState } from "react";

export const ItemContextManager = createContext({
	data: {},
	methods: {},
});

function ItemContext({ children }) {
	const [toolData, setToolData] = useState({
		accounts: [],
	});

	function addAllAccounts(accts) {
		setToolData({ ...toolData, accounts: [...accts] });
	}

	function removeAllAccounts() {
		setToolData({ ...toolData, accounts: [] });
	}

	function removeAccount(id) {
		const newList = toolData.accounts.filter((item) => item !== id);
		setToolData({ ...toolData, accounts: [...newList] });
	}

	function addAccount(id) {
		setToolData({ ...toolData, accounts: [...toolData.accounts, id] });
	}

	return (
		<ItemContextManager.Provider
			value={{
				data: toolData,
				methods: {
					addAllAccounts,
					removeAccount,
					addAccount,
					removeAllAccounts,
				},
			}}>
			{children}
		</ItemContextManager.Provider>
	);
}

export default ItemContext;
