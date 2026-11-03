import type { SiteSettings } from "@/lib/types";

function originOf(url: string) {
  return url.replace(/\/$/, "");
}

export function organizationJsonLd(settings: SiteSettings) {
  const origin = originOf(settings.canonicalUrl);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName,
    url: origin,
    email: settings.primaryEmail,
    description: settings.metaDescription,
    logo: `${origin}/assets/brand/icon-512.png`,
    image: settings.ogImage,
  };
}

export function websiteJsonLd(settings: SiteSettings) {
  const origin = originOf(settings.canonicalUrl);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteName,
    url: origin,
    description: settings.metaDescription,
    publisher: {
      "@type": "Organization",
      name: settings.siteName,
      url: origin,
    },
  };
}

export function breadcrumbJsonLd(
  canonicalUrl: string,
  crumbs: { name: string; path: string }[],
) {
  const origin = originOf(canonicalUrl);
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.path.startsWith("http") ? crumb.path : `${origin}${crumb.path}`,
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
