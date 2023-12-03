"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import Skeleton from "react-loading-skeleton";

function NumberOfUsers() {
	const { isPending, data } = useQuery({
		queryKey: ["user-list"],
		queryFn: () => axios(`/api/admin/user/all`),
		refetchInterval: 900,
	});

	const queryResponse = data?.data?.users || {};

	return (
		<p className="text-4xl font-bold">
			{isPending ? <Skeleton /> : commaNumber(queryResponse?.length || 0)}
		</p>
	);
}

export default NumberOfUsers;
