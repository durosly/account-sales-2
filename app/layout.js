import categoryList from "@/app/categories.json";
import keywordsList from "@/app/keywords.json";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "react-loading-skeleton/dist/skeleton.css";
import ClientWrapper from "./components/client-wrapper";
import "flag-icons/css/flag-icons.min.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { metaInfo } from "./meta";
import HandleNotification from "./components/handle-notification";
const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport = {
	themeColor: "#4A00FF",
};

export const metadata = {
	title: {
		default: metaInfo.title, // a default is required when creating a template
		template: "%s | Social Media Accounts at SMvaults",
	},
	category: [...categoryList.categories],
	keywords: [...keywordsList.keywords],
	metadataBase: new URL(process.env.NEXT_PUBLIC_URL),
	openGraph: {
		title: metaInfo.title,
		description: metaInfo.description,

		url: process.env.NEXT_PUBLIC_URL,
		siteName: "SMvaults account sales and management",
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
				<HandleNotification />
				<ClientWrapper>{children}</ClientWrapper>
				<Toaster />
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
