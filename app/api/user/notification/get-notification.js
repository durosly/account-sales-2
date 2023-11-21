import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import NotificationModel from "@/models/notification";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function getNotifications(request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");
		const status = searchParams.get("status");
		const session = await getServerSession(options);

		if (!Number(page)) {
			return NextResponse.json(
				{ status: false, message: "Page can only be a number" },
				{ status: 400 }
			);
		}

		const query = { userId: session.user.id };

		if (!!status && status !== "all") {
			query.status = status;
		}

		await connectMongo();

		const notifications = await NotificationModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
		});

		console.log(query);
		return NextResponse.json({
			status: true,
			message: "success",
			data: notifications,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default getNotifications;
