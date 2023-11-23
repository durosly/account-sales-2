import fbIcon from "@/images/fb-icon.png";
import igIcon from "@/images/ig-icon.png";
import lnIcon from "@/images/ln-icon.png";
import tgIcon from "@/images/tg-icon.png";
import tkIcon from "@/images/tk-icon.png";
import xIcon from "@/images/x-icon.png";
import ytIcon from "@/images/yt-icon.png";
import Image from "next/image";

export const metadata = { title: "Services" };

function ServicesPage() {
	return (
		<>
			<div className="px-10 mt-5 mb-20">
				<h1 className="text-2xl text-secondary">Services</h1>
				<p>
					In an era where social media plays a pivotal role in
					personal and professional networking, we understand the
					importance of having a robust and influential online
					identity. We curate a selection of premium social media
					accounts across various platforms, meticulously crafted to
					meet the diverse needs of our discerning clientele.
				</p>
			</div>

			<div className="flex flex-wrap gap-10 justify-center mb-20 px-10">
				<div className="relative w-24 sm:w-32 md:w-40 aspect-square">
					<Image
						src={fbIcon}
						alt="facebook"
						fill
						className="object-contain"
						sizes="(min-width: 780px) 160px, (min-width: 640px) 128px, 96px"
					/>
				</div>
				<div className="relative w-24 sm:w-32 md:w-40 aspect-square">
					<Image
						src={xIcon}
						alt="twitter"
						fill
						className="object-contain"
						sizes="(min-width: 780px) 160px, (min-width: 640px) 128px, 96px"
					/>
				</div>
				<div className="relative w-24 sm:w-32 md:w-40 aspect-square">
					<Image
						src={igIcon}
						alt="instagram"
						fill
						className="object-contain"
						sizes="(min-width: 780px) 160px, (min-width: 640px) 128px, 96px"
					/>
				</div>
				<div className="relative w-24 sm:w-32 md:w-40 aspect-square">
					<Image
						src={ytIcon}
						alt="youtube"
						fill
						className="object-contain"
						sizes="(min-width: 780px) 160px, (min-width: 640px) 128px, 96px"
					/>
				</div>
				<div className="relative w-24 sm:w-32 md:w-40 aspect-square">
					<Image
						src={tgIcon}
						alt="telegram"
						fill
						className="object-contain"
						sizes="(min-width: 780px) 160px, (min-width: 640px) 128px, 96px"
					/>
				</div>
				<div className="relative w-24 sm:w-32 md:w-40 aspect-square">
					<Image
						src={lnIcon}
						alt="facebook"
						fill
						className="object-contain"
						sizes="(min-width: 780px) 160px, (min-width: 640px) 128px, 96px"
					/>
				</div>
				<div className="relative w-24 sm:w-32 md:w-40 aspect-square">
					<Image
						src={tkIcon}
						alt="facebook"
						fill
						className="object-contain"
						sizes="(min-width: 780px) 160px, (min-width: 640px) 128px, 96px"
					/>
				</div>
			</div>

			<div className="px-10 mb-20 text-center italic">
				<p>No matter your choice, we would always deliver</p>
			</div>
		</>
	);
}

export default ServicesPage;
