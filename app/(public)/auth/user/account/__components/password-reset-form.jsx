"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function PasswordResetForm() {
	const [pInfo, setPInfo] = useState({ current: "", new: "", re_new: "" });
	const [show, setShow] = useState(false);

	// reset password

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Resetting password");
			return axios.put("/api/user/password", data);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished

		onSuccess: () => {
			setPInfo({ current: "", new: "", re_new: "" });
			toast.success("Password changed", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(pInfo);
	}

	return (
		<form
			action=""
			onSubmit={handleSubmit}
		>
			<div className="form-control">
				<label
					htmlFor="current-password"
					className="label"
				>
					Current password
				</label>
				<input
					type={`${show ? "text" : "password"}`}
					name="current"
					id="current-password"
					className="input input-bordered"
					value={pInfo.current}
					disabled={isPending}
					onChange={(e) =>
						setPInfo({ ...pInfo, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control">
				<label
					htmlFor="new-password"
					className="label"
				>
					New password
				</label>
				<input
					type={`${show ? "text" : "password"}`}
					name="new"
					id="new-password"
					className="input input-bordered"
					value={pInfo.new}
					disabled={isPending}
					onChange={(e) =>
						setPInfo({ ...pInfo, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="form-control mb-5">
				<label
					htmlFor="repeat-new-password"
					className="label"
				>
					Repeat new password
				</label>
				<input
					type={`${show ? "text" : "password"}`}
					name="re_new"
					id="repeat-new-password"
					className="input input-bordered"
					disabled={isPending}
					value={pInfo.re_new}
					onChange={(e) =>
						setPInfo({ ...pInfo, [e.target.name]: e.target.value })
					}
				/>
			</div>
			<div className="text-right">
				<button
					onClick={() => setShow((prev) => !prev)}
					type="button"
					className="btn btn-ghost btn-xs"
				>
					{show ? <FaRegEyeSlash /> : <FaRegEye />}
				</button>
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

export default PasswordResetForm;
