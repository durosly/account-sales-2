"use client";
import { handleClientError } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import commaNumber from "comma-number";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { useRef, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import toast from "react-hot-toast";

function FundAccountForm({ user, rate }) {
	const [amt, setAmt] = useState("");

	let toastId = useRef(null);

	const { isPending, mutate } = useMutation({
		mutationFn: (ref) => {
			toastId.current = toast.loading("Creating fund request...");
			return axios.post("/api/user/fund", { ref, amt });
		},
		// make sure to _return_ the Promise from the query invalidation
		// so that the mutation stays in `pending` state until the refetch is finished

		onSuccess: () => {
			toast.success("Request created", { id: toastId.current });
		},
		onError: (error) => {
			const message = handleClientError(error);
			toast.error(message, { id: toastId.current });
		},
	});

	const config = {
		public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY,
		tx_ref: Date.now(),
		amount: amt * rate.amount,
		currency: "NGN",
		payment_options: "card,mobilemoney,ussd,banktransfer",
		customer: {
			email: user?.email || "none@gmail.com",
			name: user?.name || "nil",
		},
		customizations: {
			title: "Fund account",
			description: "Payment for funding of user account",
			logo: "https://www.smvaults.com/favicon.ico",
		},
		meta: {
			customer_id: user?.id || null,
		},
	};

	const handleFlutterPayment = useFlutterwave(config);

	function initPayment(e) {
		e.preventDefault();
		if (!amt) {
			toast.error("Enter amount");
			return;
		}

		if (isPending) return;

		handleFlutterPayment({
			callback: () => {
				setTimeout(() => {
					closePaymentModal(); // this will close the modal programmatically
				}, 7000);
			},
			onClose: () => {},
		});
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
					placeholder="Amount (USD)..."
					decimalsLimit={2}
					disabled={isPending}
					className="input input-bordered"
					value={amt}
					onValueChange={(value) => setAmt(value)}
				/>
				{amt && (
					<p className="text-xs ml-2 mt-2">
						&#8358;
						{commaNumber(amt * rate.amount)}
					</p>
				)}

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
