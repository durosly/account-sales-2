import NavLink from "@/app/components/active-links";
import DisplayOrders from "./__components/display-orders";
import { TiInfoOutline } from "react-icons/ti";

function OrdersPage() {
	return (
		<>
			<div className="px-10 mb-20 mt-5">
				<h1 className="text-4xl font-bold">Orders Page</h1>
			</div>

			<div className="px-5 sm:px-10 flex flex-wrap gap-2 sm:gap-5 mb-10">
				<NavLink
					path="/auth/user/orders?q=all"
					className={"border max-sm:text-xs p-2 sm:p-3 rounded-xl"}
					activeClassName={"bg-primary/25"}
				>
					All
				</NavLink>
				<NavLink
					className="border max-sm:text-xs p-2 sm:p-3 rounded-xl"
					path="/auth/user/orders?q=success"
					activeClassName={"bg-primary/25"}
				>
					Completed
				</NavLink>
				<NavLink
					className="border max-sm:text-xs p-2 sm:p-3 rounded-xl"
					path="/auth/user/orders?q=pending"
					activeClassName={"bg-primary/25"}
				>
					Pending
				</NavLink>
				<NavLink
					className="border max-sm:text-xs p-2 sm:p-3 rounded-xl"
					path="/auth/user/orders?q=cancel"
					activeClassName={"bg-primary/25"}
				>
					Cancelled
				</NavLink>
			</div>

			<div className="my-10 px-5 relative ">
				<h2 className="text-center mb-2">
					How to setup facebook account after purchase
				</h2>
				<video
					src="/videos/fb-tut.mp4"
					className="aspect-video max-h-48 mx-auto"
					controls
				/>
				<p className="text-center text-xs italic">
					Play on fullscreen to get a better view
				</p>
			</div>

			<div className="px-10 mb-10">
				<div className="px-5 rounded-box text-sm flex gap-3 flex-wrap items-center bg-base-200 py-10">
					<TiInfoOutline className="h-5 w-5" />
					<p>
						For Email and 2fa, please visit{" "}
						<a
							href="https://smvmail.com"
							target="_blank"
							className="link link-primary"
						>
							smvmail.com
						</a>
					</p>
				</div>
			</div>
			<DisplayOrders />
		</>
	);
}

export default OrdersPage;
