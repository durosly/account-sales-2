import { options } from "@/auth/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { SlBell, SlLogin, SlMenu } from "react-icons/sl";
import LogoutBtn from "../components/logout-btn";
import NavLinks from "./__components/nav-links";
import ShowNotificationStatus from "./__components/show-notification-status";

async function PublicLayout({ children }) {
	const session = await getServerSession(options);

	return (
		<div className="drawer max-md:block">
			<input
				id="my-drawer-3"
				type="checkbox"
				className="drawer-toggle"
			/>
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
						<div className=" px-2 mx-2 md:mr-20">Navbar Title</div>
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
						<svg
							width="50"
							height="50"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							fillRule="evenodd"
							clipRule="evenodd"
							className="fill-current"
						>
							<path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
						</svg>
						<p>
							ACME Industries Ltd.
							<br />
							Providing reliable tech since 1992
						</p>
					</aside>
					<nav>
						<header className="footer-title">Services</header>
						<Link
							href="/nice"
							className="link link-hover"
						>
							Branding
						</Link>
						<Link
							href="/nice"
							className="link link-hover"
						>
							Design
						</Link>
						<Link
							href="/nice"
							className="link link-hover"
						>
							Marketing
						</Link>
						<Link
							href="/nice"
							className="link link-hover"
						>
							Advertisement
						</Link>
					</nav>
					<nav>
						<header className="footer-title">Company</header>
						<Link
							href="/nice"
							className="link link-hover"
						>
							About us
						</Link>
						<Link
							href="/nice"
							className="link link-hover"
						>
							Contact
						</Link>
						<Link
							href="/nice"
							className="link link-hover"
						>
							Jobs
						</Link>
						<Link
							href="/nice"
							className="link link-hover"
						>
							Press kit
						</Link>
					</nav>
					<nav>
						<header className="footer-title">Legal</header>
						<Link
							href="/nice"
							className="link link-hover"
						>
							Terms of use
						</Link>
						<Link
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
						</Link>
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
					<h2 className="text-xl font-bold text-center">SalesMart</h2>
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
