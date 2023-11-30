import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import addNotification from "@/utils/backend/add-notification";
import pushNotifyAdmin from "@/utils/backend/push-notify-admin";
import commaNumber from "comma-number";
import { DateTime } from "luxon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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
			`https://api.flutterwave.com/v3/transactions/${ref}/verify`,
			{
				headers: {
					Authorization: `Bearer ${process.env.FLUTTERWAVE_KEY}`,
				},
			}
		);

		if (!verifyTran.ok) {
			return NextResponse.json(
				{
					status: false,
					message: "An error occured verifying transaction",
				},
				{ status: 400 }
			);
		}

		const session = await getServerSession(options);

		await connectMongo();
		const date = DateTime.now().toLocaleString(DateTime.DATETIME_SHORT);
		let message = `Your deposit of ${commaNumber(amt)} naira on ${date}`;
		const title = `Deposit (${commaNumber(amt)} ${date})`;

		const verifyResponse = await verifyTran.json();

		if (verifyResponse.status !== "success") {
			message += " failed.";
			await addNotification(title, message, session.user.id);

			return NextResponse.json(
				{ status: false, message: "Transaction failed" },
				{ status: 500 }
			);
		}

		if (verifyResponse.data.amount !== Number(amt)) {
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
		await pushNotifyAdmin(
			"User funding",
			`A user just funded his/her account`
		);

		return NextResponse.json({
			status: true,
			message: "success",
		});
	} catch (error) {
		console.log(error.message);
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default addToUserBalance;
