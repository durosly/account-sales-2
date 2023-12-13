import connectMongo from "@/lib/connectDB";
import CurrencyRateModel from "@/models/rate";
import { NextResponse } from "next/server";

async function updateRate(request) {
	try {
		const { rate } = await request.json();
		await connectMongo();

		if (!rate || !Number(rate)) {
			return NextResponse.json(
				{
					status: false,
					message: "Invalid entry",
				},
				{ status: 400 }
			);
		}

		await CurrencyRateModel.findOneAndUpdate(
			{ currency: "USD" },
			{ amount: rate }
		);

		return NextResponse.json({
			status: true,
			message: "success",
			data: rate,
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

export default updateRate;
