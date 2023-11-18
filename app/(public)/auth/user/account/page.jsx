import PasswordResetForm from "./__components/password-reset-form";
import UserProfile from "./__components/user-profile";

function UserAccountPage() {
	return (
		<>
			<div className="px-10 mb-10 mt-5">
				<h1 className="text-4xl font-bold">Profile</h1>
			</div>

			<div className="px-10 mb-20">
				<div className="card border">
					<div className="card-body">
						<ul>
							<UserProfile />
						</ul>
					</div>
				</div>
			</div>

			<div className="px-10 mb-20">
				<div className="card border">
					<div className="card-body">
						<PasswordResetForm />
					</div>
				</div>
			</div>
		</>
	);
}

export default UserAccountPage;
