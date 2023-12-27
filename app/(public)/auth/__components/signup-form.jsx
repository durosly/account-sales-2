"use client";
import { handleClientError } from "@/lib/utils";
import { UserSignupSchema } from "@/validators/signup";
import axios from "axios";
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
				router.push("/auth?action=login");
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
			className="signup-form"
			onSubmit={handleSubmit}
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
					<SlUser className="absolute left-4 top-1/2 -translate-y-1/2 fill-black" />
					<input
						type="text"
						name="name"
						id="name"
						className="input w-full input-bordered font-bold pl-11"
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
					<SlEnvolope className="absolute left-4 top-1/2 -translate-y-1/2 fill-black" />
					<input
						type="email"
						name="email"
						id="s-email"
						className="input w-full input-bordered font-bold pl-11"
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
					<SlLock className="absolute left-4 top-1/2 -translate-y-1/2 fill-black" />
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
						className="absolute right-4 top-1/2 -translate-y-1/2 fill-black"
						type="button"
					>
						{show ? <BsEyeSlash /> : <BsEye />}
					</button>
				</div>
			</div>
			<button
				disabled={isLoading}
				className="btn btn-primary btn-wide !rounded-xl"
			>
				Signup
			</button>
		</form>
	);
}

export default SignupForm;
