"use client";
import global from "@/images/global.png";
import { handleClientError } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import Image from "next/image";

import Skeleton from "react-loading-skeleton";
import ServicePurchase from "./service-purchase-form";

function DisplayServices({ id, categoryCover, subId }) {
	// Load services
	const { isPending, isError, data, error } = useQuery({
		queryKey: ["services", id, "all"],
		queryFn: () => axios(`/api/user/service?c=${id}&s=${subId}&page=all`),
		enabled: !!id,
	});

	const serviceResponse = data?.data?.data || [];

	// Load currency rate
	const {
		isPending: isPendingRate,

		data: rate,
	} = useQuery({
		queryKey: ["rate"],
		queryFn: () => axios(`/api/rates`),
	});

	const rateResponse = rate?.data?.data || {};

	return (
		<div className="p-5 sm:p-10 mb-10 mt-5 max-w-4xl mx-auto ">
			{isPending ? (
				<Skeleton count={5} />
			) : isError ? (
				<p className="text-error">{handleClientError(error)}</p>
			) : serviceResponse && serviceResponse.length > 0 ? (
				<ul className="space-y-5">
					{serviceResponse.map((s) => (
						<li
							key={s._id}
							className="space-y-5 border rounded-2xl p-5"
						>
							<div>
								<div className="flex gap-2 mb-2">
									<div className="relative w-6 h-6 flex-shrink-0">
										<Image
											src={`/images/${
												categoryCover || "like-icon.png"
											}`}
											fill
											className="object-contain"
										/>
									</div>
									<p className="uppercase font-bold">
										{s.name}
									</p>
								</div>
								<p className="italic">{s.details}</p>
							</div>
							<div className="flex flex-wrap gap-2">
								<div className="flex gap-1 items-center p-2 rounded-md text-red-500 border border-red-500">
									<span>Price:</span>
									<span className="font-bold">
										&#8358;{commaNumber(s.price)}
									</span>
								</div>
								<div className="flex gap-1 items-center p-2 rounded-md text-green-500 border border-green-500">
									<span className="font-bold">
										{isPendingRate ? (
											<Skeleton className="w-10" />
										) : (
											<>
												$
												{commaNumber(
													Number(
														s.price /
															(rateResponse?.amount ||
																1)
													).toFixed(2)
												)}
											</>
										)}
									</span>
								</div>
								<div className="flex gap-1 items-center p-2 rounded-md text-blue-500 border border-blue-500">
									<span>Available:</span>
									<span className="font-bold">
										{commaNumber(parseInt(s.quantity))}
									</span>
								</div>
								<div className="flex gap-1 items-center p-2 rounded-md text-yellow-500 border border-yellow-500">
									<span>Country:</span>
									{s.country === "global" ? (
										<Image
											src={global}
											width={20}
											height={20}
											className="inline-block"
										/>
									) : (
										<span
											className={`fi fi-${s.country.toLowerCase()}`}
										></span>
									)}
								</div>
							</div>

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
