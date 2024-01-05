import connectMongo from "@/lib/connectDB";
import CategoryModel from "@/models/category";
import ServiceModel from "@/models/service";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

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

		// find services to delete
		await ServiceModel.deleteMany({ categoryId: id });

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
