import connectMongo from "@/lib/connectDB";
import ServiceModel from "@/models/service";
import { CreateServiceSchema } from "@/validators/service";
import { NextResponse } from "next/server";

async function createService(request) {
	try {
		const body = await request.json();

		const valid = CreateServiceSchema.safeParse(body);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		await connectMongo();

		const service = await ServiceModel.create({
			name: valid.data.name,
			categoryId: valid.data.category,
			price: valid.data.price,
		});

		return NextResponse.json({
			status: false,
			message: "success",
			service,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default createService;
