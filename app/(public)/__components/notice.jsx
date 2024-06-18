"use client";
import Markdown from "react-markdown";
import { useEffect } from "react";

function NoticeModal({ notice }) {
	useEffect(() => {
		document.getElementById("notice").showModal();
	}, []);

	return (
		<dialog id="notice" className="modal">
			<div className="modal-box">
				<form method="dialog">
					{/* if there is a button in form, it will close the modal */}
					<button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
				</form>
				<h3 className="font-bold text-xl mb-5">Notifications!</h3>
				<div className="prose prose-sm">
					<Markdown>{notice}</Markdown>
				</div>
				<p className="py-4 text-xs">Press ESC key or click outside to close</p>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
}

export default NoticeModal;
