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
		const s = searchParams.get("s");

		if (s !== "all" && !isValidObjectId(c)) {
			return NextResponse.json(
				{ status: false, message: "Category ID is not valid" },
				{ status: 400 }
			);
		}
		if (c !== "all" && !isValidObjectId(c)) {
			return NextResponse.json(
				{ status: false, message: "Sub Category ID is not valid" },
				{ status: 400 }
			);
		}

		const query = { quantity: { $gt: 0 } };

		if (!!q) {
			query.name = { $regex: q, $options: "i" };
		}

		if (!!c && c !== "all") {
			query.categoryId = c;
		}
		if (!!s && s !== "all") {
			query.subCategoryId = s;
		}

		await connectMongo();

		let services = [];

		if (page === "all") {
			const q = {};
			if (!!c && c !== "all") {
				q.categoryId = c;
			}
			if (!!s && s !== "all") {
				q.subCategoryId = s;
			}
			services = await ServiceModel.find(q).populate(
				"categoryId",
				"subCategoryId"
			);
		} else {
			services = await ServiceModel.paginate(query, {
				page,
				sort: { name: -1 },
				populate: ["categoryId", "subCategoryId"],
			});
		}

		return NextResponse.json({
			status: false,
			message: "success",
			data: services,
		});
	} catch (error) {
		return NextResponse.json(
			{
				status: false,
				message: `An error occured: ${error.message}`,
			},
			{ status: 500 }
		);
	}
}

export default getServices;
