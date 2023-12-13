import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import CategoryModel from "./category";
// import referralCodeGenerator from 'referral-code-generator';

const subCategorySchema = new mongoose.Schema({
	name: String,
	category: { type: String, ref: CategoryModel },
	createdAt: { type: Date, default: Date.now },
});

subCategorySchema.plugin(paginate);
subCategorySchema.index({
	name: "text",
});

const SubCategoryModel =
	mongoose.models.SubCategory ||
	mongoose.model("SubCategory", subCategorySchema);

export default SubCategoryModel;
