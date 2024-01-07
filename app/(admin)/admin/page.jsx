import Image from "next/image";
import { SlChart, SlPeople } from "react-icons/sl";
import AccountStat from "./__components/accounts-stat";
import Choices from "./__components/choice";
import ContextWrapper from "./__components/context-wrapper";
import EndDate from "./__components/end-date";
import NumberOfOrders from "./__components/number-of-orders";
import NumberOfUsers from "./__components/number-of-users";
import StartDate from "./__components/start-date";

function AdminDashboard() {
	return (
		<>
			<div className="flex flex-wrap gap-5 p-5">
				<div className="flex-1 flex gap-2 border p-2 rounded">
					<div>
						<h2 className="text-sm">Users</h2>
						{/* <p className="text-4xl font-bold">2,000</p> */}
						<NumberOfUsers />
					</div>
					<div className="flex aspect-square bg-primary p-5 ml-auto rounded">
						<SlPeople className="w-10 h-10 m-auto" />
					</div>
				</div>
				<div className="flex-1 flex gap-2 border p-2 rounded">
					<div>
						<h2 className="text-sm">Orders</h2>
						{/* <p className="text-4xl font-bold">210,000</p> */}
						<NumberOfOrders />
					</div>
					<div className="flex aspect-square bg-accent p-5 ml-auto rounded">
						<SlChart className="w-10 h-10 m-auto" />
					</div>
				</div>
			</div>

			<ContextWrapper>
				<div className="p-5">
					<div className="border p-5 rounded">
						<h2 className="text-xl font-bold mb-3">Statistics</h2>

						<div className="flex flex-wrap justify-between gap-5 items-end">
							<div className="flex gap-2 flex-wrap">
								<Choices />
							</div>
							<div className="flex gap-2 items-end flex-wrap">
								<div>
									<label
										htmlFor="start"
										className="label"
									>
										Start
									</label>
									<StartDate />
								</div>
								<div>
									<label
										htmlFor="end"
										className="label"
									>
										End
									</label>
									<EndDate />
								</div>
							</div>
						</div>
					</div>

					<div className="mt-10">
						<div className="flex gap-5 flex-wrap">
							<div className="flex-1 p-5 border rounded">
								<h3 className="text-xl mb-2">🚀 Sold</h3>
								<AccountStat type={"sold"} />
							</div>
							<div className="flex-1 p-5 border rounded">
								<h3 className="text-xl mb-2">📈 Available</h3>
								<AccountStat type={"available"} />
							</div>
						</div>
					</div>

					<div className="mt-10 space-y-2">
						<div className="border p-5 rounded">
							<div className="flex gap-5">
								<div className="relative w-10 h-10 ">
									<Image
										src="/images/like-icon.png"
										fill
										sizes="40px"
										className="object-contain"
										alt="category"
									/>
								</div>
								<h3 className="font-bold text-2xl">Category</h3>
							</div>
							<div>
								<h4 className="font-bold">Sub category</h4>
								<ul className="mt-2">
									<li className="flex flex-wrap gap-5 justify-between border-b last:border-b-0 py-3">
										<p>Lorem ipsum dolor sit.</p>
										<div className="flex flex-wrap gap-2">
											<p className="badge">📈 300</p>
											<p className="badge">🚀 300</p>
										</div>
									</li>
									<li className="flex flex-wrap gap-5 justify-between border-b last:border-b-0 py-3">
										<p>Lorem ipsum dolor sit.</p>
										<div className="flex flex-wrap gap-2">
											<p className="badge">📈 300</p>
											<p className="badge">🚀 300</p>
										</div>
									</li>
									<li className="flex flex-wrap gap-5 justify-between border-b last:border-b-0 py-3">
										<p>Lorem ipsum dolor sit.</p>
										<div className="flex flex-wrap gap-2">
											<p className="badge">📈 300</p>
											<p className="badge">🚀 300</p>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</ContextWrapper>
		</>
	);
}

export default AdminDashboard;
