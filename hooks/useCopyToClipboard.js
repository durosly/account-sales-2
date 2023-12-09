import { useState } from "react";
import toast from "react-hot-toast";

export function useCopyToClipboard() {
	const [copiedText, setCopiedText] = useState(null);

	const copy = async (text) => {
		if (typeof window === "undefined") return;

		if (!navigator?.clipboard) {
			console.warn("Clipboard not supported");
			return false;
		}

		// Try to save to clipboard then save it in the state if worked
		try {
			await navigator.clipboard.writeText(text);
			setCopiedText(text);
			toast("copied");
			return true;
		} catch (error) {
			console.warn("Copy failed", error);
			setCopiedText(null);
			return false;
		}
	};

	return { copiedText, copy };
}
