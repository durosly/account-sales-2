import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import UserModel from "./user";
// import referralCodeGenerator from 'referral-code-generator';

const notificationSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
	status: {
		type: String,
		enum: ["read", "unread"],
		default: "unread",
	},
	title: { type: String, default: "pending..." },
	body: { type: String, default: "pending..." },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

notificationSchema.plugin(paginate);

notificationSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

notificationSchema.pre("update", function (next) {
	this.update({}, { $set: { updatedAt: new Date() } });
	next();
});

const NotificationModel =
	mongoose.models.Notification ||
	mongoose.model("Notification", notificationSchema);

export default NotificationModel;
