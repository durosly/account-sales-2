"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import Skeleton from "react-loading-skeleton";

function NumberOfOrders() {
	const { isPending, data } = useQuery({
		queryKey: ["orders"],
		queryFn: () => axios(`/api/admin/order?q=success&page=1`),
		refetchInterval: 900,
	});

	const queryResponse = data?.data?.data || [];
	const { totalDocs } = queryResponse;

	return (
		<p className="text-4xl font-bold">
			{isPending ? <Skeleton /> : commaNumber(totalDocs || 0)}
		</p>
	);
}

export default NumberOfOrders;
