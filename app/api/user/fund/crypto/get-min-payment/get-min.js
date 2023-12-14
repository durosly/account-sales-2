import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getMinPayment(request) {
	try {
		const { searchParams } = new URL(request.url);
		const currency = searchParams.get("currency");

		if (!currency) {
			return NextResponse.json(
				{ status: false, message: "Select currency" },
				{ status: 400 }
			);
		}

		const data = await axios.get(
			`https://api.nowpayments.io/v1/min-amount?currency_from=${currency}&fiat_equivalent=usd&is_fixed_rate=False&is_fee_paid_by_user=False`,
			{
				headers: {
					"x-api-key": process.env.NOWPAYMENTS_API_KEY,
				},
			}
		);

		if (data.statusText !== "OK") {
			return NextResponse.json(
				{ status: true, message: "An error occured" },
				{ status: 500 }
			);
		}

		return NextResponse.json(data.data);
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

export default getMinPayment;
