import Script from "next/script";
import { AboutOurStoryPage } from "@/components/site/AboutOurStoryPage";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, aboutOurStory: page } = await getSiteContent();
  const url = new URL("/about/our-story", settings.canonicalUrl).toString();
  return {
    title: page.metaTitle,
    description: page.metaDescription,
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
  return (
    <>
      <AboutOurStoryPage content={content} />
      <Script src="/assets/js/site.js?v=41" strategy="afterInteractive" />
    </>
  );
}
