import { AboutWhyPage } from "@/components/site/AboutWhyPage";
import { JsonLd, breadcrumbJsonLd, organizationJsonLd } from "@/components/site/JsonLd";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { settings, aboutWhy: page } = await getSiteContent();
  const url = new URL("/about/why-13th-pencil", settings.canonicalUrl).toString();
  return {
    title: "Why 13th Pencil | 13th Pencil",
    description:
      "Why brands work with 13th Pencil: strategy, creative, AI and brand experiences under one roof, and a habit of going past the first workable answer.",
    alternates: { canonical: url },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url,
      siteName: settings.siteName,
      locale: "en",
      type: "article",
      images: [{ url: settings.ogImage, width: 1200, height: 630, alt: page.metaTitle }],
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images: [settings.ogImage],
    },
  };
}

export default async function Why13thPencilRoute() {
  const content = await getSiteContent();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about/our-story" },
    { name: content.aboutWhy.crumbLabel, path: "/about/why-13th-pencil" },
  ];
  return (
    <>
      <JsonLd data={organizationJsonLd(content.settings)} />
      <JsonLd data={breadcrumbJsonLd(content.settings.canonicalUrl, crumbs)} />
      <AboutWhyPage content={content} />
    </>
  );
}
