"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import CategoryRow from "./category-row";
import { handleClientError } from "@/lib/utils";

function CategoriesDisplay({ id }) {
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState("");
	const { isPending, isError, data, error, isFetching, isPlaceholderData } =
		useQuery({
			queryKey: ["sub-categories", page, query],
			queryFn: () =>
				axios(`/api/admin/category/${id}/sub?page=${page}&q=${query}`),
			placeholderData: (previousData) => previousData,
		});

	const queryResponse = data?.data?.data || {};
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
						placeholder="Sub category name"
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

			<div className="overflow-x-auto border-y mb-10">
				<table className="table">
					{/* head */}
					<thead>
						<tr>
							<th></th>
							<th>Name</th>

							<th>Created At</th>
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
										<td colSpan={4}>
											<Skeleton />
										</td>
									</tr>
								))
						) : isError ? (
							<tr>
								<td
									colSpan={4}
									className="text-error font-bold"
								>
									{handleClientError(error)}
								</td>
							</tr>
						) : (
							<>
								{docs.length > 0 ? (
									docs.map((item) => (
										<CategoryRow
											item={item}
											key={item._id}
											cId={id}
										/>
									))
								) : (
									<tr>
										<td>No category found</td>
									</tr>
								)}
							</>
						)}
						{isFetching ? (
							<tr>
								<td colSpan={4}>
									<span className="loading loading-spinner"></span>
									<span> Loading...</span>
								</td>
							</tr>
						) : null}
					</tbody>
				</table>
			</div>
			<div className="text-center space-x-5 mt-5">
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

export default CategoriesDisplay;
