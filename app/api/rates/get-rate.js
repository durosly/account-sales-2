import connectMongo from "@/lib/connectDB";
import CurrencyRateModel from "@/models/rate";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getRates() {
	try {
		await connectMongo();
		const rate = await CurrencyRateModel.findOne({ currency: "USD" });

		if (!rate) {
			return NextResponse.json(
				{
					status: false,
					message: "Not found",
				},
				{ status: 404 }
			);
		}

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

export default getRates;
