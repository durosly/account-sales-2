import CategoryModel from "@/models/category";
import { notFound } from "next/navigation";
import DisplayServices from "./__components/display-services";
import Image from "next/image";
import { GoAlert } from "react-icons/go";
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

			<div className="max-w-4xl mx-auto px-10 mt-5 ">
				<div className="p-5 bg-base-200 rounded-box">
					<div className="flex gap-2 items-center">
						<GoAlert className="w-5 h-5 text-error" />
						<p className="font-bold text-error">Important notice</p>
					</div>

					<ul className="list-disc list-inside mt-5 space-y-2">
						<li>
							Secure your account by changing your password within
							the next 12 hours of purchase.{" "}
							<span className="font-bold text-error">
								No refund
							</span>{" "}
							or replacement available after this period.
						</li>
						<li>
							Prior to making a bulk purchase for the first time,
							consider acquiring a single account initially to{" "}
							<span className="font-bold">
								ensure it aligns with your requirements
							</span>{" "}
							before committing to a larger volume.
						</li>
					</ul>
				</div>
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
