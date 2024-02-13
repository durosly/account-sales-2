"use client";
import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { BsPencilSquare } from "react-icons/bs";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import CurrencyInput from "react-currency-input-field";
import { RadioGroup } from "@headlessui/react";
import { LuPlus } from "react-icons/lu";
import { LuMinus } from "react-icons/lu";
import { BsPlusSlashMinus } from "react-icons/bs";

function EditUserBalance({ id }) {
	const queryClient = useQueryClient();
	const [amt, setAmt] = useState("");
	const [direction, setDirection] = useState("increase");
	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: () => {
			toastId.current = toast.loading("Updating user balance...");
			return axios.post(`/api/admin/user/${id}/balance`, {
				direction,
				amt,
			});
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			queryClient.invalidateQueries({
				queryKey: ["users"],
			});
		},
		onSuccess: () => {
			setAmt("");
			setDirection("increase");
			toast.success("Balance updated", { id: toastId.current });
			document.getElementById(`edit-balance-modal-${id}`).close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function onSubmit(e) {
		e.preventDefault();
		mutate();
	}

	return (
		<>
			<button
				className="btn btn-xs ml-2 btn-accent btn-outline"
				onClick={() =>
					document
						.getElementById(`edit-balance-modal-${id}`)
						.showModal()
				}
			>
				<BsPencilSquare />
			</button>

			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id={`edit-balance-modal-${id}`}
				className="modal"
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg mb-2">
						Edit user balance
					</h3>

					<form
						action=""
						onSubmit={onSubmit}
					>
						<div className="form-control">
							<label
								htmlFor="amount"
								className="label"
							>
								<span className="label-text-alt">Amount</span>
							</label>
							<CurrencyInput
								id="amount"
								name="amount"
								placeholder="Amount (USD)..."
								decimalsLimit={2}
								disabled={isPending}
								className="input input-bordered"
								value={amt}
								prefix="$"
								onValueChange={(value) => setAmt(value)}
							/>
						</div>

						<RadioGroup
							as="div"
							className="form-control mb-5"
							value={direction}
							onChange={setDirection}
						>
							<RadioGroup.Label className="label">
								<span className="label-text-alt">
									Direction
								</span>
							</RadioGroup.Label>
							<div className="flex gap-1 flex-wrap">
								<RadioGroup.Option value="increase">
									{({ checked }) => (
										<span
											className={`btn btn-xs btn-primary  ${
												!checked ? "btn-outline" : ""
											}`}
										>
											<LuPlus />
											Increase
										</span>
									)}
								</RadioGroup.Option>
								<RadioGroup.Option value="decrease">
									{({ checked }) => (
										<span
											className={`btn btn-xs btn-primary  ${
												!checked ? "btn-outline" : ""
											}`}
										>
											<LuMinus />
											Decrease
										</span>
									)}
								</RadioGroup.Option>
								<RadioGroup.Option value="exact">
									{({ checked }) => (
										<span
											className={`btn btn-xs btn-primary  ${
												!checked ? "btn-outline" : ""
											}`}
										>
											<BsPlusSlashMinus />
											Exact
										</span>
									)}
								</RadioGroup.Option>
							</div>
						</RadioGroup>
						<button
							disabled={isPending}
							className="btn btn-primary btn-block"
						>
							Done
						</button>
					</form>

					<p className="py-4 text-xs">Update user balance</p>
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

export default EditUserBalance;
