"use client";

import { useContext } from "react";
import { AccountContext } from "./context";

function MarkAll() {
	const { selected, setSelected, accounts } = useContext(AccountContext);

	function handleClick() {
		if (selected.length > 0) {
			setSelected([]);
		} else {
			const ids = accounts.map((account) => account._id);
			setSelected(ids);
		}
	}

	return (
		<button onClick={handleClick} className="btn btn-outline">
			Mark all
		</button>
	);
}

export default MarkAll;
