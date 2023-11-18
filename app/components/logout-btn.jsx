"use client";
import { signOut } from "next-auth/react";

function LogoutBtn(props) {
	return (
		<a
			onClick={() => signOut()}
			className={props.className}
		>
			{props.children}
		</a>
	);
}

export default LogoutBtn;
