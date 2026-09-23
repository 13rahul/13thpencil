import { notFound } from "next/navigation";
import { SectionEditor } from "@/components/admin/SectionEditor";
import { HOME_SECTIONS } from "@/lib/default-content";
import { getSiteContent } from "@/lib/content";
import type { HomeSectionKey } from "@/lib/types";

export const dynamic = "force-dynamic";

const KEYS = HOME_SECTIONS.map((s) => s.key) as HomeSectionKey[];

export default async function HomeSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  if (!KEYS.includes(section as HomeSectionKey)) notFound();
  const key = section as HomeSectionKey;
  const content = await getSiteContent();
  const meta = HOME_SECTIONS.find((item) => item.key === key);

  return (
    <>
      <p className="admin__lede">{meta?.hint}. Changes appear on the public homepage after save.</p>
      <SectionEditor sectionKey={key} initial={content[key]} />
    </>
  );
}
