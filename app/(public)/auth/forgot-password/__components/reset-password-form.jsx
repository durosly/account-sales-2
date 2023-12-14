"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ResetPasswordForm() {
	const router = useRouter();
	const [email, setEmail] = useState("");

	// place order

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (email) => {
			toastId.current = toast.loading("Resetting...");
			return axios.post("/api/auth/password/reset", { email });
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished

		onSuccess: () => {
			setEmail("");
			router.push("/auth/forgot-password/sent");
			toast.success("Reset email sent", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();

		if (!email) {
			toast.error("E-mail cannot be empty");
			return;
		}

		mutate(email);
	}

	return (
		<form
			action=""
			className="max-w-sm mx-auto p-5 rounded-2xl border mb-10 mt-5"
			onSubmit={handleSubmit}
		>
			<div className="form-control mb-5">
				<label
					htmlFor="email"
					className="label"
				>
					E-mail
				</label>
				<input
					type="email"
					name="email"
					id="email"
					className="input input-bordered"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					disabled={isPending}
				/>
			</div>
			<button
				disabled={isPending}
				className="btn btn-primary"
			>
				Submit
			</button>
		</form>
	);
}

export default ResetPasswordForm;
