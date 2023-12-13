import DisplayCurrencies from "./__components/display-currencies";

function AdminCurrenciesPage() {
	return (
		<>
			<div className="border-b p-5 mb-5">
				<h2 className="text-xl font-bold">Currencies</h2>
			</div>
			<DisplayCurrencies />
		</>
	);
}

export default AdminCurrenciesPage;
