import FundAccountForm from "./__components/fund-account-form";
import { getServerSession } from "next-auth";
import { options } from "@/auth/options";

async function AddFundsPage() {
	const session = await getServerSession(options);

	return (
		<>
			<div className="px-10 mb-20 mt-5">
				<h1 className="text-4xl font-bold text-center mb-10">
					Add funds to account
				</h1>
				<FundAccountForm user={session?.user} />
			</div>
		</>
	);
}

export default AddFundsPage;
