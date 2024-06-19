"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { SlGhost, SlLock } from "react-icons/sl";

function AddWorker() {
	const [info, setInfo] = useState({ username: "", password: "" });
	const [show, setShow] = useState(false);

	// place order
	const queryClient = useQueryClient();

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Creating new worker...");
			return axios.post("/api/admin/worker", data);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			queryClient.invalidateQueries({
				queryKey: ["workers"],
			});
		},
		onSuccess: () => {
			setInfo({ username: "", password: "" });
			toast.success("Worker created", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(info);
	}

	return (
		<form action="" className="max-w-md px-5" onSubmit={handleSubmit}>
			<div className="form-control mb-5">
				<label htmlFor="username" className="label">
					<span className="label-text-alt">Username</span>
				</label>
				<div className="relative">
					<SlGhost className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
					<input
						id="username"
						name="username"
						type="text"
						placeholder="Username..."
						disabled={isPending}
						// decimalsLimit={2}
						className="input input-bordered font-bold pl-11 w-full"
						value={info.username}
						onChange={(e) =>
							setInfo({
								...info,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
			</div>
			<div className="form-control mb-5">
				<label htmlFor="password" className="label">
					<span className="label-text">Password</span>
				</label>
				<div className="relative">
					<SlLock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
					<input
						type={show ? "text" : "password"}
						name="password"
						id="password"
						className="input input-bordered w-full font-bold pl-11 pr-11"
						placeholder="Password..."
						value={info.password}
						disabled={isPending}
						onChange={(e) =>
							setInfo({
								...info,
								[e.target.name]: e.target.value,
							})
						}
					/>

					<button
						disabled={isPending}
						onClick={() => setShow((prev) => !prev)}
						className="absolute right-4 top-1/2 -translate-y-1/2 text-black"
						type="button">
						{show ? <BsEyeSlash className="opacity-50" /> : <BsEye className="opacity-50" />}
					</button>
				</div>
			</div>
			<p className="text-xs mb-5">* avoid using an email address as username</p>
			<button disabled={isPending} className="btn btn-primary">
				Create account
			</button>
		</form>
	);
}

export default AddWorker;
