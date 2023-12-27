import { NextResponse } from "next/server";
import { DateTime } from "luxon";
import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import EmailModel from "@/models/email-verification";
import generateRandomNumber from "@/lib/generate-random";
import transporter from "@/lib/transporter";
import { render } from "@react-email/render";
import VerifyEmail from "@/emails/verify-email";

async function resendEmailHandler(request) {
	try {
		await connectMongo();

		const res = await request.json();

		const { email } = res;
		const emailTaken = await UserModel.findOne({ email });
		if (!emailTaken) {
			return NextResponse.json(
				{
					status: false,
					message: "Invalid entry",
				},
				{ status: 400 }
			);
		}

		const expires = DateTime.now().plus({ hours: 1 }).toISO();
		const code = generateRandomNumber();
		const email_v = await EmailModel.findOneAndUpdate(
			{ email },
			{
				code,
				expires_at: expires,
			}
		);

		const htmlEmail = render(
			<VerifyEmail
				email={email_v.id}
				validationCode={code}
			/>,
			{ pretty: true }
		);
		const textEmail = render(
			<VerifyEmail
				email={email_v.id}
				validationCode={code}
			/>,
			{ plainText: true }
		);

		const options = {
			from: `SMVaults <support@smvaults.com>`,
			to: email.toLowerCase(),
			subject: "Verify email address",
			html: htmlEmail,
			text: textEmail,
		};

		await transporter.sendMail(options);
		// send email using verification ID and code
		return NextResponse.json({
			status: true,
			message: "Email sent",
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
export { resendEmailHandler as PUT };
