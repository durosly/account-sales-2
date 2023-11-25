import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import OrderModel from "@/models/order";
import ServiceModel from "@/models/service";
import { getServerSession } from "next-auth";
import { CreateOrderSchema } from "@/validators/order";
import { NextResponse } from "next/server";
import UserModel from "@/models/user";
import pushNotifyAdmin from "@/utils/backend/push-notify-admin";

async function createOrder(request) {
	try {
		const body = await request.json();

		const valid = CreateOrderSchema.safeParse(body);

		if (!valid.success) {
			return NextResponse.json(
				{ status: false, message: valid.error.issues[0].message },
				{ status: 400 }
			);
		}

		// calc charge
		const service = await ServiceModel.findById(valid.data.service);
		if (!service) {
			return NextResponse.json(
				{ status: false, message: "Invalid service specified" },
				{ status: 403 }
			);
		}

		let charge = Number(service.price * valid.data.quantity);
		const session = await getServerSession(options);
		const id = session?.user?.id || null;

		if (!id) {
			return NextResponse.json({
				status: false,
				message: "No user logged in",
			});
		}

		const user = await UserModel.findById(id);
		// check if user balance is enough (substract from balance)
		if (user.balance < charge) {
			return NextResponse.json(
				{ status: false, message: "Insufficient funds" },
				{ status: 403 }
			);
		}
		user.balance -= charge;
		await user.save();
		// TODO: send notification (user, admin)

		await connectMongo();

		const order = await OrderModel.create({
			serviceId: valid.data.service,
			categoryId: valid.data.category,
			quantity: valid.data.quantity,
			charge,
			userId: session.user.id,
		});

		await pushNotifyAdmin(
			"New order request",
			`New order request for service "${service.name}" from ${user.name}`
		);

		return NextResponse.json({
			status: false,
			message: "success",
			order,
		});
	} catch (error) {
		return NextResponse.json({
			status: false,
			message: `An error occured: ${error.message}`,
		});
	}
}

export default createOrder;
