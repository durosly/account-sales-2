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
		const { amt } = await request.json();

		// if (!currency) {
		// 	return NextResponse.json(
		// 		{ status: false, message: "No currency selected" },
		// 		{ status: 400 }
		// 	);
		// }
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

		if (!rate) {
			return NextResponse.json(
				{
					status: false,
					message: "No rate specified yet. Please, contact admin",
				},
				{ status: 500 }
			);
		}

		const date = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);

		const title = `Deposit (${commaNumber(amt)}USD ${date})`;

		const transaction = await TransactionModel.create({
			userEmail: session.user.email,
			type: "crypto",
			amount: amt * rate.amount,
		});

		const data = await axios(
			"https://fpayment.co/api/AddInvoice.php",

			{
				params: {
					address_wallet: process.env.FPAYMENT_WALLET,
					token_wallet: process.env.FPAYMENT_TOKEN,
					name: `Account Funding`,
					description: `Funding of ${session.user.name} account with ${amt} USD`,
					amount: amt,
					request_id: transaction.ownRef,
					callback:
						"https://www.smvaults.com/api/transactions/checkout/crypto",
					return_url:
						"https://www.smvaults.com/auth/user/funds/crypto",
				},
			}
		);

		if (data.statusText !== "OK") {
			return NextResponse.json(
				{ status: true, message: "An error occured" },
				{ status: 500 }
			);
		}

		return NextResponse.json({
			status: true,
			message: "success",
			invoice: data.data,
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
