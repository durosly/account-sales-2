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

		const pUserNotification = await PNotificationModel.findOne({
			userId: id,
		});

		if (pUserNotification) {
			const token = pUserNotification.token;

			const messageInfo = {
				notification: {
					title,
					body: message,
				},
				token,
			};

			const response = await getMessaging(firebaseAdmin).send(
				messageInfo
			);
		}
	} catch (error) {
		console.log(error);
	}
}

export default addNotification;
