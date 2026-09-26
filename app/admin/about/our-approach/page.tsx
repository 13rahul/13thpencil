import { getSiteContent } from "@/lib/content";
import { AboutApproachForm } from "./AboutApproachForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutApproachPage() {
  const { aboutApproach } = await getSiteContent();
  return <AboutApproachForm initial={aboutApproach} />;
}
