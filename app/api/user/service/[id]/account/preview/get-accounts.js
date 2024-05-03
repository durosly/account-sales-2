import connectMongo from "@/lib/connectDB";
import { checkFBStatus } from "@/lib/utils";
import ServiceModel from "@/models/service";
import ServiceItemModel from "@/models/service-item";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

function checkForUsernameSubstring(inputString) {
	// Regular expression to match "username" substring case-insensitively
	const regex = /username/i;
	const regex2 = /id/i;

	// Test if the input string contains the "username" substring
	const isSubstringPresent =
		regex.test(inputString) || regex2.test(inputString);

	return isSubstringPresent;
}

async function getAccounts(_, { params: { id } }) {
	try {
		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Service ID is not valid" },
				{ status: 400 }
			);
		}

		const query = { serviceId: id, status: "new" };

		await connectMongo();

		const service = await ServiceModel.findById(id).populate("categoryId");

		const fbRegex = new RegExp("facebook", "i");
		const isFb = fbRegex.test(service.categoryId.name);

		const items = await ServiceItemModel.find(query).limit(20);

		const list = [];

		for (const item of items) {
			const data = item.info.split(",");
			for (const entry of data) {
				const hasUsername = checkForUsernameSubstring(entry);

				if (hasUsername) {
					const accountInfo = entry.split(":")[1].trim();

					const data = { id: item._id, username: accountInfo };

					if (isFb) {
						const status = await checkFBStatus(accountInfo);
						data.status = status;
					}

					list.push(data);
					break;
				}
			}
		}

		return NextResponse.json({
			status: true,
			message: "success",
			data: list,
		});
	} catch (error) {
		return Response.json(
			{
				status: false,
				message: `An error occured: ${error.message}`,
			},
			{ status: 400 }
		);
	}
}

export default getAccounts;
