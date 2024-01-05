"use client";
import Marquee from "react-fast-marquee";

function MarqueMsg({ msg }) {
	return <Marquee className="bg-base-300 py-1">{msg}</Marquee>;
}

export default MarqueMsg;
