"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import NotificationRow from "./notification-row";

function DisplayNotifications() {
	const [page, setPage] = useState(1);

	const { isPending, isError, data, error, isFetching, isPlaceholderData } =
		useQuery({
			queryKey: ["notifications", page],
			queryFn: () => axios(`/api/user/notification?page=${page}`),
			placeholderData: (previousData) => previousData,
		});

	const queryResponse = data?.data?.data || {};
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
				<ul className="space-y-2">
					{isPending ? (
						Array(4)
							.fill(3)
							.map((_, i) => (
								<li
									key={i}
									className="border p-5 rounded-xl"
								>
									<h2 className="font-bold text-xl">
										<Skeleton />
									</h2>
									<p>
										<Skeleton />
									</p>
									<p className="text-xs text-right italic mt-5">
										<span>
											<Skeleton className="inline-block max-w-[200px]" />
										</span>
									</p>
								</li>
							))
					) : isError ? (
						<li>
							<h2 className="font-bold text-xl">Error</h2>
							<p>An error occured</p>
						</li>
					) : (
						<>
							{docs.length > 0 ? (
								docs.map((item) => (
									<NotificationRow
										item={item}
										key={item._id}
									/>
								))
							) : (
								<li className="bg-primary/10 p-5 rounded-xl">
									<h2 className="font-bold text-xl">
										No notification
									</h2>
									<p>You have no notification yet</p>
								</li>
							)}
						</>
					)}
					{isFetching ? (
						<li className="bg-primary/10 p-5 rounded-xl">
							<span className="loading loading-spinner"></span>
							<span> Loading...</span>
						</li>
					) : null}
				</ul>
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

export default DisplayNotifications;
