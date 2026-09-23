import type { SiteContent } from "./types";

export const defaultContent: SiteContent = {
  settings: {
    siteName: "13th Pencil",
    metaTitle: "13th Pencil — Creative & Innovation Company",
    metaDescription:
      "13th Pencil is a creative and innovation company working across brand and strategy, creative, AI and innovation, experiences and digital growth. We start where the obvious answer stops.",
    ogTitle: "13th Pencil — The obvious idea was already taken.",
    ogDescription:
      "A creative and innovation company working across brand and strategy, creative, AI and innovation, experiences and digital growth.",
    ogImage: "https://13thpencil.com/assets/img/og-image.png",
    canonicalUrl: "https://13thpencil.com/",
    themeColor: "#181A1C",
    primaryEmail: "hello@13thpencil.com",
    careersEmail: "people@13thpencil.com",
    ctaLabel: "Start a project",
    footerLegal:
      "© 2026 13th Pencil — a creative and innovation company. Provisional identity; independent work in progress.",
    loaderCaption: "Twelve agree. The thirteenth doesn't.",
    menuDesc: "A creative and innovation company.",
    invertLabel: "Invert",
    navItems: [
      { label: "Principle", href: "#principle" },
      { label: "Capabilities", href: "#capabilities" },
      { label: "Where we help", href: "#comein" },
      { label: "Thinking", href: "#work" },
      { label: "Studio", href: "#studio" },
    ],
  },
  hero: {
    headlineLine1Before: "The ",
    headlineEmphasis: "obvious",
    headlineLine1After: " idea",
    headlineLine2: "was already taken.",
    subcopy:
      "13th Pencil is a creative and innovation company. Most briefs have an answer everyone can see. We are here for the one that took longer to find.",
    scrollHint: "Keep scrolling",
  },
  marquee: {
    words: [
      "Brand",
      "Strategy",
      "Creative",
      "Film",
      "Identity",
      "AI",
      "Experiences",
      "Systems",
      "Growth",
      "Craft",
      "Otherwise",
    ],
  },
  erase: {
    annotation: "How most of this industry introduces itself",
    struckLine: "We help brands thrive in a rapidly changing world.",
    replacementLine: "We start where the obvious answer stops.",
    paragraphs: [
      "13th Pencil is a creative and innovation company. We work on brands, campaigns, products and experiences — usually at the point where the expected route has been mapped and nobody is excited by it.",
      "The expected answer is useful. It tells you where the edge of the category is. It is a starting position, not a strategy, and it is rarely the thing anyone remembers.",
    ],
    closingNote:
      "Strategy, creative, AI, experiences and growth — held together by one team rather than passed between five.",
  },
  principle: {
    heading: "Twelve is a pattern.\nThirteen is a decision.",
    lede: "A pattern is what everyone can already see. It is agreement, arriving early and dressed as insight.",
    note: "The departure comes later. It breaks the alignment, it is harder to defend in a meeting, and it is usually the only part anyone repeats afterwards. A pencil is the right tool for that moment — it sketches, questions, erases and commits, in that order.",
  },
  capabilities: {
    heading: "What we do,\ndemonstrated rather than listed.",
    intro:
      "Five practices, one team. Most projects move through three or four of them, which is the point — the strategy, the film, the prototype and the media plan are made by people in the same conversation.",
    items: [
      {
        slug: "strategy",
        number: "01",
        name: "Brand & Strategy",
        forLine: "When the category has a template and you need a position inside it that is yours.",
        description:
          "Positioning, brand architecture, naming, messaging, audience and cultural insight. We look for the tension in the category before anyone designs anything.",
        canvasCaption: "Order, and the one line refusing it",
      },
      {
        slug: "creative",
        number: "02",
        name: "Creative Studio",
        forLine: "When the work has to be remembered, not merely approved.",
        description:
          "Campaign platforms, art direction, identity and design systems, film, photography and copy. Made properly, to the standard the idea deserves.",
        canvasCaption: "A line that will not sit still",
      },
      {
        slug: "ai",
        number: "03",
        name: "AI & Innovation",
        forLine: "When AI is in the budget and nobody has decided what it should actually make.",
        description:
          "Generative production pipelines, AI-assisted concepting, synthetic media, and working prototypes you can put in front of people. New tools, old standards.",
        canvasCaption: "Pattern-finding, one node off-model",
      },
      {
        slug: "experiences",
        number: "04",
        name: "Experiences",
        forLine: "When the brand needs to exist somewhere people can walk into.",
        description:
          "Events, environments, installations, launches and brand worlds — designed as something people talk about on the way home, and film on the way round.",
        canvasCaption: "Something entering the room",
      },
      {
        slug: "growth",
        number: "05",
        name: "Digital Growth",
        forLine: "When output is constant and none of it is compounding.",
        description:
          "Performance creative, social systems, always-on content engines, and the measurement that tells you which idea is carrying the result.",
        canvasCaption: "Compounding, not spiking",
      },
    ],
  },
  comein: {
    heading: "Reasons people\ncall us.",
    intro: "Written as we actually hear them, in first conversations, before anyone has tidied the problem up.",
    items: [
      {
        quote: "We're launching into a category where every competitor already sounds the same — including us.",
        answerHeading: "Brand & Strategy",
        answerDetail: "Positioning, architecture, messaging",
      },
      {
        quote: "The work tests fine. Nobody remembers it a week later.",
        answerHeading: "Creative Studio",
        answerDetail: "Platform, art direction, film, identity",
      },
      {
        quote: "We have AI in the plan and no agreement on what it should produce.",
        answerHeading: "AI & Innovation",
        answerDetail: "Pipelines, prototypes, production",
      },
      {
        quote: "We publish constantly. None of it adds up to anything.",
        answerHeading: "Digital Growth",
        answerDetail: "Content systems, performance creative",
      },
      {
        quote: "We have the budget and the deadline. What we don't have is *an idea worth the money*.",
        answerHeading: "Start here",
        answerDetail: "One conversation, no deck required",
        marked: true,
      },
    ],
  },
  work: {
    heading: "Selected thinking",
    intro:
      "13th Pencil is new, so this is where our own work goes first: independent concepts, experiments and brand thinking we started because nobody asked us to. Client projects join them here as they are cleared to publish.",
    tiles: [
      {
        variant: "a",
        format: "Film",
        status: "In development",
        description: "A short film about the ideas that get cut for being too interesting.",
        title: "The Rejected Reel",
        kind: "independent concept",
        link: "#contact",
      },
      {
        variant: "b",
        format: "Identity",
        status: "In development",
        description: "An identity system that redraws itself every time it is used.",
        title: "Never the Same Twice",
        kind: "design experiment",
        link: "#contact",
      },
      {
        variant: "c",
        format: "Writing",
        status: "Ongoing",
        description: "Short notes on category defaults, and what sits underneath them.",
        title: "The Default Files",
        kind: "brand thinking",
        link: "#contact",
      },
      {
        variant: "d",
        format: "Digital",
        status: "Reserved",
        description: "The frame where the first client case study will live.",
        title: "Client work",
        kind: "coming",
        link: "#contact",
      },
      {
        variant: "e",
        format: "Experience",
        status: "In development",
        description: "A room where the audience decides which idea survives.",
        title: "Room Thirteen",
        kind: "speculative experience",
        link: "#contact",
      },
      {
        variant: "f",
        format: "AI",
        status: "In development",
        description: "A tool that generates the twelve expected answers so we can skip them.",
        title: "Twelve & Out",
        kind: "internal prototype",
        link: "#contact",
      },
    ],
  },
  process: {
    heading: "How the line gets drawn",
    steps: [
      {
        label: "Step one",
        title: "Find the tension",
        body: "Interrogate the category, the customer and the thing nobody in the business wants to say out loud.",
      },
      {
        label: "Step two",
        title: "Exhaust the expected",
        body: "Every reasonable route goes on the wall, argued properly, before anyone is allowed a favourite.",
      },
      {
        label: "Step three",
        title: "Clear the wall",
        body: "Those routes were the map. They show where the category ends, which is the only place worth working.",
      },
      {
        label: "And then",
        title: "Make the departure",
        body: "One idea gets built properly — film, identity, product, experience — with the craft it was worth in the first place.",
      },
    ],
  },
  studio: {
    heading: "A studio built\nthe other way round.",
    paragraphs: [
      "Most agencies scale by adding layers. We scale by removing them. The people you meet first are the people who do the work, from opening conversation to final delivery.",
      "Strategists, art directors, writers, filmmakers, designers, technologists and AI specialists — assembled around the problem rather than the org chart.",
    ],
    facts: [
      {
        label: "Model",
        value: "A small senior team assembled per project. No pyramid, and no handover to people you never met.",
      },
      {
        label: "Engaging",
        value: "Project, retainer, or a paid first sprint if you want to see how we think before committing.",
      },
      {
        label: "Tools",
        value: "AI sits in the pipeline, not on the pedestal. It accelerates production; it does not choose the idea.",
      },
      {
        label: "Age",
        value: "We are new, and say so. Judge us on the thinking on this page and on what we do in the first conversation.",
      },
      {
        label: "Rule",
        value: "If it could have come from anyone else, it goes back on the wall.",
      },
    ],
  },
  contact: {
    headlineBefore: "Bring us",
    headlineMid: "the brief that",
    swapPhrases: [
      "came back rejected",
      "nobody has approved",
      "is still an argument",
      "sounds too expensive",
      "everyone has an answer for",
    ],
    ctaLabel: "Start a project",
    supportingNote:
      "Send the brief, the deadline, and the answer everyone expects. We will come back with what we would do instead.",
    newBusinessLabel: "New business",
    careersLabel: "Careers",
  },
  notFound: {
    title: "Page not found — 13th Pencil",
    heading: "This page\ntook another route.",
    body: "The address does not exist, or it has moved. Nothing here is broken on your end.",
    buttonLabel: "Back to 13thpencil.com",
    footerLine: "13th Pencil — a creative and innovation company.",
  },
};

export const HOME_SECTIONS = [
  { key: "hero", label: "Hero", hint: "Opening headline and subcopy" },
  { key: "marquee", label: "Marquee", hint: "Scrolling word list" },
  { key: "erase", label: "Erase the obvious", hint: "Struck line and replacement" },
  { key: "principle", label: "Principle", hint: "The 13th principle" },
  { key: "capabilities", label: "Capabilities", hint: "Five practices" },
  { key: "comein", label: "Where we help", hint: "Reasons people call" },
  { key: "work", label: "Thinking / Work", hint: "Selected thinking tiles" },
  { key: "process", label: "Process", hint: "How the line gets drawn" },
  { key: "studio", label: "Studio", hint: "Studio copy and facts" },
  { key: "contact", label: "Contact", hint: "Headline, emails, CTA" },
] as const;
