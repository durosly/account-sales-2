"use client";
import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import toast from "react-hot-toast";
import { usePaystackPayment } from "react-paystack";

function FundAccountForm({ user }) {
	const [amt, setAmt] = useState("");

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (ref) => {
			console.log(ref, amt);
			toastId.current = toast.loading("Creating fund request...");
			return axios.post("/api/user/fund", { ref, amt });
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished

		onSuccess: () => {
			setAmt("");
			toast.success("Request created", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	const config = {
		email: user?.email || "none@gmail.com",
		amount: amt * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
		publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
		metadata: {
			custom_fields: [
				{
					display_name: "user name",
					variable_name: "user_name",
					value: user?.name || "nil",
				},
				{
					display_name: "user ID",
					variable_name: "user_id",
					value: user?.id || null,
				},
			],
		},
	};

	const initializePayment = usePaystackPayment(config);
	function onSuccess(reference) {
		// makeRegistrationRequest(reference);
		console.log(reference);
		if (reference.status === "success") {
			mutate(reference.reference, amt);
		}
	}

	function onClose() {
		console.log("...closed...");
	}

	function initPayment(e) {
		e.preventDefault();
		if (!amt) {
			toast.error("Enter amount");
			return;
		}

		if (isPending) return;

		initializePayment(onSuccess, onClose);
	}

	return (
		<form
			onSubmit={initPayment}
			className="max-w-md mx-auto border p-5 rounded-2xl"
		>
			<div className="form-control">
				<CurrencyInput
					id="amount"
					name="amount"
					placeholder="Amount..."
					decimalsLimit={2}
					disabled={isPending}
					className="input input-bordered"
					value={amt}
					onValueChange={(value) => setAmt(value)}
				/>

				<button
					disabled={isPending}
					className="btn btn-primary btn-block mt-5"
				>
					Pay now
				</button>
			</div>
		</form>
	);
}

export default FundAccountForm;
