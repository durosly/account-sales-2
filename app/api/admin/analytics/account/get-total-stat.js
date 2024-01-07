import connectMongo from "@/lib/connectDB";
import CurrencyRateModel from "@/models/rate";
import ServiceItemModel from "@/models/service-item";
import { NextResponse } from "next/server";

async function getTotalAnalytics(request) {
	try {
		const { searchParams } = new URL(request.url);
		const type = searchParams.get("type");
		const start = searchParams.get("start");
		const end = searchParams.get("end");
		const range = searchParams.get("range");

		await connectMongo();

		const query = {};

		if (type === "sold") {
			query.status = "sold";
		} else if (type === "available") {
			query.status = "new";
		}

		if (range === "interval-range") {
			const startDate = new Date(`${start}T00:00:00Z`).toISOString();
			const endDate = new Date(`${end}T23:59:59Z`).toISOString();

			query.createdAt = { $gte: startDate, $lt: endDate };
		} else if (range === "today-range") {
			const today = new Date();
			const dateString = `${today.getFullYear()}-${(today.getMonth() + 1)
				.toString()
				.padStart(2, "0")}-${today
				.getDate()
				.toString()
				.padStart(2, "0")}`;

			const startDate = new Date(`${dateString}T00:00:00Z`).toISOString();
			const endDate = new Date(`${dateString}T23:59:59Z`).toISOString();
			query.createdAt = { $gte: startDate, $lt: endDate };
		}

		const items = await ServiceItemModel.find(query).populate("serviceId");

		const totalCost = JSON.parse(JSON.stringify(items)).reduce(
			(acc, curr) => {
				if (curr?.price) {
					return acc + curr.price;
				}

				return acc + 1;
			},
			0
		);

		const rate = await CurrencyRateModel.findOne({ currency: "USD" });

		return NextResponse.json({
			status: true,
			message: "success",
			data: {
				total: items.length,
				totalCost,
				totalCostInUSD: totalCost / rate.amount,
			},
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

export default getTotalAnalytics;
