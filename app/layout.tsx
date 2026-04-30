import type { Metadata } from "next";
import "./globals.css";
import AgeGate from "@/components/AgeGate";
import FeedbackBot from "@/components/FeedbackBot";
import Script from "next/script";

export const metadata: Metadata = {
  title: "AdultTube — Premium HD Adult Entertainment",
  description:
    "Experience the most modern adult platform. Watch thousands of free HD adult videos in 4K quality. Fast, sleek, and premium.",
  robots: { index: false, follow: false },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>",
    shortcut: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>",
  },
  openGraph: {
    title: "AdultTube — Premium HD Adult Entertainment",
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
    title: "AdultTube — Premium HD Adult Entertainment",
    description: "Watch thousands of free HD adult videos in 4K quality.",
    images: ["/og-image.png"],
  },
  other: {
    rating: "adult",
    "RTA-label": "RTA-5042-1996-1400-1577-RTA",
  },
};


import { SidebarProvider } from "@/components/SidebarContext";
import LayoutContent from "@/components/LayoutContent";
import { Analytics } from "@vercel/analytics/next"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="rating" content="adult" />
        <meta name="RTA-label" content="RTA-5042-1996-1400-1577-RTA" />

        <Script
          src="https://developdomicile.com/a9/6d/bd/a96dbd3a07b17cb6307ddeedd9200ebd.js"
          strategy="beforeInteractive"
        />

        <Script
          src="https://developdomicile.com/b9/ad/21/b9ad2171592920c6896b6f6f3ca3f63a.js"
          strategy="beforeInteractive"
        />

        <Script
          async
          src="https://js.mbidadm.com/static/scripts.js"
          data-admpid="438693"
          strategy="lazyOnload"
        />
      </head>
      <body>
        <AgeGate />
        <SidebarProvider>
          <LayoutContent>
            {children}
          </LayoutContent>
        </SidebarProvider>
        <FeedbackBot />
        <Analytics />

        <Script
          src="https://developdomicile.com/5f/1c/16/5f1c164a14ef480ce9978a93c500b866.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
