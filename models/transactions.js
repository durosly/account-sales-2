import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import { uuid } from "uuidv4";
// import referralCodeGenerator from 'referral-code-generator';

const transactionSchema = new mongoose.Schema({
	userEmail: { type: String },
	transactionId: String,
	ownRef: { type: String, default: () => uuid() },
	type: { type: String, enum: ["reg", "crypto"], default: "reg" },
	status: {
		type: String,
		enum: ["pending", "completed"],
		default: "pending",
	},
	amount: { type: Number },
	createdAt: { type: Date, default: Date.now },
});

transactionSchema.plugin(paginate);

const TransactionModel =
	mongoose.models.Transaction ||
	mongoose.model("Transaction", transactionSchema);

export default TransactionModel;
