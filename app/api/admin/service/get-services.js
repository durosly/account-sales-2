import connectMongo from "@/lib/connectDB";
import ServiceModel from "@/models/service";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getServices(request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");

		if (page !== "all" && !Number(page)) {
			return NextResponse.json(
				{ status: false, message: "Page can only be a number" },
				{ status: 400 }
			);
		}

		const q = searchParams.get("q");

		const query = {};

		if (!!q) {
			query.name = { $regex: q, $options: "i" };
		}

		await connectMongo();

		let services = [];

		if (page === "all") {
			services = await ServiceModel.find({}).populate(
				"categoryId",
				"subCategoryId"
			);
		} else {
			services = await ServiceModel.paginate(query, {
				page,
				sort: { createdAt: -1 },
				populate: ["categoryId", "subCategoryId"],
			});
		}

		return NextResponse.json({
			status: false,
			message: "success",
			data: services,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default getServices;
