import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import OrderModel from "@/models/order";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function getOrdersCount(request) {
	try {
		const { searchParams } = new URL(request.url);

		const session = await getServerSession(options);

		const q = searchParams.get("q");

		const query = { userId: session.user.id };

		if (!!q && q !== "all") {
			query.status = q;
		}

		await connectMongo();

		const orders = await OrderModel.find(query);

		return NextResponse.json({
			status: true,
			message: "success",
			data: orders.length,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default getOrdersCount;
