import CurrencyRateModel from "@/models/rate";
import FundWithCryptoForm from "./__components/fund-with-crypto-form";
import axios from "axios";

async function AddFundsWithCrypto() {
	const data = await axios("https://plisio.net/api/v1/currencies", {
		params: {
			api_key: process.env.PLISIO_KEY,
			fiat: "NGN",
			source_currency: "NGN",
		},
	});

	if (data.statusText !== "OK") {
		throw new Error(`Failed to fetch currencies list: ${data.status}`);
	}

	const rate = await CurrencyRateModel.findOne({ currency: "USD" });

	return (
		<div className="max-w-md mx-auto my-10 max-sm:px-5">
			<h2 className="font-bold text-xl text-center mb-5">
				Fund with crypto
			</h2>
			<FundWithCryptoForm
				tokens={data.data.data.filter((item) => item.hidden === 0)}
				rate={JSON.parse(JSON.stringify(rate))}
			/>
		</div>
	);
}

export default AddFundsWithCrypto;
