import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

async function updateUserPassword(request) {
	try {
		const { current, new: new_password, re_new } = await request.json();

		if (!current) {
			return NextResponse.json(
				{ status: false, message: "Current password not specified" },
				{ status: 400 }
			);
		}
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

		const session = await getServerSession(options);

		// TODO: add notification
		await connectMongo();
		const user = await UserModel.findById(session.user.id);

		if (!user) {
			return NextResponse.json(
				{ status: false, message: "Invalid request" },
				{ status: 400 }
			);
		}

		const valid = bcrypt.compareSync(current, user.password);

		if (!valid) {
			return NextResponse.json(
				{ status: false, message: "Invalid credentials" },
				{ status: 400 }
			);
		}

		user.password = re_new;
		await user.save();

		// const user = await UserModel.findByIdAndUpdate(session.user.id, {
		// 	password: re_new,
		// });

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

export default updateUserPassword;
