import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Launch Layer | Immersive Digital Agency & Web Engineering",
  description: "A futuristic digital agency engineering cinematic web experiences, modern branding, and state-of-the-art software systems. Launch your digital presence layer by layer.",
  keywords: ["Web Agency", "Creative Web Design", "Cinematic Web Experiences", "Next.js", "Three.js Agency", "Launch Layer", "Digital Engineering", "Premium Software Design"],
  authors: [{ name: "Launch Layer" }],
  openGraph: {
    title: "Launch Layer | Immersive Digital Agency & Web Engineering",
    description: "Launch your business into the online world through futuristic construction and premium visual storytelling.",
    type: "website",
    locale: "en_US",
    siteName: "Launch Layer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Launch Layer | Immersive Digital Agency & Web Engineering",
    description: "Launch your business into the online world through futuristic construction and premium visual storytelling.",
  },
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-[#000F08] text-white min-h-full font-sans antialiased overflow-x-hidden">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
