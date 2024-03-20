import connectMongo from "@/lib/connectDB";
import ServiceItemModel from "@/models/service-item";
import isValidObjectId from "@/utils/backend/verify-mongodb-id";
import { NextResponse } from "next/server";

async function getAccounts(request, { params: { id } }) {
	try {
		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");
		const status = searchParams.get("status");
		const start = searchParams.get("start");
		const end = searchParams.get("end");

		if (page !== "all" && !Number(page)) {
			return NextResponse.json(
				{ status: false, message: "Page can only be a number" },
				{ status: 400 }
			);
		}

		if (!isValidObjectId(id)) {
			return NextResponse.json(
				{ status: false, message: "Service ID is not valid" },
				{ status: 400 }
			);
		}

		if (status !== "all" && status !== "new" && status !== "sold") {
			return NextResponse.json(
				{ status: false, message: "Status is not valid" },
				{ status: 400 }
			);
		}

		const query = { serviceId: id };

		if (!!status && status !== "all") {
			query.status = status;
		}

		if (!!start) {
			const startDate = new Date(`${start}T00:00:00Z`).toISOString();

			if (!!end) {
				const endDate = new Date(`${end}T23:59:59Z`).toISOString();

				query.createdAt = { $gte: startDate, $lt: endDate };
			}

			query.createdAt = { $gte: startDate };
		}

		await connectMongo();

		const items = await ServiceItemModel.paginate(query, {
			page,
			sort: { name: -1 },
		});

		return NextResponse.json({
			status: false,
			message: "success",
			data: items,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default getAccounts;
