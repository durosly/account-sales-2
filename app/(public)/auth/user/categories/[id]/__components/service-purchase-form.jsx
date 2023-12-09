"use client";
import { IoCartOutline } from "react-icons/io5";
import OrderForm from "../../../__components/order-form";

function ServicePurchase({ cId, sId, price }) {
	return (
		<>
			<button
				className="btn btn-primary max-sm:btn-block"
				onClick={() =>
					document
						.getElementById(`service-purchase-${cId}-${sId}`)
						.showModal()
				}
			>
				<IoCartOutline />
				Buy now
			</button>

			<dialog
				id={`service-purchase-${cId}-${sId}`}
				className="modal"
			>
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<OrderForm
						cId={cId}
						sId={sId}
						price={price}
					/>
				</div>
			</dialog>
		</>
	);
}

export default ServicePurchase;
