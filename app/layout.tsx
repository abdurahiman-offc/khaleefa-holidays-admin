import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import WhatsAppWidget from "@/components/WhatsAppWidget";
import AirplaneScroll from "@/components/AirplaneScroll";

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
  title: "Khaleefa Holidays",
  description: "Your trusted partner for visa and holiday packages.",
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
          <AirplaneScroll />
        </SmoothScroll>
      </body>
    </html>
  );
}
