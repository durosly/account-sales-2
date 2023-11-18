"use client";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { SlTrash } from "react-icons/sl";

function ServiceDeleteBtn({ id }) {
	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: () => {
			toastId.current = toast.loading("Deleting service...");
			return axios.delete(`/api/admin/service/${id}`);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["services"],
			});
		},
		onSuccess: () => {
			toast.success("Service Deleted", { id: toastId.current });
			document.getElementById(`service-modal-${id}`).close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	return (
		<>
			<button
				className="btn btn-error btn-square btn-outline"
				onClick={() =>
					document.getElementById(`service-modal-${id}`).showModal()
				}
			>
				<SlTrash />
			</button>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id={`service-modal-${id}`}
				className="modal"
			>
				<div className="modal-box">
					<div className="text-center">
						<h3 className="font-bold text-lg mb-2">
							Are you sure?
						</h3>
						<div className="flex justify-center gap-2 flex-wrap">
							<button
								disabled={isPending}
								className="btn btn-error"
								onClick={mutate}
							>
								Yes
							</button>
							<form method="dialog">
								<button
									disabled={isPending}
									className="btn"
								>
									No
								</button>
							</form>
						</div>
						{isPending ? (
							<div>
								<span className="loading loading-spinner"></span>
							</div>
						) : null}
						<p className="py-4 text-xs">
							All orders related to this service would be deleted
						</p>
					</div>
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

export default ServiceDeleteBtn;
