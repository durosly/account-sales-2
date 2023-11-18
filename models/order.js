import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import CategoryModel from "./category";
import ServiceModel from "./service";
import UserModel from "./user";
// import referralCodeGenerator from 'referral-code-generator';

const orderSchema = new mongoose.Schema({
	categoryId: { type: mongoose.Schema.Types.ObjectId, ref: CategoryModel },
	serviceId: { type: mongoose.Schema.Types.ObjectId, ref: ServiceModel },
	userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
	charge: { type: Number, default: 0 },
	quantity: { type: Number, default: 0 },
	status: {
		type: String,
		enum: ["pending", "success", "cancel"],
		default: "pending",
	},
	info: { type: String, default: "pending..." },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

orderSchema.plugin(paginate);

orderSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

orderSchema.pre("update", function (next) {
	this.update({}, { $set: { updatedAt: new Date() } });
	next();
});

const OrderModel =
	mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;
