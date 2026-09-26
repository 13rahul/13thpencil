import { getSiteContent } from "@/lib/content";
import { AboutWhyForm } from "./AboutWhyForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutWhyPage() {
  const { aboutWhy } = await getSiteContent();
  return <AboutWhyForm initial={aboutWhy} />;
}
