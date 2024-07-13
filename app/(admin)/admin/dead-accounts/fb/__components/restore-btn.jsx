"use client";

import { useContext } from "react";
import { AccountContext } from "./context";

function RestoreBtn({ className, children, ids }) {
	const { isRestoring, restoreAccount } = useContext(AccountContext);
	return (
		<button disabled={isRestoring} onClick={() => restoreAccount(ids)} className={className}>
			{children}
		</button>
	);
}

export default RestoreBtn;
