"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import Skeleton from "react-loading-skeleton";

function UserBalance() {
	const { isPending, data } = useQuery({
		queryKey: ["user-info"],
		queryFn: () => axios(`/api/user/info`),
	});

	const queryResponse = data?.data?.user || {};

	// Load currency rate
	const {
		isPending: isPendingRate,
		isError,
		data: rate,
		error,
	} = useQuery({
		queryKey: ["rate"],
		queryFn: () => axios(`/api/rates`),
		enabled: !!queryResponse?.balance,
	});

	const rateResponse = rate?.data?.data || {};

	return (
		<>
			<p className="text-xl font-semibold">
				{isPending ? (
					<Skeleton />
				) : (
					<span>
						&#8358; {commaNumber(queryResponse?.balance || 0)}
					</span>
				)}
			</p>
			{isPendingRate ? (
				<p className="text-sm max-w-[100px]">
					<Skeleton />
				</p>
			) : (
				<p className="text-sm">
					${" "}
					{commaNumber(
						Number(
							queryResponse?.balance / rateResponse.amount
						).toFixed(2)
					)}
				</p>
			)}
		</>
	);
}

export default UserBalance;
