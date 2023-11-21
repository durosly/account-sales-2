import connectMongo from "@/lib/connectDB";
import NotificationModel from "@/models/notification";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function markNotificationAsRead(_, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}

		await connectMongo();

		const notification = await NotificationModel.findByIdAndUpdate(id, {
			status: "read",
		});

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

export default markNotificationAsRead;
