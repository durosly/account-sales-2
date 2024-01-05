import connectMongo from "@/lib/connectDB";
import CategoryModel from "@/models/category";
import ServiceModel from "@/models/service";
import SubCategoryModel from "@/models/sub-category";
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

		let data = [];

		if (page === "all") {
			const cq = {};
			const scq = {};

			if (!!c && c !== "all") {
				cq._id = c;
			}
			if (!!s && s !== "all") {
				scq._id = s;
			}

			const categories = await CategoryModel.find(cq);
			const cat = [];
			for (const category of JSON.parse(JSON.stringify(categories))) {
				const subCat = [];
				scq.category = category._id;
				const subCategories = await SubCategoryModel.find(scq);

				for (const subCategory of JSON.parse(
					JSON.stringify(subCategories)
				)) {
					const list = [];
					const items = await ServiceModel.find({
						subCategoryId: subCategory._id,
					});
					for (const item of JSON.parse(JSON.stringify(items))) {
						list.push(item);
					}

					subCat.push({ ...subCategory, items: list });
				}

				cat.push({ ...category, items: subCat });
			}

			data = cat;
		} else {
			data = await ServiceModel.paginate(query, {
				page,
				sort: { name: -1 },
				populate: ["categoryId", "subCategoryId"],
			});
		}

		return NextResponse.json({
			status: false,
			message: "success",

			data,
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
