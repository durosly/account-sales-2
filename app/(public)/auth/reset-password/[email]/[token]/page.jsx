import PasswordResetModel from "@/models/password-reset";
import ResetPasswordForm from "./__components/reset-password-form";
import { notFound } from "next/navigation";
import { DateTime } from "luxon";

async function ResetPassworPage({ params: { email, token } }) {
	const e = decodeURIComponent(email);
	const t = decodeURIComponent(token);

	const passwordReset = await PasswordResetModel.findOne({
		email: e,
		code: t,
	});

	if (!passwordReset) {
		notFound();
	}

	const expire_d = DateTime.fromISO(passwordReset.expires_at);
	const now = DateTime.now();

	if (now > expire_d) {
		<div className="px-10 mt-5">
			<h1 className="text-2xl text-center">Reset password</h1>
			<p className="mt-3 text-sm text-red-600">This link has expired.</p>
		</div>;
	}

	return (
		<div className="px-10 mt-5">
			<h1 className="text-2xl text-center">Reset password</h1>
			<ResetPasswordForm
				email={e}
				token={t}
			/>
		</div>
	);
}

export default ResetPassworPage;
