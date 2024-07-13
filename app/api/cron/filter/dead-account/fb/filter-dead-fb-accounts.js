import connectMongo from "@/lib/connectDB";
import { checkFBStatus } from "@/lib/utils";
import CategoryModel from "@/models/category";
import DeadServiceItemModel from "@/models/dead-item";
// import CurrencyRateModel from "@/models/rate";
import ServiceModel from "@/models/service";
import ServiceItemModel from "@/models/service-item";
import { NextResponse } from "next/server";
import * as _ from "lodash";

async function filterDeadFB() {
	try {
		await connectMongo();
		const regex = new RegExp("facebook", "i");
		const fbCategory = await CategoryModel.find({ name: { $regex: regex } });
		const fbCIds = fbCategory.map((category) => category.id);

		const fbServices = await ServiceModel.find({ categoryId: { $in: fbCIds } });
		const fbSIds = fbServices.map((service) => service.id);

		const serviceItems = await ServiceItemModel.find({ serviceId: { $in: fbSIds }, status: "new" });

		for (const item of serviceItems) {
			const digitRegex = /\d{10,}/;
			const match = item?.info.match(digitRegex);

			if (match) {
				const uid = match[0];
				// TODO: check status of each account
				const status = await checkFBStatus(uid);
				// TODO: add status infomation to service item

				if (!status) {
					await DeadServiceItemModel.create({ ..._.omit(item, "_id") });
					await ServiceItemModel.findByIdAndDelete(item._id);
					await ServiceModel.findByIdAndUpdate(item.serviceId, { $inc: { quantity: -1 } });
				}
			}
		}

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

export default filterDeadFB;
