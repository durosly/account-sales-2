"use client";
import { handleClientError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import ServiceStat from "./service-stat";

function ServiceAnalytics({ categoryId, subCategoryId }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["service", "all", categoryId, subCategoryId],
		queryFn: () =>
			axios(
				`/api/admin/service?c=${categoryId}&s=${subCategoryId}&page=all`
			),
	});

	const queryResponse = data?.data?.data || [];

	return (
		<ul className="mt-2">
			{isPending ? (
				<li>
					<Skeleton />
				</li>
			) : isError ? (
				<li>
					<p className="text-error">{handleClientError(error)}</p>
				</li>
			) : queryResponse && queryResponse.length > 0 ? (
				queryResponse.map((service) => (
					<li
						key={service._id}
						className="flex flex-wrap gap-5 justify-between border-b last:border-b-0 py-3 px-2"
					>
						<p>{service.name}</p>
						<div className="flex flex-wrap gap-5">
							<ServiceStat
								serviceId={service._id}
								type={"sold"}
							/>
							<ServiceStat
								serviceId={service._id}
								type={"available"}
							/>
						</div>
					</li>
				))
			) : (
				<li>No service added yet</li>
			)}
		</ul>
	);
}

export default ServiceAnalytics;
