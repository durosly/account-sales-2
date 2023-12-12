import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoReturnDownBackOutline } from "react-icons/io5";
import Link from "next/link";

function SuccessPage() {
	return (
		<div className="min-h-[300px] flex justify-center items-center">
			<div className="text-center space-y-5">
				<IoMdCheckmarkCircleOutline className="w-28 h-28 fill-success mx-auto" />
				<h2 className="text-xl font-bold">Success</h2>
				<Link
					href="/auth/user"
					className="btn btn-primary btn-wide"
				>
					<IoReturnDownBackOutline />
					Return
				</Link>
			</div>
		</div>
	);
}

export default SuccessPage;
