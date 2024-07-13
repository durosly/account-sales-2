import connectMongo from "@/lib/connectDB";
import DeadServiceItemModel from "@/models/dead-item";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";

async function deleteAccount(request) {
	try {
		const { ids } = await request.json();
		console.log(ids);

		for (const id of ids) {
			if (!isValidObjectId(id)) {
				return Response.json({ status: false, message: "Invalid ID specified" }, { status: 400 });
			}
		}
		await connectMongo();

		await DeadServiceItemModel.deleteMany({ _id: { $in: ids } });

		return Response.json({
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

export default deleteAccount;
