import { getSiteContent } from "@/lib/content";
import { AboutOurStoryForm } from "./AboutOurStoryForm";

export const dynamic = "force-dynamic";

export default async function AdminAboutOurStoryPage() {
  const { aboutOurStory } = await getSiteContent();
  return <AboutOurStoryForm initial={aboutOurStory} />;
}
