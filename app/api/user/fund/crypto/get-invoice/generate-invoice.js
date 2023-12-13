import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import CurrencyRateModel from "@/models/rate";
import TransactionModel from "@/models/transactions";
import axios from "axios";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function generateInvoice(request) {
	try {
		const { currency, amt } = await request.json();

		if (!currency) {
			return NextResponse.json(
				{ status: false, message: "No currency selected" },
				{ status: 400 }
			);
		}
		if (!amt) {
			return NextResponse.json(
				{ status: false, message: "No amount not specified" },
				{ status: 400 }
			);
		}
		if (!Number(amt)) {
			return NextResponse.json(
				{ status: false, message: "Amount must be a number" },
				{ status: 400 }
			);
		}

		if (Number(amt) < 10) {
			return NextResponse.json(
				{ status: false, message: "Amount must be atleast $10" },
				{ status: 400 }
			);
		}

		const session = await getServerSession(options);

		await connectMongo();
		const rate = await CurrencyRateModel.findOne({ currency: "USD" });

		if (!rate)
			return NextResponse.json(
				{
					status: false,
					message: "No rate defined. Please, contact admin",
				},
				{ status: 400 }
			);

		const date = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
		let message = `You are attempting to deposit ${commaNumber(
			amt
		)} naira on ${date} to your AccHub balance`;
		const title = `Deposit (${commaNumber(amt)} ${date})`;

		// const amount = amt / rate.amount;
		const order_number = Date.now();

		const data = await axios.get("https://plisio.net/api/v1/invoices/new", {
			params: {
				source_currency: "USD",
				source_amount: amt,
				order_number,
				currency,
				email: session.user.email,
				order_name: title,
				description: message,
				api_key: process.env.PLISIO_KEY,
				callback_url:
					"https://www.acchub.net/api/transactions/checkout/crypto?json=true",
				success_callback_url:
					"https://www.acchub.net/auth/user/funds/crypto/success?",
			},
		});

		if (data.statusText !== "OK") {
			return NextResponse.json(
				{ status: true, message: "An error occured" },
				{ status: 500 }
			);
		}

		await TransactionModel.create({
			userEmail: session.user.email,
			ownRef: order_number,
			type: "crypto",
			amount: amt * rate.amount,
		});

		return NextResponse.json({
			status: true,
			message: "success",
			invoice: data.data.data,
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

export default generateInvoice;
