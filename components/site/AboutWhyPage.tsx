import { SiteHeader } from "@/components/site/SiteHeader";
import { Why13thPencilScene } from "@/components/site/about/Why13thPencilScene";
import type { SiteContent } from "@/lib/types";

export function AboutWhyPage({ content }: { content: SiteContent }) {
  return (
    <>
      <SiteHeader settings={content.settings} />
      <Why13thPencilScene settings={content.settings} page={content.aboutWhy} />
    </>
  );
}
