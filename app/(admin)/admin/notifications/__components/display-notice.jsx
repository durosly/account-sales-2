"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import NoticeRow from "./notice-row";

function DisplayNotice() {
	const [page, setPage] = useState(1);

	const { isPending, isError, data, error, isFetching, isPlaceholderData } =
		useQuery({
			queryKey: ["notice", page],
			queryFn: () => axios(`/api/admin/notice?page=${page}`),
			placeholderData: (previousData) => previousData,
		});

	const queryResponse = data?.data?.data || [];
	const { docs, limit, totalDocs, hasNextPage, hasPrevPage } = queryResponse;

	return (
		<>
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
								<th>ID</th>
								<th>Message</th>
								<th>Status</th>
								<th>Action</th>
								<th>Date/Time</th>
							</tr>
						</thead>
						<tbody>
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
									<td
										colSpan={5}
										className="text-error font-bold"
									>
										{error}
									</td>
								</tr>
							) : (
								<>
									{docs && docs.length > 0 ? (
										docs.map((item) => (
											<NoticeRow
												item={item}
												key={item._id}
											/>
										))
									) : (
										<tr>
											<td colSpan={5}>No Notification</td>
										</tr>
									)}
								</>
							)}
							{isFetching ? (
								<tr>
									<td colSpan={5}>
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

export default DisplayNotice;
