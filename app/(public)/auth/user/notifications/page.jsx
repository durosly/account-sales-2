import DisplayNotifications from "./__components/display-notifications";

function UsernNotificationsPage() {
	return (
		<>
			<div className="px-10 mb-20 mt-10">
				<h1 className="text-4xl font-bold">Notifications</h1>
			</div>

			<DisplayNotifications />
		</>
	);
}

export default UsernNotificationsPage;
