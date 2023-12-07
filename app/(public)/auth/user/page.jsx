import { SlChart, SlTrophy, SlWallet } from "react-icons/sl";
import { options } from "@/auth/options";
import { getServerSession } from "next-auth";
import OrderForm from "./__components/order-form";
import UserBalance from "./__components/user-balance";
import UserOrdersCount from "./__components/user-orders-count";
import Categories from "./__components/categories";

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
						<UserBalance />
						<p className="text-sm uppercase">Account balance</p>
					</div>
				</div>
			</div>

			<div className="px-10 max-w-4xl mx-auto mb-20">
				<h2 className="text-4xl font-bold mb-5 text-center">
					Products and services
				</h2>
				{/* <OrderForm /> */}
				<Categories />
			</div>
		</>
	);
}

export default UserDashboardPage;
