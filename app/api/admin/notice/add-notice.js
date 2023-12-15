import connectMongo from "@/lib/connectDB";
import AdminNoticeModel from "@/models/admin-notice";
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

		await AdminNoticeModel.create({
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
