import connectMongo from "@/lib/connectDB";
import ServiceModel from "@/models/service";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function updateServiceDetails(request, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}

		const { details } = await request.json();

		if (!details) {
			return NextResponse.json(
				{ status: false, message: "Enter details" },
				{ status: 400 }
			);
		}

		await connectMongo();

		const service = await ServiceModel.findByIdAndUpdate(id, { details });

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

export default updateServiceDetails;
