import connectMongo from "@/lib/connectDB";
import SubCategoryModel from "@/models/sub-category";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function deleteSubCategory(_, { params: { subId } }) {
	try {
		if (!isValidObjectId(subId)) {
			return NextResponse.json(
				{ status: false, message: "Invalid ID specified" },
				{ status: 400 }
			);
		}
		await connectMongo();

		await SubCategoryModel.findByIdAndDelete(subId);

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

export default deleteSubCategory;
