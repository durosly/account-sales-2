"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Actions from "./actions";
import Skeleton from "react-loading-skeleton";
import ItemRow from "./item-row";
import { DateTime } from "luxon";
import commaNumber from "comma-number";

function DefaultDisplay({ query, setQuery, start_date, setStartDate, end_date, setEndDate, status, setStatus, serviceId, page, setPage }) {
	const maxDate = DateTime.now().toISODate();
	const { isPending, isError, data, error, isFetching, isPlaceholderData } = useQuery({
		queryKey: ["items", { serviceId }, status, page, query],
		queryFn: () => axios(`/api/admin/service/${serviceId}/accounts?page=${page}&query=${query}&status=${status}&start=${start_date}&end=${end_date}`),
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
						placeholder="Item ID..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button className="btn join-item">Search</button>
				</div>
			</form>

			<div className="flex flex-wrap gap-5 items-end px-5">
				<div className="flex gap-2 items-end flex-wrap">
					<div>
						<label htmlFor="start" className="label">
							Start
						</label>
						<input
							className="input input-bordered"
							type="date"
							name="interval-start"
							id="start"
							value={start_date}
							onChange={(e) => setStartDate(e.target.value)}
							max={maxDate}
						/>
					</div>
					<div>
						<label htmlFor="end" className="label">
							End
						</label>
						<input
							className="input input-bordered"
							type="date"
							name="interval-end"
							id="end"
							value={end_date}
							onChange={(e) => setEndDate(e.target.value)}
							disabled={!start_date}
							max={maxDate}
						/>
					</div>
				</div>

				<div className="flex gap-2 items-center">
					<input type="radio" checked={status === "all"} onChange={() => setStatus("all")} aria-label="All" className="btn" />
					<input type="radio" checked={status === "new"} onChange={() => setStatus("new")} aria-label="New" className="btn" />
					<input type="radio" checked={status === "sold"} onChange={() => setStatus("sold")} aria-label="Sold" className="btn" />
				</div>
			</div>

			<Actions id={serviceId} />

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
								<th></th>
								<th>ID</th>
								<th>Status</th>
								<th>Date/Time</th>
								<th>Action</th>
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
									<td colSpan={6} className="text-error font-bold">
										{handleClientError(error)}
									</td>
								</tr>
							) : (
								<>
									{docs && docs.length > 0 ? (
										docs.map((item, i) => <ItemRow item={item} key={item._id} count={i + 1} />)
									) : (
										<tr>
											<td colSpan={6}>No item found</td>
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

export default DefaultDisplay;
