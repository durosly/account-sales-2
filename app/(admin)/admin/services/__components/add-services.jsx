"use client";
import { handleClientError } from "@/lib/utils";
import { Combobox, Transition } from "@headlessui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Fragment, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { BsChevronExpand } from "react-icons/bs";
import toast from "react-hot-toast";
import { MdCheckCircleOutline } from "react-icons/md";

function AddServices({ countries }) {
	const [selected, setSelected] = useState(null);
	const [query, setQuery] = useState("");
	const [global, setGlobal] = useState(false);

	const filteredCountries =
		query === ""
			? countries
			: countries.filter((country) =>
					country.name
						.toLowerCase()
						.replace(/\s+/g, "")
						.includes(query.toLowerCase().replace(/\s+/g, ""))
			  );

	const [newService, setNewService] = useState({
		category: "",
		name: "",
		price: "",
		details: "",
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
				country: "",
				details: "",
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

		mutate({ ...newService, country: global ? "global" : selected.code });
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
								htmlFor="service"
								className="label"
							>
								Details
							</label>
							<input
								type="text"
								name="details"
								id="details"
								className="input input-bordered"
								value={newService.details}
								onChange={(e) =>
									setNewService({
										...newService,
										[e.target.name]: e.target.value,
									})
								}
							/>
						</div>

						<div className="form-control">
							<Combobox
								value={selected}
								onChange={setSelected}
							>
								<Combobox.Label className="label">
									Country
								</Combobox.Label>
								<div className="relative mt-1">
									<div className="relative w-full">
										<Combobox.Input
											className="input input-bordered w-full"
											displayValue={(country) =>
												country ? country.name : ""
											}
											onChange={(event) =>
												setQuery(event.target.value)
											}
											disabled={global}
										/>
										<Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
											<BsChevronExpand
												className="h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
										</Combobox.Button>
									</div>
									<Transition
										as={Fragment}
										leave="transition ease-in duration-100"
										leaveFrom="opacity-100"
										leaveTo="opacity-0"
										afterLeave={() => setQuery("")}
									>
										<Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
											{filteredCountries.length === 0 &&
											query !== "" ? (
												<div className="relative cursor-default select-none px-4 py-2 text-gray-700">
													Nothing found.
												</div>
											) : (
												filteredCountries.map(
													(country) => (
														<Combobox.Option
															key={country.code}
															className={({
																active,
															}) =>
																`relative cursor-default select-none py-2 pl-10 pr-4 ${
																	active
																		? "bg-primary text-white"
																		: "text-gray-900"
																}`
															}
															value={country}
															disabled={global}
														>
															{({
																selected,
																active,
															}) => (
																<>
																	<span
																		className={`block truncate ${
																			selected
																				? "font-medium"
																				: "font-normal"
																		}`}
																	>
																		{
																			country.name
																		}
																	</span>
																	{selected ? (
																		<span
																			className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
																				active
																					? "text-white"
																					: "text-teal-600"
																			}`}
																		>
																			<MdCheckCircleOutline
																				className="h-5 w-5"
																				aria-hidden="true"
																			/>
																		</span>
																	) : null}
																</>
															)}
														</Combobox.Option>
													)
												)
											)}
										</Combobox.Options>
									</Transition>
								</div>
							</Combobox>
						</div>
						<div className="form-control">
							<label htmlFor="random">Use Global</label>
							<input
								className="checkbox"
								type="checkbox"
								name="random"
								id="random"
								checked={global}
								onChange={() => setGlobal((prev) => !prev)}
							/>
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
