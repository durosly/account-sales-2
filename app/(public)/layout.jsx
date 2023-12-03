import { options } from "@/auth/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { SlBell, SlEnvolope, SlLogin, SlMenu } from "react-icons/sl";
import HandleNotificationTopic from "../components/handle-notification-topic";
import LogoutBtn from "../components/logout-btn";
import { NavigationEvents } from "../components/navigation-event";
import NavLinks from "./__components/nav-links";
import ShowNotificationStatus from "./__components/show-notification-status";

export const dynamic = "force-dynamic";

async function PublicLayout({ children }) {
	const session = await getServerSession(options);

	return (
		<div className="drawer max-md:block">
			<input
				id="my-drawer-3"
				type="checkbox"
				className="drawer-toggle"
			/>
			{session?.user ? (
				<HandleNotificationTopic topic={"regular"} />
			) : null}
			<NavigationEvents />
			<div className="drawer-content flex flex-col">
				{/* Navbar */}
				<div
					className={`w-full navbar ${session?.user && "border-b"} `}
				>
					<div className="navbar-start">
						<div className="flex-none lg:hidden">
							<label
								htmlFor="my-drawer-3"
								aria-label="open sidebar"
								className="btn btn-sm btn-square btn-ghost"
							>
								<SlMenu className="inline-block w-5 h-5 stroke-current" />
							</label>
						</div>
						<div className=" px-2 mx-2 md:mr-20">
							<Link
								href={session?.user ? "/auth/user" : "/"}
								className="font-bold"
							>
								AccHub
							</Link>
						</div>
						<div className="flex-none hidden lg:block">
							<ul className="menu menu-horizontal">
								<NavLinks />
							</ul>
						</div>
					</div>
					<div className="navbar-end pr-5 space-x-4">
						{session?.user ? (
							<>
								<Link
									href="/auth/user/notifications"
									className="btn btn-ghost btn-circle"
								>
									<div className="indicator">
										<SlBell className="h-5 w-5" />
										<ShowNotificationStatus />
									</div>
								</Link>
								<div className="dropdown dropdown-end">
									<label
										tabIndex={0}
										className="btn btn-ghost btn-circle avatar"
									>
										<div className="w-10 rounded-full">
											<img
												alt="Tailwind CSS Navbar component"
												src="https://picsum.photos/200"
											/>
										</div>
									</label>
									<ul
										tabIndex={0}
										className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
									>
										<li>
											<Link href="/auth/user/account">
												Profile
											</Link>
										</li>

										<li>
											<LogoutBtn>Logout</LogoutBtn>
										</li>
									</ul>
								</div>
							</>
						) : (
							<>
								<Link
									href="/auth?action=signup"
									className="btn btn-sm md:btn-md btn-ghost max-sm:hidden"
								>
									Create Account
								</Link>
								<Link
									href="/auth?action=login"
									className="btn btn-sm md:btn-md btn-primary"
								>
									<SlLogin />
									Login
								</Link>
							</>
						)}
					</div>
				</div>
				{/* Page content here */}
				<main>{children}</main>

				<footer className="footer p-10 bg-base-200 text-base-content">
					<aside>
						<h2 className="text-4xl font-bold">AccHub</h2>
						<p>
							AccHub Ltd.
							<br />
							<span className="text-xs italic">
								Buy Verified Social Media Accounts
							</span>
						</p>
					</aside>
					<nav>
						<header className="footer-title">Services</header>
						<Link
							href="/services"
							className="link link-hover"
						>
							Facebook
						</Link>
						<Link
							href="/services"
							className="link link-hover"
						>
							Tiktok
						</Link>
						<Link
							href="/services"
							className="link link-hover"
						>
							Telegram
						</Link>
						<Link
							href="/services"
							className="link link-hover"
						>
							And many more...
						</Link>
					</nav>
					{/* <nav>
						<header className="footer-title">Company</header>
						<Link
							href="/nice"
							className="link link-hover"
						>
							About us
						</Link>
						<Link
							href="#"
							className="link link-hover"
						>
							Contact
						</Link>
						
					</nav> */}
					<nav>
						<header className="footer-title">Legal</header>
						<Link
							href="/terms"
							className="link link-hover"
						>
							Terms of use
						</Link>
						{/* <Link
							href="/nice"
							className="link link-hover"
						>
							Privacy policy
						</Link>
						<Link
							href="/nice"
							className="link link-hover"
						>
							Cookie policy
						</Link> */}
					</nav>
					<nav>
						<header className="footer-title">Contacts</header>
						<div className="flex flex-wrap gap-2">
							<SlEnvolope className="w-5 h-5" />
							<a href="mailto:support@acchub.net">
								support@acchub.net
							</a>
						</div>
					</nav>
				</footer>
			</div>
			<div className="drawer-side">
				<label
					htmlFor="my-drawer-3"
					aria-label="close sidebar"
					className="drawer-overlay"
				></label>
				<div className="menu p-4 w-80 min-h-full bg-base-200">
					<h2 className="text-xl font-bold text-center">AccHub</h2>
					<ul>
						{/* Sidebar content here */}
						<NavLinks />
					</ul>
				</div>
			</div>
		</div>
	);
}

export default PublicLayout;
