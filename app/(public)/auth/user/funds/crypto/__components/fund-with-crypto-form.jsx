"use client";
import { handleClientError } from "@/lib/utils";
import { Listbox, Transition } from "@headlessui/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import toast from "react-hot-toast";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LuChevronsUpDown } from "react-icons/lu";
import Skeleton from "react-loading-skeleton";

function FundWithCryptoForm({ rate, crypto }) {
	const router = useRouter();
	const [amt, setAmt] = useState("");
	const [selected, setSelected] = useState(null);

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Creating fund request...");
			return axios.post("/api/user/fund/crypto/get-invoice", data);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished

		onSuccess: (data) => {
			router.push(data.data.invoice.invoice_url);
			toast.success("Request created", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	const {
		isPending: isMinPayoutPending,
		isError,
		data,
	} = useQuery({
		queryKey: ["min-price", { selected }],
		queryFn: () =>
			axios(
				`/api/user/fund/crypto/get-min-payment?currency=${selected.code}`
			),
		enabled: !!selected,
	});

	const queryResponse = data?.data || {};

	function handleSubmit(e) {
		e.preventDefault();
		mutate({ amt, currency: selected.code });
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<p className="flex gap-2 text-xs mb-2">
					<span className="font-bold">Naira/Dollar:</span>
					<span>{rate.amount}</span>
				</p>
				<div className="form-control">
					<Listbox
						value={selected}
						onChange={setSelected}
					>
						<div className="relative mt-1">
							<Listbox.Button className="btn btn-ghost border border-base-300 justify-start w-full">
								{selected ? (
									<>
										<Image
											src={`https://nowpayments.io/${selected.logo_url}`}
											width={20}
											height={20}
											className="object-contain"
											alt={selected.name}
										/>
										<span className="block truncate">
											{selected.name}
										</span>
									</>
								) : (
									<span>-- select currency --</span>
								)}
								<span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
									<LuChevronsUpDown
										className="h-5 w-5 text-gray-400"
										aria-hidden="true"
									/>
								</span>
							</Listbox.Button>
							<Transition
								as={Fragment}
								leave="transition ease-in duration-100"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<Listbox.Options className="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-xl bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
									{crypto.map((token, tokenIdx) => (
										<Listbox.Option
											key={tokenIdx}
											className={({ active }) =>
												`relative flex gap-2 items-center cursor-default select-none py-2 pl-10 pr-4 ${
													active
														? "bg-primary text-white"
														: "text-gray-900"
												}`
											}
											value={token}
										>
											{({ selected }) => (
												<>
													<Image
														src={`https://nowpayments.io/${token.logo_url}`}
														width={20}
														height={20}
														alt={token.name}
													/>
													<span
														className={`block truncate ${
															selected
																? "font-medium"
																: "font-normal"
														}`}
													>
														{token.name}
													</span>
													{selected ? (
														<span className="absolute inset-y-0 left-0 flex items-center pl-3">
															<IoIosCheckmarkCircleOutline
																className="h-5 w-5"
																aria-hidden="true"
															/>
														</span>
													) : null}
												</>
											)}
										</Listbox.Option>
									))}
								</Listbox.Options>
							</Transition>
						</div>
					</Listbox>
				</div>

				<div className="form-control">
					<label
						className="label"
						htmlFor="amount"
					>
						Amount ($)
					</label>

					<CurrencyInput
						id="amount"
						name="amount"
						placeholder="Amount..."
						decimalsLimit={2}
						disabled={!selected}
						className="input input-bordered"
						value={amt}
						onValueChange={(value) => setAmt(value)}
					/>
				</div>
				{selected && amt && !isMinPayoutPending && (
					<div className="form-control my-5 bg-base-200 rounded-xl p-5">
						<div className="flex gap-2 bg-primary/10 p-3 w-10 rounded-full">
							<Image
								src={`https://nowpayments.io/${selected.logo_url}`}
								width={20}
								height={20}
								className="object-contain"
								alt={selected.name}
							/>
						</div>
						{isError ? (
							<p className="text-error">
								Error loading minimum payment
							</p>
						) : (
							<p>
								Minimum payment is ${" "}
								{Math.max(queryResponse.fiat_equivalent, 10)}
							</p>
						)}
						{amt < Math.max(queryResponse.fiat_equivalent, 10) && (
							<p className="text-error">Amount is too low</p>
						)}
					</div>
				)}
				{selected && amt && isMinPayoutPending && (
					<p className="mt-5">
						<Skeleton className="h-10" />
					</p>
				)}

				<button
					disabled={
						!amt ||
						isPending ||
						isMinPayoutPending ||
						amt < Math.max(queryResponse.fiat_equivalent, 10)
					}
					className="btn btn-primary btn-block mt-5"
				>
					Pay now
				</button>
			</form>
		</>
	);
}

export default FundWithCryptoForm;
