import connectMongo from "@/lib/connectDB";
import generateRandomNumber from "@/lib/generate-random";
import UserModel from "@/models/user";
import { CreateWorkerSchema } from "@/validators/worker";

async function createWorker(request) {
	try {
		await connectMongo();

		const res = await request.json();

		const data = CreateWorkerSchema.safeParse(res);

		if (!data.success) {
			return Response.json(
				{
					status: false,
					message: data.error.issues[0].message,
				},
				{ status: 401 }
			);
		}

		const emailTaken = await UserModel.findOne({
			email: data.data.username.toLowerCase(),
		});

		if (emailTaken) {
			return Response.json(
				{
					status: false,
					message: "Username has already been used",
				},
				{ status: 400 }
			);
		}

		const rand = generateRandomNumber();

		await UserModel.create({
			name: `Worker-${rand}`,
			email: data.data.username.toLowerCase(),
			password: data.data.password,
			is_verified: true,
			account_type: "worker",
		});

		return Response.json({
			status: true,
			message: "Success",
		});
	} catch (error) {
		// console.log(error.message);
		return Response.json(
			{
				status: false,
				message: "An error occured",
			},
			{ status: 500 }
		);
	}
}

export default createWorker;
