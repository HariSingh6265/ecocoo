import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display, Caveat, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const handwriting = Caveat({
  subsets: ["latin"],
  variable: "--font-handwriting",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Before I say Happy Birthday — A Friendship Journal",
  description: "A digital scrapbook and friendship story dedicated to Monica Gaha.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="en" 
      className={`${sans.variable} ${serif.variable} ${handwriting.variable} ${mono.variable} scroll-smooth`}
    >
      <body className="bg-[#FAF7F2] text-[#2C2926] font-sans antialiased selection:bg-[#F3E8DC] selection:text-[#1A1816] min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
