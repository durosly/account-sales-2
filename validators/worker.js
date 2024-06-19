import { z } from "zod";

export const CreateWorkerSchema = z.object({
	username: z.string().min(3, { message: "Name must be atleast three characters" }).trim(),
	password: z.string().min(5, { message: "Password is too short" }),
});
