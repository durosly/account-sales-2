import { Inter } from "next/font/google";
import "react-loading-skeleton/dist/skeleton.css";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ClientWrapper from "./components/client-wrapper";
const inter = Inter({ subsets: ["latin"] });
import keywordsList from "@/app/keywords.json";
import categoryList from "@/app/categories.json";
import { metaInfo } from "./meta";

export const viewport = {
	themeColor: "#4A00FF",
};

export const metadata = {
	title: {
		default: metaInfo.title, // a default is required when creating a template
		template: "%s | Social Media Accounts at AccHub",
	},
	category: [...categoryList.categories],
	keywords: [...keywordsList.keywords],
	metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
	openGraph: {
		title: metaInfo.title,
		description: metaInfo.description,

		url: process.env.NEXT_PUBLIC_URL,
		siteName: "AccHub account sales and management",
		images: [
			{
				url: `/images/main.png`,
				width: 800,
				height: 600,
			},
			{
				url: "/images/main.png",
				width: 1800,
				height: 1600,
				alt: metaInfo.title,
			},
		],
		twitter: {
			card: "summary_large_image",
			title: metaInfo.title,
			description: metaInfo.description,
			creator: "@durosly_",
			images: [`/images/main.png`],
		},
		locale: "en_US",
		type: "website",
	},
	description: metaInfo.description,
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ClientWrapper>{children}</ClientWrapper>
				<Toaster />
			</body>
		</html>
	);
}
