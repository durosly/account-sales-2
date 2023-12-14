import crypto from "crypto";

const validateRequest = function (data, verify_hash) {
	const secretKey = process.env.NOWPAYMENTS_IPN_KEY;
	if (typeof data === "object" && secretKey) {
		const ordered = sortObject(data);

		const string = JSON.stringify(ordered);
		const hmac = crypto.createHmac("sha512", secretKey);
		hmac.update(string);
		const hash = hmac.digest("hex");
		return hash === verify_hash;
	}
	return false;
};

function sortObject(obj) {
	return Object.keys(obj)
		.sort()
		.reduce((result, key) => {
			result[key] =
				obj[key] && typeof obj[key] === "object"
					? sortObject(obj[key])
					: obj[key];
			return result;
		}, {});
}

export default validateRequest;
