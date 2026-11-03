import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#181A1C",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  icons: {
    icon: [
      { url: "/assets/brand/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/assets/brand/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link
          rel="preload"
          href="/assets/fonts/bricolage.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/assets/fonts/newsreader.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <script
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var u=navigator.userAgent;if(/Googlebot|Google-InspectionTool|Chrome-Lighthouse|bingbot|BingPreview|DuckDuckBot|Slurp|facebookexternalhit|Twitterbot|LinkedInBot|Applebot|Yandex|Baiduspider|Pingdom|GTmetrix/i.test(u)||window.matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.classList.add("skip-loader")}}catch(e){}})();',
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
