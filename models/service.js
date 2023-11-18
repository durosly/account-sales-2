import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import CategoryModel from "./category";
// import referralCodeGenerator from 'referral-code-generator';

const serviceSchema = new mongoose.Schema({
	name: String,
	categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
	price: Number,
	createdAt: { type: Date, default: Date.now },
});

serviceSchema.plugin(paginate);
serviceSchema.index({
	name: "text",
	price: "text",
});

const ServiceModel =
	mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default ServiceModel;
