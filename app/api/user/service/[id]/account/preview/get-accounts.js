import connectMongo from "@/lib/connectDB";
import ServiceItemModel from "@/models/service-item";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

function checkForUsernameSubstring(inputString) {
	// Regular expression to match "username" substring case-insensitively
	const regex = /username/i;

	// Test if the input string contains the "username" substring
	const isSubstringPresent = regex.test(inputString);

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

		const items = await ServiceItemModel.find(query).limit(10);

		const list = [];

		for (const item of items) {
			const data = item.info.split(",");
			for (const entry of data) {
				const hasUsername = checkForUsernameSubstring(entry);

				if (hasUsername) {
					const accountInfo = entry.split(":")[1].trim();
					list.push({ id: item._id, username: accountInfo });
				}
			}
		}

		return NextResponse.json({
			status: true,
			message: "success",
			data: list,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default getAccounts;
