import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function deleteWorker(_, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json({ status: false, message: "Invalid ID specified" }, { status: 400 });
		}
		await connectMongo();

		await UserModel.findByIdAndDelete(id);

		return Response.json({
			status: false,
			message: "success",
		});
	} catch (error) {
		return Response.json(
			{
				status: false,
				message: `An error occured: ${error.message}`,
			},
			{ status: 500 }
		);
	}
}

export default deleteWorker;
