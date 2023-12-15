import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const adminNoticeSchema = new mongoose.Schema({
	status: {
		type: String,
		enum: ["active", "inactive"],
		default: "inactive",
	},
	body: { type: String, default: "pending..." },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

adminNoticeSchema.plugin(paginate);
adminNoticeSchema.index({
	body: "text",
	status: "text",
});

adminNoticeSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

adminNoticeSchema.pre("update", function (next) {
	this.update({}, { $set: { updatedAt: new Date() } });
	next();
});

const AdminNoticeModel =
	mongoose.models.AdminNotice ||
	mongoose.model("AdminNotice", adminNoticeSchema);

export default AdminNoticeModel;
