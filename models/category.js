import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
// import referralCodeGenerator from 'referral-code-generator';

const categorySchema = new mongoose.Schema({
	name: String,
	createdAt: { type: Date, default: Date.now },
});

categorySchema.plugin(paginate);
categorySchema.index({
	name: "text",
});

const CategoryModel =
	mongoose.models.Category || mongoose.model("Category", categorySchema);

export default CategoryModel;
