"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import { useSearchParams } from "next/navigation";
import OrderRow from "./order-row";

function DisplayOrders() {
	const searchParams = useSearchParams();
	const [query, setQuery] = useState("");
	const search = searchParams.get("q");

	const [page, setPage] = useState(1);

	const { isPending, isError, data, error, isFetching, isPlaceholderData } =
		useQuery({
			queryKey: ["orders", page, query, search],
			queryFn: () =>
				axios(
					`/api/admin/order?page=${page}&q=${
						search ?? "all"
					}&id=${query}`
				),
			placeholderData: (previousData) => previousData,
		});

	const queryResponse = data?.data?.data || [];
	const { docs, limit, totalDocs, hasNextPage, hasPrevPage } = queryResponse;

	return (
		<>
			<form
				action=""
				className="px-5 mb-5 mt-5"
			>
				<div className="join">
					<input
						type="text"
						className="input input-bordered join-item"
						placeholder="Transaction ID..."
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
							{Math.max(1, limit * (page - 1))} -{" "}
							{limit * (page - 1) + docs?.length || 0} of{" "}
							{commaNumber(totalDocs)}
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
								<th>Transaction ID</th>
								<th>Date/Time</th>
								<th>Service/Category</th>
								<th>Quality</th>
								<th>Charge</th>
								<th>Status</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}

							{isPending ? (
								Array(4)
									.fill(3)
									.map((_, i) => (
										<tr key={i}>
											<td colSpan={6}>
												<Skeleton />
											</td>
										</tr>
									))
							) : isError ? (
								<tr>
									<td
										colSpan={6}
										className="text-error font-bold"
									>
										{error}
									</td>
								</tr>
							) : (
								<>
									{docs && docs.length > 0 ? (
										docs.map((item, i) => (
											<OrderRow
												item={item}
												key={item._id}
												count={i + 1}
											/>
										))
									) : (
										<tr>
											<td colSpan={7}>
												No category found
											</td>
										</tr>
									)}
								</>
							)}
							{isFetching ? (
								<tr>
									<td colSpan={7}>
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
				<button
					disabled={!hasPrevPage}
					className=" btn btn-sm btn-outline"
					onClick={() => setPage((old) => Math.max(old - 1, 0))}
				>
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
					}}
				>
					<FiChevronRight />
				</button>
			</div>
		</>
	);
}

export default DisplayOrders;
