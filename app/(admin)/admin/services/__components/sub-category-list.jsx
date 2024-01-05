"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import ServiceList from "./service-list";

function SubCategoryList({ categoryId }) {
	const { isPending, isError, data } = useQuery({
		queryKey: ["sub-category", categoryId, "all"],
		queryFn: () => axios(`/api/admin/category/${categoryId}/sub?page=all`),
	});

	const queryResponse = data?.data?.data || {};

	return (
		<div className="join join-vertical w-full">
			{isPending ? (
				<Skeleton
					count={10}
					height={35}
				/>
			) : isError ? (
				<p>An error occurred while fetching the subcategories.</p>
			) : queryResponse && queryResponse.length > 0 ? (
				queryResponse.map((subCategory) => (
					<div
						key={subCategory._id}
						className="collapse collapse-arrow join-item border border-base-300"
					>
						<input
							type="radio"
							name="my-accordion-3"
						/>
						<div className="collapse-title text-xl font-medium">
							{subCategory.name}
						</div>
						<div className="collapse-content">
							<ServiceList
								categoryId={categoryId}
								subCategoryId={subCategory._id}
							/>
						</div>
					</div>
				))
			) : (
				<p>No sub category</p>
			)}
		</div>
	);
}

export default SubCategoryList;
