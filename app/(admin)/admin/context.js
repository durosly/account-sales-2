import { createContext } from "react";

export const StatisticsContext = createContext("");

export const Provider = StatisticsContext.Provider;

export function reducer(state, action) {
	switch (action.type) {
		case "UPDATE_CHOICE":
			return {
				...state,
				range: action.payload,
				start_date: "",
				end_date: "",
			};
		case "UPDATE_START_DATE":
			return {
				...state,
				start_date: action.payload,
			};
		case "UPDATE_END_DATE":
			return {
				...state,
				end_date: action.payload,
			};

		default:
			return state;
	}
}
