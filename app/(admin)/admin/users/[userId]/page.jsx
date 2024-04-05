import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import { notFound } from "next/navigation";
import DisplayNotifications from "./__componennts/display-notifications";

async function UserDetailsPage({ params: { userId } }) {
	let user = null;

	try {
		await connectMongo();
		user = await UserModel.findById(userId);
	} catch (error) {
		notFound();
	}

	if (!user) notFound();

	return (
		<>
			<div className="border-b p-5 mb-10">
				<h2 className="text-xl font-bold">{user.name}</h2>
			</div>

			<div className="px-10 mb-20">
				<div className="card border">
					<div className="card-body">
						<ul>
							<li className="flex gap-2">
								<span>Name:</span>
								<span className="font-bold">{user.name}</span>
							</li>
							<li className="flex gap-2">
								<span>Email:</span>
								<span className="font-bold">{user.email}</span>
							</li>
						</ul>
					</div>
				</div>
			</div>

			<div className="divider">Notifications</div>

			<DisplayNotifications userId={userId} />
		</>
	);
}

export default UserDetailsPage;
