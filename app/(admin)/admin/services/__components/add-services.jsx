"use client";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import toast from "react-hot-toast";

function AddServices({ countries }) {
	const [newService, setNewService] = useState({
		category: "",
		name: "",
		price: "",
		country: "",
	});
	const {
		isPending: isCategoryPending,
		isError,
		data,
		error,
	} = useQuery({
		queryKey: ["categories", "all"],
		queryFn: () => axios(`/api/admin/category?page=all`),
	});

	const queryResponse = data?.data?.data || [];

	const queryClient = useQueryClient();

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (service) => {
			toastId.current = toast.loading("Creating service");
			return axios.post("/api/admin/service", service);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["services"],
			});
		},
		onSuccess: () => {
			setNewService({
				category: "",
				name: "",
				price: "",
			});
			toast.success("Service created", { id: toastId.current });
			document.getElementById("create-service-modal").close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(newService);
	}

	return (
		<>
			<button
				className="btn btn-primary"
				onClick={() =>
					document.getElementById("create-service-modal").showModal()
				}
			>
				Add Service
			</button>
			<dialog
				id="create-service-modal"
				className="modal"
			>
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Add new services</h3>
					<form
						action=""
						className="mt-5"
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
								value={newService.category}
								onChange={(e) =>
									setNewService({
										...newService,
										[e.target.name]: e.target.value,
									})
								}
							>
								<option
									disabled
									value={""}
								>
									-- select category --
								</option>
								{isCategoryPending ? (
									<option>Loading...</option>
								) : isError ? (
									<option>{error.message}</option>
								) : (
									queryResponse &&
									queryResponse.length &&
									queryResponse.map((item) => (
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
								Service{" "}
							</label>
							<input
								type="text"
								name="name"
								id="service"
								className="input input-bordered"
								value={newService.name}
								onChange={(e) =>
									setNewService({
										...newService,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>
						<div className="form-control">
							<label
								htmlFor="country"
								className="label"
							>
								Country
							</label>
							<select
								name="country"
								id="country"
								className="select select-bordered"
								value={newService.country}
								onChange={(e) =>
									setNewService({
										...newService,
										[e.target.name]: e.target.value,
									})
								}
							>
								<option
									disabled
									value={""}
								>
									-- select country --
								</option>
								{countries.map((c) => (
									<option
										value={c.code}
										key={c.name}
									>
										{c.name}
									</option>
								))}
							</select>
						</div>
						<div className="form-control mb-5">
							<label
								htmlFor="price"
								className="label"
							>
								Price
							</label>
							<CurrencyInput
								id="price"
								name="price"
								placeholder="Price..."
								decimalsLimit={2}
								className="input input-bordered"
								value={newService.price}
								onValueChange={(value, name) =>
									setNewService({
										...newService,
										[name]: value,
									})
								}
							/>
						</div>
						<button
							disabled={isPending}
							className="btn btn-primary"
						>
							Save
						</button>
						{isPending ? (
							<div>
								<span className="loading loading-spinner"></span>
							</div>
						) : null}
					</form>
				</div>
				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default AddServices;
