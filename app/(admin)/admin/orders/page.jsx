import Link from "next/link";
import DisplayOrders from "./__components/display-orders";

function OrdersPage() {
	return (
		<>
			<div className="border-b p-5 mb-10">
				<h2 className="text-xl font-bold">Orders</h2>
			</div>

			<div className="px-10 flex flex-wrap gap-5 mb-10">
				<Link
					className="border p-3 rounded-xl"
					href="/admin/orders?q=all"
				>
					All
				</Link>
				<Link
					className="border p-3 rounded-xl"
					href="/admin/orders?q=success"
				>
					Completed
				</Link>
				<Link
					className="border p-3 rounded-xl"
					href="/admin/orders?q=pending"
				>
					Pending
				</Link>
				<Link
					className="border p-3 rounded-xl"
					href="/admin/orders?q=cancel"
				>
					Cancelled
				</Link>
			</div>

			<DisplayOrders />
		</>
	);
}

export default OrdersPage;
