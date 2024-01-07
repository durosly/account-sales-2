"use client";

import { useContext } from "react";
import { StatisticsContext } from "../context";

function StartDate() {
	const {
		state: { start_date, range },
		dispatch,
	} = useContext(StatisticsContext);

	function handleChange(e) {
		dispatch({ type: "UPDATE_START_DATE", payload: e.target.value });
	}

	return (
		<input
			className="input input-bordered"
			type="date"
			name="interval-start"
			id="start"
			value={start_date}
			onChange={handleChange}
			disabled={range !== "interval-range"}
		/>
	);
}

export default StartDate;
