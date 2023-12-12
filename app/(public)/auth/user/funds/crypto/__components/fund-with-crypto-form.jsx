"use client";
import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useRef, useState } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { LuChevronsUpDown } from "react-icons/lu";
import Image from "next/image";
import commaNumber from "comma-number";
import CurrencyInput from "react-currency-input-field";
import toast from "react-hot-toast";
import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

function FundWithCryptoForm({ tokens, rate }) {
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
			// console.log(data, "nice");
			router.push(data.data.invoice.invoice_url);
			toast.success("Request created", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function handleSubmit(e) {
		e.preventDefault();
		mutate({ amt, currency: selected.currency });
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
											src={selected.icon}
											width={20}
											height={20}
											className="object-contain"
										/>
										<span className="block truncate">
											{selected.name} ({selected.currency}
											)
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
									{tokens.map((token, tokenIdx) => (
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
														src={token.icon}
														width={20}
														height={20}
													/>
													<span
														className={`block truncate ${
															selected
																? "font-medium"
																: "font-normal"
														}`}
													>
														{token.name} (
														{token.currency})
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
				{selected && (
					<div className="form-control text-xs mt-5 px-5 bg-base-200 p-5 rounded-md">
						<p className="font-bold mb-2">
							Price / {selected.currency}
						</p>
						<div className="flex flex-wrap gap-5">
							<p className="flex gap-1">
								<span>$</span>
								<span>{commaNumber(selected.price_usd)}</span>
							</p>
							<p className="flex gap-1">
								<span>&#8358;</span>
								<span>
									{commaNumber(
										selected.price_usd * rate.amount
									)}
								</span>
							</p>
						</div>
					</div>
				)}
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
				{selected && amt && (
					<div className="form-control my-5 bg-base-200 rounded-xl p-5">
						<div className="flex gap-2 ">
							<Image
								src={selected.icon}
								width={20}
								height={20}
								className="object-contain"
							/>
							<span className="text-sm">
								{commaNumber(selected.rate_usd * amt)}
							</span>
						</div>
						{selected.rate_usd * amt < selected.min_sum_in && (
							<p className="text-error">
								Minimum is {selected.min_sum_in}
							</p>
						)}
					</div>
				)}

				<button
					disabled={
						!amt ||
						isPending ||
						selected.rate_usd * amt < selected.min_sum_in
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
