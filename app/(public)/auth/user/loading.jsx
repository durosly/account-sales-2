import React from "react";

function loading() {
	return (
		<div className="flex min-h-[500px] justify-center items-center">
			<div className="text-center">
				<h3 className="text-xl font-bold">AccHub</h3>
				<div class="wrapper">
					<div class="circle"></div>
					<div class="circle"></div>
					<div class="circle"></div>
					<div class="shadow"></div>
					<div class="shadow"></div>
					<div class="shadow"></div>
				</div>
			</div>
		</div>
	);
}

export default loading;
