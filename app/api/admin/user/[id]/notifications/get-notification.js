import connectMongo from "@/lib/connectDB";
import NotificationModel from "@/models/notification";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getNotifications(request, { params: { id } }) {
	try {
		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");
		const status = searchParams.get("status");

		if (!Number(page)) {
			return NextResponse.json(
				{ status: false, message: "Page can only be a number" },
				{ status: 400 }
			);
		}

		const query = { userId: id };

		if (!!status && status !== "all") {
			query.status = status;
		}

		await connectMongo();

		const notifications = await NotificationModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
		});

		return NextResponse.json({
			status: true,
			message: "success",
			data: notifications,
		});
	} catch (error) {
		return NextResponse.json(
			{
				status: false,
				message: `An error occured: ${error.message}`,
			},
			{ status: 500 }
		);
	}
}

export default getNotifications;
