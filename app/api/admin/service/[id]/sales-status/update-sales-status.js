import connectMongo from "@/lib/connectDB";
import ServiceModel from "@/models/service";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";

async function updateServiceSalesStatus(request, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return Response.json({ status: false, message: "Invalid ID specified" }, { status: 400 });
		}

		const { status } = await request.json();

		if (typeof status !== "boolean") {
			return Response.json({ status: false, message: "Invalid entry" }, { status: 400 });
		}

		await connectMongo();

		const service = await ServiceModel.findByIdAndUpdate(id, {
			availableForSale: status,
		});

		if (!service) return Response.json({ status: false, message: "Service not found" }, { status: 404 });

		return Response.json({
			status: true,
			message: "success",
		});
	} catch (error) {
		return Response.json(
			{
				status: false,
				message: `An error occured: ${error.message}`,
			},
			{ status: 500 }
		);
	}
}

export default updateServiceSalesStatus;
