import connectMongo from "@/lib/connectDB";
import AdminNoticeModel from "@/models/admin-notice";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getAdminNotice(request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");

		if (!Number(page)) {
			return NextResponse.json(
				{ status: false, message: "Page can only be a number" },
				{ status: 400 }
			);
		}

		const q = searchParams.get("q");

		const query = {};

		if (!!q) {
			const r = { $regex: q, $options: "i" };
			query["$or"] = [{ body: r }, { _id: r }];
		}

		await connectMongo();

		const notice = await AdminNoticeModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
		});

		return NextResponse.json({
			status: true,
			message: "success",
			data: notice,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default getAdminNotice;
