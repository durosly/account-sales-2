import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { DateTime } from "luxon";
import NotificationModel from "@/models/notification";
import commaNumber from "comma-number";
import addNotification from "@/utils/backend/add-notification";

async function addToUserBalance(request) {
	try {
		const { ref, amt } = await request.json();

		if (!ref) {
			return NextResponse.json(
				{ status: false, message: "Reference not specified" },
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

		if (Number(amt) < 0) {
			return NextResponse.json(
				{ status: false, message: "Amount must be greater than zero" },
				{ status: 400 }
			);
		}

		const verifyTran = await fetch(
			`https://api.paystack.co/transaction/verify/${ref}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
				},
			}
		);

		const session = await getServerSession(options);

		await connectMongo();
		const date = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
		let message = `Your deposit of ${commaNumber(amt)} naira on ${date}`;
		const title = `Deposit (${commaNumber(amt)} ${date})`;

		if (!verifyTran.ok) {
			message += " failed.";
			await addNotification(title, message, session.user.id);

			return NextResponse.json(
				{ status: false, message: "Transaction failed" },
				{ status: 500 }
			);
		}

		const verifyResponse = await verifyTran.json();

		if (verifyResponse.data.status !== "success") {
			message += " failed.";
			await addNotification(title, message, session.user.id);

			return NextResponse.json(
				{ status: false, message: "Transaction failed" },
				{ status: 500 }
			);
		}

		const user = await UserModel.findByIdAndUpdate(session.user.id, {
			$inc: { balance: amt },
		});

		// add transaction history
		message += " is successful";

		await addNotification(title, message, session.user.id);

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

export default addToUserBalance;
