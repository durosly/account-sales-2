import connectMongo from "@/lib/connectDB";
import CurrencyRateModel from "@/models/rate";
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

		const rate = await CurrencyRateModel.findOne({ currency: "USD" });

		if (!rate) {
			return NextResponse.json({
				status: false,
				message: "Please, define rate",
			});
		}

		const nPrice = valid.data.price * rate.amount; // convert to naira

		const service = await ServiceModel.create({
			name: valid.data.name,
			categoryId: valid.data.category,
			subCategoryId: valid.data.subCategory,
			price: nPrice,
			country: valid.data.country,
			details: valid.data.details,
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
