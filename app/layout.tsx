import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppWidget from "@/components/WhatsAppWidget";


import { Playfair_Display, Roboto, Yomogi } from "next/font/google";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

const yomogi = Yomogi({
  variable: "--font-yomogi",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://khaleefaholidays.com"),
  title: {
    default: "Khaleefa Holidays | Expert Visa & Holiday Packages in Kerala",
    template: "%s | Khaleefa Holidays"
  },
  description: "Khaleefa Holidays offers premium holiday packages, visa processing, hotel bookings, and cab services. Based in Kerala, we turn your dream vacations into reality.",
  keywords: ["Khaleefa Holidays", "Travel Agency Kerala", "Visa Processing Kerala", "Holiday Packages", "Kerala Tourism", "Vacation Planning", "Best Travel Agency"],
  authors: [{ name: "Khaleefa Holidays" }],
  creator: "Khaleefa Holidays",
  publisher: "Khaleefa Holidays",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Khaleefa Holidays | Expert Visa & Holiday Packages",
    description: "Your trusted partner for premium travel experiences, visa services, and holiday planning in Kerala.",
    url: "https://khaleefaholidays.com",
    siteName: "Khaleefa Holidays",
    images: [
      {
        url: "/images/desktopnav2.png",
        width: 1200,
        height: 630,
        alt: "Khaleefa Holidays Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khaleefa Holidays | Expert Visa & Holiday Packages",
    description: "Premium travel experiences and visa services based in Kerala.",
    images: ["/images/desktopnav2.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/images/footericon.png",
    apple: "/images/footericon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${playfair.variable} ${roboto.variable} ${yomogi.variable} font-sans antialiased`}
      >
        <SmoothScroll>
          <Navbar />
          {children}
          <WhatsAppWidget />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "TravelAgency",
                "name": "Khaleefa Holidays",
                "description": "Premium travel agency in Kerala providing visa services and holiday packages.",
                "url": "https://khaleefaholidays.com",
                "telephone": "9999999999",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "123 Travel Lane",
                  "addressLocality": "Metropolis",
                  "addressRegion": "Kerala",
                  "postalCode": "682001",
                  "addressCountry": "IN"
                },
                "image": "https://khaleefaholidays.com/images/desktopnav2.png",
                "sameAs": [
                  "https://facebook.com/khaleefaholidays",
                  "https://instagram.com/khaleefaholidays"
                ]
              })
            }}
          />
        </SmoothScroll>
      </body>
    </html>
  );
}
