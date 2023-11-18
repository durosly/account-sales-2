import Link from "next/link";
import AddServices from "./__components/add-services";
import DisplayServices from "./__components/display-services";

function AdminServicesPage() {
	return (
		<>
			<div className="border-b p-5 mb-5">
				<h2 className="text-xl font-bold">Services</h2>
			</div>

			<div className="flex flex-wrap gap-5 px-5 border-b pb-5 preview">
				<Link
					href="/admin/services/categories"
					className="btn btn-primary"
				>
					Categories
				</Link>
				<AddServices />
			</div>

			<DisplayServices />
		</>
	);
}

export default AdminServicesPage;
