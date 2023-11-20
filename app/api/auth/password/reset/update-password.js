import connectMongo from "@/lib/connectDB";
import PasswordResetModel from "@/models/password-reset";
import UserModel from "@/models/user";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

async function updateUserPassword(request) {
	try {
		const {
			email,
			token,
			new: new_password,
			re_new,
		} = await request.json();

		if (!new_password) {
			return NextResponse.json(
				{ status: false, message: "New password not specified" },
				{ status: 400 }
			);
		}
		if (!re_new) {
			return NextResponse.json(
				{ status: false, message: "Repeat new password" },
				{ status: 400 }
			);
		}
		if (new_password !== re_new) {
			return NextResponse.json(
				{ status: false, message: "New password doesn't match" },
				{ status: 400 }
			);
		}

		// TODO: add notification
		await connectMongo();

		const passwordReset = await PasswordResetModel.findOne({
			email,
			code: token,
		});

		if (!passwordReset) {
			return NextResponse.json(
				{
					status: false,
					message: "Invalid request",
				},
				{ status: 400 }
			);
		}

		const expire_d = DateTime.fromISO(passwordReset.expires_at);
		const now = DateTime.now();

		if (now > expire_d) {
			return NextResponse.json(
				{
					status: false,
					message:
						"Link is expired. Please, try again from reset password page",
				},
				{ status: 400 }
			);
		}
		const user = await UserModel.findOne({ email });

		if (!user) {
			return NextResponse.json(
				{ status: false, message: "Invalid request" },
				{ status: 400 }
			);
		}

		user.password = re_new;
		await user.save();

		await PasswordResetModel.findOneAndDelete({
			email,
			code: token,
		});

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

export default updateUserPassword;
