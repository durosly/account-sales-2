import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
// import referralCodeGenerator from 'referral-code-generator';

const currencyRateSchema = new mongoose.Schema({
	currency_name: String,
	currency: String,
	amount: Number, // in naira
	createdAt: { type: Date, default: Date.now },
});

currencyRateSchema.plugin(paginate);

const CurrencyRateModel =
	mongoose.models.CurrencyRate ||
	mongoose.model("CurrencyRate", currencyRateSchema);

export default CurrencyRateModel;
