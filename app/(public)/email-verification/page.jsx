import { TbMailbox } from "react-icons/tb";
import VerificationForm from "./verification-form";
import EmailDisplay from "./email-display";
import Link from "next/link";

function VerifyEmailPage() {
	return (
		<div className="max-w-sm mx-auto pt-10 text-center mb-20">
			<div className="w-28 aspect-square flex justify-center items-center rounded-full bg-primary/10 mx-auto">
				<TbMailbox className="w-20 h-20" />
			</div>
			<div className="space-y-4 mt-10">
				<h1 className="text-2xl font-bold">Verify your E-mail</h1>
				<EmailDisplay />
				<div className="divider">OR</div>
				<p>Enter 4 digit code below</p>
				<VerificationForm />

				<Link
					href="/auth?action=login"
					className="link"
				>
					Sign in
				</Link>
			</div>
		</div>
	);
}

export default VerifyEmailPage;
