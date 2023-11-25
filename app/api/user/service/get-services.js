import connectMongo from "@/lib/connectDB";
import ServiceModel from "@/models/service";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
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
		const c = searchParams.get("c");

		if (!isValidObjectId(c)) {
			return NextResponse.json(
				{ status: false, message: "Category ID is not valid" },
				{ status: 400 }
			);
		}

		const query = {};

		if (!!q) {
			query.name = { $regex: q, $options: "i" };
		}

		if (!!c) {
			query.categoryId = { $eq: c };
		}

		await connectMongo();

		let services = [];

		if (page === "all") {
			services = await ServiceModel.find({ categoryId: c }).populate(
				"categoryId"
			);
		} else {
			services = await ServiceModel.paginate(query, {
				page,
				sort: { name: -1 },
				populate: "categoryId",
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
