import { AboutOurStoryPage } from "@/components/site/AboutOurStoryPage";
import { JsonLd, breadcrumbJsonLd, organizationJsonLd } from "@/components/site/JsonLd";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const { settings, aboutOurStory: page } = await getSiteContent();
  const url = new URL("/about/our-story", settings.canonicalUrl).toString();
  return {
    title: "Our Story | 13th Pencil",
    description:
      "How 13th Pencil began, and why a creative and innovation company in Bangalore is built around the thirteenth idea: the one that arrives after the obvious answers.",
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

export default async function OurStoryRoute() {
  const content = await getSiteContent();
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about/our-story" },
    { name: content.aboutOurStory.crumbLabel, path: "/about/our-story" },
  ];
  return (
    <>
      <link
        rel="preload"
        href="/assets/video/poster.webp"
        as="image"
        fetchPriority="high"
      />
      <JsonLd data={organizationJsonLd(content.settings)} />
      <JsonLd data={breadcrumbJsonLd(content.settings.canonicalUrl, crumbs)} />
      <AboutOurStoryPage content={content} />
    </>
  );
}
