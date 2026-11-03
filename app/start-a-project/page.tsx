import { readFileSync } from "fs";
import path from "path";
import Script from "next/script";
import { SiteLoader } from "@/components/site/SiteLoader";
import { getSiteContent } from "@/lib/content";

export const dynamic = "force-static";

export default async function StartAProjectPage() {
  const html = readFileSync(path.join(process.cwd(), "components/brief/shell.html"), "utf8");
  const { settings } = await getSiteContent();
  return (
    <>
      <SiteLoader caption={settings.loaderCaption} />
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/assets/js/loader.js?v=1" strategy="afterInteractive" />
      <Script src="/assets/js/brief.js?v=1" strategy="afterInteractive" />
    </>
  );
}