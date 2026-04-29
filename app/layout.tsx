import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeedbackBot from "@/components/FeedbackBot";
import Script from "next/script";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "AdultTube — Free HD Porn Videos",
  description:
    "Watch thousands of free HD adult videos in 4K quality. Search, browse by category, and discover the best adult content. All content is from Eporner.",
  robots: { index: false, follow: false },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>",
    shortcut: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>",
  },
  openGraph: {
    title: "AdultTube — Free HD Porn Videos",
    description: "Watch thousands of free HD adult videos in 4K quality.",
    url: "https://atube.vercel.app",
    siteName: "AdultTube",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AdultTube Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AdultTube — Free HD Porn Videos",
    description: "Watch thousands of free HD adult videos in 4K quality.",
    images: ["/og-image.png"],
  },
  other: {
    rating: "adult",
    "RTA-label": "RTA-5042-1996-1400-1577-RTA",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* RTA Parental Control Label */}
        <meta name="rating" content="adult" />
        <meta name="RTA-label" content="RTA-5042-1996-1400-1577-RTA" />

        {/* ── Popunder — atube.zeabur.app ── */}
        <Script
          src="https://developdomicile.com/a9/6d/bd/a96dbd3a07b17cb6307ddeedd9200ebd.js"
          strategy="beforeInteractive"
        />

        {/* ── Popunder — atube.vercel.app ── */}
        <Script
          src="https://developdomicile.com/b9/ad/21/b9ad2171592920c6896b6f6f3ca3f63a.js"
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <AgeGate />
        <Suspense>
          <Navbar />
        </Suspense>
        <main>{children}</main>
        <Footer />
        <FeedbackBot />

        {/* ── Social Bar — atube.zeabur.app (before </body>) ── */}
        <Script
          src="https://developdomicile.com/5f/1c/16/5f1c164a14ef480ce9978a93c500b866.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
