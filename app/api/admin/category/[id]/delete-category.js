import { NextResponse } from "next/server";
import connectMongo from "@/lib/connectDB";
import CategoryModel from "@/models/category";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";

async function deleteCategory(_, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}
		await connectMongo();

		const category = await CategoryModel.findByIdAndDelete(id);

		// TODO: find services to delete
		// TODO: find orders to delete

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

export default deleteCategory;
