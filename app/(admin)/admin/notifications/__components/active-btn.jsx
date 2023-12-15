"use client";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";

function ActiveBtn({ status, id }) {
	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: () => {
			toastId.current = toast.loading("Updating notice status...");
			return axios.put(`/api/admin/notice/${id}/status`);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["notice"],
			});
		},
		onSuccess: () => {
			toast.success("Notice status updated", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	return (
		<button
			disabled={status === "active" || isPending}
			className="btn btn-xs btn-square btn-outline btn-success"
			onClick={mutate}
		>
			<FaCheck />
		</button>
	);
}

export default ActiveBtn;
