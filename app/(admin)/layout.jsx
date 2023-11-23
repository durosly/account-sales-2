import Link from "next/link";
import { SlGrid, SlLayers, SlDrawer, SlLogout } from "react-icons/sl";
import LogoutBtn from "../components/logout-btn";
import "easymde/dist/easymde.min.css";
import { NavigationEvents } from "../components/navigation-event";

export const dynamic = "force-dynamic";

function AdminLayout({ children }) {
	return (
		<div className="drawer lg:drawer-open max-lg:block ">
			<input
				id="my-drawer-3"
				type="checkbox"
				className="drawer-toggle"
			/>
			<NavigationEvents />
			<div className="drawer-content">
				{/* mobile header navigation */}
				<div className="navbar border-b lg:hidden">
					<div className="flex-none">
						<label
							htmlFor="my-drawer-2"
							className="btn btn-square btn-ghost drawer-button lg:hidden"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-5 h-5 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								></path>
							</svg>
						</label>
					</div>
					<div className="flex-1">
						<Link
							href="/admin"
							className="btn btn-ghost"
						>
							Admin Dashboard
						</Link>
					</div>
					<div className="flex-none">
						<button className="btn btn-square btn-ghost">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								className="inline-block w-5 h-5 stroke-current"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
								></path>
							</svg>
						</button>
					</div>
				</div>
				{/* Page content here */}
				<main className="">{children}</main>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-2"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<div className="menu w-80 max-lg:bg-base-100 min-h-full border-r">
					<h1 className="text-xl font-bold p-4">Admin dashboard</h1>
					<ul>
						{/* Sidebar content here */}
						<li>
							<Link href="/admin">
								<SlGrid className="w-5 h-5" />
								<span>Dashboard</span>
							</Link>
						</li>
						<li>
							<Link href="/admin/orders">
								<SlLayers className="w-5 h-5" />
								<span>Orders</span>
							</Link>
						</li>
						<li>
							<Link href="/admin/services">
								<SlDrawer className="w-5 h-5" />
								<span>Services</span>
							</Link>
						</li>
						<li>
							<LogoutBtn>
								<SlLogout className="w-5 h-5" />
								<span>Logout</span>
							</LogoutBtn>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
}

export default AdminLayout;
