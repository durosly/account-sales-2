import NavLink from "@/app/components/active-links";
import DisplayOrders from "./__components/display-orders";

function OrdersPage() {
	return (
		<>
			<div className="px-10 mb-20 mt-5">
				<h1 className="text-4xl font-bold">Orders Page</h1>
			</div>

			<div className="px-10 flex flex-wrap gap-5 mb-10">
				<NavLink
					path="/auth/user/orders?q=all"
					className={"border p-3 rounded-xl"}
					activeClassName={"bg-primary/25"}
				>
					All
				</NavLink>
				<NavLink
					className="border p-3 rounded-xl"
					path="/auth/user/orders?q=success"
					activeClassName={"bg-primary/25"}
				>
					Completed
				</NavLink>
				<NavLink
					className="border p-3 rounded-xl"
					path="/auth/user/orders?q=pending"
					activeClassName={"bg-primary/25"}
				>
					Pending
				</NavLink>
				<NavLink
					className="border p-3 rounded-xl"
					path="/auth/user/orders?q=cancel"
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
