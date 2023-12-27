import connectMongo from "@/lib/connectDB";
import generateRandomNumber from "@/lib/generate-random";
import getTemplate from "@/lib/get-email-template";
import transporter from "@/lib/transporter";
import EmailModel from "@/models/email-verification";
import UserModel from "@/models/user";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

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

		let htmlData = await getTemplate("verify-email.html");

		const link = `${
			process.env.NEXT_PUBLIC_URL
		}/email-verification/${email.toLowerCase()}/${code}`;

		htmlData = htmlData.replace(/\[link\]/g, link);
		htmlData = htmlData.replace(/\[code\]/g, code);

		const textEmail = `Code is ${code}`;

		const options = {
			from: `${process.env.SMTP_INFO} <${process.env.SMTP_USERNAME}>`,
			to: email.toLowerCase(),
			subject: "Verify email address",
			html: htmlData,
			// html: `<p>Code is ${code}</p>`,
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
