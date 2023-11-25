import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import PNotificationModel from "@/models/p-notification";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function subToPNotifications(request) {
	try {
		const { topic, token } = await request.json();

		if (!token) {
			return NextResponse.json(
				{ status: false, message: "Invalid request. Missing token" },
				{ status: 400 }
			);
		}
		if (!topic) {
			return NextResponse.json(
				{ status: false, message: "Invalid request. Missing topic" },
				{ status: 400 }
			);
		}

		const session = await getServerSession(options);

		await connectMongo();

		const exist = await PNotificationModel.findOne({
			userId: session.user.id,
			token,
		});

		if (exist) {
			if (!exist.topics.includes(topic)) {
				exist.topics.push(topic);
				await exist.save();
			}
		} else {
			await PNotificationModel.create({
				userId: session.user.id,
				token,
				topics: [topic],
			});
		}

		return NextResponse.json({
			status: true,
			message: "success",
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default subToPNotifications;
