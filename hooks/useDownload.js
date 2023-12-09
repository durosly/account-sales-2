function useDownload() {
	const TextFile = (data) => {
		const element = document.createElement("a");
		const file = new Blob([data], { type: "text/plain" });
		element.href = URL.createObjectURL(file);
		element.download = "hub.txt";
		element.classList.add("hidden");
		document.body.appendChild(element); // Required for this to work in FireFox
		element.click();

		setTimeout(() => {
			document.body.removeChild(element);
		}, 10000);
	};
	return { downloadAsTxt: TextFile };
}

export default useDownload;
