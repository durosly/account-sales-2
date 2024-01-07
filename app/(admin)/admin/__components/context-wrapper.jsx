"use client";
import { useReducer } from "react";
import { Provider, reducer } from "../context";

const initialState = {
	range: "all-range",
	start_date: "",
	end_date: "",
};

function ContextWrapper({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export default ContextWrapper;
