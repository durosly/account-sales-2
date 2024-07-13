"use client";

import { useContext } from "react";

import { AccountContext } from "./context";
import RestoreBtn from "./restore-btn";

function RestoreSelected() {
	const { selected, isRestoring } = useContext(AccountContext);
	return (
		<RestoreBtn ids={selected} disabled={isRestoring} className="btn btn-success btn-outline">
			Restore
		</RestoreBtn>
	);
}

export default RestoreSelected;
