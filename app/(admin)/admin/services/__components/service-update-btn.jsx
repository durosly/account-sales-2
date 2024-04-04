"use client";

import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import UpdateServicePrice from "./update-service-price";
import UpdateServiceDetails from "./update-service-details";

function ServiceUpdateBtn({ id, data }) {
	const [showModal, setShowModal] = useState(false);
	const [tab, setTab] = useState("price");

	return (
		<>
			<button
				className="btn btn-sm md:btn-md btn-primary btn-square btn-outline"
				onClick={() => setShowModal(true)}
			>
				<FaPencilAlt />
			</button>

			{showModal && (
				<dialog className="modal modal-open modal-bottom sm:modal-middle">
					<div className="modal-box">
						<button
							onClick={() => setShowModal(false)}
							className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
						>
							✕
						</button>

						<div
							role="tablist"
							className="tabs tabs-lifted"
						>
							<input
								type="radio"
								role="tab"
								className="tab"
								aria-label="Price"
								onChange={() => setTab("price")}
								checked={tab === "price"}
							/>
							{tab === "price" && (
								<div
									role="tabpanel"
									className="tab-content bg-base-100 border-base-300 rounded-box p-6"
								>
									<UpdateServicePrice id={id} />
								</div>
							)}

							<input
								type="radio"
								role="tab"
								className="tab"
								aria-label="Details"
								onChange={() => setTab("details")}
								checked={tab === "details"}
							/>

							{tab === "details" && (
								<div
									role="tabpanel"
									className="tab-content bg-base-100 border-base-300 rounded-box p-6"
								>
									<UpdateServiceDetails
										id={id}
										details={data.details}
									/>
								</div>
							)}
						</div>
					</div>
				</dialog>
			)}
		</>
	);
}

export default ServiceUpdateBtn;
