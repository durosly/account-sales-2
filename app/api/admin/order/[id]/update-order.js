import connectMongo from "@/lib/connectDB";
import OrderModel from "@/models/order";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function updateOrder(request, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}

		const { status, details } = await request.json();

		await connectMongo();

		const order = await OrderModel.findByIdAndUpdate(id, {
			status,
			info: details,
		});

		// TODO: send email about order

		return NextResponse.json({
			status: false,
			message: "success",
			order,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default updateOrder;
