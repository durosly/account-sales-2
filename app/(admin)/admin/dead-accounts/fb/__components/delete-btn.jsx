"use client";

import { useContext } from "react";
import { AccountContext } from "./context";

function DeleteBtn({ className, children, ids }) {
	const { isDeleting, deleteAccount } = useContext(AccountContext);
	return (
		<button disabled={isDeleting} onClick={() => deleteAccount(ids)} className={className}>
			{children}
		</button>
	);
}

export default DeleteBtn;
