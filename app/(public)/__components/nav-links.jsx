import { options } from "@/auth/options";
import { getServerSession } from "next-auth";
import Link from "next/link";
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
						<Link href="/auth/user/orders">
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
		</>
	);
}

export default NavLinks;
