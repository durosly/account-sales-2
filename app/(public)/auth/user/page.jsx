import { options } from "@/auth/options";
import { getServerSession } from "next-auth";
import { SlWallet } from "react-icons/sl";
import { TiInfoOutline } from "react-icons/ti";
import Categories from "./__components/categories";
import UserBalance from "./__components/user-balance";

async function UserDashboardPage() {
	const session = await getServerSession(options);
	return (
		<>
			<div className="px-10 mb-10 mt-5 max-w-4xl mx-auto">
				<h1 className="text-sm font-bold">
					Welcome, {session.user.name}
				</h1>
			</div>

			<div className="flex flex-wrap gap-10 max-w-4xl mx-auto mb-20 px-10">
				<div className="flex-1 flex items-center gap-5 p-5 rounded-xl border">
					<SlWallet className="w-8 h-8" />
					<div>
						<p className="text-sm uppercase">Account balance</p>
						<UserBalance />
					</div>
				</div>
			</div>

			<div className="px-10 mb-10">
				<div className="px-5 rounded-box text-sm flex gap-3 flex-wrap items-center bg-base-200 py-10">
					<TiInfoOutline className="h-5 w-5" />
					<p>
						For Email and 2fa, please visit{" "}
						<a
							href="https://smvaults.xyz"
							target="_blank"
							className="link link-primary"
						>
							smvaults.xyz
						</a>
					</p>
				</div>
			</div>

			<div className="px-10 max-w-4xl mx-auto mb-20">
				<h2 className="text-4xl font-bold mb-5 text-center capitalize">
					Products and services
				</h2>
				{/* <OrderForm /> */}
				<Categories />
			</div>
		</>
	);
}

export default UserDashboardPage;
