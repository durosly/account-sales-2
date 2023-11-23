"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { handleClientError } from "@/lib/utils";

function Resend() {
	const [isLoading, setIsLoading] = useState(false);
	async function resendEmail() {
		setIsLoading(true);
		const toastId = toast.loading("Sending...");
		try {
			const res = await axios.put("/api/auth/email-verification/resend", {
				email: localStorage.getItem("ZEMOORA_VERIFICATION_EMAIL"),
			});

			toast.success("E-mail sent", { id: toastId });
		} catch (error) {
			const message = handleClientError(error);
			toast.error(message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}

	return (
		<button
			onClick={resendEmail}
			disabled={isLoading}
			className="btn btn-primary btn-block"
		>
			{isLoading ? (
				<>
					<span className="loading loading-spinner"></span>
					loading
				</>
			) : (
				"Resend email"
			)}
		</button>
	);
}

export default Resend;
