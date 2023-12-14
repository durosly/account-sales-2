import Link from "next/link";
import { BsCheckLg } from "react-icons/bs";

function ForgotPasswordEmailSentPage() {
	return (
		<div className="min-h-[500px] flex justify-center items-center py-10 px-5 ">
			<div className="max-w-sm flex flex-col items-center gap-10 rounded-xl bg-white p-5 border">
				<div className="w-14 flex justify-center items-center aspect-square rounded-full bg-success/20">
					<BsCheckLg className="w-10 h-10 stroke-current" />
				</div>
				<p>Check your inbox for recovery link</p>
				<Link
					className="btn btn-primary btn-block"
					href="/auth?action=login"
				>
					Login
				</Link>
			</div>
		</div>
	);
}

export default ForgotPasswordEmailSentPage;
