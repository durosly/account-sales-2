"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ResetPasswordForm({ email, token }) {
	const router = useRouter();
	const [info, setInfo] = useState({ new: "", re_new: "" });

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (info) => {
			toastId.current = toast.loading("Resetting...");
			return axios.put("/api/auth/password/reset", info);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished

		onSuccess: () => {
			router.push("/auth");
			toast.success("Passord reset successful", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();

		mutate({ email, token, ...info });
	}

	return (
		<form
			action=""
			onSubmit={handleSubmit}
			className="max-w-sm mx-auto p-5 rounded-2xl border mb-10 mt-5"
		>
			<div className="form-control">
				<label
					htmlFor="new"
					className="label"
				>
					New password
				</label>
				<input
					type="password"
					name="new"
					id="new"
					className="input input-bordered"
					disabled={isPending}
					value={info.new}
					onChange={(e) =>
						setInfo({ ...info, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control mb-5">
				<label
					htmlFor="re_new"
					className="label"
				>
					Repeat password
				</label>
				<input
					type="password"
					name="re_new"
					id="re_new"
					className="input input-bordered"
					disabled={isPending}
					value={info.re_new}
					onChange={(e) =>
						setInfo({ ...info, [e.target.name]: e.target.value })
					}
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
