"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import Skeleton from "react-loading-skeleton";

function UserProfile() {
	const { isPending, data } = useQuery({
		queryKey: ["user-info"],
		queryFn: () => axios(`/api/user/info`),
	});

	const queryResponse = data?.data?.user || {};

	return (
		<>
			<li className="flex gap-2">
				<span>Name</span>
				<span className="font-bold">
					{isPending ? (
						<Skeleton className="inline-block w-48 h-5" />
					) : (
						`${queryResponse?.name || "nil"}`
					)}
				</span>
			</li>
			<li className="flex gap-2">
				<span>E-mail</span>
				<span className="font-bold">
					{isPending ? (
						<Skeleton className="inline-block w-72 h-5" />
					) : (
						`${queryResponse?.email || "nil"}`
					)}
				</span>
			</li>
		</>
	);
}

export default UserProfile;
