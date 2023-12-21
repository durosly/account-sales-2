import connectMongo from "@/lib/connectDB";
import TransactionModel from "@/models/transactions";
import UserModel from "@/models/user";
import addNotification from "@/utils/backend/add-notification";
import pushNotifyAdmin from "@/utils/backend/push-notify-admin";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function handleCryptoCheckout(request) {
	try {
		// const body = await request.json();
		// const headersList = headers();
		// const signature = headersList.get("x-nowpayments-sig");

		// const isValid = validateRequest(body, signature);

		const searchParams = request.nextUrl.searchParams;
		const token = searchParams.get("token");
		const request_id = searchParams.get("request_id");
		const transaction_id = searchParams.get("transaction_id");
		const status = searchParams.get("status");

		if (token !== process.env.FPAYMENT_TOKEN) {
			// This response is not from FPayments; discard
			return NextResponse.json(
				{
					status: false,
					message: "Error occured",
				},
				{ status: 401 }
			);
		}

		if (status !== "completed") {
			return NextResponse.json(
				{
					status: false,
					message: "Not successful",
				},
				{ status: 402 }
			);
		}

		await connectMongo();

		const exist = await TransactionModel.findOne({
			ownRef: request_id,
		});

		if (!exist) {
			return NextResponse.json(
				{
					status: false,
					message: "Something went wrong",
				},
				{ status: 404 }
			);
		}

		if (exist.status === "completed") {
			return NextResponse.json({
				status: true,
				message: "Success?r",
			});
		}

		exist.transactionId = transaction_id;
		exist.status = "completed";
		const amount = exist.amount;

		// TODO: fund user account
		const user = await UserModel.findOneAndUpdate(
			{ email: exist.userEmail },
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

		await exist.save();

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

export default handleCryptoCheckout;
