import React from "react";
import DisplayUsers from "./__components/display-users";

function AdminUsers() {
	return (
		<>
			<div className="border-b p-5 mb-10">
				<h2 className="text-xl font-bold">Users</h2>
			</div>

			<DisplayUsers />
		</>
	);
}

export default AdminUsers;
