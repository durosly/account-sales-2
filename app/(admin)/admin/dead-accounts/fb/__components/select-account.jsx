"use client";

import { useContext } from "react";
import { AccountContext } from "./context";

function SelectAccount({ id }) {
	const { selected, setSelected } = useContext(AccountContext);

	function handleChange() {
		if (!selected.includes(id)) {
			setSelected([...selected, id]);
		} else {
			const newList = selected.filter((account) => account !== id);
			setSelected(newList);
		}
	}
	return <input checked={selected.includes(id)} onChange={handleChange} type="checkbox" className="checkbox" />;
}

export default SelectAccount;
