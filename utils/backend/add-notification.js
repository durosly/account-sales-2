import connectMongo from "@/lib/connectDB";
import NotificationModel from "@/models/notification";

async function addNotification(title, message, id) {
	try {
		await connectMongo();

		await NotificationModel.create({
			userId: id,
			title,
			body: message,
		});
	} catch (error) {
		console.log(error);
	}
}

export default addNotification;
