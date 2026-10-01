import Script from "next/script";
import { HomePage } from "@/components/site/HomePage";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

function siteOrigin(url: string) {
  return url.replace(/\/$/, "");
}

export async function generateMetadata(): Promise<Metadata> {
  const { settings } = await getSiteContent();
  const canonical = siteOrigin(settings.canonicalUrl);
  return {
    title: settings.metaTitle,
    description: settings.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: settings.ogTitle,
      description: settings.ogDescription,
      url: canonical,
      siteName: settings.siteName,
      locale: "en",
      type: "website",
      images: [
        {
          url: settings.ogImage,
          width: 1200,
          height: 630,
          alt: settings.ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: settings.ogTitle,
      description: settings.ogDescription,
      images: [settings.ogImage],
    },
  };
}

export default async function Page() {
  const content = await getSiteContent();
  const canonical = siteOrigin(content.settings.canonicalUrl);
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: content.settings.siteName,
    url: canonical,
    email: content.settings.primaryEmail,
    description: content.settings.metaDescription,
  };
  const jsContent = {
    marqueeWords: content.marquee.words,
    captions: Object.fromEntries(
      content.capabilities.items.map((item) => [item.slug, item.canvasCaption]),
    ),
    swaps: content.contact.swapPhrases,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
      />
      <script
        id="site-content"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsContent) }}
      />
      <HomePage content={content} />
      <Script src="/assets/js/site.js?v=41" strategy="afterInteractive" />
    </>
  );
}
