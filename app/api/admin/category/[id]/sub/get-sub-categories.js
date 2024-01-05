import connectMongo from "@/lib/connectDB";
import SubCategoryModel from "@/models/sub-category";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getSubCategories(request, { params: { id } }) {
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

		if (isValidObjectId(id)) {
			query.category = id;
		}

		await connectMongo();

		let categories;

		if (page === "all") {
			if (isValidObjectId(id)) {
				categories = await SubCategoryModel.find({ category: id });
			} else {
				categories = await SubCategoryModel.find({});
			}
		} else {
			categories = await SubCategoryModel.paginate(query, {
				page,
				sort: { createdAt: -1 },
			});
		}

		return NextResponse.json({
			status: false,
			message: "success",
			data: categories,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default getSubCategories;
