import passwordResetEmail from "@/emails/password-reset";
import connectMongo from "@/lib/connectDB";
import generateRandomNumber from "@/lib/generate-random";
import transporter from "@/lib/transporter";
import PasswordResetModel from "@/models/password-reset";
import UserModel from "@/models/user";
import { render } from "@react-email/render";
import bcrypt from "bcryptjs";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

async function sendResetPasswordEmail(request) {
	try {
		await connectMongo();

		const { email } = await request.json();

		const user = await UserModel.findOne({ email });
		if (!user) {
			return NextResponse.json({
				status: true,
				message: "Email sent. Check inbox for password reset link",
			});
		}

		const expires = DateTime.now().plus({ hours: 1 }).toISO();

		const rand = generateRandomNumber();

		const token = bcrypt.hashSync(`${rand}`);

		const serializedToken = token
			.substring(8)
			.replace("/", "")
			.replace(".", "");

		const email_v = await PasswordResetModel.create({
			email,
			code: serializedToken,
			expires_at: expires,
		});

		const htmlEmail = render(
			passwordResetEmail({ email, token: serializedToken })
		);

		const options = {
			from: `${process.env.SMTP_INFO} <onboarding@resend.dev>`,
			to: user.email,
			subject: "Password Reset",
			html: htmlEmail,
		};

		await transporter.sendMail(options);
		// send email using verification ID and code
		return NextResponse.json({
			status: true,
			message: "Success",
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: "An error occured",
		});
	}
}

export default sendResetPasswordEmail;
