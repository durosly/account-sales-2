"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import toast from "react-hot-toast";

function UpdateServicePrice({ id }) {
	const [price, setPrice] = useState("");
	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate, isError, error } = useMutation({
		mutationFn: (price) => {
			toastId.current = toast.loading("Updating service price...");
			return axios.put(`/api/admin/service/${id}`, { price });
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["service"],
			});
		},
		onSuccess: () => {
			toast.success("Service price updated", { id: toastId.current });
			setPrice("");
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function handleSubmit(e) {
		e.preventDefault();

		if (!price) {
			return toast.error("Price cannot be empty");
		}

		mutate(price);
	}

	return (
		<>
			<h3 className="font-bold text-lg mb-2">Update Service price</h3>
			<form onSubmit={handleSubmit}>
				<div className="form-control mb-5">
					<label
						htmlFor="price"
						className="label"
					>
						Price ($)
					</label>

					<CurrencyInput
						id="price"
						name="price"
						placeholder="Price..."
						decimalsLimit={2}
						className="input input-bordered"
						value={price}
						disabled={isPending}
						onValueChange={(value) => setPrice(value)}
					/>
				</div>
				<button
					disabled={isPending}
					className="btn btn-primary"
				>
					Update price
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

export default UpdateServicePrice;
