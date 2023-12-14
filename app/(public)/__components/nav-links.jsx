import { options } from "@/auth/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { TbSocial } from "react-icons/tb";
import { FaWhatsapp } from "react-icons/fa";
import { FaTelegram } from "react-icons/fa";
import { FiLink } from "react-icons/fi";
import {
	SlDrawer,
	SlQuestion,
	SlLogin,
	SlPeople,
	SlBasket,
	SlCreditCard,
} from "react-icons/sl";

async function NavLinks() {
	const session = await getServerSession(options);
	return (
		<>
			{session?.user ? (
				<>
					<li>
						<Link href="/auth/user">
							<SlDrawer className="w-5 h-5 lg:hidden" />
							<span>Dashboard</span>
						</Link>
					</li>
					<li>
						<Link href="/auth/user/orders?q=all">
							<SlBasket className="w-5 h-5 lg:hidden" />
							<span>Orders</span>
						</Link>
					</li>
					<li>
						<Link href="/auth/user/funds">
							<SlCreditCard className="w-5 h-5 lg:hidden" />
							<span>Fund account</span>
						</Link>
					</li>
				</>
			) : (
				<>
					<li>
						<Link href="/auth?action=login">
							<SlLogin className="w-5 h-5 lg:hidden" />
							<span>Login</span>
						</Link>
					</li>
					<li>
						<Link href="/auth?action=signup">
							<SlPeople className="w-5 h-5 lg:hidden" />
							<span>Signup</span>
						</Link>
					</li>
				</>
			)}

			{session?.user && (
				<li className="lg:hidden">
					<h2 className="menu-title flex items-center gap-4 px-1.5">
						<span className="text-base-content">
							<FiLink className="w-5 h-5 text-blue-500" />
						</span>{" "}
						Info
					</h2>
				</li>
			)}

			<li>
				<Link href="/services">
					<SlDrawer className="w-5 h-5 lg:hidden" />
					<span>Services</span>
				</Link>
			</li>

			<li>
				<Link href="/terms">
					<SlQuestion className="w-5 h-5 lg:hidden" />
					<span>Terms</span>
				</Link>
			</li>
			<li className="lg:hidden">
				<h2 className="menu-title flex items-center gap-4 px-1.5">
					<span className="text-base-content">
						<TbSocial className="w-5 h-5 text-green-500" />
					</span>{" "}
					Socials
				</h2>
			</li>
			<li className="lg:hidden">
				<Link href="https://wa.link/bg6hpy">
					<FaWhatsapp className="w-5 h-5" />
					<span>WhatsApp</span>
				</Link>
			</li>
			<li className="lg:hidden">
				<Link href="https://t.me/Smvaults">
					<FaTelegram className="w-5 h-5" />
					<span>Telegram</span>
				</Link>
			</li>
		</>
	);
}

export default NavLinks;
