import connectMongo from "@/lib/connectDB";
import AdminTopNoticeModel from "@/models/top-notification";
import { NextResponse } from "next/server";

async function createAdminNotice(request) {
	try {
		const { instruction } = await request.json();

		if (!instruction) {
			return NextResponse.json({
				status: false,
				message: "No notice message added",
			});
		}

		await connectMongo();

		await AdminTopNoticeModel.create({
			body: instruction,
		});

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

export default createAdminNotice;
