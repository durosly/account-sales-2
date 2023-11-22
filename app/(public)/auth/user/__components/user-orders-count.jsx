"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import Skeleton from "react-loading-skeleton";

function UserOrdersCount() {
	const { isPending, data } = useQuery({
		queryKey: ["orders"],
		queryFn: () => axios(`/api/user/order/count?q=success`),
	});

	const queryResponse = data?.data?.data || 0;

	return (
		<p className="text-3xl font-semibold">
			{isPending ? (
				<Skeleton />
			) : (
				commaNumber(Number(queryResponse) || 0.0)
			)}
		</p>
	);
}

export default UserOrdersCount;
