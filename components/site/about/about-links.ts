export const ABOUT_LINKS = [
  { label: "Our Story", href: "/about/our-story" },
  { label: "Why 13th Pencil", href: "/about/why-13th-pencil" },
  { label: "Our Approach", href: "/about/our-approach" },
] as const;

export type AboutSlug = (typeof ABOUT_LINKS)[number]["href"];
