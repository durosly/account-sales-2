"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

function UpdateServiceDetails({ details: prevDetails, id }) {
	const [details, setDetails] = useState(prevDetails);
	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate, isError, error } = useMutation({
		mutationFn: (details) => {
			toastId.current = toast.loading("Updating service details...");
			return axios.put(`/api/admin/service/${id}/details`, { details });
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["service"],
			});
		},
		onSuccess: () => {
			toast.success("Service details updated", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function handleSubmit(e) {
		e.preventDefault();

		if (!details) {
			return toast.error("Details cannot be empty");
		}

		mutate(details);
	}

	return (
		<>
			<h3 className="font-bold text-lg mb-2">Update Service details</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-control mb-5">
					<label
						htmlFor="details"
						className="label"
					>
						Details
					</label>
					<textarea
						id="details"
						className="textarea textarea-bordered"
						rows="5"
						value={details}
						onChange={(e) => setDetails(e.target.value)}
					></textarea>
				</div>
				<button
					disabled={isPending}
					className="btn btn-primary"
				>
					Update details
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
		</>
	);
}

export default UpdateServiceDetails;
