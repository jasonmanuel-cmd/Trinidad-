import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AgeGate from "@/components/AgeGate";
import SplashScreen from "@/components/SplashScreen";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Trinidad's Trippy Treats | Premium Cannabis Delivery Bakersfield",
  description: "Bakersfield's premium cannabis delivery service. Boutique flower, edibles, and curated drops delivered with ID-verified handoff. 21+ only.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SplashScreen />
        <AgeGate />
        {children}
      </body>
    </html>
  );
}
