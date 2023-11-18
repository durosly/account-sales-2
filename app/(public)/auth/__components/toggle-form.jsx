"use client";
import { useSearchParams } from "next/navigation";

function ToggleForms() {
	const searchParams = useSearchParams();

	const action = searchParams.get("action");

	return (
		<input
			type="checkbox"
			name="toggle"
			id="toggle"
			className="peer auth-toggler"
			checked={action === "signup"}
		/>
	);
}

export default ToggleForms;
