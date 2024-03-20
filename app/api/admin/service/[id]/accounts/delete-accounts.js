import connectMongo from "@/lib/connectDB";
import ServiceItemModel from "@/models/service-item";
import { NextResponse } from "next/server";

async function deleteAccounts(request, { params: { id } }) {
	try {
		const data = await request.json();

		if (data.length < 1) {
			return Response.json(
				{
					status: false,
					message: `No account selected`,
				},
				{ status: 400 }
			);
		}

		await connectMongo();

		await ServiceItemModel.deleteMany({ _id: { $in: data } });

		return NextResponse.json({
			status: true,
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

export default deleteAccounts;
