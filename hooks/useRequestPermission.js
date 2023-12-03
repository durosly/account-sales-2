"use client";
import { app, vapid } from "@/lib/firebase";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { getMessaging, getToken } from "firebase/messaging";
import { useEffect } from "react";

function useRequestPermission({ topic }) {
	const { mutate } = useMutation({
		mutationFn: ({ token, topic }) => {
			return axios.post("/api/user/p-notification", { token, topic });
		},
	});

	// const messaging = getMessaging(app);
	const messaging = async () => (await isSupported()) && getMessaging(app);

	useEffect(() => {
		async function handleNotice(topic) {
			if (typeof window !== "undefined") {
				try {
					const permission = await Notification.requestPermission();

					if (permission === "granted") {
						const token = await getToken(messaging, {
							vapidKey: vapid,
						});

						mutate({ token, topic });
						// console.log(error);
					}
				} catch (error) {}
			}
		}

		handleNotice(topic);
	});
}

export default useRequestPermission;
