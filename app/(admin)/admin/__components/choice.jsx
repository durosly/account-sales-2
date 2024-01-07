"use client";

import { useContext } from "react";
import { StatisticsContext } from "../context";

function Choices() {
	const {
		state: { range },
		dispatch,
	} = useContext(StatisticsContext);

	function handleChange(value) {
		dispatch({ type: "UPDATE_CHOICE", payload: value });
	}

	return (
		<>
			<input
				type="radio"
				name="range"
				id="all-range"
				className="btn"
				aria-label="All time"
				value="all-range"
				checked={range === "all-range"}
				onChange={(e) => handleChange(e.target.value)}
			/>
			<input
				type="radio"
				name="range"
				id="today-range"
				className="btn"
				aria-label="Today"
				value="today-range"
				checked={range === "today-range"}
				onChange={(e) => handleChange(e.target.value)}
			/>
			<input
				type="radio"
				name="range"
				id="interval-range"
				className="btn"
				aria-label="Interval"
				value="interval-range"
				checked={range === "interval-range"}
				onChange={(e) => handleChange(e.target.value)}
			/>
		</>
	);
}

export default Choices;
