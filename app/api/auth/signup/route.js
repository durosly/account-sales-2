import connectMongo from "@/lib/connectDB";
import generateRandomNumber from "@/lib/generate-random";
import getTemplate from "@/lib/get-email-template";
import transporter from "@/lib/transporter";
import EmailModel from "@/models/email-verification";
import UserModel from "@/models/user";
import { UserSignupSchema } from "@/validators/signup";
import { DateTime } from "luxon";
import { NextResponse } from "next/server";

async function signupUser(request) {
	try {
		await connectMongo();

		const res = await request.json();

		const data = UserSignupSchema.safeParse(res);

		if (!data.success) {
			return NextResponse.json(
				{
					status: false,
					message: data.error.issues[0].message,
				},
				{ status: 401 }
			);
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

		const user = await UserModel.create({
			name: data.data.name,
			email: data.data.email.toLowerCase(),
			password: data.data.password,
			is_verified: true,
		});
		// const expires = DateTime.now().plus({ hours: 1 }).toISO();
		// const code = generateRandomNumber();

		// const email_v = await EmailModel.create({
		// 	email: data.data.email.toLowerCase(),
		// 	code,
		// 	expires_at: expires,
		// });

		// let htmlData = await getTemplate("verify-email.html");

		// const link = `${
		// 	process.env.NEXT_PUBLIC_URL
		// }/email-verification/${data.data.email.toLowerCase()}/${code}`;

		// htmlData = htmlData.replace(/\[link\]/g, link);
		// htmlData = htmlData.replace(/\[code\]/g, code);

		// const htmlEmail = render(
		// 	<VerifyEmail
		// 		email={email_v.id}
		// 		validationCode={code}
		// 	/>,
		// 	{ pretty: true }
		// );
		// const textEmail = render(
		// 	<VerifyEmail
		// 		email={email_v.id}
		// 		validationCode={code}
		// 	/>,
		// 	{ plainText: true }
		// );

		// const textEmail = `Code is ${code}`;

		// const options = {
		// 	from: `${process.env.SMTP_INFO} <${process.env.SMTP_USERNAME}>`,
		// 	to: user.email.toLowerCase(),
		// 	subject: "Verify email address",
		// 	html: htmlData,
		// 	// html: `<p>Code is ${code}</p>`,
		// 	text: textEmail,
		// };

		// await transporter.sendMail(options);

		// send email using verification ID and code
		return NextResponse.json({
			status: true,
			message: "Success",
		});
	} catch (error) {
		// console.log(error.message);
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
