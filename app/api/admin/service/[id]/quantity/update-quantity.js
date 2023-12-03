import connectMongo from "@/lib/connectDB";
import ServiceModel from "@/models/service";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function updateServiceQuantity(request, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}

		const { quantity, direction } = await request.json();

		if (!quantity) {
			return NextResponse.json(
				{ status: false, message: "Enter quantity" },
				{ status: 400 }
			);
		}
		if (!Number(quantity)) {
			return NextResponse.json(
				{ status: false, message: "Quantity must be a number" },
				{ status: 400 }
			);
		}

		if (Number(quantity) < 1) {
			return NextResponse.json(
				{ status: false, message: "Quantity must be greater than 1" },
				{ status: 400 }
			);
		}

		await connectMongo();

		const query = {};

		if (direction === "inc") {
			query["$inc"] = { quantity };
		} else {
			const q = -quantity;
			query["$inc"] = { quantity: q };
		}

		const service = await ServiceModel.findByIdAndUpdate(id, query);

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

export default updateServiceQuantity;
