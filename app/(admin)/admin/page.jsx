import { SlPeople, SlChart } from "react-icons/sl";
import NumberOfUsers from "./__components/number-of-users";
import NumberOfOrders from "./__components/number-of-orders";

function AdminDashboard() {
	return (
		<>
			<div className="flex flex-wrap gap-5 p-5">
				<div className="flex-1 flex gap-2 border p-2 rounded">
					<div>
						<h2 className="text-sm">Users</h2>
						{/* <p className="text-4xl font-bold">2,000</p> */}
						<NumberOfUsers />
					</div>
					<div className="flex aspect-square bg-primary p-5 ml-auto rounded">
						<SlPeople className="w-10 h-10 m-auto" />
					</div>
				</div>
				<div className="flex-1 flex gap-2 border p-2 rounded">
					<div>
						<h2 className="text-sm">Orders</h2>
						{/* <p className="text-4xl font-bold">210,000</p> */}
						<NumberOfOrders />
					</div>
					<div className="flex aspect-square bg-accent p-5 ml-auto rounded">
						<SlChart className="w-10 h-10 m-auto" />
					</div>
				</div>
			</div>
		</>
	);
}

export default AdminDashboard;
