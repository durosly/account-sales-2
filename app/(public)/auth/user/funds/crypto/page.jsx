import connectMongo from "@/lib/connectDB";
import CurrencyRateModel from "@/models/rate";
import FundWithCryptoForm from "./__components/fund-with-crypto-form";

async function AddFundsWithCrypto() {
	await connectMongo();

	const rate = await CurrencyRateModel.findOne({ currency: "USD" });

	return (
		<div className="max-w-md mx-auto my-10 max-sm:px-5">
			<h2 className="font-bold text-xl text-center mb-5">
				Fund with crypto
			</h2>
			<FundWithCryptoForm rate={JSON.parse(JSON.stringify(rate))} />
		</div>
	);
}

export default AddFundsWithCrypto;
