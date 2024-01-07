"use client";

import { useContext } from "react";
import { StatisticsContext } from "../context";
import { DateTime } from "luxon";

function StartDate() {
	const {
		state: { start_date, range },
		dispatch,
	} = useContext(StatisticsContext);

	function handleChange(e) {
		dispatch({ type: "UPDATE_START_DATE", payload: e.target.value });
	}

	const maxDate = DateTime.now().toISODate();

	return (
		<input
			className="input input-bordered"
			type="date"
			name="interval-start"
			id="start"
			value={start_date}
			onChange={handleChange}
			disabled={range !== "interval-range"}
			max={maxDate}
		/>
	);
}

export default StartDate;
