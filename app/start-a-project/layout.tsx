import type { Metadata } from "next";
import type { ReactNode } from "react";
import { siteUrl } from "@/lib/site";

const title = "Start a project — 13th Pencil";
const description = "Bring us the brief. Name, direction, the messy version, and when it needs to exist.";

export async function generateMetadata(): Promise<Metadata> {
  const url = `${siteUrl()}/start-a-project`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "13th Pencil" },
  };
}

export default function BriefLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link
        href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,300..900&family=Caveat:wght@500;700&family=Instrument+Serif:ital,wght@0,400;1,400&family=JetBrains+Mono:wght@400;500&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="/assets/css/brief.css?v=1" />
      {children}
    </>
  );
}