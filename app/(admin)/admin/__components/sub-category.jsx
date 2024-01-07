"use client";
import { handleClientError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import ServiceAnalytics from "./service";

function SubCategory({ categoryId }) {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["sub-category", "all", categoryId],
		queryFn: () => axios(`/api/admin/category/${categoryId}/sub?page=all`),
	});

	const queryResponse = data?.data?.data || {};

	return (
		<>
			{isPending ? (
				<Skeleton className="h-12" />
			) : isError ? (
				<p className="text-error">{handleClientError(error)}</p>
			) : queryResponse.length > 0 ? (
				queryResponse.map((subCategory) => (
					<div key={subCategory._id}>
						<h4 className="font-bold bg-base-200 py-2 px-3">
							{subCategory?.name || "nil"}
						</h4>
						<ServiceAnalytics
							categoryId={categoryId}
							subCategoryId={subCategory._id}
						/>
					</div>
				))
			) : (
				<p>No sub category yet</p>
			)}
		</>
	);
}

export default SubCategory;
