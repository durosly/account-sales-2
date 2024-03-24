"use client";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";

function ServiceTogglePreviewBtn({ id, previewStatus }) {
	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (status) => {
			toastId.current = toast.loading(
				"Updating service preview status..."
			);
			return axios.put(`/api/admin/service/${id}/preview-status`, {
				status,
			});
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["sub-category"],
			});
		},
		onSuccess: () => {
			toast.success("Service preview status updated", {
				id: toastId.current,
			});
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function handleClick() {
		mutate(!previewStatus);
	}

	return (
		<>
			<button
				className={`btn btn-sm md:btn-md ${
					previewStatus ? "" : "btn-info"
				} btn-outline`}
				disabled={isPending}
				onClick={handleClick}
			>
				{previewStatus ? "hide" : "show"} preview
			</button>
		</>
	);
}

export default ServiceTogglePreviewBtn;
