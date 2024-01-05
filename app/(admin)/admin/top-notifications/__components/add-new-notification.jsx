"use client";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

function AddNewNotification() {
	const [instruction, setInstruction] = useState("");

	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate, isError, error } = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Adding to admin notification...");
			return axios.post(`/api/admin/top-notice`, data);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["top-notice"],
			});
		},
		onSuccess: () => {
			toast.success("Admin notification added", { id: toastId.current });

			setInstruction("");
			document.getElementById(`add-new-top-notification`).close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function handleSubmit(e) {
		e.preventDefault();

		if (!instruction) {
			return toast.error("Please, enter notification message");
		}

		const data = { instruction };

		mutate(data);
	}

	return (
		<>
			<button
				className="btn btn-primary"
				onClick={() =>
					document
						.getElementById("add-new-top-notification")
						.showModal()
				}
			>
				Add new message
			</button>

			<dialog
				id="add-new-top-notification"
				className="modal"
			>
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Add new top notice</h3>
					<form
						action=""
						onSubmit={handleSubmit}
					>
						<div className="form-control mb-5">
							<label
								className="label"
								htmlFor="details"
							>
								Message
							</label>
							<textarea
								id="details"
								className="textarea textarea-bordered"
								value={instruction}
								onChange={(e) => setInstruction(e.target.value)}
							></textarea>
						</div>
						<button
							className="btn btn-primary"
							disabled={isPending}
						>
							Add notice
						</button>
					</form>
					{isPending ? (
						<div>
							<span className="loading loading-spinner"></span>
						</div>
					) : null}

					{isError ? (
						<p className="text-error">{handleClientError(error)}</p>
					) : null}
					<p className="py-4 text-xs">
						Press ESC key or click outside to close
					</p>
				</div>
				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default AddNewNotification;
