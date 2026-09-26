import { SiteHeader } from "@/components/site/SiteHeader";
import { OurStoryScene } from "@/components/site/about/OurStoryScene";
import type { SiteContent } from "@/lib/types";

export function AboutOurStoryPage({ content }: { content: SiteContent }) {
  return (
    <>
      <SiteHeader settings={content.settings} />
      <OurStoryScene settings={content.settings} page={content.aboutOurStory} />
    </>
  );
}
