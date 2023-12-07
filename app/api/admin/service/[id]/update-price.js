import connectMongo from "@/lib/connectDB";
import ServiceModel from "@/models/service";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function updateServicePrice(request, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}

		const { price } = await request.json();

		if (!price) {
			return NextResponse.json(
				{ status: false, message: "Enter price" },
				{ status: 400 }
			);
		}
		if (!Number(price)) {
			return NextResponse.json(
				{ status: false, message: "Price must be a number" },
				{ status: 400 }
			);
		}

		if (Number(price) < 1) {
			return NextResponse.json(
				{ status: false, message: "Price must be greater than 1" },
				{ status: 400 }
			);
		}

		await connectMongo();

		const service = await ServiceModel.findByIdAndUpdate(id, { price });

		return NextResponse.json({
			status: true,
			message: "success",
			service,
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

export default updateServicePrice;
