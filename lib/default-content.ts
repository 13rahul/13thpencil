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
        pageHref: "/capabilities/brand-and-strategy",
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
        link: "/start-a-project",
      },
      {
        variant: "b",
        format: "Identity",
        status: "In development",
        description: "An identity system that redraws itself every time it is used.",
        title: "Never the Same Twice",
        kind: "design experiment",
        link: "/start-a-project",
      },
      {
        variant: "c",
        format: "Writing",
        status: "Ongoing",
        description: "Short notes on category defaults, and what sits underneath them.",
        title: "The Default Files",
        kind: "brand thinking",
        link: "/start-a-project",
      },
      {
        variant: "d",
        format: "Digital",
        status: "Reserved",
        description: "The frame where the first client case study will live.",
        title: "Client work",
        kind: "coming",
        link: "/start-a-project",
      },
      {
        variant: "e",
        format: "Experience",
        status: "In development",
        description: "A room where the audience decides which idea survives.",
        title: "Room Thirteen",
        kind: "speculative experience",
        link: "/start-a-project",
      },
      {
        variant: "f",
        format: "AI",
        status: "In development",
        description: "A tool that generates the twelve expected answers so we can skip them.",
        title: "Twelve & Out",
        kind: "internal prototype",
        link: "/start-a-project",
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
  brandStrategy: {
    metaTitle: "Brand & Strategy — 13th Pencil",
    metaDescription:
      "Positioning that starts where the category runs out of adjectives. Brand and strategy from 13th Pencil.",
    number: "01",
    practiceName: "Brand & Strategy",
    heroLine1: "Everyone",
    heroSaysPrefix: "says",
    cycleWords: [
      "innovative",
      "trusted",
      "seamless",
      "customer-first",
      "world-class",
      "best-in-class",
      "data-driven",
      "future-ready",
      "purpose-led",
    ],
    subcopy: "Positioning that starts where the category runs out of adjectives.",
    scrollHint: "Scroll",
    claims: [
      "Innovative",
      "Trusted",
      "Customer-first",
      "World-class",
      "Seamless",
      "End-to-end",
      "Best-in-class",
      "Scalable",
      "Data-driven",
      "Human-centred",
      "Future-ready",
      "Agile",
      "Purpose-led",
      "Award-winning",
      "Industry-leading",
      "Reliable",
      "Passionate",
      "Transformative",
      "Next-generation",
      "Results-driven",
      "Strategic",
      "Tailored",
      "Proven",
      "Global",
      "Bespoke",
      "Cutting-edge",
      "Holistic",
      "Empowering",
      "Disruptive",
      "Authentic",
    ],
    stageHint: "Move your cursor through it",
    captions: [
      {
        heading: "This is your category.",
        body: "Every company in it, claiming the same handful of things.",
      },
      {
        heading: "Tidy. Approved. Identical.",
        body: "Line them up and the differences disappear entirely.",
      },
      {
        heading: "One space is *unclaimed*.",
        body: "That is the whole job.",
      },
    ],
    movesHeading: "Five moves.",
    moves: [
      {
        number: "01",
        title: "Read the category",
        detail: "— every rival's own words, mapped until the pattern is obvious.",
      },
      {
        number: "02",
        title: "Find the gap",
        detail: "— the space the category has trained everyone to ignore.",
      },
      {
        number: "03",
        title: "Take a position",
        detail: "— one territory, and what you give up to own it.",
      },
      {
        number: "04",
        title: "Build the structure",
        detail: "— what gets a name, what gets a line, what disappears.",
      },
      {
        number: "05",
        title: "Write it down",
        detail: "— language every team can use on Monday.",
      },
    ],
    nextHeading: "Then it gets made.",
    connects: [
      { name: "Creative Studio", href: "/capabilities/creative-studio" },
      { name: "AI & Innovation", href: "/capabilities/ai-and-innovation" },
      { name: "Experiences", href: "/capabilities/experiences" },
      { name: "Digital Growth", href: "/capabilities/digital-growth" },
    ],
    contactLine1: "Bring us the category",
    contactLine2: "everyone agrees about.",
  },
  aboutOurStory: {
    metaTitle: "Our Story — 13th Pencil",
    metaDescription:
      "13th Pencil started with a habit: looking at finished work and seeing the better idea two steps past it. A creative and innovation company.",
    crumbLabel: "Our Story",
    heroLine1: "Two steps",
    heroLine2: "past finished.",
    heroSub:
      "That is where the interesting version of almost everything is sitting. Usually nobody walks over to get it.",
    videoAriaLabel: "13th Pencil title film, made in-house",
    letterFrom: "From the founder",
    letterParagraphs: [
      "I have spent my career around creative work, and somewhere along the way I picked up a habit I could not switch off.",
      "I would look at something finished — a campaign, an identity, a film — and see the better version sitting two steps past it. Not a different idea. The *same idea, taken further* than anyone had bothered to take it.",
      "For a long time that was just a private irritation. Then I started noticing how often the reason was the same: somebody got to an answer that worked, and the room relaxed. Nobody was being lazy. They had something good, and good is where projects are allowed to stop.",
      "13th Pencil exists because I did not want to run a place where good is where we stop.",
    ],
    letterClosing:
      "We are new, and small, and there is no pyramid here. What there is: people who would rather keep going than hand over something that is merely fine — and the craft to make the extra distance actually show.",
    signLabel: "Founder, 13th Pencil",
    madeHeading: "Everything on this page was made here.",
    madeLede:
      "The film at the top, the artwork below, the type, the build. No stock, no borrowed reel. Until there are client case studies to show you, this is the sample.",
    artworks: [
      {
        caption: "THE THIRTEENTH PERSPECTIVE",
        alt: "A figure walking past a concrete wall marked with a single red stroke forming the numeral thirteen.",
      },
      {
        caption: "DIFFERENT BY DESIGN",
        alt: "A torn-paper collage of concrete architecture, a walking figure, and a red stroke forming the numeral thirteen.",
      },
    ],
    madeNote: "Made with the same tools everyone else has. The difference is how long we stayed with them.",
    pagerLabel: "Next",
    pagerTitle: "Why 13th Pencil",
    pagerHref: "/about/why-13th-pencil",
    ctaHeading: "Bring us something that already works.",
  },
  aboutWhy: {
    metaTitle: "Why 13th Pencil — 13th Pencil",
    metaDescription:
      "Getting to good has never been cheaper. You are not paying for the first workable answer any more — you are paying for the distance past it.",
    crumbLabel: "Why 13th Pencil",
    genLabel: "Here is a positioning line for a creative agency. It is brand new. Nobody wrote it.",
    genInitialLine: "We craft bold brands for a changing world.",
    genButton: "Generate another",
    genCountIdle: "Press it as many times as you like. It is free.",
    turnHeading: "None of those were wrong. That is the problem.",
    turnLeft1:
      "Every line that machine produced is grammatical, on-strategy and perfectly presentable. You could put any of them on a wall tomorrow and no one would object. *That is exactly what makes them worthless.*",
    turnLeft2:
      "Getting to competent used to be the hard part, and it was most of what an agency was paid for. It now takes seconds and costs nothing — for you, for us, and for every competitor you have.",
    turnRight1:
      "So the value moved. It is no longer in producing the first workable answer. It is in what happens after it: the judgement to see that workable is not the same as worth doing, and the appetite to keep going when you already have something you could ship.",
    turnNote: "We use these tools constantly. That is not the argument. The argument is about where we stop.",
    trio: [
      {
        number: "01",
        title: "We start where the generator stops",
        body: "The obvious answer is the first thing on our wall, not the last. It shows us where the category ends.",
      },
      {
        number: "02",
        title: "You will see the rejects",
        body: "Including the ones that were perfectly good. Watching what we threw away is how you know what you bought.",
      },
      {
        number: "03",
        title: "It costs more time, not more money",
        body: "Fixed fee, agreed up front. The extra distance comes out of our hours, not your budget.",
      },
    ],
    artCaption: "Made with the same tools as everyone else. Taken further.",
    artAlt:
      "A torn-paper collage of concrete architecture, a walking figure, and a red stroke forming the numeral thirteen.",
    pagerLabel: "Next",
    pagerTitle: "Our Approach",
    pagerHref: "/about/our-approach",
    ctaHeading: "Send us the version you already approved.",
  },
  aboutApproach: {
    metaTitle: "Our Approach — 13th Pencil",
    metaDescription:
      "Version one already works. Drag to see what the next twelve buy you. How 13th Pencil works.",
    crumbLabel: "Our Approach",
    heroHeading: "Version one already works.",
    heroHint: "Drag the handle. Watch what the next twelve are actually for.",
    posterEyebrow: "13TH PENCIL",
    posterLine1: "Same brief.",
    posterLine2: "Different questions.",
    posterFooter: "A CREATIVE & INNOVATION COMPANY",
    sliderStartLabel: "01 — IT WORKS",
    sliderEndLabel: "13 — IT'S WORTH IT",
    buysHeading: "What the extra twelve actually buy.",
    buys: [
      {
        key: "Hierarchy",
        title: "Someone decided what matters",
        body: "Version one treats every element as equally important, because no judgement has been applied yet. That is the tell.",
      },
      {
        key: "Tension",
        title: "It stops being symmetrical",
        body: "Centred and evenly spaced is what you get by default. Asymmetry is always a choice somebody made and can defend.",
      },
      {
        key: "Restraint",
        title: "Things were removed",
        body: "Most of the improvement between one and thirteen is subtraction. Adding is easy; knowing what to delete is the skill.",
      },
      {
        key: "Ownership",
        title: "It could only be yours",
        body: "By thirteen it carries a mark nobody else could have made. That is the only version worth putting your name on.",
      },
    ],
    pagerLabel: "Back to the beginning",
    pagerTitle: "Our Story",
    pagerHref: "/about/our-story",
    ctaHeading: "Show us your version one.",
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
