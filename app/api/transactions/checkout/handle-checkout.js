import connectMongo from "@/lib/connectDB";
import TransactionModel from "@/models/transactions";
import UserModel from "@/models/user";
import addNotification from "@/utils/backend/add-notification";
import pushNotifyAdmin from "@/utils/backend/push-notify-admin";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function handleCheckout(request) {
	try {
		const secretHash = process.env.FLUTTERWAVE_HASH;
		const headersList = headers();
		const hash = headersList.get("verif-hash");

		if (!hash || hash !== secretHash) {
			// This response is not from Flutterwave; discard
			return NextResponse.json(
				{
					status: false,
					message: "Error occured",
				},
				{ status: 401 }
			);
		}

		const body = await request.json();

		if (body.status !== "successful") {
			return NextResponse.json(
				{
					status: false,
					message: "Not successful",
				},
				{ status: 401 }
			);
		}

		const {
			customer: { email },
			amount,
			txRef,
		} = body;

		await connectMongo();

		const exist = await TransactionModel.findOne({
			userEmail: email,
			transactionId: txRef,
			status: "completed",
			amount,
		});

		if (exist) {
			return NextResponse.json({
				status: true,
				message: "success",
			});
		}

		await TransactionModel.create({
			userEmail: email,
			amount,
			transactionId: txRef,
			status: "completed",
		});

		// TODO: fund user account
		const user = await UserModel.findOneAndUpdate(
			{ email },
			{
				$inc: { balance: amount },
			}
		);

		// add transaction history
		const date = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
		let message = `Your deposit of ${commaNumber(
			amount
		)} naira on ${date} is successful`;
		const title = `Deposit (${commaNumber(amount)} ${date})`;

		await addNotification(title, message, user.id);
		await pushNotifyAdmin(
			"User funding",
			`A user just funded his/her account`
		);

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

export default handleCheckout;
