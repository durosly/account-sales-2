"use client";

import { useEffect, useState } from "react";

function EmailDisplay() {
	const [email, setEmail] = useState("");
	useEffect(() => {
		if (typeof window !== "undefined") {
			const info = localStorage.getItem("VERIFICATION_EMAIL");
			if (info) {
				setEmail(info);
			}
		}
	}, [email]);
	return (
		<p>
			Click on verification link sent to{" "}
			{email || (
				<span className="w-40 inline-block h-5 bg-slate-500 animate-pulse">
					&nbsp;
				</span>
			)}
		</p>
	);
}

export default EmailDisplay;
