import Link from "next/link";
import DisplayOrders from "./__components/display-orders";

function OrdersPage() {
	return (
		<>
			<div className="px-10 mb-20 mt-5">
				<h1 className="text-4xl font-bold">Orders Page</h1>
			</div>

			<div className="px-10 flex flex-wrap gap-5 mb-20">
				<Link
					className="border p-5 rounded-2xl"
					href="/auth/user/orders?q=all"
				>
					All
				</Link>
				<Link
					className="border p-5 rounded-2xl"
					href="/auth/user/orders?q=success"
				>
					Completed
				</Link>
				<Link
					className="border p-5 rounded-2xl"
					href="/auth/user/orders?q=pending"
				>
					Pending
				</Link>
				<Link
					className="border p-5 rounded-2xl"
					href="/auth/user/orders?q=cancel"
				>
					Cancelled
				</Link>
			</div>

			<DisplayOrders />
		</>
	);
}

export default OrdersPage;
