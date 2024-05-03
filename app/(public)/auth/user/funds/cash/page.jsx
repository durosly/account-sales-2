import FundAccountForm from "./__components/fund-account-form";
import { getServerSession } from "next-auth";
import { options } from "@/auth/options";
import CurrencyRateModel from "@/models/rate";
import connectMongo from "@/lib/connectDB";

export const dynamic = "force-dynamic";

async function AddFundsPage() {
	const session = await getServerSession(options);

	await connectMongo();

	const rate = await CurrencyRateModel.findOne({ currency: "USD" });

	return (
		<>
			<div className="px-10 mb-20 mt-5">
				<h1 className="text-4xl font-bold text-center mb-10">
					Add funds to account
				</h1>
				<FundAccountForm
					user={session?.user}
					rate={JSON.parse(JSON.stringify(rate))}
				/>
			</div>
		</>
	);
}

export default AddFundsPage;
