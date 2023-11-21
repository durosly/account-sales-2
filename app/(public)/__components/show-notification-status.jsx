"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function ShowNotificationStatus() {
	const { data } = useQuery({
		queryKey: ["notifications", { status: "unread" }],
		queryFn: () => axios(`/api/user/notification?page=1&status=unread`),
		refetchInterval: 900,
	});

	const queryResponse = data?.data?.data || {};
	const { totalDocs } = queryResponse;

	return (
		<>
			{totalDocs > 0 ? (
				<span className="badge badge-xs badge-primary indicator-item"></span>
			) : null}
		</>
	);
}

export default ShowNotificationStatus;
