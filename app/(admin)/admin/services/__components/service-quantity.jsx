import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import toast from "react-hot-toast";
import { FaPlusMinus } from "react-icons/fa6";

function ServiceQuantity({ quantity: q, id }) {
	const [quantity, setQuantity] = useState("");
	const [direction, setDirection] = useState("inc");
	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate, isError, error } = useMutation({
		mutationFn: (quantity) => {
			toastId.current = toast.loading("Updating service quantity...");
			return axios.put(`/api/admin/service/${id}/quantity`, {
				quantity,
				direction,
			});
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["services"],
			});
		},
		onSuccess: () => {
			toast.success("Service quantity updated", { id: toastId.current });
			setQuantity("");
			document
				.getElementById(`service-quantity-update-modal-${id}`)
				.close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function handleSubmit(e) {
		e.preventDefault();

		if (!quantity) {
			return toast.error("Quantity cannot be empty");
		}

		mutate(quantity);
	}

	return (
		<>
			<span className="space-x-1">
				<span>{commaNumber(q)}</span>
				<button
					className="btn btn-xs"
					onClick={() =>
						document
							.getElementById(
								`service-quantity-update-modal-${id}`
							)
							.showModal()
					}
				>
					<FaPlusMinus />
				</button>
			</span>

			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id={`service-quantity-update-modal-${id}`}
				className="modal"
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg mb-2">
						Update Service quantity
					</h3>
					<form onSubmit={handleSubmit}>
						<div className="form-control mb-5">
							<label
								htmlFor="quantity"
								className="label"
							>
								Quantity
							</label>

							<CurrencyInput
								id="quantity"
								name="quantity"
								placeholder="Quantity..."
								decimalsLimit={2}
								className="input input-bordered"
								value={quantity}
								disabled={isPending}
								onValueChange={(value) => setQuantity(value)}
							/>
						</div>
						<div className="mb-5">
							<div className="join">
								<input
									type="radio"
									className="btn join-item"
									name="direction"
									checked={direction === "des"}
									onChange={() => setDirection("des")}
									aria-label="Decrease"
								/>
								<input
									type="radio"
									className="btn join-item"
									name="direction"
									aria-label="Increase"
									checked={direction === "inc"}
									onChange={() => setDirection("inc")}
								/>
							</div>
						</div>
						<button
							disabled={isPending}
							className="btn btn-primary"
						>
							Update quantity
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
				</div>

				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button disabled={isPending}>close</button>
				</form>
			</dialog>
		</>
	);
}

export default ServiceQuantity;
