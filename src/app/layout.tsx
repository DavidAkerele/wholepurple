import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Whole Purple | Ethically Sourced, Always",
    template: "%s | Whole Purple"
  },
  description: "Experience the purity of nature with Whole Purple. Ethically sourced fresh produce, premium marinated proteins, and organic pantry essentials delivered to your doorstep in Lagos.",
  keywords: ["organic food", "fresh produce", "ethically sourced", "Lagos grocery delivery", "marinated proteins", "healthy eating Nigeria"],
  authors: [{ name: "Whole Purple" }],
  creator: "Whole Purple",
  publisher: "Whole Purple",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://wholepurple.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Whole Purple | Ethically Sourced, Always",
    description: "Experience the purity of nature. Ethically sourced fresh produce and premium proteins delivered to your doorstep.",
    url: "https://wholepurple.com",
    siteName: "Whole Purple",
    images: [
      {
        url: "/images/social-preview.png",
        width: 1200,
        height: 630,
        alt: "Whole Purple - Ethically Sourced Foods",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whole Purple | Ethically Sourced, Always",
    description: "Experience the purity of nature. Ethically sourced fresh produce delivered to your doorstep.",
    images: ["/images/social-preview.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import AnnouncementBar from "@/components/AnnouncementBar";
import CustomerService from "@/components/CustomerService";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col font-sans`} suppressHydrationWarning>
        <Providers>
          <AnnouncementBar />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <CustomerService />
        </Providers>
      </body>
    </html>
  );
}
