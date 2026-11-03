import type { ReactNode } from "react";

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preload" href="/assets/fonts/patrick-hand.woff2" as="font" type="font/woff2" crossOrigin="" />
      <link rel="stylesheet" href="/assets/css/about.css?v=6" />
      {children}
    </>
  );
}
