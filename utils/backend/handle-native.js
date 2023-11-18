function handleNativeResponse(data, status) {
	return new Response(JSON.stringify(data), {
		status,
		headers: {
			"Content-Type": "application/json",
		},
	});
}

export default handleNativeResponse;
