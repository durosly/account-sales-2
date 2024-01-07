"use client";
import { handleClientError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import Image from "next/image";
import SubCategory from "./sub-category";

function Categories() {
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["category", "all"],
		queryFn: () => axios(`/api/admin/category?page=all`),
	});

	const queryResponse = data?.data?.data || {};

	return (
		<>
			{isPending ? (
				<Skeleton
					className="h-28"
					count={5}
				/>
			) : isError ? (
				<p className="text-error">{handleClientError(error)}</p>
			) : queryResponse.length > 0 ? (
				queryResponse.map((category) => (
					<div
						key={category._id}
						className="border p-5 rounded"
					>
						<div className="flex gap-5">
							<div className="relative w-10 h-10 ">
								<Image
									src={`/images/${
										category?.cover || "like-icon.png"
									}`}
									fill
									sizes="40px"
									className="object-contain"
									alt="category"
								/>
							</div>
							<h3 className="font-bold text-2xl">
								{category?.name || "nil"}
							</h3>
						</div>
						<div className="space-y-2 mt-5">
							<SubCategory categoryId={category._id} />
						</div>
					</div>
				))
			) : (
				<div className="border p-5 rounded">No categories yet</div>
			)}
		</>
	);
}

export default Categories;
