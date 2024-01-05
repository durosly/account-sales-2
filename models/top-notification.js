import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const adminTopNoticeSchema = new mongoose.Schema({
	status: {
		type: String,
		enum: ["active", "inactive"],
		default: "inactive",
	},
	body: { type: String, default: "pending..." },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

adminTopNoticeSchema.plugin(paginate);
adminTopNoticeSchema.index({
	body: "text",
	status: "text",
});

adminTopNoticeSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

adminTopNoticeSchema.pre("update", function (next) {
	this.update({}, { $set: { updatedAt: new Date() } });
	next();
});

const AdminTopNoticeModel =
	mongoose.models.AdminTopNotice ||
	mongoose.model("AdminTopNotice", adminTopNoticeSchema);

export default AdminTopNoticeModel;
