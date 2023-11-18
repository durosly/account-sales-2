import { SlChart, SlTrophy, SlWallet } from "react-icons/sl";
import OrderForm from "./__components/order-form";
import UserBalance from "./__components/user-balance";

function UserDashboardPage() {
	return (
		<>
			<div className="px-10 mb-10 mt-5 max-w-4xl mx-auto">
				<h1 className="text-sm font-bold">Welcome, John Doe</h1>
			</div>

			<div className="flex flex-wrap gap-10 max-w-4xl mx-auto mb-20 px-10">
				<div className="flex-1 flex gap-5 p-10 rounded-xl border">
					<SlWallet className="w-10 h-10" />
					<div>
						<UserBalance />
						<p className="text-sm uppercase">Account balance</p>
					</div>
				</div>
				<div className="flex-1 flex gap-5 p-10 rounded-xl border">
					<SlChart className="w-10 h-10" />
					<div>
						<p className="text-3xl font-semibold">2,000.00</p>
						<p className="text-sm uppercase">Completed Orders</p>
					</div>
				</div>
				{/* <div className="flex-1 flex gap-5 p-10 rounded-xl shadow border">
					<SlTrophy className="w-10 h-10" />
					<div>
						<p className="text-3xl font-semibold uppercase">New</p>
						<p className="text-sm uppercase">Account Level</p>
					</div>
				</div> */}
			</div>

			<div className="px-10 max-w-4xl mx-auto mb-20">
				<h2 className="text-4xl font-bold mb-5">New Order</h2>
				<OrderForm />
			</div>
		</>
	);
}

export default UserDashboardPage;
