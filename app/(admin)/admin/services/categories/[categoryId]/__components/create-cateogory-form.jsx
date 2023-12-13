"use client";
import { useState, useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { GoPlus } from "react-icons/go";
// import Image from "next/image";
import { handleClientError } from "@/lib/utils";

function CreateCategoryForm({ id }) {
	const queryClient = useQueryClient();
	const [cName, setCName] = useState("");
	// const [cCover, setCCover] = useState("like-icon.png");

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Creating sub category");
			return axios.post(`/api/admin/category/${id}/sub`, data);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["sub-categories"],
			});
		},
		onSuccess: () => {
			setCName("");
			toast.success("Sub category created", { id: toastId.current });
			document.getElementById("create-sub-category-modal").close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	async function handleSubmit(e) {
		e.preventDefault();
		mutate({ name: cName });
	}

	return (
		<>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<button
				className="btn btn-primary"
				onClick={() =>
					document
						.getElementById("create-sub-category-modal")
						.showModal()
				}
			>
				<GoPlus />
				Add Sub Category
			</button>
			<dialog
				id="create-sub-category-modal"
				className="modal"
			>
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg">Add new sub cateogory</h3>
					<form
						action=""
						className="mt-5 space-y-5"
						onSubmit={handleSubmit}
					>
						<div className="form-control ">
							<input
								type="text"
								className="input input-bordered "
								placeholder="Sub category name..."
								value={cName}
								onChange={(e) => setCName(e.target.value)}
							/>
						</div>
						{/* <div className="form-control">
							<select
								name="cover"
								id="cover"
								className="select select-bordered"
								value={cCover}
								onChange={(e) => setCCover(e.target.value)}
							>
								<option value="like-icon.png">Default</option>
								<option value="fb-icon.png">
									Facebook blue
								</option>
								<option value="ig-icon.png">
									Instagram default
								</option>
								<option value="ln-icon.png">
									LinkedIn default
								</option>
								<option value="tg-icon.png">
									Telegram default
								</option>
								<option value="sc-icon.png">
									Snapchat default
								</option>
								<option value="tk-icon.png">
									TikTok default
								</option>
								<option value="x-icon.png">
									X(Twitter) default
								</option>
								<option value="yt-icon.png">
									Youtube default
								</option>
							</select>
						</div>
						<div className="relative w-10 h-10">
							<Image
								src={`/images/${cCover}`}
								fill
								className="object-contain"
							/>
						</div> */}
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
