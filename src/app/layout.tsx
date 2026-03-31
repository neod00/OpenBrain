import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import { LanguageProvider } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
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
        className={`${spaceGrotesk.variable} ${plusJakarta.variable} font-sans antialiased`}
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
