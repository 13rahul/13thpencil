import type { SiteContent } from "@/lib/types";
import { BrandStrategyScene } from "./brand-strategy/BrandStrategyScene";
import { SiteHeader } from "./SiteHeader";

export function BrandStrategyPage({ content }: { content: SiteContent }) {
  const { settings, brandStrategy } = content;

  return (
    <>
      <SiteHeader settings={settings} />
      <BrandStrategyScene page={brandStrategy} settings={settings} />
    </>
  );
}
