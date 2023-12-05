import connectMongo from "@/lib/connectDB";
import ServiceItemModel from "@/models/service-item";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function getServiceItemsQuantity(_, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}

		await connectMongo();

		const serviceItems = await ServiceItemModel.find({
			status: "new",
			serviceId: id,
		});

		return NextResponse.json({
			status: true,
			message: "success",
			quantity: serviceItems.length,
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

export default getServiceItemsQuantity;
