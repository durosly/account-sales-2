function truncateString(inputString, maxLength, ellipsePosition) {
	// Ensure the input is a string
	if (typeof inputString !== "string") {
		throw new Error("Input must be a string");
	}

	// Ensure maxLength is a positive number
	if (typeof maxLength !== "number" || maxLength <= 0) {
		throw new Error("MaxLength must be a positive number");
	}

	// Ensure ellipsePosition is a valid string
	if (!["start", "middle", "end"].includes(ellipsePosition)) {
		throw new Error("Ellipse position must be one of: start, middle, end");
	}

	// Return the original string if its length is less than or equal to maxLength
	if (inputString.length <= maxLength) {
		return inputString;
	}

	// Calculate the length of the truncated string
	const truncatedLength = maxLength - 3; // accounting for the length of '...'

	// Truncate the string based on the ellipsePosition
	switch (ellipsePosition) {
		case "start":
			return "..." + inputString.slice(-truncatedLength);
		case "middle":
			const prefixLength = Math.floor(truncatedLength / 2);
			const suffixLength = Math.ceil(truncatedLength / 2);
			return (
				inputString.slice(0, prefixLength) +
				"..." +
				inputString.slice(-suffixLength)
			);
		case "end":
			return inputString.slice(0, truncatedLength) + "...";
		default:
			throw new Error("Invalid ellipse position");
	}
}

export default truncateString;
