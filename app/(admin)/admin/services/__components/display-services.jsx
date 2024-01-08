"use client";
import { handleClientError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import SubCategoryList from "./sub-category-list";
import { Disclosure } from "@headlessui/react";
import { IoChevronUp } from "react-icons/io5";

function DisplayServices() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["category", "all"],
		queryFn: () => axios(`/api/admin/category?page=all`),
	});

	const queryResponse = data?.data?.data || {};

	return (
		<>
			{/* <form
				action=""
				className="px-5 mb-5 mt-5"
			>
				<div className="join">
					<input
						type="text"
						className="input input-bordered join-item"
						placeholder="Service..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
					/>
					<button className="btn join-item ">Search</button>
				</div>
			</form> */}

			<div className="join join-vertical w-full">
				{isError ? (
					<p className="text-error">{handleClientError(error)}</p>
				) : isPending ? (
					Array(4)
						.fill(3)
						.map((_, i) => (
							<div
								className="h-12"
								key={i}
							>
								<Skeleton />
							</div>
						))
				) : queryResponse && queryResponse.length > 0 ? (
					queryResponse.map((category) => (
						<Disclosure
							key={category._id}
							as="div"
							className=""
						>
							{({ open }) => (
								<>
									<Disclosure.Button className="flex w-full justify-between items-center rounded-lg border px-4 py-2 text-left hover:bg-base-200">
										<span className="text-2xl">
											{category.name}
										</span>
										<IoChevronUp
											className={`${
												open
													? "rotate-180 transform"
													: ""
											} h-5 w-5 text-purple-500`}
										/>
									</Disclosure.Button>
									<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
										<SubCategoryList
											categoryId={category._id}
										/>
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>
					))
				) : (
					<p>No categories yet</p>
				)}
			</div>

			{/* <div className="overflow-x-auto border-y mb-10">
				<table className="table table-zebra">
					<thead>
						<tr>
							<th></th>
							<th>Service</th>
							<th>Quantity</th>
							<th>Category</th>
							<th>Sub category</th>
							<th>Price ($)</th>
							<th>Created at</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{isPending ? (
							Array(4)
								.fill(3)
								.map((_, i) => (
									<tr key={i}>
										<td colSpan={8}>
											<Skeleton />
										</td>
									</tr>
								))
						) : isError ? (
							<tr>
								<td
									colSpan={8}
									className="text-error font-bold"
								>
									{error.message}
								</td>
							</tr>
						) : (
							<>
								{docs && docs.length > 0 ? (
									docs.map((item) => (
										<ServiceRow
											item={item}
											key={item._id}
										/>
									))
								) : (
									<tr>
										<td>No services found</td>
									</tr>
								)}
							</>
						)}
						{isFetching ? (
							<tr>
								<td colSpan={8}>
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
			</div> */}
		</>
	);
}

export default DisplayServices;
