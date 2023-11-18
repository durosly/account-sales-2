"use client";
import { SlExclamation } from "react-icons/sl";
import Markdown from "react-markdown";

function ShowDetailsBtn({ id, details }) {
	return (
		<>
			<button
				className="btn btn-xs ml-2 btn-accent btn-square btn-outline"
				onClick={() =>
					document.getElementById(`details-modal-${id}`).showModal()
				}
			>
				<SlExclamation />
			</button>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id={`details-modal-${id}`}
				className="modal"
			>
				<div className="modal-box">
					<h3 className="font-bold text-lg mb-2">Service details</h3>
					<div className="divider">Info</div>

					<div className="prose">
						<Markdown>{details}</Markdown>
					</div>
					<p className="py-4 text-xs">
						Infomation about response or status
					</p>
				</div>
				<form
					method="dialog"
					className="modal-backdrop"
				>
					<button>close</button>
				</form>
			</dialog>
		</>
	);
}

export default ShowDetailsBtn;
