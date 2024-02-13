import connectMongo from "@/lib/connectDB";
import OrderModel from "@/models/order";
import UserModel from "@/models/user";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getUsers(request) {
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

		const query = { account_type: "user" };

		if (!!q && q !== "all") {
			query.$or = [
				{ name: { $regex: new RegExp(q, "i") } }, // Case-insensitive name search
				{ email: { $regex: new RegExp(q, "i") } }, // Case-insensitive email search
			];
		}

		await connectMongo();

		const users = await UserModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
			select: ["-password"],
		});

		return NextResponse.json({
			status: true,
			message: "success",
			data: users,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default getUsers;
