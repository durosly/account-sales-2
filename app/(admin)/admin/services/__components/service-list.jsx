"use client";
import { handleClientError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import ServiceRow from "./service-row";

function ServiceList({ categoryId, subCategoryId }) {
	const { isPending, isError, error, data, isFetching } = useQuery({
		queryKey: ["service", categoryId, subCategoryId, "all"],
		queryFn: () =>
			axios(
				`/api/admin/service?c=${categoryId}&s=${subCategoryId}&page=all`
			),
	});

	const queryResponse = data?.data?.data || {};

	return (
		<div className="overflow-x-auto border-y mb-10">
			<table className="table table-zebra">
				<thead>
					<tr>
						<th></th>
						<th>Service</th>
						<th>Quantity</th>

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
								{handleClientError(error)}
							</td>
						</tr>
					) : (
						<>
							{queryResponse && queryResponse.length > 0 ? (
								queryResponse.map((item) => (
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
	);
}

export default ServiceList;
