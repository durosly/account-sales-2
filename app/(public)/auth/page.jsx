import LoginForm from "./__components/login-form";
import SignupForm from "./__components/signup-form";
import ToggleForms from "./__components/toggle-form";
import Link from "next/link";

function AuthPage() {
	return (
		<div className="px-10">
			<div className="flex max-sm:flex-col max-w-md max-sm:h-[35rem] h-[30rem] mx-auto bg-base-200 rounded-2xl overflow-hidden my-20">
				<ToggleForms />
				<div className="flex-1 relative transition-all rounded-r-2xl max-sm:peer-checked:max-h-[5rem] max-sm:max-h-[100%] sm:peer-checked:max-w-[5rem] sm:max-w-[100%] p-10 bg-primary text-white">
					<Link
						href="/auth?action=login"
						id="show-login"
						className="bg-white w-16 text-black text-center text-sm py-1 !rounded-xl !rounded-b-none sm:-rotate-90 absolute left-1/2 sm:left-0 top-5 sm:top-1/2 max-sm:-translate-x-1/2 sm:-translate-y-1/2"
					>
						Show Login
					</Link>

					<LoginForm />
				</div>
				<div className="flex-1 relative transition-all max-sm:max-h-[5rem] max-sm:peer-checked:max-h-[100%] max-sm:w-full sm:max-w-[5rem] peer-checked:max-w-[100%] p-10">
					<SignupForm />

					<Link
						href="/auth?action=signup"
						id="show-signup"
						className="bg-primary text-center text-white text-sm max-sm:p-3 !rounded-xl max-sm:!rounded-t-none sm:!rounded-b-none sm:rotate-90 absolute left-1/2 sm:left-0 top-5 sm:top-1/2 max-sm:-translate-x-1/2 sm:-translate-y-1/2"
					>
						Show Signup
					</Link>
				</div>
			</div>
		</div>
	);
}

export default AuthPage;
