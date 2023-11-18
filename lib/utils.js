import { handleError } from "./handleError";

export function strigifyObj(data) {
	if (typeof data !== "object") return data;
	return JSON.parse(JSON.stringify(data));
}

export { handleError as handleClientError };
