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
		<form action="/login" className="bg-base-200 p-8 rounded-md" onSubmit={makeLoginRequest}>
			<h2 className="text-2xl font-bold mb-5">Login</h2>
			<div className="form-control">
				<label htmlFor="email" className="label">
					<span className="label-text">E-mail</span>
				</label>
				<div className="relative">
					<SlEnvolope className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
					<input
						type="text"
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
				<label htmlFor="password" className="label">
					<span className="label-text">Password</span>
				</label>
				<div className="relative">
					<SlLock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
					<input
						type={show ? "text" : "password"}
						name="password"
						id="password"
						className="input input-bordered w-full font-bold pl-11 pr-11"
						placeholder="Passowrd..."
						value={info.password}
						onChange={(e) =>
							setInfo({
								...info,
								[e.target.name]: e.target.value,
							})
						}
					/>

					<button onClick={() => setShow((prev) => !prev)} className="absolute right-4 top-1/2 -translate-y-1/2 text-black" type="button">
						{show ? <BsEyeSlash className="opacity-50" /> : <BsEye className="opacity-50" />}
					</button>
				</div>
			</div>
			<div className="text-center mb-5">
				<button disabled={isLoading} className="btn btn-primary btn-block">
					Login
				</button>
			</div>
			<p className="mt-5 text-sm">
				Don&apos;t have an account?{" "}
				<Link href="/auth/signup" className="link link-primary">
					Signup
				</Link>
				.
			</p>

			<div className="text-center">
				<Link href="/auth/forgot-password" className="link text-sm">
					Forgot password?
				</Link>
			</div>
		</form>
	);
}

export default LoginForm;
