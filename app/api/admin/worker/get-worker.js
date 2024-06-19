import connectMongo from "@/lib/connectDB";
import UserModel from "@/models/user";

export const dynamic = "force-dynamic";

async function getWorkers(request) {
	try {
		const { searchParams } = new URL(request.url);
		const page = searchParams.get("page");

		if (!Number(page)) {
			return Response.json({ status: false, message: "Page can only be a number" }, { status: 400 });
		}

		const q = searchParams.get("q");

		const query = { account_type: "worker" };

		if (!!q && q !== "all") {
			query.$or = [
				{ name: { $regex: new RegExp(q, "i") } }, // Case-insensitive name search
				{ email: { $regex: new RegExp(q, "i") } }, // Case-insensitive email search
			];
		}

		await connectMongo();

		const users = await UserModel.paginate(query, {
			page: Number(page),
			sort: { createdAt: -1 },
			select: ["-password"],
		});

		return Response.json({
			status: true,
			message: "success",
			data: users,
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

export default getWorkers;
