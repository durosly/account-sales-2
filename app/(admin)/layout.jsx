import Link from "next/link";
import { SlGrid, SlLayers, SlDrawer, SlLogout, SlGhost, SlSocialFacebook, SlTarget, SlBell, SlBulb } from "react-icons/sl";
import LogoutBtn from "../components/logout-btn";
import "easymde/dist/easymde.min.css";
import { NavigationEvents } from "../components/navigation-event";
import { FaTimes } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";
import HandleNotificationTopic from "../components/handle-notification-topic";
import { AiOutlineNotification } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";

export const dynamic = "force-dynamic";

async function AdminLayout({ children }) {
	const session = await getServerSession(options);
	return (
		<div className="drawer lg:drawer-open max-lg:block ">
			<input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
			<HandleNotificationTopic topic={"admin"} />
			<NavigationEvents />
			<div className="drawer-content">
				{/* mobile header navigation */}
				<div className="navbar border-b lg:hidden">
					<div className="flex-none">
						<label htmlFor="my-drawer-3" className="btn btn-square btn-ghost drawer-button lg:hidden">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
							</svg>
						</label>
					</div>
					<div className="flex-1">
						<Link href="/admin" className="btn btn-ghost">
							Admin Dashboard
						</Link>
					</div>
					<div className="flex-none">
						<button className="btn btn-square btn-ghost">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current">
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
							</svg>
						</button>
					</div>
				</div>
				{/* Page content here */}
				<main className="">{children}</main>
			</div>
			<div className="drawer-side">
				<label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
				<div className="menu w-80 max-lg:bg-base-100 min-h-full border-r relative">
					<label htmlFor="my-drawer-3" aria-label="close sidebar" className="btn btn-xs btn-ghost absolute right-5 top-5 lg:hidden">
						<FaTimes />
					</label>
					<h1 className="text-xl font-bold p-4">Admin dashboard</h1>
					<ul>
						{/* Sidebar content here */}
						{session.user.account_type === "admin" ? (
							<>
								<li>
									<Link href="/admin">
										<SlGrid className="w-5 h-5" />
										<span>Dashboard</span>
									</Link>
								</li>
							</>
						) : null}

						<li>
							<Link href="/admin/orders?q=all">
								<SlLayers className="w-5 h-5" />
								<span>Orders</span>
							</Link>
						</li>

						{session.user.account_type === "admin" ? (
							<>
								<li>
									<Link href="/admin/services">
										<SlDrawer className="w-5 h-5" />
										<span>Services</span>
									</Link>
								</li>
								<li>
									<details open>
										<summary>
											<AiOutlineNotification className="w-5 h-5" /> <span>Notifications</span>
										</summary>
										<ul>
											<li>
												<Link href="/admin/notifications">
													<SlBell className="w-5 h-5" />
													<span>Main</span>
												</Link>
											</li>
											<li>
												<Link href="/admin/top-notifications">
													<SlBulb className="w-5 h-5" />
													<span>Top</span>
												</Link>
											</li>
										</ul>
									</details>
								</li>

								<li>
									<Link href="/admin/currencies">
										<BsCurrencyDollar className="w-5 h-5" />
										<span>Currencies</span>
									</Link>
								</li>
								<li>
									<Link href="/admin/users">
										<BsPerson className="w-5 h-5" />
										<span>Users</span>
									</Link>
								</li>
								<li>
									<Link href="/admin/temp-users">
										<SlGhost className="w-5 h-5" />
										<span>Worker</span>
									</Link>
								</li>
								<li>
									<details open>
										<summary>
											<SlTarget className="w-5 h-5" /> <span>Dead accounts</span>
										</summary>
										<ul>
											<li>
												<Link href="/admin/dead-accounts/fb" className="text-error">
													<SlSocialFacebook className="w-5 h-5" />
													<span>Dead FB accounts</span>
												</Link>
											</li>
										</ul>
									</details>
								</li>
							</>
						) : null}

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
