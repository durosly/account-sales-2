import CurrencyRateModel from "@/models/rate";
import FundWithCryptoForm from "./__components/fund-with-crypto-form";
import axios from "axios";
import connectMongo from "@/lib/connectDB";

async function AddFundsWithCrypto() {
	const statusRequest = await axios("https://api.nowpayments.io/v1/status");

	if (statusRequest?.data?.message !== "OK") {
		throw new Error(`Crypto payment is not possible at this time`);
	}

	const currencies = await axios(
		`https://api.nowpayments.io/v1/full-currencies`,
		{
			headers: {
				"x-api-key": process.env.NOWPAYMENTS_API_KEY,
			},
		}
	);
	const merchantCurrencies = await axios(
		`https://api.nowpayments.io/v1/merchant/coins`,
		{
			headers: {
				"x-api-key": process.env.NOWPAYMENTS_API_KEY,
			},
		}
	);

	const available = currencies.data.currencies.filter((c) =>
		merchantCurrencies.data.selectedCurrencies.includes(c.code)
	);

	console.log(available);

	await connectMongo();

	const rate = await CurrencyRateModel.findOne({ currency: "USD" });

	return (
		<div className="max-w-md mx-auto my-10 max-sm:px-5">
			<h2 className="font-bold text-xl text-center mb-5">
				Fund with crypto
			</h2>
			<FundWithCryptoForm
				crypto={available}
				rate={JSON.parse(JSON.stringify(rate))}
			/>
		</div>
	);
}

export default AddFundsWithCrypto;
