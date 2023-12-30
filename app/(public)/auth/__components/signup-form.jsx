"use client";
import { handleClientError } from "@/lib/utils";
import { UserSignupSchema } from "@/validators/signup";
import { signIn } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { SlEnvolope, SlLock, SlUser } from "react-icons/sl";

function SignupForm() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [show, setShow] = useState(false);
	const [inputs, setInputs] = useState({
		email: "",
		name: "",
		password: "",
	});

	async function handleSubmit(e) {
		e.preventDefault();
		if (isLoading) return;
		setIsLoading(true);
		const toastId = toast.loading("Signing up...");
		try {
			const data = UserSignupSchema.safeParse(inputs);

			if (!data.success) {
				throw new Error(data.error.issues[0].message);
			}

			const response = await axios.post("/api/auth/signup", {
				...data.data,
			});

			const resData = response.data;

			if (resData.status) {
				toast.success("Signup successful. Login to continue", {
					id: toastId,
				});
				// localStorage.setItem("VERIFICATION_EMAIL", data.data.email);
				// router.push("/auth?action=login");
				// setInputs({
				// 	email: "",
				// 	name: "",
				// 	password: "",
				// });

				setIsLoading(true);

				const res = await signIn("credentials", {
					redirect: false,
					...{ email: inputs.email, password: inputs.password },
				});

				if (res && res.ok && !res?.error) {
					toast.success("Login successful", { id: toastId });
					router.push("/auth/user");
					router.refresh();
					// setIsLoading(false);
				}
			} else {
				throw new Error(resData.message);
			}
		} catch (error) {
			const message = handleClientError(error);
			toast.error(message, { id: toastId });
			setIsLoading(false);
		}
	}

	return (
		<form
			action="/signup"
			onSubmit={handleSubmit}
			className="bg-base-200 p-8 rounded-md"
		>
			<h2 className="text-2xl font-bold mb-5">Sign Up</h2>
			<div className="form-control">
				<label
					htmlFor="name"
					className="label"
				>
					<span className="label-text">Fullname</span>
				</label>
				<div className="relative">
					<SlUser className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
					<input
						type="text"
						name="name"
						id="name"
						className="input w-full input-bordered font-bold pl-11"
						placeholder="John Nice..."
						value={inputs.name}
						onChange={(e) =>
							setInputs({
								...inputs,
								[e.target.name]: e.target.value,
							})
						}
						disabled={isLoading}
					/>
				</div>
			</div>
			<div className="form-control">
				<label
					htmlFor="s-email"
					className="label"
				>
					<span className="label-text">E-mail</span>
				</label>
				<div className="relative">
					<SlEnvolope className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
					<input
						type="email"
						name="email"
						id="s-email"
						className="input w-full input-bordered font-bold pl-11"
						placeholder="nice@gmail.com..."
						value={inputs.email}
						onChange={(e) =>
							setInputs({
								...inputs,
								[e.target.name]: e.target.value,
							})
						}
						disabled={isLoading}
					/>
				</div>
			</div>
			<div className="form-control mb-5">
				<label
					htmlFor="s-password"
					className="label"
				>
					<span className="label-text">Password</span>
				</label>
				<div className="relative">
					<SlLock className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
					<input
						name="password"
						id="s-password"
						className="input input-bordered w-full font-bold px-11"
						type={show ? "text" : "password"}
						placeholder="Password..."
						value={inputs.password}
						onChange={(e) =>
							setInputs({
								...inputs,
								[e.target.name]: e.target.value,
							})
						}
						disabled={isLoading}
					/>
					<button
						onClick={() => setShow((prev) => !prev)}
						className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50"
						type="button"
					>
						{show ? (
							<BsEyeSlash className="opacity-50" />
						) : (
							<BsEye className="opacity-50" />
						)}
					</button>
				</div>
			</div>
			<button
				disabled={isLoading}
				className="btn btn-primary btn-block"
			>
				Signup
			</button>

			<p className="mt-5 text-sm">
				Already have an account?{" "}
				<Link
					href="/auth"
					className="link link-primary"
				>
					Login
				</Link>
				.
			</p>
		</form>
	);
}

export default SignupForm;
