"use client";

import truncateString from "@/utils/shared/trunc";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import DeleteWorker from "./delete-worker";

function DisplayWorkers() {
	const [query, setQuery] = useState("");

	const [page, setPage] = useState(1);

	const { isPending, isError, data, error, isFetching, isPlaceholderData } = useQuery({
		queryKey: ["workers", page, query],
		queryFn: () => axios(`/api/admin/worker?page=${page}&q=${query ?? "all"}`),
		placeholderData: (previousData) => previousData,
	});

	const queryResponse = data?.data?.data || [];
	const { docs, limit, totalDocs, hasNextPage, hasPrevPage } = queryResponse;
	return (
		<>
			<form action="" className="px-5 mb-5 mt-5">
				<div className="join">
					<input
						type="text"
						className="input input-bordered join-item"
						placeholder="Username..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button className="btn join-item ">Search</button>
				</div>
			</form>

			<div className="text-right flex font-bold">
				<div className="w-72 ml-auto pr-5">
					{isPending ? (
						<Skeleton />
					) : (
						<span>
							{Math.max(1, limit * (page - 1))} - {limit * (page - 1) + docs?.length || 0} of {commaNumber(totalDocs)}
						</span>
					)}
				</div>
			</div>

			<div className="px-10 mb-20">
				<div className="overflow-x-auto">
					<table className="table table-zebra">
						{/* head */}
						<thead>
							<tr>
								<th></th>
								<th>ID</th>
								<th>Username</th>
								<th>Created At</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}

							{isPending ? (
								Array(4)
									.fill(3)
									.map((_, i) => (
										<tr key={i}>
											<td colSpan={5}>
												<Skeleton />
											</td>
										</tr>
									))
							) : isError ? (
								<tr>
									<td colSpan={5} className="text-error font-bold">
										{error.message}
									</td>
								</tr>
							) : (
								<>
									{docs && docs.length > 0 ? (
										docs.map((item, i) => (
											<tr key={item._id}>
												<td>{i + 1}</td>
												<td>{truncateString(item._id, 14, "middle")}</td>
												<td>{item.email}</td>
												<td>{DateTime.fromISO(item.createdAt).toFormat("dd/LLL/yyyy")}</td>
												<td>
													<DeleteWorker id={item._id} />
												</td>
											</tr>
										))
									) : (
										<tr>
											<td colSpan={6}>No user found</td>
										</tr>
									)}
								</>
							)}
							{isFetching ? (
								<tr>
									<td colSpan={6}>
										<span className="loading loading-spinner"></span>
										<span> Loading...</span>
									</td>
								</tr>
							) : null}
						</tbody>
					</table>
				</div>
			</div>

			<div className="text-center space-x-5 mt-5 mb-20">
				<button disabled={!hasPrevPage} className=" btn btn-sm btn-outline" onClick={() => setPage((old) => Math.max(old - 1, 0))}>
					<FiChevronLeft />
				</button>
				<span className="">Page {page}</span>
				<button
					disabled={!hasNextPage || isPlaceholderData}
					className="btn btn-sm btn-outline"
					onClick={() => {
						if (!isPlaceholderData && hasNextPage) {
							setPage((old) => old + 1);
						}
					}}>
					<FiChevronRight />
				</button>
			</div>
		</>
	);
}

export default DisplayWorkers;
