import Link from "next/link";
import { IoMdCard } from "react-icons/io";
import { FaBitcoin } from "react-icons/fa";

async function AddFundsPage() {
	return (
		<>
			<div className="px-10 mb-20 mt-5">
				<h1 className="text-4xl font-bold text-center mb-10">
					Add funds to account
				</h1>
				<div className="max-w-md mx-auto space-y-5">
					<Link
						href="/auth/user/funds/cash"
						className="btn btn-primary btn-block"
					>
						<IoMdCard />
						Card, transfer, USSD, etc
					</Link>
					<Link
						href="/auth/user/funds/crypto"
						className="btn btn-primary btn-block"
					>
						<FaBitcoin />
						Crypto
					</Link>
				</div>
			</div>
		</>
	);
}

export default AddFundsPage;
