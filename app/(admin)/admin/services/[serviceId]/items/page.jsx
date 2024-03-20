import connectMongo from "@/lib/connectDB";
import SubCategoryModel from "@/models/sub-category";
import { notFound } from "next/navigation";
import DisplayItems from "./__components/display-items";
import ServiceModel from "@/models/service";
import ItemContext from "./__components/item-context";

async function page({ params: { serviceId } }) {
	await connectMongo();

	const service = await ServiceModel.findById(serviceId).populate(
		"subCategoryId"
	);

	if (!service) notFound();

	return (
		<>
			<div className="border-b p-5 mb-5">
				<h2 className="text-xl font-bold">
					{service.subCategoryId.name}
				</h2>
			</div>

			<ItemContext>
				<DisplayItems serviceId={serviceId} />
			</ItemContext>
		</>
	);
}

export default page;
