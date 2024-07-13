"use client";

import { useContext } from "react";
import DeleteBtn from "./delete-btn";
import { AccountContext } from "./context";

function DeleteSelected() {
	const { selected, isDeleting } = useContext(AccountContext);
	return (
		<DeleteBtn ids={selected} disabled={isDeleting} className="btn btn-error btn-outline">
			Delete
		</DeleteBtn>
	);
}

export default DeleteSelected;
