import mongoose from "mongoose";
// import referralCodeGenerator from 'referral-code-generator';

const passwordResetSchema = new mongoose.Schema({
	email: String,
	code: String,
	expires_at: Date,
});

const PasswordResetModel =
	mongoose.models.PasswordReset ||
	mongoose.model("PasswordReset", passwordResetSchema);

export default PasswordResetModel;
