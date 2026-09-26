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
  pageHref?: string;
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

export type PracticeVerb = {
  label: string;
  body: string;
  depart?: boolean;
};

export type PracticeLink = {
  number?: string;
  name: string;
  line: string;
  href: string;
};

export type StruckLine = {
  text: string;
  keep?: boolean;
};

export type PathStep = {
  label?: string;
  title: string;
  body: string;
};

export type BrandStrategyCaption = {
  heading: string;
  body: string;
};

export type BrandStrategyMove = {
  number: string;
  title: string;
  detail: string;
};

export type BrandStrategyConnect = {
  name: string;
  href: string;
};

export type BrandStrategyContent = {
  metaTitle: string;
  metaDescription: string;
  number: string;
  practiceName: string;
  heroLine1: string;
  heroSaysPrefix: string;
  cycleWords: string[];
  subcopy: string;
  scrollHint: string;
  claims: string[];
  stageHint: string;
  captions: BrandStrategyCaption[];
  movesHeading: string;
  moves: BrandStrategyMove[];
  nextHeading: string;
  connects: BrandStrategyConnect[];
  contactLine1: string;
  contactLine2: string;
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

export type AboutArtwork = {
  caption: string;
  alt: string;
};

export type AboutOurStoryContent = {
  metaTitle: string;
  metaDescription: string;
  crumbLabel: string;
  heroLine1: string;
  heroLine2: string;
  heroSub: string;
  videoAriaLabel: string;
  letterFrom: string;
  letterParagraphs: string[];
  letterClosing: string;
  signLabel: string;
  madeHeading: string;
  madeLede: string;
  artworks: AboutArtwork[];
  madeNote: string;
  pagerLabel: string;
  pagerTitle: string;
  pagerHref: string;
  ctaHeading: string;
};

export type AboutTrioItem = {
  number: string;
  title: string;
  body: string;
};

export type AboutWhyContent = {
  metaTitle: string;
  metaDescription: string;
  crumbLabel: string;
  genLabel: string;
  genInitialLine: string;
  genButton: string;
  genCountIdle: string;
  turnHeading: string;
  turnLeft1: string;
  turnLeft2: string;
  turnRight1: string;
  turnNote: string;
  trio: AboutTrioItem[];
  artCaption: string;
  artAlt: string;
  pagerLabel: string;
  pagerTitle: string;
  pagerHref: string;
  ctaHeading: string;
};

export type AboutBuyItem = {
  key: string;
  title: string;
  body: string;
};

export type AboutApproachContent = {
  metaTitle: string;
  metaDescription: string;
  crumbLabel: string;
  heroHeading: string;
  heroHint: string;
  posterEyebrow: string;
  posterLine1: string;
  posterLine2: string;
  posterFooter: string;
  sliderStartLabel: string;
  sliderEndLabel: string;
  buysHeading: string;
  buys: AboutBuyItem[];
  pagerLabel: string;
  pagerTitle: string;
  pagerHref: string;
  ctaHeading: string;
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
  brandStrategy: BrandStrategyContent;
  aboutOurStory: AboutOurStoryContent;
  aboutWhy: AboutWhyContent;
  aboutApproach: AboutApproachContent;
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
