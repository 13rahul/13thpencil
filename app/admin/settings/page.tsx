import { getSiteContent } from "@/lib/content";
import { SettingsForm } from "./SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const { settings } = await getSiteContent();
  return <SettingsForm initial={settings} />;
}
