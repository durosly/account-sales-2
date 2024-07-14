"use client";
import { useEffect, useState } from "react";
import DefaultDisplay from "./default-display";
import EditDisplay from "./edit-display";

function DisplayItems({ serviceId }) {
	const [query, setQuery] = useState("");

	const [status, setStatus] = useState("new");
	const [start_date, setStartDate] = useState("");
	const [end_date, setEndDate] = useState("");
	const [convert, setConvert] = useState(false);

	useEffect(() => {
		setPage(1);
	}, [status]);

	const [page, setPage] = useState(1);

	return (
		<>
			<div className="border-b pb-5 px-5">
				<input type="checkbox" className="toggle toggle-success" checked={convert} onChange={() => setConvert(!convert)} />
			</div>
			{!convert ? (
				<DefaultDisplay
					start_date={start_date}
					setStartDate={setStartDate}
					end_date={end_date}
					setEndDate={setEndDate}
					page={page}
					setPage={setPage}
					status={status}
					setStatus={setStatus}
					query={query}
					setQuery={setQuery}
					serviceId={serviceId}
				/>
			) : (
				<EditDisplay start_date={start_date} end_date={end_date} status={status} query={query} serviceId={serviceId} setConvert={setConvert} />
			)}
		</>
	);
}

export default DisplayItems;
