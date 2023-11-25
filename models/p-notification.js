import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import UserModel from "./user";
// import referralCodeGenerator from 'referral-code-generator';

const pNotificationSchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
	topics: {
		type: [String],

		default: ["regular"],
	},
	token: { type: String, unique: true },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

pNotificationSchema.plugin(paginate);

pNotificationSchema.pre("save", function (next) {
	this.updatedAt = new Date();
	next();
});

pNotificationSchema.pre("update", function (next) {
	this.update({}, { $set: { updatedAt: new Date() } });
	next();
});

const PNotificationModel =
	mongoose.models.PNotification ||
	mongoose.model("PNotification", pNotificationSchema);

export default PNotificationModel;
