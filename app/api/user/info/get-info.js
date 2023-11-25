import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getUserInfo() {
	try {
		const session = await getServerSession(options);
		const id = session?.user?.id || null;

		if (!id) {
			return NextResponse.json({
				status: false,
				message: "No user logged in",
			});
		}

		await connectMongo();
		const user = await UserModel.findById(session.user.id, ["-password"]);

		return NextResponse.json({
			status: true,
			message: "success",
			user,
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

export default getUserInfo;
