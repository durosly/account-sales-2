"use client";

import { handleClientError } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

function EditDisplay({ start_date, end_date, status, query, serviceId, setConvert }) {
	const [editData, setEditData] = useState("");
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["items", { serviceId }, status, "all", query],
		queryFn: () => axios(`/api/admin/service/${serviceId}/accounts?page=all&query=${query}&status=${status}&start=${start_date}&end=${end_date}`),
	});

	const queryResponse = data?.data?.data || [];
	const { docs } = queryResponse;

	const queryClient = useQueryClient();
	let toastId = useRef(null);

	const { isPending: isUpdatePending, mutate: updateMutaion } = useMutation({
		mutationFn: (changes) => {
			toastId.current = toast.loading("Updating items...");
			return axios.post(`/api/admin/service/${serviceId}/update-accounts`, changes);
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished
		onSettled: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["items"],
			});
			setConvert(false);
		},
		onSuccess: () => {
			toast.success("Items Updated", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	useEffect(() => {
		function convertToBase(items) {
			let data = ``;
			items.map((item, i) => {
				data += `(${i + 1}.)${item.info}`;
			});

			return data;
		}

		if (docs && docs.length > 0) {
			const convert = convertToBase(docs);
			setEditData(convert);
		}
	}, [docs]);

	if (isPending) {
		return (
			<div className="p-5">
				<span class="loading loading-dots loading-md"></span> <span>Loading</span>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="p-5">
				<span className="text-error">{handleClientError(error)}</span>
			</div>
		);
	}

	function saveChanges(e) {
		e.preventDefault();
		const ids = docs.map((item) => item._id);

		updateMutaion({ edit: editData, ids });
	}

	return (
		<div className="p-5">
			<form action="" onSubmit={saveChanges}>
				<div className="form-control mb-5">
					<textarea value={editData} onChange={(e) => setEditData(e.target.value)} rows={10} className="textarea textarea-bordered"></textarea>
				</div>

				<div>
					<button disabled={isUpdatePending} className="btn btn-primary">
						Save
					</button>
				</div>
			</form>
		</div>
	);
}

export default EditDisplay;
