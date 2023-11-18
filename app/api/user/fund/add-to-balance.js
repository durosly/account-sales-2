import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
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
			`https://api.paystack.co/transaction/verify/${ref}`,
			{
				headers: {
					Authorization: `Bearer ${process.env.PAYSTACK_KEY}`,
				},
			}
		);

		if (!verifyTran.ok) {
			return NextResponse.json(
				{ status: false, message: "Transaction failed" },
				{ status: 500 }
			);
		}

		const verifyResponse = await verifyTran.json();

		if (verifyResponse.data.status !== "success") {
			return NextResponse.json(
				{ status: false, message: "Transaction failed" },
				{ status: 500 }
			);
		}

		const session = await getServerSession(options);

		// TODO: add transaction history

		await connectMongo();
		const user = await UserModel.findByIdAndUpdate(session.user.id, {
			$inc: { balance: amt },
		});

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
