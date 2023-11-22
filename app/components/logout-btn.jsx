"use client";
import { signOut } from "next-auth/react";

function LogoutBtn(props) {
	return (
		<span
			onClick={() => signOut()}
			className={props.className}
		>
			{props.children}
		</span>
	);
}

export default LogoutBtn;
