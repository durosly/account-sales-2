import Link from "next/link";
import AddServices from "./__components/add-services";
import DisplayServices from "./__components/display-services";

async function AdminServicesPage() {
	const response = await fetch(
		"https://gist.githubusercontent.com/anubhavshrimal/75f6183458db8c453306f93521e93d37/raw/f77e7598a8503f1f70528ae1cbf9f66755698a16/CountryCodes.json"
	);
	const countries = await response.json();

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
				<AddServices countries={countries} />
			</div>

			<DisplayServices />
		</>
	);
}

export default AdminServicesPage;
