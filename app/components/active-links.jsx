"use client";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function NavLink({ children, path, className, activeClassName }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const url = `${pathname}?${searchParams}`;
	return (
		<Link
			href={path}
			className={`${className} ${url === path ? activeClassName : ""}`}
		>
			{children}
		</Link>
	);
}

export default NavLink;
