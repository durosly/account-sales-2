import CategoryModel from "@/models/category";
import { notFound } from "next/navigation";
import DisplayServices from "./__components/display-services";
import Image from "next/image";
import connectMongo from "@/lib/connectDB";

async function servicesPage({ params: { id, subId } }) {
	await connectMongo();

	let category = { cover: "like-icon.png", name: "All categories" };
	if (id !== "all") category = await CategoryModel.findById(id);

	if (!category) {
		notFound();
	}

	return (
		<>
			<div className="max-w-4xl mx-auto mt-5 px-10 flex gap-2 items-center">
				<div className="relative w-10 h-10">
					<Image
						src={`/images/${category?.cover || "like-icon.png"}`}
						fill
						className="object-contain"
					/>
				</div>
				<h2 className="text-2xl font-bold">{category.name}</h2>
			</div>
			<DisplayServices
				id={id}
				subId={subId}
				categoryCover={category.cover}
			/>
		</>
	);
}

export default servicesPage;
