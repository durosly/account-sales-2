import ResetPasswordForm from "./__components/reset-password-form";

function ForgotPasswordPage() {
	return (
		<>
			<div className="px-10 mt-5">
				<h1 className="text-2xl text-center">Forgot password</h1>
				<ResetPasswordForm />
			</div>
		</>
	);
}

export default ForgotPasswordPage;
