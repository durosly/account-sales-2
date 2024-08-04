"use client";

import { useContext } from "react";
import { AccountContext } from "./context";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

function CopyBtn() {
	const { accounts, selected } = useContext(AccountContext);
	const { copy } = useCopyToClipboard();

	// console.log({ accounts });

	function copyAccounts() {
		let data = ``;
		for (const account of accounts) {
			if (selected.includes(account._id)) {
				data += account.info;
			}
		}

		copy(data);
	}

	return (
		<button onClick={copyAccounts} className="btn btn-secondary btn-outline">
			Copy
		</button>
	);
}

export default CopyBtn;
