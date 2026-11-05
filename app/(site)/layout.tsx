import type { ReactNode } from "react";
import Script from "next/script";
import { SiteLoader } from "@/components/site/SiteLoader";
import { getSiteContent } from "@/lib/content";

export default async function SiteLayout({ children }: { children: ReactNode }) {
  const { settings } = await getSiteContent();

  return (
    <>
      <link rel="stylesheet" href="/assets/css/styles.css?v=58" />
      <SiteLoader caption={settings.loaderCaption} />
      {children}
      <Script src="/assets/js/site.js?v=47" strategy="afterInteractive" />
    </>
  );
}
