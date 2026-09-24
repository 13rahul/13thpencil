import Script from "next/script";
import { BrandStrategyPage } from "@/components/site/BrandStrategyPage";
import { getSiteContent } from "@/lib/content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const { settings, brandStrategy } = await getSiteContent();
  const url = new URL("/capabilities/brand-and-strategy", settings.canonicalUrl).toString();
  return {
    title: brandStrategy.metaTitle,
    description: brandStrategy.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: brandStrategy.metaTitle,
      description: brandStrategy.metaDescription,
      url,
      siteName: settings.siteName,
      locale: "en",
      type: "website",
      images: [
        {
          url: settings.ogImage,
          width: 1200,
          height: 630,
          alt: brandStrategy.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: brandStrategy.metaTitle,
      description: brandStrategy.metaDescription,
      images: [settings.ogImage],
    },
  };
}

export default async function BrandAndStrategyRoute() {
  const content = await getSiteContent();
  const jsContent = {
    swaps: content.contact.swapPhrases,
  };

  return (
    <>
      <script
        id="site-content"
        type="application/json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsContent) }}
      />
      <BrandStrategyPage content={content} />
      <Script src="/assets/js/site.js" strategy="afterInteractive" />
    </>
  );
}
