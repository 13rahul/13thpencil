export const SITE_HOST = "13thpencil.com";
export const DEFAULT_SITE_URL = "https://13thpencil.com";
export const BLOG_URL = "https://blog.13thpencil.com";

export function siteUrl() {
  return (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
}
