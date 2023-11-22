import connectMongo from "@/lib/connectDB";
import OrderModel from "@/models/order";
import addNotification from "@/utils/backend/add-notification";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

async function updateOrder(request, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}

		const { status, details } = await request.json();

		await connectMongo();

		const order = await OrderModel.findByIdAndUpdate(id, {
			status,
			info: details,
		}).populate("serviceId");

		// TODO: send email about order

		// add local notification
		const date = DateTime.fromJSDate(order.createdAt).toLocaleString(
			DateTime.DATETIME_SHORT
		);
		let message = `Your order of the service "${order.serviceId.name}" on ${date}`;
		if (status === "success") {
			message += ` is successful.`;
		} else {
			message += " is cancelled.";
		}

		message += " Check order history for more information.";

		let title = `Recent order (${order.quantity} ${order.serviceId.name})`;
		await addNotification(title, message, order.userId);

		return NextResponse.json({
			status: false,
			message: "success",
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default updateOrder;
