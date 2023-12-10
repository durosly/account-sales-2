import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import addNotification from "@/utils/backend/add-notification";
import pushNotifyAdmin from "@/utils/backend/push-notify-admin";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import TransactionModel from "@/models/transactions";

async function handleCheckout(request) {
	try {
		const secretHash = "nice";
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

		const exist = await TransactionModel.findOne({
			userEmail: email,
			transactionId: txRef,
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
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default handleCheckout;
