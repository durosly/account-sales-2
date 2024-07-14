import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import CategoryModel from "./category";
import SubCategoryModel from "./sub-category";
// import referralCodeGenerator from 'referral-code-generator';

const serviceSchema = new mongoose.Schema({
	name: String,
	categoryId: { type: mongoose.Schema.Types.ObjectId, ref: CategoryModel },
	subCategoryId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: SubCategoryModel,
	},
	price: Number,
	country: String,
	details: String,
	showPreview: { type: Boolean, default: false },
	availableForSale: { type: Boolean, default: true },
	quantity: { type: Number, default: 0, min: 0 },
	createdAt: { type: Date, default: Date.now },
});

serviceSchema.plugin(paginate);
serviceSchema.index({
	name: "text",
	price: "text",
});

const ServiceModel = mongoose.models.Service || mongoose.model("Service", serviceSchema);

export default ServiceModel;
