import CategoriesDisplay from "./__components/categories-display";
import CreateCategoryForm from "./__components/create-cateogory-form";

function AdminCategoryPage() {
	return (
		<>
			<div className="border-b p-5 mb-5">
				<h2 className="text-xl font-bold">Services / Categories</h2>
			</div>

			<div className="flex flex-wrap gap-5 px-5 border-b pb-5 preview">
				<CreateCategoryForm />
			</div>

			<CategoriesDisplay />
		</>
	);
}

export default AdminCategoryPage;
