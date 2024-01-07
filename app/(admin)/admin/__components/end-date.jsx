"use client";

import { useContext } from "react";
import { StatisticsContext } from "../context";

function EndDate() {
	const {
		state: { end_date, range },
		dispatch,
	} = useContext(StatisticsContext);

	function handleChange(e) {
		dispatch({ type: "UPDATE_END_DATE", payload: e.target.value });
	}

	return (
		<input
			className="input input-bordered"
			type="date"
			name="interval-end"
			id="end"
			value={end_date}
			onChange={handleChange}
			disabled={range !== "interval-range"}
		/>
	);
}

export default EndDate;
