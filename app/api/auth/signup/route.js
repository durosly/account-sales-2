import { NextResponse } from "next/server";
import { DateTime } from "luxon";
import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import { UserSignupSchema } from "@/validators/signup";
import EmailModel from "@/models/email-verification";
import generateRandomNumber from "@/lib/generate-random";
import transporter from "@/lib/transporter";
import { render } from "@react-email/render";
import VerifyEmail from "@/emails/verify-email";

async function signupUser(request) {
	try {
		await connectMongo();

		const res = await request.json();

		const data = UserSignupSchema.safeParse(res);

		if (!data.success) {
			return NextResponse.json({
				status: false,
				message: data.error.issues[0].message,
			});
		}

		const emailTaken = await UserModel.findOne({ email: data.data.email });
		if (emailTaken) {
			return NextResponse.json(
				{
					status: false,
					message: "Email has already been used",
				},
				{ status: 400 }
			);
		}

		//

		const user = await UserModel.create({
			name: data.data.name,
			email: data.data.email,
			password: data.data.password,
		});
		const expires = DateTime.now().plus({ hours: 1 }).toISO();
		const email_v = await EmailModel.create({
			email: data.data.email,
			code: generateRandomNumber(),
			expires_at: expires,
		});

		const htmlEmail = render(
			VerifyEmail({ email: email_v.id, validationCode: email_v.code })
		);

		const options = {
			from: `${process.env.SMTP_INFO} <${process.env.SMTP_USERNAME}>`,
			to: user.email,
			subject: "Verify email address",
			html: htmlEmail,
		};

		await transporter.sendMail(options);

		// send email using verification ID and code
		return NextResponse.json({
			status: true,
			message: "Success",
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

// export { handler as GET, handler as POST };
export { signupUser as POST };
