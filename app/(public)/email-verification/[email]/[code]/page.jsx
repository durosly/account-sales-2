import verifyEmail from "@/utils/backend/verify-email";
import Link from "next/link";
import { BsExclamationTriangle } from "react-icons/bs";
import RedirectC from "./redirect";
import Resend from "./resend";

async function EmailVerificationPage({ params }) {
	const { is_verified, has_expires } = await verifyEmail(params);

	if (has_expires) {
		return (
			<div className="min-h-screen flex justify-center items-center py-10 px-5 ">
				<div className="max-w-sm flex flex-col items-center gap-5 rounded-xl bg-white p-5 border">
					<div className="w-14 flex justify-center items-center aspect-square rounded-full bg-error">
						<BsExclamationTriangle className="w-8 h-8 stroke-current" />
					</div>
					<h2 className="text-xl font-bold">Expired link</h2>
					<p>Link has expired. Please, try again</p>
					<Resend />
				</div>
			</div>
		);
	}

	if (is_verified) {
		return <RedirectC />;
	}

	return (
		<div className="min-h-screen flex justify-center items-center py-10 px-5 ">
			<div className="max-w-sm flex flex-col items-center gap-10 rounded-xl bg-white p-5 border">
				<div className="w-14 flex justify-center items-center aspect-square rounded-full bg-error">
					<BsExclamationTriangle className="w-8 h-8 stroke-current" />
				</div>
				<h2 className="text-xl font-bold">Something went wrong</h2>
				<p>Link is most likely invalid</p>
				<Link
					className="btn btn-primary btn-block"
					href="/login"
				>
					Login
				</Link>
			</div>
		</div>
	);
}

export default EmailVerificationPage;
