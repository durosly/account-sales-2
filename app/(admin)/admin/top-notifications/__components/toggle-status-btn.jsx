"use client";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import useDownload from "@/hooks/useDownload";
import { Fragment } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { SlExclamation } from "react-icons/sl";
import Markdown from "react-markdown";
import { LuDownload } from "react-icons/lu";

function ShowDetailsBtn({ id, items }) {
	const { copy } = useCopyToClipboard();
	const { downloadAsTxt } = useDownload();

	function downloadFile(data) {
		downloadAsTxt(data);
	}

	return (
		<>
			<button
				className="btn btn-xs ml-2 btn-accent btn-outline"
				onClick={() =>
					document.getElementById(`details-modal-${id}`).showModal()
				}
			>
				<SlExclamation />
				<span>info</span>
			</button>
			<button
				className="btn btn-xs ml-2 btn-primary btn-outline"
				onClick={() =>
					downloadFile(
						items
							.map((item) => item.info.trim())
							.join("\n\n**********\n\n")
					)
				}
			>
				<LuDownload />
				<span>Download</span>
			</button>
			{/* Open the modal using document.getElementById('ID').showModal() method */}

			<dialog
				id={`details-modal-${id}`}
				className="modal"
			>
				<div className="modal-box">
					<form method="dialog">
						{/* if there is a button in form, it will close the modal */}
						<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
							✕
						</button>
					</form>
					<h3 className="font-bold text-lg mb-2">Service details</h3>

					{items && items.length > 0 ? (
						items.map((item) => (
							<Fragment key={JSON.stringify(item)}>
								<div className="divider">Info</div>

								<div className="">
									{/* <pre>{item.info}</pre> */}
									<div className="space-y-2">
										{item.info
											.split(/\s+/)
											.map((data, i) => {
												if (data)
													return (
														<p
															key={i}
															className="space-x-1"
														>
															<span>{data}</span>

															<button
																onClick={() =>
																	copy(data)
																}
																className="btn btn-xs btn-square"
															>
																<IoCopyOutline />
															</button>
														</p>
													);
											})}
									</div>
									<p className="font-bold my-5">
										Instructions
									</p>
									<div className="prose">
										<Markdown>{item.instruction}</Markdown>
									</div>
								</div>
							</Fragment>
						))
					) : (
						<p>No item</p>
					)}
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
