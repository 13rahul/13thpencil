import { getSiteContent } from "@/lib/content";
import { BrandStrategyForm } from "./BrandStrategyForm";

export const dynamic = "force-dynamic";

export default async function AdminBrandStrategyPage() {
  const { brandStrategy } = await getSiteContent();
  return <BrandStrategyForm initial={brandStrategy} />;
}
