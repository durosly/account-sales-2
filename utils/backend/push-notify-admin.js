import connectMongo from "@/lib/connectDB";
import { firebaseAdmin } from "@/lib/firebase-admin";
import PNotificationModel from "@/models/p-notification";
import { getMessaging } from "firebase-admin/messaging";

async function pushNotifyAdmin(title, message) {
	try {
		await connectMongo();

		const pUserNotifications = await PNotificationModel.find({
			topics: "admin",
		});

		if (pUserNotifications.length) {
			const tokens = [
				...new Set(pUserNotifications.map((item) => item.token)),
			];

			const messageInfo = {
				notification: {
					title,
					body: message,
				},
				tokens,
			};

			await getMessaging(firebaseAdmin).sendMulticast(messageInfo);
		}
	} catch (error) {}
}

export default pushNotifyAdmin;
