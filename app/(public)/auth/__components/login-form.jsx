"use client";
import { handleClientError } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { SlEnvolope, SlLock } from "react-icons/sl";
import { BsEye, BsEyeSlash } from "react-icons/bs";

function LoginForm() {
	const router = useRouter();
	const [info, setInfo] = useState({ email: "", password: "" });
	const [show, setShow] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	async function makeLoginRequest(e) {
		e.preventDefault();
		if (isLoading) return;
		const toastId = toast.loading("Logging in...");

		try {
			setIsLoading(true);
			const res = await signIn("credentials", {
				redirect: false,
				...info,
			});

			if (res && res.ok && !res?.error) {
				toast.success("Login successful", { id: toastId });
				router.push("/auth/user");
				router.refresh();
				// setIsLoading(false);
			} else {
				if (res?.error?.includes("E-mail is not verified")) {
					localStorage.setItem("VERIFICATION_EMAIL", info.email);

					router.push("/email-verification");
				}
				throw new Error(res?.error || "Something went wrong");
			}
		} catch (error) {
			const message = handleClientError(error);
			toast.error(message, { id: toastId });
			setIsLoading(false);
		}
	}

	return (
		<form
			action="/login"
			className="login-form mb-5"
			onSubmit={makeLoginRequest}
		>
			<h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
			<div className="form-control">
				<label htmlFor="email">E-mail</label>
				<div className="relative">
					<SlEnvolope className="absolute left-4 top-1/2 -translate-y-1/2 fill-black" />
					<input
						type="email"
						name="email"
						id="email"
						placeholder="john@doe.com..."
						className="input input-bordered w-full text-black font-bold pl-11"
						value={info.email}
						onChange={(e) =>
							setInfo({
								...info,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
			</div>
			<div className="form-control mb-5">
				<label
					htmlFor="password"
					className="label"
				>
					Password
				</label>
				<div className="relative">
					<SlLock className="absolute left-4 top-1/2 -translate-y-1/2 fill-black" />
					<input
						type={show ? "text" : "password"}
						name="password"
						id="password"
						className="input input-bordered w-full text-black font-bold pl-11"
						placeholder="Passowrd..."
						value={info.password}
						onChange={(e) =>
							setInfo({
								...info,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>
			</div>
			<div className="text-right">
				<button
					onClick={() => setShow((prev) => !prev)}
					className="btn btn-xs"
					type="button"
				>
					{show ? <BsEyeSlash /> : <BsEye />}
				</button>
			</div>
			<div className="text-center">
				<button
					disabled={isLoading}
					className="btn btn-neutral btn-wide !rounded-xl"
				>
					Login
				</button>
			</div>
			<div className="text-center">
				<Link
					href="/forgot-password"
					className="link"
				>
					Forgot password?
				</Link>
			</div>
		</form>
	);
}

export default LoginForm;
