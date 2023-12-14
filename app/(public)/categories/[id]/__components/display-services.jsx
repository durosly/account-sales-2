"use client";
import { handleClientError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

function DisplaySubCategories({ id, categoryCover }) {
	// Load subcategory
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["sub-categories", id, "all"],
		queryFn: () => axios(`/api/user/category/${id}/sub?page=all`),
		enabled: !!id,
	});

	const serviceResponse = data?.data?.data || [];

	return (
		<div className="p-5 sm:p-10 mb-10 mt-5 max-w-4xl mx-auto ">
			{isPending ? (
				<Skeleton count={5} />
			) : isError ? (
				<p>{handleClientError(error)}</p>
			) : serviceResponse && serviceResponse.length > 0 ? (
				<ul className="space-y-5">
					{serviceResponse.map((s) => (
						<li
							key={s._id}
							className="border rounded-xl p-5 flex gap-2 items-center"
						>
							<div className="relative w-6 h-6">
								<Image
									src={`/images/${
										categoryCover || "like-icon.png"
									}`}
									fill
									className="object-contain"
								/>
							</div>
							<Link
								href={`/categories/${id}/${s._id}`}
								className="flex items-center gap-2"
							>
								<p className="uppercase font-bold">{s.name}</p>
							</Link>
						</li>
					))}
				</ul>
			) : (
				<p>No sub category available</p>
			)}
		</div>
	);
}

export default DisplaySubCategories;
