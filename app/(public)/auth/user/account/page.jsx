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
				<div className="card border shadow">
					<div className="card-body">
						<form action="">
							<div className="form-control">
								<label
									htmlFor="current-password"
									className="label"
								>
									Current password
								</label>
								<input
									type="password"
									name="cpassword"
									id="current-password"
									className="input input-bordered"
								/>
							</div>
							<div className="form-control">
								<label
									htmlFor="new-password"
									className="label"
								>
									New password
								</label>
								<input
									type="password"
									name="cpassword"
									id="new-password"
									className="input input-bordered"
								/>
							</div>
							<div className="form-control mb-5">
								<label
									htmlFor="repeat-new-password"
									className="label"
								>
									Repeat new password
								</label>
								<input
									type="password"
									name="cpassword"
									id="repeat-new-password"
									className="input input-bordered"
								/>
							</div>

							<button className="btn btn-primary">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default UserAccountPage;
