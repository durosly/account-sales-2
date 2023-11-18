import connectMongo from "@/lib/connectDB";
import EmailModel from "@/models/email-verification";
import UserModel from "@/models/user";
import { DateTime } from "luxon";
import isValidObjectId from "./verify-mongodb-id";

async function verifyEmail(params) {
	await connectMongo();
	const { email, code } = params;

	const query = { code };

	const isId = isValidObjectId(email);

	if (isId) {
		query._id = email;
	} else {
		query.email = email;
	}

	const verification = await EmailModel.findOne(query);

	let is_verified = false;
	let has_expires = false;

	if (verification) {
		const start_date = DateTime.fromJSDate(verification.expires_at);

		const diff = start_date.diffNow();

		const milli = diff?.toObject()?.milliseconds || 0;

		if (milli < 1) {
			has_expires = true;
		} else {
			await UserModel.findOneAndUpdate(
				{ email: verification.email },
				{ is_verified: true }
			);
			await EmailModel.findByIdAndDelete(verification.id);

			is_verified = true;
		}
	}

	return { is_verified, has_expires };
}

export default verifyEmail;
