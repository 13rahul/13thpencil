import { defaultContent } from "./default-content";
import { prisma } from "./db";
import { deepMerge } from "./merge";
import type { HomeSectionKey, SiteContent } from "./types";

const HOME_KEYS: HomeSectionKey[] = [
  "hero",
  "marquee",
  "erase",
  "principle",
  "capabilities",
  "comein",
  "work",
  "process",
  "studio",
  "contact",
];

function withTimeout<T>(promise: Promise<T>, ms: number) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("content timeout")), ms);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

export async function getSiteContent(): Promise<SiteContent> {
  const content: SiteContent = structuredClone(defaultContent);

  try {
    const [settingsRow, sections] = await withTimeout(
      Promise.all([
        prisma.siteSettings.findUnique({ where: { id: 1 } }),
        prisma.pageSection.findMany(),
      ]),
      2500,
    );

    if (settingsRow?.content) {
      content.settings = deepMerge(content.settings, settingsRow.content);
    }

    for (const row of sections) {
      if (row.page === "home" && HOME_KEYS.includes(row.sectionKey as HomeSectionKey)) {
        const key = row.sectionKey as HomeSectionKey;
        content[key] = deepMerge(content[key], row.content) as never;
      }
      if (row.page === "site" && row.sectionKey === "notFound") {
        content.notFound = deepMerge(content.notFound, row.content);
      }
      if (row.page === "capabilities" && row.sectionKey === "brandStrategy") {
        const incoming = row.content as { cycleWords?: unknown } | null;
        // Ignore pre-redesign records that lack the new shape
        if (incoming && Array.isArray(incoming.cycleWords)) {
          content.brandStrategy = deepMerge(content.brandStrategy, row.content);
        }
      }
      if (row.page === "about" && row.sectionKey === "ourStory") {
        content.aboutOurStory = deepMerge(content.aboutOurStory, row.content);
      }
      if (row.page === "about" && row.sectionKey === "why") {
        content.aboutWhy = deepMerge(content.aboutWhy, row.content);
      }
      if (row.page === "about" && row.sectionKey === "approach") {
        content.aboutApproach = deepMerge(content.aboutApproach, row.content);
      }
    }
  } catch {
    // MySQL unavailable or empty — serve the approved seed copy.
  }

  return content;
}

export async function saveSettings(content: SiteContent["settings"]) {
  await prisma.siteSettings.upsert({
    where: { id: 1 },
    create: { id: 1, content },
    update: { content },
  });
}

export async function saveSection(
  page: string,
  sectionKey: string,
  content: unknown,
) {
  await prisma.pageSection.upsert({
    where: { page_sectionKey: { page, sectionKey } },
    create: { page, sectionKey, content: content as object },
    update: { content: content as object },
  });
}
