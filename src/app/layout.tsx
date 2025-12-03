import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OpenBrain - Chaos to Order",
  description: "OpenBrain transforms complex challenges into streamlined digital solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LanguageProvider>
          <SmoothScroller>
            <LanguageSwitcher />
            {children}
          </SmoothScroller>
        </LanguageProvider>
      </body>
    </html>
  );
}
