import connectMongo from "@/lib/connectDB";
import ServiceModel from "@/models/service";
import ServiceItemModel from "@/models/service-item";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function updateAccountToService(request, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json({ status: false, message: "Invalid ID specified" }, { status: 400 });
		}

		const { edit: accounts, ids } = await request.json();

		for (const id of ids) {
			if (!isValidObjectId(id)) {
				return Response.json({ status: false, message: "Invalid ID specified" }, { status: 400 });
			}
		}

		const regex = /\([0-9]+\.\)/g;
		const entries = accounts.split(regex);

		await connectMongo();

		const service = await ServiceModel.findById(id);

		if (!service) {
			return NextResponse.json({ status: false, message: "No service specified" }, { status: 400 });
		}

		const currentItem = await ServiceItemModel.findById(ids[0]);

		const data = [];
		const regEx = /\S+/; // non space character

		entries.map((item) => {
			if (item && regEx.test(item)) {
				data.push({
					serviceId: id,
					instruction: currentItem.instruction,
					info: item,
					price: service.price,
				});
			}
		});

		await ServiceItemModel.deleteMany({ _id: { $in: ids } });
		service.quantity -= parseInt(ids.length);

		await ServiceItemModel.insertMany(data);
		service.quantity += parseInt(data.length);
		await service.save();

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

export default updateAccountToService;
