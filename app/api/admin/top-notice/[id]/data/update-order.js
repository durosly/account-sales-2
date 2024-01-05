import connectMongo from "@/lib/connectDB";
import AdminTopNoticeModel from "@/models/top-notification";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function updateNoticeMessage(request, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}

		const { instruction } = await request.json();

		if (!instruction) {
			return NextResponse.json({
				status: false,
				message: "No notice message added",
			});
		}

		await connectMongo();

		await AdminTopNoticeModel.findByIdAndUpdate(id, {
			body: instruction,
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

export default updateNoticeMessage;
