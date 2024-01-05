import connectMongo from "@/lib/connectDB";
import AdminTopNoticeModel from "@/models/top-notification";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function deleteNotice(_, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}
		await connectMongo();

		await AdminTopNoticeModel.findByIdAndDelete(id);

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

export default deleteNotice;
