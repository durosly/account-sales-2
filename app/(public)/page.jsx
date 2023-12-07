import Link from "next/link";
import Image from "next/image";
import coverImg from "@/images/girl-cover.png";
import fbIcon from "@/images/fb-icon.png";
import igIcon from "@/images/ig-icon.png";
import likeIcon from "@/images/like-icon.png";
import xIcon from "@/images/x-icon.png";
import lnIcon from "@/images/ln-icon.png";
import tkIcon from "@/images/tk-icon.png";
import ytIcon from "@/images/yt-icon.png";
import tgIcon from "@/images/tg-icon.png";
import {
	SlBadge,
	SlSizeFullscreen,
	SlRocket,
	SlGraph,
	SlLock,
} from "react-icons/sl";
import Categories from "./__components/public-categories";

function Home() {
	return (
		<>
			<div className="md:flex px-10 md:min-h-[30rem] mb-20">
				<div className="flex-1 my-auto space-y-5 max-md:my-10">
					<p className="text-xl text-secondary">
						Best Social Media Market
					</p>
					<h2 className="text-3xl sm:text-5xl font-bold">
						Become a digital marketing success
					</h2>
					<p>
						Your one-stop destination for premium social media
						accounts designed to elevate your online presence. We
						curate a selection of premium social media accounts
						across various platforms, meticulously crafted to meet
						the diverse needs of our discerning clientele.
					</p>
					<div className="space-x-3">
						<Link
							href="/signup"
							className="btn btn-sm max-md:btn-block md:btn-md btn-primary"
						>
							Try us now
						</Link>
						<Link
							href="/about-us"
							className="max-md:hidden btn btn-sm md:btn-md btn-secondary"
						>
							Learn more
						</Link>
					</div>
				</div>
				<div className="relative flex-1 max-md:hidden">
					<Image
						src={fbIcon}
						width={50}
						height={50}
						className="absolute top-36 right-5 drop-shadow-2xl"
						alt=""
					/>
					<Image
						src={igIcon}
						width={50}
						height={50}
						className="absolute top-10 right-28 drop-shadow-2xl"
						alt=""
					/>

					<Image
						src={coverImg}
						fill
						className="object-contain"
						alt=""
						sizes="(min-width: 780px) calc(50vw - 40px), (min-width: 420px) calc(100vw - 80px), calc(8vw + 288px)"
					/>
					<Image
						src={lnIcon}
						width={50}
						height={50}
						className="absolute top-8 left-52 z-20 drop-shadow-2xl"
						alt=""
					/>
					<div className="border bg-base-100 absolute top-1/4 -translate-y-1/2 -left-3 sm:left-10  p-5 rounded-2xl shadow-xl">
						<span className="bg-success/10 shadow-2xl flex w-8 h-8 rounded-full justify-center items-center">
							<SlBadge className="w-3/5 h-3/5 fill-success" />
						</span>
						<p className="text-xl font-bold">8000+</p>
						<p className="text-xs">Accounts sold</p>
					</div>
					<Image
						src={xIcon}
						width={50}
						height={50}
						className="absolute bottom-8 left-52 z-20 drop-shadow-2xl"
						alt=""
					/>
					<Image
						src={likeIcon}
						width={50}
						height={50}
						className="absolute bottom-16 right-36 z-20 drop-shadow-2xl"
						alt=""
					/>
				</div>
			</div>
			<div className="px-10 mb-20">
				<p className="text-secondary">What we have for you</p>
				<h2 className="text-4xl font-bold mb-5">
					Products and services
				</h2>
				{/* <OrderForm /> */}
				<Categories />
			</div>
			<div className="px-10 mb-20">
				<p className="text-secondary">Why Choose Us?</p>
				<h2 className="text-3xl md:text-5xl font-bold mb-10">
					Grow your business without stress
				</h2>

				<div className="flex gap-10 flex-wrap">
					<div className="w-full sm:w-[calc((100%_-2.5rem_*_1)_/_2)] md:w-[calc((100%_-2.5rem_*_3)_/_4)] border rounded-2xl p-5 space-y-5">
						<span className="bg-success/20 flex w-14 h-14 rounded-2xl justify-center items-center">
							<SlBadge className="w-3/5 h-3/5 fill-success" />
						</span>
						<h3 className="text-xl font-bold">
							Premium Quality Accounts
						</h3>
						<p>
							Our team is dedicated to offering nothing but the
							best. We prioritize premium accounts to ensure that
							our customers receive the highest value for their
							investment.
						</p>
					</div>
					<div className="w-full sm:w-[calc((100%_-2.5rem_*_1)_/_2)] md:w-[calc((100%_-2.5rem_*_3)_/_4)] border rounded-2xl p-5 space-y-5">
						<span className="bg-orange-500/20 flex w-14 h-14 rounded-2xl justify-center items-center">
							<SlSizeFullscreen className="w-3/5 h-3/5 fill-orange-500" />
						</span>
						<h3 className="text-xl font-bold">
							Diverse Platform Options
						</h3>
						<p>
							Whether you&apos;re looking to establish a strong
							presence on Instagram, Twitter, Facebook, or other
							popular platforms, we have a wide range of premium
							accounts to cater to your specific requirements.
						</p>
					</div>
					<div className="w-full sm:w-[calc((100%_-2.5rem_*_1)_/_2)] md:w-[calc((100%_-2.5rem_*_3)_/_4)] border rounded-2xl p-5 space-y-5">
						<span className="bg-black/20 flex w-14 h-14 rounded-2xl justify-center items-center">
							<SlRocket className="w-3/5 h-3/5 fill-black" />
						</span>
						<h3 className="text-xl font-bold">
							Instant Social Media Boost
						</h3>
						<p>
							With us, you can skip the initial hurdles and
							kickstart your online journey instantly. Our premium
							accounts come with established followings, allowing
							you to make an immediate impact in the digital
							landscape.
						</p>
					</div>
					<div className="w-full sm:w-[calc((100%_-2.5rem_*_1)_/_2)] md:w-[calc((100%_-2.5rem_*_3)_/_4)] border rounded-2xl p-5 space-y-5">
						<span className="bg-primary/20 flex w-14 h-14 rounded-2xl justify-center items-center">
							<SlGraph className="w-3/5 h-3/5 fill-primary" />
						</span>
						<h3 className="text-xl font-bold">
							Enhanced Engagement
						</h3>
						<p>
							We believe that engagement is the key to a
							successful online presence. Our premium social media
							accounts not only come with a substantial follower
							base but also boast high engagement rates.
						</p>
					</div>
					<div className="w-full sm:w-[calc((100%_-2.5rem_*_1)_/_2)] md:w-[calc((100%_-2.5rem_*_3)_/_4)] border rounded-2xl p-5 space-y-5">
						<span className="bg-secondary/20 flex w-14 h-14 rounded-2xl justify-center items-center">
							<SlLock className="w-3/5 h-3/5 fill-secondary" />
						</span>
						<h3 className="text-xl font-bold">
							Secure Transactions
						</h3>
						<p>
							Your trust is our priority. Here, we ensure secure
							transactions and a transparent process. Our payment
							gateways are encrypted to safeguard your financial
							information.
						</p>
					</div>
				</div>
			</div>

			{/* TODO: add how it works here */}

			{/* Serives */}
			<div className="px-10 mb-20">
				<p className="text-secondary">Services we offer?</p>
				<h2 className="text-3xl md:text-5xl font-bold mb-10">
					Get custom solutions for your business
				</h2>
				<div className="md:flex gap-20">
					<div className="max-md:hidden relative flex-1 rounded-2xl overflow-hidden max-h-[700px]">
						{/* <Image
							src="https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
							alt=""
							fill
							className="object-cover"
						/> */}
						<video
							src="/videos/happy-customer.mp4"
							autoPlay
							loop
							muted
							className="h-full w-full object-cover"
						/>
					</div>
					<div className="flex-1">
						<p className="mb-10">
							We specialize in delivering tailor-made solutions to
							enhance your social media presence. Our services are
							designed to provide flexibility and exceptional
							value, ensuring that your online journey is both
							seamless and impactful.
						</p>
						<div className="flex flex-wrap gap-10 justify-center md:justify-between">
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
					</div>
				</div>
			</div>

			{/* businness */}
			<div className="px-10 mb-20">
				<p className="text-secondary">Our mission and Vision</p>
				<h2 className="text-3xl md:text-5xl font-bold mb-10">
					Realize your business goals for more profits
				</h2>

				<div className="space-y-5">
					<div>
						<h3 className="text-secondary font-bold">Mission</h3>
						<p>
							Empowering individuals and businesses to thrive in
							the digital era by providing premium social media
							accounts that catalyze immediate impact and foster
							authentic connections. We are dedicated to offering
							a diverse range of high-quality, pre-established
							social media profiles that not only elevate online
							presence but also simplify and expedite the journey
							towards digital success.
						</p>
					</div>
					<div>
						<h3 className="text-secondary font-bold">Vision</h3>
						<p>
							To be the premier destination for individuals and
							businesses seeking to enhance their social media
							influence. We aim to revolutionize the online
							experience by offering a curated selection of
							premium accounts across various platforms, coupled
							with personalized service and unwavering commitment
							to security and transparency. Through innovation and
							customer-centricity, we aspire to be the catalyst
							for our clients&apos; digital triumphs, fostering a
							connected and influential global community.
						</p>
					</div>
				</div>
			</div>

			{/* Get started */}

			<div className="p-7 md:p-10 rounded-xl border border-primary text-center mx-10 mb-20">
				<h2 className="text-2xl md:text-4xl font-bold mb-5">
					Can&apos;t wait to have you with us
				</h2>
				<Link
					href="/signup"
					className="btn btn-primary btn-wide"
				>
					Get started now
				</Link>
			</div>
		</>
	);
}

export default Home;
