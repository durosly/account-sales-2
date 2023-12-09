import connectMongo from "@/lib/connectDB";
import OrderModel from "@/models/order";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getOrders(request) {
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
		const id = searchParams.get("id");

		const query = {};

		if (!!q && q !== "all") {
			query.status = q;
		}

		if (id) {
			query._id = id;
		}

		await connectMongo();

		const orders = await OrderModel.paginate(query, {
			page,
			sort: { createdAt: -1 },
			populate: ["categoryId", "serviceId", "serviceItemIds"],
		});

		return NextResponse.json({
			status: true,
			message: "success",
			data: orders,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default getOrders;
