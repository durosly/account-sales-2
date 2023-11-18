"use client";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import { SlExclamation } from "react-icons/sl";
import Markdown from "react-markdown";
import { SimpleMdeReact } from "react-simplemde-editor";

function ShowDetailsBtn({ id, details, status }) {
	const [update, setUpdate] = useState({ status, details });

	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (update) => {
			toastId.current = toast.loading("Updating order...");
			return axios.put(`/api/admin/order/${id}`, update);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["orders"],
			});
		},
		onSuccess: () => {
			toast.success("Order updated", { id: toastId.current });
			document.getElementById(`details-modal-${id}`).close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	const onChange = useCallback((value) => {
		setUpdate({
			...update,
			details: value,
		});
	}, []);

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(update);
	}

	return (
		<>
			<button
				className="btn btn-xs ml-2 btn-accent btn-square btn-outline"
				onClick={() =>
					document.getElementById(`details-modal-${id}`).showModal()
				}
			>
				<SlExclamation />
			</button>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id={`details-modal-${id}`}
				className="modal"
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg mb-2">Service details</h3>
					<form
						action=""
						onSubmit={handleSubmit}
					>
						<div className="form-control">
							<label
								htmlFor="status"
								className="label"
							>
								Status
							</label>
							<select
								name="status"
								id="status"
								className="select select-bordered"
								value={update.status}
								onChange={(e) =>
									setUpdate({
										...update,
										[e.target.name]: e.target.value,
									})
								}
								disabled={
									isPending ||
									status === "cancel" ||
									status === "success"
								}
							>
								<option
									value={"pending"}
									disabled
								>
									Pending
								</option>
								<option value="success">Completed</option>
								<option value="cancel">Cancel</option>
							</select>
						</div>
						<div className="form-control mb-5">
							<label
								className="label"
								htmlFor="details"
							>
								Details
							</label>
							<SimpleMdeReact
								value={update.details}
								onChange={onChange}
							/>
						</div>

						<button
							disabled={
								isPending ||
								status === "cancel" ||
								status === "success"
							}
							className="btn btn-primary"
						>
							Submit
						</button>

						{isPending ? (
							<span className="loading loading-spinner"></span>
						) : null}
					</form>
					<div className="divider">Preview</div>
					<div className="prose">
						<Markdown>{update.details}</Markdown>
					</div>
					<p className="py-4 text-xs">
						Infomation about response or status. This uses a
						markdown format
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

export default ShowDetailsBtn;
