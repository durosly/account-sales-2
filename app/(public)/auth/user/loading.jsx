import React from "react";

function loading() {
	return (
		<div className="flex min-h-[500px] justify-center items-center">
			<div className="text-center">
				<h3 className="text-xl font-bold">AccHub</h3>
				<span className="loading loading-dots"></span>
			</div>
		</div>
	);
}

export default loading;
