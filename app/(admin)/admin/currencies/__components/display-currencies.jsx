"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

function DisplayCurrencies() {
	const [rate, setRate] = useState("");

	// Load currency rate
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["rate"],
		queryFn: () => axios(`/api/rates`),
	});

	const rateResponse = data?.data?.data || {};

	// place order
	const queryClient = useQueryClient();

	let toastId = useRef(null);

	const { isPending: isPendingUpdate, mutate } = useMutation({
		mutationFn: (rate) => {
			toastId.current = toast.loading("Updating rate...");
			return axios.put("/api/admin/rate", { rate });
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			queryClient.invalidateQueries({
				queryKey: ["rate"],
			});
		},
		onSuccess: () => {
			setRate("");
			toast.success("Rate updated", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(rate);
	}

	return (
		<div className="px-5">
			{isPending ? (
				<p className="max-w-sm">
					<Skeleton />
				</p>
			) : isError ? (
				<p className="text-error">{handleClientError(error)}</p>
			) : (
				<p>
					US Dollar - ($1/&#8358;{commaNumber(rateResponse.amount)})
				</p>
			)}
			<form
				action=""
				className="max-w-md"
				onSubmit={handleSubmit}
			>
				<div className="form-control mb-5">
					<label
						htmlFor="rate"
						className="label"
					>
						<span className="label-text-alt">New Rate</span>
					</label>
					<CurrencyInput
						id="rate"
						name="rate"
						placeholder="New rate..."
						disabled={isPendingUpdate}
						decimalsLimit={2}
						className="input input-bordered"
						value={rate}
						onValueChange={(value) => setRate(value)}
					/>
				</div>
				<button
					disabled={isPendingUpdate}
					className="btn btn-primary"
				>
					Update
				</button>
			</form>
		</div>
	);
}

export default DisplayCurrencies;
