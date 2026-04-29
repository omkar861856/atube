import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "@/components/AgeGate";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      </head>
      <body>
        <AgeGate />
        <Suspense>
          <Navbar />
        </Suspense>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
