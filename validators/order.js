import { z } from "zod";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";

export const CreateOrderSchema = z.object({
	quantity: z.coerce
		.number({ message: "Quantity must be a number" })
		.int({ message: "Quantity does not support floating point" })
		.gte(1, { message: "Quantity must be greater than zero" }),
	category: z.custom((id) => isValidObjectId(id), {
		message: "Invalid category specified",
	}),
	service: z.custom((id) => isValidObjectId(id), {
		message: "Invalid service specified",
	}),
});
