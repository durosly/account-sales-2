import mongoose from "mongoose";
// import referralCodeGenerator from 'referral-code-generator';

const emailSchema = new mongoose.Schema({
	email: String,
	code: String,
	expires_at: Date,
});

const EmailModel =
	mongoose.models.Email || mongoose.model("Email", emailSchema);

export default EmailModel;
