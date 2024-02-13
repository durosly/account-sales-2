import NavLink from "@/app/components/active-links";
import DisplayOrders from "./__components/display-orders";

function OrdersPage() {
	return (
		<>
			<div className="border-b p-5 mb-10">
				<h2 className="text-xl font-bold">Orders</h2>
			</div>

			<div className="px-10 flex flex-wrap gap-5 mb-10">
				<NavLink
					path="/admin/orders?q=all"
					className={"border p-3 rounded-xl"}
					activeClassName={"bg-primary/25"}
				>
					All
				</NavLink>
				<NavLink
					className="border p-3 rounded-xl"
					path="/admin/orders?q=success"
					activeClassName={"bg-primary/25"}
				>
					Completed
				</NavLink>
				<NavLink
					className="border p-3 rounded-xl"
					path="/admin/orders?q=pending"
					activeClassName={"bg-primary/25"}
				>
					Pending
				</NavLink>
				<NavLink
					className="border p-3 rounded-xl"
					path="/admin/orders?q=cancel"
					activeClassName={"bg-primary/25"}
				>
					Cancelled
				</NavLink>
			</div>

			<DisplayOrders />
		</>
	);
}

export default OrdersPage;
