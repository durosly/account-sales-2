"use client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { DateTime } from "luxon";
import { useEffect } from "react";

function NotificationRow({ item }) {
	const { mutate } = useMutation({
		mutationFn: (id) => {
			return axios.put(`/api/user/notification/${id}`);
		},
	});

	useEffect(() => {
		if (item.status === "unread") {
			mutate(item._id);
		}
	}, [item]);

	return (
		<li
			className={`${
				item.status === "unread" ? "bg-primary/5" : "border"
			} p-5 rounded-xl`}
			key={item._id}
		>
			<h2 className="font-bold text-xl">{item.title}</h2>
			<p>{item.body}</p>

			<p className="text-xs text-right italic mt-5">
				{DateTime.fromISO(item.createdAt).toLocaleString(
					DateTime.DATETIME_SHORT
				)}
			</p>
		</li>
	);
}

export default NotificationRow;
