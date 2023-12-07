import connectMongo from "@/lib/connectDB";
import { firebaseAdmin } from "@/lib/firebase-admin";
import NotificationModel from "@/models/notification";
import PNotificationModel from "@/models/p-notification";
import { getMessaging } from "firebase-admin/messaging";

async function addNotification(title, message, id) {
	try {
		await connectMongo();

		await NotificationModel.create({
			userId: id,
			title,
			body: message,
		});

		const pUserNotifications = await PNotificationModel.find({
			userId: id,
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

export default addNotification;
