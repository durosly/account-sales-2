"use client";
import { IoCartOutline } from "react-icons/io5";
import toast from "react-hot-toast";

function ServicePurchase() {
	return (
		<>
			<button
				className="btn btn-primary max-sm:btn-block"
				onClick={() => toast("Login to purchase")}
			>
				<IoCartOutline />
				Buy now
			</button>
		</>
	);
}

export default ServicePurchase;
