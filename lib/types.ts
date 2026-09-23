export type NavItem = {
  label: string;
  href: string;
};

export type SiteSettings = {
  siteName: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  canonicalUrl: string;
  themeColor: string;
  primaryEmail: string;
  careersEmail: string;
  ctaLabel: string;
  footerLegal: string;
  loaderCaption: string;
  menuDesc: string;
  invertLabel: string;
  navItems: NavItem[];
};

export type HeroContent = {
  headlineLine1Before: string;
  headlineEmphasis: string;
  headlineLine1After: string;
  headlineLine2: string;
  subcopy: string;
  scrollHint: string;
};

export type MarqueeContent = {
  words: string[];
};

export type EraseContent = {
  annotation: string;
  struckLine: string;
  replacementLine: string;
  paragraphs: string[];
  closingNote: string;
};

export type PrincipleContent = {
  heading: string;
  lede: string;
  note: string;
};

export type CapabilityItem = {
  slug: string;
  number: string;
  name: string;
  forLine: string;
  description: string;
  canvasCaption: string;
};

export type CapabilitiesContent = {
  heading: string;
  intro: string;
  items: CapabilityItem[];
};

export type ComeInItem = {
  quote: string;
  answerHeading: string;
  answerDetail: string;
  marked?: boolean;
};

export type ComeInContent = {
  heading: string;
  intro: string;
  items: ComeInItem[];
};

export type WorkTile = {
  variant: string;
  format: string;
  status: string;
  description: string;
  title: string;
  kind: string;
  link: string;
};

export type WorkContent = {
  heading: string;
  intro: string;
  tiles: WorkTile[];
};

export type ProcessStep = {
  label: string;
  title: string;
  body: string;
};

export type ProcessContent = {
  heading: string;
  steps: ProcessStep[];
};

export type StudioFact = {
  label: string;
  value: string;
};

export type StudioContent = {
  heading: string;
  paragraphs: string[];
  facts: StudioFact[];
};

export type ContactContent = {
  headlineBefore: string;
  headlineMid: string;
  swapPhrases: string[];
  ctaLabel: string;
  supportingNote: string;
  newBusinessLabel: string;
  careersLabel: string;
};

export type NotFoundContent = {
  title: string;
  heading: string;
  body: string;
  buttonLabel: string;
  footerLine: string;
};

export type SiteContent = {
  settings: SiteSettings;
  hero: HeroContent;
  marquee: MarqueeContent;
  erase: EraseContent;
  principle: PrincipleContent;
  capabilities: CapabilitiesContent;
  comein: ComeInContent;
  work: WorkContent;
  process: ProcessContent;
  studio: StudioContent;
  contact: ContactContent;
  notFound: NotFoundContent;
};

export type HomeSectionKey =
  | "hero"
  | "marquee"
  | "erase"
  | "principle"
  | "capabilities"
  | "comein"
  | "work"
  | "process"
  | "studio"
  | "contact";
