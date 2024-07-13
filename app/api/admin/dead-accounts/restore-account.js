import connectMongo from "@/lib/connectDB";
import { strigifyObj } from "@/lib/utils";
import DeadServiceItemModel from "@/models/dead-item";
import ServiceItemModel from "@/models/service-item";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";

async function restoreAccount(request) {
	try {
		const { ids } = await request.json();

		for (const id of ids) {
			if (!isValidObjectId(id)) {
				return Response.json({ status: false, message: "Invalid ID specified" }, { status: 400 });
			}
		}
		await connectMongo();

		const accounts = await DeadServiceItemModel.find({ _id: { $in: ids } });
		const restoredAccounts = strigifyObj(accounts).map((account) => {
			const { _id, ...rest } = account;

			return rest;
		});

		// console.log(restoredAccounts);
		await ServiceItemModel.insertMany(restoredAccounts);
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

export default restoreAccount;
