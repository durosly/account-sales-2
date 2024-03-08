import { handleError } from "./handleError";

export function strigifyObj(data) {
	if (typeof data !== "object") return data;
	return JSON.parse(JSON.stringify(data));
}

async function checkFBStatus(uid) {
	return new Promise((res) => {
		const url =
			"https://graph.facebook.com/" + uid + "/picture?type=normal";
		fetch(url).then((response) => {
			if (!/static.xx.fbcdn.net/.test(response.url)) {
				res(true);
			} else {
				res(false);
			}
		});
	});
}

export { handleError as handleClientError, checkFBStatus };
