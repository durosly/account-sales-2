import { NextResponse } from "next/server";
import connectMongo from "@/lib/connectDB";
import CategoryModel from "@/models/category";

async function createCategory(request) {
	try {
		const { cName: categoryName, cCover: cover } = await request.json();
		if (!categoryName) {
			return NextResponse.json(
				{ status: false, message: "Category name cannot be empty" },
				{ status: 400 }
			);
		}
		if (!cover) {
			return NextResponse.json(
				{
					status: false,
					message: "Category cover image cannot be empty",
				},
				{ status: 400 }
			);
		}

		await connectMongo();

		const category = await CategoryModel.create({
			name: categoryName,
			cover,
		});

		return NextResponse.json({
			status: false,
			message: "success",
			category,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default createCategory;
