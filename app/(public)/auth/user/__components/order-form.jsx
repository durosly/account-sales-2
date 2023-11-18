"use client";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { useRef, useState, useEffect } from "react";
import CurrencyInput from "react-currency-input-field";
import toast from "react-hot-toast";

function OrderForm() {
	const [charge, setCharge] = useState(0);
	const [entry, setEntry] = useState({
		category: "",
		service: "",
		quantity: "",
	});
	// Load categories
	const {
		isPending: isCategoryPending,
		isError,
		data,
		error,
	} = useQuery({
		queryKey: ["categories", "all"],
		queryFn: () => axios(`/api/user/category?page=all`),
	});

	const categoryResponse = data?.data?.data || [];

	// Load services
	const {
		isPending: isServicePending,
		isError: isServiceError,
		data: serviceData,
		error: serviceError,
	} = useQuery({
		queryKey: ["services", entry.category, "all"],
		queryFn: () => axios(`/api/user/service?c=${entry.category}&page=all`),
		enabled: !!entry.category,
	});

	const serviceResponse = serviceData?.data?.data || [];

	useEffect(() => {
		setEntry({
			...entry,
			service: "",
			quantity: "",
		});
	}, [entry.category]);

	useEffect(() => {
		if (entry.service && entry.quantity && serviceResponse.length > 0) {
			// get service selected by user from sericeResponse array
			let srv = serviceResponse.find((s) => s._id === entry.service);
			if (srv?.price) {
				setCharge(Number(srv.price * Number(entry.quantity)));
			}
		} else {
			setCharge(0);
		}
	}, [entry.service, entry.quantity, serviceResponse]);

	// place order
	const queryClient = useQueryClient();

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (order) => {
			toastId.current = toast.loading("Creating order");
			return axios.post("/api/user/order", order);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			queryClient.invalidateQueries({
				queryKey: ["orders"],
			});
			queryClient.invalidateQueries({
				queryKey: ["user-info"],
			});
		},
		onSuccess: () => {
			setEntry({
				category: "",
				service: "",
				quantity: "",
			});
			toast.success("Order created", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(entry);
	}

	return (
		<form
			action=""
			className="p-5 rounded-2xl border"
			onSubmit={handleSubmit}
		>
			<div className="form-control">
				<label
					htmlFor="category"
					className="label"
				>
					Category
				</label>
				<select
					name="category"
					id="category"
					className="select select-bordered"
					value={entry.category}
					onChange={(e) =>
						setEntry({ ...entry, [e.target.name]: e.target.value })
					}
				>
					<option
						value=""
						disabled
					>
						{isCategoryPending ? "Loading..." : "Select Category"}
					</option>
					{isCategoryPending ? (
						<option>Loading...</option>
					) : isError ? (
						<option>{error.message}</option>
					) : (
						categoryResponse &&
						categoryResponse.length &&
						categoryResponse.map((item) => (
							<option
								value={item._id}
								key={item._id}
							>
								{item.name}
							</option>
						))
					)}
				</select>
			</div>
			<div className="form-control">
				<label
					htmlFor="service"
					className="label"
				>
					Service
				</label>
				<select
					name="service"
					id="service"
					className="select select-bordered"
					disabled={isServicePending}
					value={entry.service}
					onChange={(e) =>
						setEntry({ ...entry, [e.target.name]: e.target.value })
					}
				>
					<option
						value=""
						disabled
					>
						{isServicePending
							? "Loading..."
							: "-- Select service --"}
					</option>
					{isServicePending ? (
						<option>Loading...</option>
					) : isServiceError ? (
						<option>{serviceError.message}</option>
					) : (
						serviceResponse &&
						serviceResponse.length &&
						serviceResponse.map((item) => (
							<option
								value={item._id}
								key={item._id}
							>
								{item.name}
							</option>
						))
					)}
				</select>
			</div>
			<div className="form-control mb-5">
				<label
					htmlFor="amount"
					className="label"
				>
					Quantity
				</label>

				<CurrencyInput
					id="amount"
					name="quantity"
					placeholder="Quantity..."
					decimalsLimit={2}
					disabled={isServicePending || !entry.service}
					className="input input-bordered"
					value={entry.quantity}
					onValueChange={(value, name) =>
						setEntry({
							...entry,
							[name]: value,
						})
					}
				/>
			</div>
			<div>
				<p className="flex gap-2 mb-5">
					<span>Charge:</span>
					<span className="font-bold">
						&#8358; {commaNumber(charge)}
					</span>
				</p>
			</div>
			<button
				disabled={!entry.quantity || isPending}
				className="btn btn-primary"
			>
				Place order
			</button>
			<div className="text-center">
				{isPending ? (
					<span className="loading loading-spinner"></span>
				) : null}
			</div>
		</form>
	);
}

export default OrderForm;
