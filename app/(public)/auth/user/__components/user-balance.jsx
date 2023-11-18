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

	return (
		<p className="text-3xl font-semibold">
			{isPending ? (
				<Skeleton />
			) : (
				commaNumber(queryResponse?.balance || 0)
			)}
		</p>
	);
}

export default UserBalance;
