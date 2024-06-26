"use client";
import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { SlBell } from "react-icons/sl";

import { app } from "@/lib/firebase";
import { getMessaging, onMessage, isSupported } from "firebase/messaging";
import toast from "react-hot-toast";

function HandleNotification() {
	// const messaging = getMessaging(app);

	useEffect(() => {
		try {
			const messaging = async () => (await isSupported()) && getMessaging(app);

			const unsubscribe = onMessage(messaging, (payload) => {
				const { notification } = payload;
				toast.custom((t) => (
					<div
						className={` ${
							t.visible ? "animate-enter" : "animate-leave"
						} border bg-base-100 p-5 rounded-md z-50 flex gap-2 w-[calc(100% - 10px)] sm:w-[300px] md:w-[400px]`}>
						<SlBell className="w-10 h-10 self-center" />
						<div>
							<h2 className="text-xl font-bold">{notification.title}</h2>
							<p>{notification.body}</p>
						</div>
						<div className="self-center ml-auto">
							<button onClick={() => toast.dismiss(t.id)} className="btn btn-xs btn-ghost btn-square">
								<FaTimes />
							</button>
						</div>
					</div>
				));
			});

			return () => {
				// Unsubscribe the listener when the component unmounts
				unsubscribe();
			};
		} catch (error) {
			console.log("Error subscribing to notifications");
		}
	}, []);

	return null;
}

export default HandleNotification;
