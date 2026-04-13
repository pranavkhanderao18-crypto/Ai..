import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import AuthModal from "@/components/AuthModal";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "HumanizeAI — Turn AI Images into Real Human Photos",
  description:
    "Enhance skin texture, lighting, and details instantly using AI. HumanizeAI converts AI-generated images into hyper-realistic human photos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-mesh">
        {children}
        <AuthModal />
      </body>
    </html>
  );
}
