import connectMongo from "@/lib/connectDB";
import DeadServiceItemModel from "@/models/dead-item";
import { SlActionRedo, SlTrash } from "react-icons/sl";
import AccountContextWrapper from "./__components/account-context";
import MarkAll from "./__components/mark-all";
import { strigifyObj } from "@/lib/utils";
import SelectAccount from "./__components/select-account";
import DeleteBtn from "./__components/delete-btn";
import DeleteSelected from "./__components/delete-selected";
import RestoreBtn from "./__components/restore-btn";
import RestoreSelected from "./__components/restore-selected";
import CopyBtn from "./__components/copy-btn";

async function DeadFBAccounts() {
	await connectMongo();
	const deadFBAccounts = await DeadServiceItemModel.find({});

	return (
		<>
			<div className="border-b p-5 ">
				<h2 className="text-xl font-bold">Disabled FB accounts</h2>
			</div>

			<AccountContextWrapper accounts={strigifyObj(deadFBAccounts)}>
				<div className="border-b max-h-[calc(100dvh_-_69px)] overflow-y-auto">
					<div className="p-5 sticky top-0 flex gap-2 flex-wrap border-b backdrop-blur-md">
						<MarkAll />
						{/* <button >Delete</button> */}
						<DeleteSelected />
						{/* <button className="btn btn-success btn-outline">Restore</button> */}
						<RestoreSelected />
						<CopyBtn />
					</div>
					{deadFBAccounts.length < 1 ? (
						<p>No dead accounts</p>
					) : (
						<ul className="space-y-5 p-5">
							{deadFBAccounts.map((account) => (
								<li key={account.id} className="flex gap-5">
									<SelectAccount id={account.id} />
									<div>
										{account.info.split(/,/).map((item, i) => (
											<p key={i} className="max-sm:text-xs">
												{/* {item.split(":").map((value, i) => (
											<span className={`${i === 1 ? "font-bold" : ""}`} key={value}>
												{value}
											</span>
										))} */}
												{item}
											</p>
										))}
										<div className="flex flex-wrap gap-3 mt-3">
											<RestoreBtn className="btn btn-square btn-xs" ids={[account.id]}>
												<SlActionRedo />
											</RestoreBtn>
											<DeleteBtn className="btn btn-error btn-outline btn-square btn-xs" ids={[account.id]}>
												<SlTrash />
											</DeleteBtn>
										</div>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>
			</AccountContextWrapper>
		</>
	);
}

export default DeadFBAccounts;
