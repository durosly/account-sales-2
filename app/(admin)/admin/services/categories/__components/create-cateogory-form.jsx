"use client";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { handleClientError } from "@/lib/utils";

function CreateCategoryForm() {
	const queryClient = useQueryClient();
	const [cName, setCName] = useState("");

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (category) => {
			toastId.current = toast.loading("Creating category");
			return axios.post("/api/admin/category", { category });
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["categories"],
			});
		},
		onSuccess: () => {
			setCName("");
			toast.success("Customer created", { id: toastId.current });
			document.getElementById("create-category-modal").close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate(cName);
	}

	return (
		<>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<button
				className="btn btn-primary"
				onClick={() =>
					document.getElementById("create-category-modal").showModal()
				}
			>
				Add Category
			</button>
			<dialog
				id="create-category-modal"
				className="modal"
			>
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Add new cateogory</h3>
					<form
						action=""
						className="mt-5"
						onSubmit={handleSubmit}
					>
						<div className="form-control mb-5">
							<input
								type="text"
								className="input input-bordered "
								placeholder="Category name..."
								value={cName}
								onChange={(e) => setCName(e.target.value)}
							/>
						</div>
						<button
							disabled={isPending}
							className="btn btn-primary"
						>
							Save
						</button>
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

export default CreateCategoryForm;
