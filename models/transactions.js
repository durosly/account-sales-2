import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
// import referralCodeGenerator from 'referral-code-generator';

const transactionSchema = new mongoose.Schema({
	userEmail: { type: String },
	transactionId: String,
	amount: { type: Number },
	createdAt: { type: Date, default: Date.now },
});

transactionSchema.plugin(paginate);

const TransactionModel =
	mongoose.models.Transaction ||
	mongoose.model("Transaction", transactionSchema);

export default TransactionModel;
