"use client";
import PinField from "react-pin-field";
import toast from "react-hot-toast";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { handleClientError } from "@/lib/utils";
import { useRouter } from "next/navigation";

function VerificationForm() {
	const router = useRouter();
	const ref = useRef(null);
	const [pin, setPin] = useState("");
	const [isComplete, setIsComplete] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (ref.current) {
			ref.current[0].focus();
		}
	}, []);

	async function verifyEmail(e) {
		e.preventDefault();

		setIsLoading(true);
		try {
			const res = await axios.put("/api/auth/email-verification", {
				code: pin,
				email: localStorage.getItem("VERIFICATION_EMAIL"),
			});

			if (res.statusText !== "OK") {
				throw new Error("Something went wrong");
			}

			//
			localStorage.removeItem("VERIFICATION_EMAIL");
			toast.success("Success");
			router.push("/email-verification/success");
			// setIsLoading(false);
		} catch (error) {
			const message = handleClientError(error);
			toast.error(message);
			setIsLoading(false);
		}
	}
	async function resendEmail() {
		setIsLoading(true);
		const toastId = toast.loading("Sending...");
		try {
			const res = await axios.put("/api/auth/email-verification/resend", {
				email: localStorage.getItem("VERIFICATION_EMAIL"),
			});

			if (res.statusText !== "OK") {
				throw new Error("Something went wrong");
			}

			toast.success("E-mail sent", { id: toastId });
		} catch (error) {
			const message = handleClientError(error);
			toast.error(message, { id: toastId });
		} finally {
			setIsLoading(false);
		}
	}
	return (
		<>
			<form
				onSubmit={verifyEmail}
				className="space-y-5"
			>
				<div className="flex justify-center gap-4">
					<PinField
						length={4}
						validate={/^[0-9]$/}
						className={`input ${
							isComplete ? "input-success" : "input-bordered"
						}  w-16 h-w-16 aspect-square text-center`}
						onChange={(code) => {
							if (code.length < 4) setIsComplete(false);
							setPin(code);
						}}
						onComplete={() => setIsComplete(true)}
						ref={ref}
					/>
				</div>

				<div className="text-right">
					<button
						disabled={!isComplete || isLoading}
						className="btn btn-block btn-primary"
					>
						{isLoading ? (
							<>
								<span className="loading loading-spinner"></span>
								loading
							</>
						) : (
							"Submit"
						)}
					</button>
				</div>
			</form>
			<p>
				Didn&apos;t get code?{" "}
				<button
					disabled={isLoading}
					onClick={resendEmail}
					className="link link-hover"
				>
					Resend
				</button>
			</p>
		</>
	);
}

export default VerificationForm;
