"use client";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPencilAlt } from "react-icons/fa";

function EditServiceName({ id }) {
	const [newName, setNewName] = useState("");
	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate, isError, error } = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Updating service name...");
			return axios.put(`/api/admin/service/${id}/update-name`, {
				name: data,
			});
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["services"],
			});
		},
		onSuccess: () => {
			toast.success("Service name updated", { id: toastId.current });
			setNewName("");
			document.getElementById(`service-name-update-modal-${id}`).close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function handleSubmit(e) {
		e.preventDefault();

		if (!newName) {
			return toast.error("Please, enter new name");
		}

		mutate(newName);
	}

	return (
		<>
			<button
				className="btn btn-xs"
				onClick={() =>
					document
						.getElementById(`service-name-update-modal-${id}`)
						.showModal()
				}
			>
				<FaPencilAlt />
			</button>

			<dialog
				id={`service-name-update-modal-${id}`}
				className="modal"
			>
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg mb-2">
						Update Service name
					</h3>
					<form onSubmit={handleSubmit}>
						<div className="form-control mb-5">
							<label
								htmlFor="name"
								className="label"
							>
								<span className="label-text-alt">New name</span>
							</label>
							<input
								type="text"
								className="input input-bordered"
								name="name"
								id="name"
								value={newName}
								onChange={(e) => setNewName(e.target.value)}
							/>
						</div>

						<button
							disabled={isPending}
							className="btn btn-primary"
						>
							Update name
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
				</div>

				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button disabled={isPending}>close</button>
				</form>
			</dialog>
		</>
	);
}

export default EditServiceName;
