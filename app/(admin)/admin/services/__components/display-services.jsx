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
			<div className="join join-vertical w-full">
				{isError ? (
					<p className="text-error">{handleClientError(error)}</p>
				) : isPending ? (
					Array(4)
						.fill(3)
						.map((_, i) => (
							<div className="h-12" key={i}>
								<Skeleton />
							</div>
						))
				) : queryResponse && queryResponse.length > 0 ? (
					queryResponse.map((category) => (
						<Disclosure key={category._id} as="div" className="">
							{({ open }) => (
								<>
									<Disclosure.Button className="flex w-full justify-between items-center rounded-lg border px-4 py-2 text-left hover:bg-base-200">
										<span className="text-2xl">{category.name}</span>
										<IoChevronUp className={`${open ? "rotate-180 transform" : ""} h-5 w-5`} />
									</Disclosure.Button>
									<Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
										<SubCategoryList categoryId={category._id} />
									</Disclosure.Panel>
								</>
							)}
						</Disclosure>
					))
				) : (
					<p>No categories yet</p>
				)}
			</div>
		</>
	);
}

export default DisplayServices;
