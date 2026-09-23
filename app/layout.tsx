import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#181A1C",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://13thpencil.com"),
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
    <html lang="en" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Newsreader:ital,wght@0,300;0,400;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
