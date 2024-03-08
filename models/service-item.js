import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import ServiceModel from "./service";
// import referralCodeGenerator from 'referral-code-generator';

const dataSchema = new mongoose.Schema({
	key: { type: String, default: "" },
	value: { type: String, default: "" },
});

const serviceItemSchema = new mongoose.Schema({
	serviceId: { type: mongoose.Schema.Types.ObjectId, ref: ServiceModel },
	instruction: String,
	info: String,
	price: Number,
	createdAt: { type: Date, default: Date.now },
	status: { type: String, enum: ["new", "sold"], default: "new" },
	data: [dataSchema],
});

serviceItemSchema.plugin(paginate);
serviceItemSchema.index({
	instruction: "text",
	info: "text",
});

const ServiceItemModel =
	mongoose.models.ServiceItem ||
	mongoose.model("ServiceItem", serviceItemSchema);

export default ServiceItemModel;
