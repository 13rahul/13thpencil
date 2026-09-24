"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSessionUser } from "./auth";
import { saveSection, saveSettings } from "./content";
import type { HomeSectionKey } from "./types";

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) throw new Error("Unauthorized");
  return user;
}

const navItem = z.object({
  label: z.string(),
  href: z.string(),
});

const settingsSchema = z.object({
  siteName: z.string().min(1),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  ogTitle: z.string().min(1),
  ogDescription: z.string().min(1),
  ogImage: z.string().min(1),
  canonicalUrl: z.string().min(1),
  themeColor: z.string().min(1),
  primaryEmail: z.string().min(1),
  careersEmail: z.string().min(1),
  ctaLabel: z.string().min(1),
  footerLegal: z.string().min(1),
  loaderCaption: z.string().min(1),
  menuDesc: z.string().min(1),
  invertLabel: z.string().min(1),
  navItems: z.array(navItem),
});

export async function saveSettingsAction(raw: unknown) {
  await requireAdmin();
  const data = settingsSchema.parse(raw);
  await saveSettings(data);
  revalidatePath("/");
  revalidatePath("/capabilities/brand-and-strategy");
  revalidatePath("/admin");
  return { ok: true };
}

export async function saveHomeSectionAction(sectionKey: HomeSectionKey, raw: unknown) {
  await requireAdmin();
  if (!raw || typeof raw !== "object") throw new Error("Invalid content");
  await saveSection("home", sectionKey, raw);
  revalidatePath("/");
  revalidatePath(`/admin/home/${sectionKey}`);
  return { ok: true };
}

export async function saveBrandStrategyAction(raw: unknown) {
  await requireAdmin();
  if (!raw || typeof raw !== "object") throw new Error("Invalid content");
  await saveSection("capabilities", "brandStrategy", raw);
  revalidatePath("/");
  revalidatePath("/capabilities/brand-and-strategy");
  revalidatePath("/admin/capabilities/brand-and-strategy");
  return { ok: true };
}

export async function saveNotFoundAction(raw: unknown) {
  await requireAdmin();
  const data = z
    .object({
      title: z.string().min(1),
      heading: z.string().min(1),
      body: z.string().min(1),
      buttonLabel: z.string().min(1),
      footerLine: z.string().min(1),
    })
    .parse(raw);
  await saveSection("site", "notFound", data);
  revalidatePath("/");
  revalidatePath("/admin/not-found");
  return { ok: true };
}
