import { AboutApproachPage } from "@/components/site/AboutApproachPage";
import { JsonLd, breadcrumbJsonLd, organizationJsonLd } from "@/components/site/JsonLd";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { settings, aboutApproach: page } = await getSiteContent();
  const url = new URL("/about/our-approach", settings.canonicalUrl).toString();
  return {
    title: "Our Approach: How We Work | 13th Pencil",
    description:
      "How 13th Pencil works: discover the challenge behind the brief, create a clear direction and bring it to life, from strategy to launch.",
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

export default async function OurApproachRoute() {
  const content = await getSiteContent();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about/our-story" },
    { name: content.aboutApproach.crumbLabel, path: "/about/our-approach" },
  ];
  return (
    <>
      <JsonLd data={organizationJsonLd(content.settings)} />
      <JsonLd data={breadcrumbJsonLd(content.settings.canonicalUrl, crumbs)} />
      <AboutApproachPage content={content} />
    </>
  );
}
