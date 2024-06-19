"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { SlTrash } from "react-icons/sl";

function DeleteWorker({ id }) {
	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: () => {
			toastId.current = toast.loading("Deleting worker...");
			return axios.delete(`/api/admin/worker/${id}`);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["workers"],
			});
		},
		onSuccess: () => {
			toast.success("Worker Deleted", { id: toastId.current });
			document.getElementById(`service-modal-${id}`).close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	return (
		<>
			<button onClick={() => document.getElementById(`service-modal-${id}`).showModal()} className="btn btn-sm btn-outline btn-square btn-error">
				<SlTrash />
			</button>

			<dialog id={`service-modal-${id}`} className="modal">
				<div className="modal-box">
					<div className="text-center">
						<h3 className="font-bold text-lg mb-2">Are you sure?</h3>
						<div className="flex justify-center gap-2 flex-wrap">
							<button disabled={isPending} className="btn btn-error" onClick={mutate}>
								Yes
							</button>
							<form method="dialog">
								<button disabled={isPending} className="btn">
									No
								</button>
							</form>
						</div>
						{isPending ? (
							<div>
								<span className="loading loading-spinner"></span>
							</div>
						) : null}
						<p className="py-4 text-xs">Worker account cannot be recovered</p>
					</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button disabled={isPending}>close</button>
				</form>
			</dialog>
		</>
	);
}

export default DeleteWorker;
