import { loadSiteContent } from "@/lib/content";
import { BrandStrategyForm } from "./BrandStrategyForm";

export const dynamic = "force-dynamic";

export default async function AdminBrandStrategyPage() {
  const { brandStrategy } = await loadSiteContent();
  return <BrandStrategyForm initial={brandStrategy} />;
}
