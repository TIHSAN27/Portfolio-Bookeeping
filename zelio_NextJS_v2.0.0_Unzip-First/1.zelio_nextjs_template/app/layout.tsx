import "/public/assets/css/vendors/bootstrap.min.css"
import "/public/assets/css/vendors/swiper-bundle.min.css"
import "/public/assets/css/vendors/carouselTicker.css"
import "/public/assets/css/vendors/magnific-popup.css"
import "/public/assets/fonts/remixicon/remixicon.css"
import "/public/assets/css/main.css"
import "./cursor-portrait.css"

import type { Metadata } from "next"
import localFont from "next/font/local"

const urbanist = localFont({
	src: './fonts/urbanist-latin.woff2',
	weight: '300 700',
	variable: "--urbanist",
	display: 'swap',
})
const playfair_display = localFont({
	src: [
		{ path: './fonts/playfair-latin.woff2', weight: '400 700', style: 'normal' },
		{ path: './fonts/playfair-italic.ttf', weight: '400', style: 'italic' },
	],
	variable: "--playpair",
	display: 'swap',
})
const dmMono = localFont({
	src: [
		{ path: './fonts/dm-mono-light-latin.woff2', weight: '300' },
		{ path: './fonts/dm-mono-latin.woff2', weight: '400' },
		{ path: './fonts/dm-mono-medium-latin.woff2', weight: '500' },
	],
	variable: "--dmMono",
	display: 'swap',
})

export const metadata: Metadata = {
	title: "Muhammad Taimoor Ihsan | Remote Bookkeeper & Financial Reporting Specialist",
	description: "Remote bookkeeper and financial reporting specialist with 5+ years of full-charge bookkeeping, accounts payable/receivable, and financial reporting for US and Canadian clients. QuickBooks Certified ProAdvisor and Xero Certified Advisor.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" data-bs-theme="dark" className="zelio">
			<body className={`${urbanist.variable} ${playfair_display.variable} ${dmMono.variable}`}>{children}</body>
		</html>
	)
}
