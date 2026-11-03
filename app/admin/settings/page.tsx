import { loadSiteContent } from "@/lib/content";
import { SettingsForm } from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const { settings } = await loadSiteContent();
  return <SettingsForm initial={settings} />;
}
