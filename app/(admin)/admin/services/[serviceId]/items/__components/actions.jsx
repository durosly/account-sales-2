"use client";
import React, { useContext } from "react";
import { ItemContextManager } from "./item-context";
import { FaRegTrashCan } from "react-icons/fa6";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef } from "react";
import toast from "react-hot-toast";

function Actions({ id }) {
	const {
		data: { accounts },
		methods: { removeAllAccounts },
	} = useContext(ItemContextManager);

	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending: isDeletePending, mutate: deleteMutaion } = useMutation({
		mutationFn: () => {
			toastId.current = toast.loading("Deleting items...");
			return axios.delete(`/api/admin/service/${id}/accounts`, {
				data: accounts,
			});
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["items"],
			});
		},
		onSuccess: () => {
			toast.success("Items Deleted", { id: toastId.current });
			removeAllAccounts();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	return (
		<div className="px-5">
			{accounts.length > 0 && (
				<button
					disabled={isDeletePending}
					onClick={() => deleteMutaion()}
					className="btn btn-sm btn-error btn-outline"
				>
					<FaRegTrashCan />
				</button>
			)}
		</div>
	);
}

export default Actions;
