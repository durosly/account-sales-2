import connectMongo from "@/lib/connectDB";
import { NextResponse } from "next/server";
import verifyEmail from "@/utils/backend/verify-email";

async function verifyEmailHandler(request) {
	try {
		await connectMongo();

		const res = await request.json();

		//
		const { is_verified, has_expires } = await verifyEmail(res);

		if (has_expires) {
			return NextResponse.json(
				{
					status: true,
					message: "Token has expired. Please, try again",
				},
				{
					status: 403,
				}
			);
		}

		if (!is_verified) {
			return NextResponse.json(
				{
					status: true,
					message: "Invalid verification code",
				},
				{
					status: 400,
				}
			);
		}
		return NextResponse.json({
			status: true,
			message: "E-mail verified",
		});
	} catch (error) {
		return NextResponse.json(
			{
				status: false,
				message: "An error occured",
			},
			{ status: 500 }
		);
	}
}

export { verifyEmailHandler as PUT };
