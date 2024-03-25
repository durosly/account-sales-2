"use client";
import { useRef, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import { handleClientError } from "@/lib/utils";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";

function AccountPreview({ serviceId, link, cover }) {
	const router = useRouter();
	const [showModal, setShowModal] = useState(false);
	const [choice, setChoice] = useState([]);

	function handleChoiceChange(value) {
		if (choice.includes(value)) {
			const newList = choice.filter((item) => item !== value);
			setChoice([...newList]);
		} else {
			setChoice([...choice, value]);
		}
	}

	const { isPending, isError, data, error } = useQuery({
		queryKey: ["services-preview", serviceId], // unique key to the query
		queryFn: () => axios(`/api/user/service/${serviceId}/account/preview`),
		enabled: showModal,
	});

	const results = data?.data?.data;

	// place order
	const queryClient = useQueryClient();

	let toastId = useRef(null);

	const {
		isPending: isMutationPending,
		mutate,
		error: mutationError,
		isError: isMutationError,
	} = useMutation({
		mutationFn: (data) => {
			toastId.current = toast.loading("Creating order");
			return axios.post("/api/user/order/preview", data);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			queryClient.invalidateQueries({
				queryKey: ["services-preview", serviceId],
			});
		},
		onSuccess: () => {
			toast.success("Order created", { id: toastId.current });
			router.push("/auth/user/orders");
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	function handleSubmit() {
		if (choice.length < 1) {
			return toast.error("Select an account to purchase");
		}

		mutate({ choice, serviceId });
	}

	return (
		<>
			<button
				className="btn btn-secondary btn-outline max-sm:btn-block"
				onClick={() => setShowModal(true)}
			>
				<FaRegEye />
				Preview
			</button>

			{showModal && (
				<dialog className="modal modal-open modal-bottom sm:modal-middle">
					<div className="modal-box">
						<button
							onClick={() => setShowModal(false)}
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
						>
							✕
						</button>
						<h3 className="font-bold text-lg mb-5">
							Account preview
						</h3>
						<ul className="space-y-4">
							{isPending
								? Array(4)
										.fill(3)
										.map((_, i) => <Skeleton key={i} />)
								: null}

							{isError ? (
								<li>
									<span className="text-error">
										{handleClientError(error)}
									</span>
								</li>
							) : null}

							{!isPending &&
								results &&
								results.length &&
								results.map((item) => (
									<li
										key={item.id}
										className="flex flex-wrap items-center gap-3"
									>
										<div className="relative w-10 h-10">
											<Image
												src={`/images/${cover}`}
												fill
												className="object-contain"
											/>
										</div>
										<a
											href={`${link}/${item.username}`}
											className="font-bold"
											target="_blank"
										>
											{item.username}
										</a>
										<input
											type="checkbox"
											className="checkbox checkbox-sm ml-auto"
											disabled={isMutationPending}
											checked={choice.includes(item.id)}
											onChange={() =>
												handleChoiceChange(item.id)
											}
										/>
									</li>
								))}
						</ul>
						{isMutationError && (
							<div className="my-10">
								<p className="text-error font-bold">
									{handleClientError(mutationError)}
								</p>
							</div>
						)}
						<div className="modal-action max-sm:justify-center">
							{!isPending && results && results.length > 0 && (
								<button
									onClick={() => handleSubmit()}
									disabled={isMutationPending}
									className="btn btn-primary"
								>
									Buy now
								</button>
							)}
						</div>
						{isMutationPending && (
							<span className="loading loading-spinner"></span>
						)}
					</div>
				</dialog>
			)}
		</>
	);
}

export default AccountPreview;
