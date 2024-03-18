import { handleClientError } from "@/lib/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import Skeleton from "react-loading-skeleton";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPlusMinus } from "react-icons/fa6";
import { SimpleMdeReact } from "react-simplemde-editor";

function ServiceQuantity({ id }) {
	const [accounts, setAccounts] = useState("");
	const [instruction, setInstruction] = useState("");
	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate, isError, error } = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Updating service quantity...");
			return axios.post(`/api/admin/service/${id}/add-accounts`, data);
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
			setAccounts("");
			setInstruction("");
			document
				.getElementById(`service-quantity-update-modal-${id}`)
				.close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	const { isPending: isPendingQuantity, data } = useQuery({
		queryKey: ["services", id, "service-items", "quantity", "new"],
		queryFn: () => axios(`/api/admin/service/${id}/quantity`),
		refetchInterval: 500,
	});

	const queryResponse = data?.data || {};

	function handleSubmit(e) {
		e.preventDefault();

		if (!instruction) {
			return toast.error("Please, enter instruction");
		}

		if (!accounts) {
			return toast.error("Please, accounts");
		}

		const data = { accounts, instruction };

		mutate(data);
	}

	return (
		<>
			<span className="space-x-1">
				<span>
					{isPendingQuantity ? (
						<Skeleton />
					) : queryResponse?.quantity ? (
						commaNumber(queryResponse?.quantity)
					) : (
						0
					)}
				</span>
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
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg mb-2">
						Update Service quantity
					</h3>
					<form onSubmit={handleSubmit}>
						<div className="form-control">
							<label
								htmlFor="accounts"
								className="label"
							>
								Accounts
							</label>
							<textarea
								name="accounts"
								id="accounts"
								className="textarea textarea-bordered"
								rows={5}
								value={accounts}
								onChange={(e) => setAccounts(e.target.value)}
							></textarea>
						</div>
						<div className="form-control mb-5">
							<label
								className="label"
								htmlFor="details"
							>
								Instructions
							</label>
							<SimpleMdeReact
								value={instruction}
								onChange={setInstruction}
							/>
						</div>

						<button
							disabled={isPending}
							className="btn btn-primary"
						>
							Add accounts
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
