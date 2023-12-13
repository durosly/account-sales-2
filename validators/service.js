import { z } from "zod";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";

export const CreateServiceSchema = z.object({
	name: z
		.string()
		.min(3, { message: "Name must be atleast three characters" })
		.trim(),
	price: z.coerce.number().gt(0),
	country: z.string().optional(),
	details: z.string(),
	category: z.custom((id) => {
		return isValidObjectId(id);
	}),
	subCategory: z.custom((id) => {
		return isValidObjectId(id);
	}),
});
