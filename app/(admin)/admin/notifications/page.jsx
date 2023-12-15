import AddNewNotification from "./__components/add-new-notification";
import DisplayNotice from "./__components/display-notice";

function AdminNotificationPage() {
	return (
		<>
			<div className="border-b p-5 mb-5">
				<h2 className="text-xl font-bold">Notifications</h2>
			</div>
			<div className="px-5">
				<AddNewNotification />
			</div>
			<DisplayNotice />
		</>
	);
}

export default AdminNotificationPage;
