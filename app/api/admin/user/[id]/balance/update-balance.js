import connectMongo from "@/lib/connectDB";
import CurrencyRateModel from "@/models/rate";
import UserModel from "@/models/user";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

/**
 * Updates the user balance based on the specified parameters.
 * @param {Object} request - The request object.
 * @param {Object} params - The parameters object.
 * @param {string} params.id - The ID of the user.
 * @returns {Object} - The response object.
 */
async function updateUserBalance(request, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}

		const { amt, direction } = await request.json();

		await connectMongo();

		const rate = await CurrencyRateModel.findOne({ currency: "USD" });

		const amountInNGN = amt * (rate?.amount || 1);

		if (direction === "increase") {
			await UserModel.findByIdAndUpdate(id, {
				$inc: { balance: amountInNGN },
			});
		} else if (direction === "decrease") {
			let dAmountInNGN = -amountInNGN;
			await UserModel.findByIdAndUpdate(id, {
				$inc: { balance: dAmountInNGN },
			});
		} else if (direction === "exact") {
			await UserModel.findByIdAndUpdate(id, {
				$set: { balance: amountInNGN },
			});
		}

		return NextResponse.json({
			status: false,
			message: "success",
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default updateUserBalance;
