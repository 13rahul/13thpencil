import { loadSiteContent } from "@/lib/content";
import { AboutOurStoryForm } from "./AboutOurStoryForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutOurStoryPage() {
  const { aboutOurStory } = await loadSiteContent();
  return <AboutOurStoryForm initial={aboutOurStory} />;
}
