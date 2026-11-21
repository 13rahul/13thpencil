export const ABOUT_LINKS = [
  { label: "Our Story", href: "/about/our-story" },
  { label: "Why 13th Pencil", href: "/about/why-13th-pencil" },
  { label: "Our Approach", href: "/about/our-approach" },
  { label: "Principle", href: "/principle" },
] as const;

export type AboutSlug = (typeof ABOUT_LINKS)[number]["href"];

export function nextAboutLink(current: string) {
  const i = ABOUT_LINKS.findIndex((link) => link.href === current);
  const idx = i < 0 ? 0 : i;
  const next = ABOUT_LINKS[(idx + 1) % ABOUT_LINKS.length];
  const isLast = idx === ABOUT_LINKS.length - 1;
  return {
    label: isLast ? "Back to the beginning" : "Next",
    href: next.href,
    title: next.label,
  };
}
