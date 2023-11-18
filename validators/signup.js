import { z } from "zod";

export const UserSignupSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be atleast three characters" })
		.trim(),
	email: z.string().email({ message: "Invalid email address" }).trim(),

	password: z.string().min(5, { message: "Password is too short" }),
});
