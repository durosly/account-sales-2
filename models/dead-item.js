import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import ServiceModel from "./service";

const dataSchema = new mongoose.Schema({
	key: { type: String, default: "" },
	value: { type: String, default: "" },
});

const serviceItemSchema = new mongoose.Schema(
	{
		serviceId: { type: mongoose.Schema.Types.ObjectId, ref: ServiceModel },
		instruction: String,
		info: String,
		price: Number,

		status: { type: String, enum: ["new", "sold"], default: "new" },
		data: [dataSchema],
	},
	{ timestamps: true }
);

serviceItemSchema.plugin(paginate);
serviceItemSchema.index({
	instruction: "text",
	info: "text",
});

const DeadServiceItemModel = mongoose.models.DeadServiceItem || mongoose.model("DeadServiceItem", serviceItemSchema);

export default DeadServiceItemModel;
