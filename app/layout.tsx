import type { Metadata, Viewport } from "next";
import "./globals.css";
import WhatsAppWidget from "@/components/WhatsAppWidget";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0A192F",
};

export const metadata: Metadata = {
  title: "Global Insight Cleaning Services | Accra, Ghana",
  description:
    "Accra's premier residential, commercial, post-construction, and deep cleaning specialists. Spotless results, vetted professional cleaners, and instant online bookings.",
  keywords: [
    "cleaning services Accra",
    "Global Insight cleaning",
    "office cleaning Ghana",
    "residential deep clean Accra",
    "fumigation services Accra",
    "post-construction cleaning Ghana",
  ],
  authors: [{ name: "Global Insight Cleaning Services" }],
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Global Insight",
  },
  openGraph: {
    title: "Global Insight Cleaning Services | Premier Cleaning in Accra",
    description:
      "Vetted professionals, eco-friendly hospital-grade equipment, 100% satisfaction guarantee.",
    url: "https://globalinsightcleaning.com",
    siteName: "Global Insight Cleaning",
    locale: "en_GH",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-white text-slate-800 antialiased selection:bg-[#0066CC]/10 selection:text-[#0066CC]">
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
