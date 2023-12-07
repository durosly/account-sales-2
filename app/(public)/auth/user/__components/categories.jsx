"use client";
import { handleClientError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

function Categories() {
	// Load categories
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["categories", "all"],
		queryFn: () => axios(`/api/user/category?page=all`),
	});

	const categoryResponse = data?.data?.data || [];

	return (
		<div className="flex flex-wrap justify-center gap-5 sm:gap-10">
			{isPending ? (
				Array(6)
					.fill(2)
					.map((_, i) => (
						<div
							key={i}
							className="border rounded-2xl block p-5 text-center w-[calc((100%_-_2.5rem)_/_2)] sm:w-[calc((100%_-_2_*_2.5rem)_/_3)] md:w-[calc((100%_-_3_*_2.5rem)_/_4)]"
						>
							<div className="relative w-12 h-12 mx-auto">
								<Skeleton />
							</div>
							<p className="font-bold">
								<Skeleton />
							</p>
						</div>
					))
			) : isError ? (
				<p className="text-error">{handleClientError(error)}</p>
			) : categoryResponse && categoryResponse.length > 0 ? (
				categoryResponse.map((c) => (
					<Link
						href={`/auth/user/categories/${c._id}`}
						key={c._id}
						className="border rounded-2xl block p-5 text-center w-[calc((100%_-_2.5rem)_/_2)] sm:w-[calc((100%_-_2_*_2.5rem)_/_3)] md:w-[calc((100%_-_3_*_2.5rem)_/_4)]"
					>
						<div className="relative w-12 h-12 mx-auto mb-2">
							<Image
								src={`/images/${c.cover}`}
								fill
								className="object-contain"
							/>
						</div>
						<p className="font-bold">{c.name}</p>
					</Link>
				))
			) : (
				<p>No product/service yet</p>
			)}
		</div>
	);
}

export default Categories;
