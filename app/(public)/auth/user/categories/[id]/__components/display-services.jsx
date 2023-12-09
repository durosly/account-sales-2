"use client";
import { handleClientError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import Image from "next/image";
import { HiOutlineBriefcase } from "react-icons/hi";

import Skeleton from "react-loading-skeleton";
import ServicePurchase from "./service-purchase-form";

function DisplayServices({ id, categoryCover }) {
	// Load services
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["services", id, "all"],
		queryFn: () => axios(`/api/user/service?c=${id}&page=all`),
		enabled: !!id,
	});

	const serviceResponse = data?.data?.data || [];

	return (
		<div className="p-10 mb-10 mt-5 max-w-4xl mx-auto ">
			{isPending ? (
				<Skeleton count={5} />
			) : isError ? (
				<p>{handleClientError(error)}</p>
			) : serviceResponse && serviceResponse.length > 0 ? (
				<ul className="space-y-5">
					{serviceResponse.map((s) => (
						<li
							key={s._id}
							className="flex flex-wrap gap-5 items-center justify-between border rounded-2xl p-5"
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
							<div className="flex gap-1 items-center">
								<span
									className={`fi fi-${s.country.toLowerCase()}`}
								></span>
								<p>{s.name}</p>
							</div>
							<div className="flex gap-1 items-center">
								<HiOutlineBriefcase />
								<span>{commaNumber(s.quantity)}</span>
							</div>
							<div>&#8358; {commaNumber(s.price)}</div>
							<ServicePurchase
								sId={s._id}
								cId={id}
								price={s.price}
							/>
						</li>
					))}
				</ul>
			) : (
				<p>No service available</p>
			)}
		</div>
	);
}

export default DisplayServices;
