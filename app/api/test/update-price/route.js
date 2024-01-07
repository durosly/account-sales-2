import connectMongo from "@/lib/connectDB";
import ServiceItemModel from "@/models/service-item";
import { NextResponse } from "next/server";

export async function PUT() {
	await connectMongo();
	const serviceItems = await ServiceItemModel.find({}).populate("serviceId");

	for (const item of JSON.parse(JSON.stringify(serviceItems))) {
		if (item?.serviceId) {
			await ServiceItemModel.findByIdAndUpdate(item._id, {
				$set: { price: item.serviceId.price },
			});
		} else {
			await ServiceItemModel.findByIdAndUpdate(item._id, {
				$set: { price: 1 },
			});
		}
	}

	return NextResponse.json({ status: true });
}
