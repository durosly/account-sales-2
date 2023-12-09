import React from "react";

function loading() {
	return (
		<div className="flex min-h-screen justify-center items-center">
			<div className="text-center">
				<h3>AccHub</h3>
				<span className="loading loading-dots loading-lg"></span>
			</div>
		</div>
	);
}

export default loading;
