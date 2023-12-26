import connectMongo from "@/lib/connectDB";
import ServiceModel from "@/models/service";
import ServiceItemModel from "@/models/service-item";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function addAccountToService(request, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}

		const { accounts, instruction } = await request.json();

		const regex = /\([0-9]+\.\)/g;
		const entries = accounts.split(regex);

		await connectMongo();

		const service = await ServiceModel.findById(id);

		if (!service) {
			return NextResponse.json(
				{ status: false, message: "No service specified" },
				{ status: 400 }
			);
		}

		const data = [];
		const regEx = /\S+/; // non space character

		entries.map((item) => {
			if (item && regEx.test(item)) {
				data.push({
					serviceId: id,
					instruction,
					info: item,
				});
			}
		});

		service.quantity += parseInt(data.length);
		await service.save();

		await ServiceItemModel.insertMany(data);

		return NextResponse.json({
			status: true,
			message: "success",
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

export default addAccountToService;
