"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import ServiceList from "./service-list";
import { Disclosure } from "@headlessui/react";
import { IoChevronUp } from "react-icons/io5";

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
					<Disclosure
						key={subCategory._id}
						className=""
					>
						{({ open }) => (
							<>
								<Disclosure.Button className="flex w-full justify-between rounded-lg bg-primary/10 px-4 py-2 text-left hover:bg-primary/20">
									<span>{subCategory.name}</span>
									<IoChevronUp
										className={`${
											open ? "rotate-180 transform" : ""
										} h-5 w-5`}
									/>
								</Disclosure.Button>
								<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm">
									<ServiceList
										categoryId={categoryId}
										subCategoryId={subCategory._id}
									/>
								</Disclosure.Panel>
							</>
						)}
					</Disclosure>
				))
			) : (
				<p>No sub category</p>
			)}
		</div>
	);
}

export default SubCategoryList;
