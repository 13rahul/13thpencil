import { readFileSync } from "fs";
import path from "path";
import Script from "next/script";

export const dynamic = "force-static";

export default function StartAProjectPage() {
  const html = readFileSync(path.join(process.cwd(), "components/brief/shell.html"), "utf8");
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Script src="/assets/js/brief.js?v=1" strategy="afterInteractive" />
    </>
  );
}