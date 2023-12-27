import path from "path";

async function getTemplate(...paths) {
	const host = `${process.env.NODE_ENV === "production" ? "https://" : ""}${
		process.env.NEXT_PUBLIC_URL
	}`;
	const pathUrl = path.join(host, "emails_template", ...paths);

	let response = await fetch(pathUrl);

	return response.text();
}

export default getTemplate;
