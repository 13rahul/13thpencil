import { SiteHeader } from "@/components/site/SiteHeader";
import { OurApproachScene } from "@/components/site/about/OurApproachScene";
import type { SiteContent } from "@/lib/types";

export function AboutApproachPage({ content }: { content: SiteContent }) {
  return (
    <>
      <SiteHeader settings={content.settings} />
      <OurApproachScene settings={content.settings} page={content.aboutApproach} />
    </>
  );
}
