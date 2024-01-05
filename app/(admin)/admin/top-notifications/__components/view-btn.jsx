"use client";
import { handleClientError } from "@/lib/utils";
import truncateString from "@/utils/shared/trunc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { IoEyeOutline } from "react-icons/io5";
import Markdown from "react-markdown";

function ViewBtn({ id, body }) {
	const [edit, setEdit] = useState(false);

	const [instruction, setInstruction] = useState(body);

	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending, mutate, isError, error } = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Updating admin notification...");
			return axios.put(`/api/admin/top-notice/${id}/data`, data);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			return await queryClient.invalidateQueries({
				queryKey: ["top-notice"],
			});
		},
		onSuccess: () => {
			toast.success("Admin notification updated", {
				id: toastId.current,
			});

			// setInstruction("");
			setEdit(false);
			document.getElementById(`view-notice-${id}`).close();
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function handleSubmit(e) {
		e.preventDefault();

		if (!instruction) {
			return toast.error("Please, enter notification message");
		}

		const data = { instruction };

		mutate(data);
	}

	return (
		<>
			<button
				className="btn btn-xs btn-square btn-outline btn-info"
				onClick={() =>
					document.getElementById(`view-notice-${id}`).showModal()
				}
			>
				<IoEyeOutline />
			</button>

			<dialog
				id={`view-notice-${id}`}
				className="modal"
			>
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg text-center underline">
						Notice - {truncateString(id, 10, "middle")}
					</h3>
					<button
						onClick={() => setEdit((prev) => !prev)}
						className="btn btn-outline btn-sm btn-primary"
						disabled={isPending}
					>
						{edit ? <FaTimes /> : <FaPen />}
					</button>
					{edit ? (
						<form onSubmit={handleSubmit}>
							<div className="form-control mb-5">
								<label
									className="label"
									htmlFor="details"
								>
									Message
								</label>

								<textarea
									id="details"
									className="textarea textarea-bordered"
									disabled={isPending}
									value={instruction}
									onChange={(e) =>
										setInstruction(e.target.value)
									}
								></textarea>
							</div>
							<button
								className="btn btn-primary"
								disabled={isPending}
							>
								Update notice
							</button>
						</form>
					) : (
						<div className="prose prose-sm">
							<Markdown>{body}</Markdown>
						</div>
					)}

					{isPending ? (
						<div>
							<span className="loading loading-spinner"></span>
						</div>
					) : null}

					{isError ? (
						<p className="text-error">{handleClientError(error)}</p>
					) : null}

					<p className="py-4 text-xs">
						Press ESC key or click outside to close
					</p>
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

export default ViewBtn;
