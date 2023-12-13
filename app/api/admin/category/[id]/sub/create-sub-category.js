import connectMongo from "@/lib/connectDB";
import CategoryModel from "@/models/category";
import SubCategoryModel from "@/models/sub-category";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function addSubCategory(request, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}
		await connectMongo();

		const category = await CategoryModel.findById(id);

		if (!category) {
			return NextResponse.json(
				{ status: false, message: "No such category found" },
				{ status: 404 }
			);
		}

		const { name } = await request.json();

		if (!name) {
			return NextResponse.json(
				{ status: false, message: "Name cannot be empty" },
				{ status: 400 }
			);
		}

		await SubCategoryModel.create({
			name,
			category: id,
		});

		return NextResponse.json({
			status: false,
			message: "success",
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default addSubCategory;
