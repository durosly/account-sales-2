import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import OrderModel from "@/models/order";
import ServiceModel from "@/models/service";
import { getServerSession } from "next-auth";
import { CreateOrderSchema } from "@/validators/order";
import { NextResponse } from "next/server";
import UserModel from "@/models/user";
import pushNotifyAdmin from "@/utils/backend/push-notify-admin";
import ServiceItemModel from "@/models/service-item";
import addNotification from "@/utils/backend/add-notification";

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
		const service = await ServiceModel.findById(
			valid.data.service
		).populate("categoryId");
		if (!service) {
			return NextResponse.json(
				{ status: false, message: "Invalid service specified" },
				{ status: 403 }
			);
		}

		if (service.quantity < valid.data.quantity) {
			return NextResponse.json(
				{ status: false, message: "Not enough to meet this demand" },
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

		await connectMongo();

		const serviceItems = await ServiceItemModel.find({
			status: "new",
			serviceId: valid.data.service,
		})
			.sort("-createdAt")
			.limit(valid.data.quantity);

		if (serviceItems.length === 0) {
			service.quantity = 0;
			await service.save();

			return NextResponse.json(
				{ status: false, message: "No service available" },
				{ status: 404 }
			);
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

		const ids = serviceItems.map((item) => item._id);

		const order = await OrderModel.create({
			serviceId: valid.data.service,
			categoryId: valid.data.category,
			categoryName: service?.categoryId?.name || "nil",
			serviceName: service.name,
			serviceItemIds: ids,
			quantity: valid.data.quantity,
			charge,
			userId: session.user.id,
			status: "success",
		});

		service.quantity -= valid.data.quantity;
		await service.save();

		await pushNotifyAdmin(
			"New order request",
			`New order request for service "${service.name}" from ${user.name}`
		);

		await addNotification(
			"New order completed",
			"Your new order has been completed",
			session.user.id
		);

		await ServiceItemModel.updateMany(
			{ _id: { $in: ids } },
			{ status: "sold" }
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
