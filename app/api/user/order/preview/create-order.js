import { options } from "@/auth/options";
import connectMongo from "@/lib/connectDB";
import { checkFBStatus } from "@/lib/utils";
import OrderModel from "@/models/order";
import ServiceModel from "@/models/service";
import ServiceItemModel from "@/models/service-item";
import UserModel from "@/models/user";
import addNotification from "@/utils/backend/add-notification";
import pushNotifyAdmin from "@/utils/backend/push-notify-admin";
import { DateTime } from "luxon";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

async function createOrder(request) {
	try {
		const body = await request.json();

		const { choice, serviceId } = body;

		if (!choice || choice.length < 1) {
			return NextResponse.json(
				{ status: false, message: "Select an account to purchase" },
				{ status: 400 }
			);
		}

		if (!serviceId) {
			return NextResponse.json(
				{ status: false, message: "Service ID is required." },
				{ status: 400 }
			);
		}

		// calc charge
		const service = await ServiceModel.findById(serviceId).populate(
			"categoryId"
		);
		if (!service) {
			return NextResponse.json(
				{ status: false, message: "Invalid service specified" },
				{ status: 403 }
			);
		}

		if (!service?.showPreview) {
			return NextResponse.json(
				{
					status: false,
					message: "Preview mode not available for this service",
				},
				{ status: 403 }
			);
		}

		if (service.quantity < choice.length) {
			return NextResponse.json(
				{ status: false, message: "Not enough to meet this demand" },
				{ status: 403 }
			);
		}

		let charge = Number(service.price * choice.length);
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
			serviceId,
			_id: { $in: choice },
		});

		const ids = serviceItems.map((item) => item._id);

		if (serviceItems.length === 0) {
			return NextResponse.json(
				{
					status: false,
					message: "Selected account(s) have been sold",
				},
				{ status: 403 }
			);
		} else if (serviceItems.length !== choice.length) {
			for (const c of choice) {
				if (!ids.includes(c)) {
					return NextResponse.json(
						{
							status: false,
							message:
								"One of selected account(s) have been sold",
							accountId: c,
						},
						{ status: 403 }
					);
				}
			}
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

		// TODO: check if service is facebook

		const regex = new RegExp("facebook", "i");

		if (regex.test(service.categoryId.name)) {
			// TODO: loop through each service
			const iterableItems = JSON.parse(JSON.stringify(serviceItems));

			for (const item of iterableItems) {
				const digitRegex = /\d{10,}/;
				const match = item?.info.match(digitRegex);

				if (match) {
					const uid = match[0];
					// TODO: check status of each account
					const status = await checkFBStatus(uid);
					// TODO: add status infomation to service item

					const date = DateTime.now().toLocaleString(
						DateTime.DATE_MED
					);

					await ServiceItemModel.findOneAndUpdate(
						{ _id: item._id },
						{
							$push: {
								data: {
									$each: [
										{
											key: "FB status",
											value: status ? "Active" : "Dead",
										},
										{
											key: "FB status date",
											value: date,
										},
									],
								},
							},
						}
					);
				}
			}
		}

		const order = await OrderModel.create({
			serviceId,
			categoryId: service?.categoryId._id,
			categoryName: service?.categoryId?.name || "nil",
			serviceName: service.name,
			serviceItemIds: ids,
			quantity: choice.length,
			charge,
			userId: session.user.id,
			status: "success",
		});

		service.quantity -= choice.length;
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
