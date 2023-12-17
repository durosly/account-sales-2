import mongoose from "mongoose";
// import referralCodeGenerator from 'referral-code-generator';

const tempEmailSchema = new mongoose.Schema({
	to: String,
	from: String,
	subject: String,
	html: String,
	text: String,
	expires_at: Date,
});

const TempEmailModel =
	mongoose.models.TempEmail || mongoose.model("TempEmail", tempEmailSchema);

export default TempEmailModel;
