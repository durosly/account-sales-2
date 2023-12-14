import CategoryModel from "@/models/category";
import CategoriesDisplay from "./__components/categories-display";
import CreateCategoryForm from "./__components/create-cateogory-form";
import { notFound } from "next/navigation";
import truncateString from "@/utils/shared/trunc";
import connectMongo from "@/lib/connectDB";

async function AdminSubCategoryPage({ params: { categoryId } }) {
	await connectMongo();
	const category = await CategoryModel.findById(categoryId);

	if (!category) {
		notFound();
	}

	return (
		<>
			<div className="border-b p-5 mb-5">
				<h2 className="text-xl font-bold">
					Services / Category(
					{truncateString(category.name, 20, "middle")}) / Sub
					categories
				</h2>
			</div>

			<div className="flex flex-wrap gap-5 px-5 border-b pb-5 preview">
				<CreateCategoryForm id={categoryId} />
			</div>

			<CategoriesDisplay id={categoryId} />
		</>
	);
}

export default AdminSubCategoryPage;
