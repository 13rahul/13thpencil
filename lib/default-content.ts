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
      "Positioning, brand architecture, naming, messaging and cultural insight. 13th Pencil finds the tension in a category before anyone designs anything.",
    number: "01",
    practiceName: "Brand & Strategy",
    heroLine1: "Everyone in your category is",
    heroLine2Before: "answering the ",
    heroEmphasis: "same question",
    heroLine2After: ".",
    heroTick: "Positioning · Architecture · Naming · Messaging · Insight",
    subcopy:
      "Brand and strategy work that goes looking for the question nobody has asked yet — then builds a position on it that competitors cannot copy by adjusting their adjectives.",
    heardHeading: "The problem, as it\nusually arrives.",
    heardNote: "Written the way it is actually said in a first conversation, before anyone has tidied it into a brief.",
    heard: [
      {
        quote: '"We sound exactly like our three closest competitors and we cannot tell you why."',
        label: "Positioning · Category analysis",
      },
      {
        quote: '"We have six products, four sub-brands, and no idea which one the customer is buying."',
        label: "Brand architecture",
      },
      {
        quote: '"Every team writes our story differently, so the market hears five companies."',
        label: "Messaging framework",
      },
      {
        quote: '"We are entering a market we do not understand yet and the deck is due Friday."',
        label: "Audience & cultural insight",
      },
      {
        quote: '"The strategy tested fine. It is also *exactly what anyone would have said*."',
        label: "Start here",
        marked: true,
      },
    ],
    workHeading: "Six workstreams.\nOne argument.",
    workNote:
      "Rarely all six at once. An engagement usually takes two or three and runs them properly rather than touching everything lightly.",
    workstreams: [
      {
        number: "01",
        title: "Category analysis",
        body: "What every competitor is claiming, in their own words, mapped until the pattern is undeniable. The default answer has to be visible before it can be refused.",
      },
      {
        number: "02",
        title: "Positioning",
        body: "The territory you own, the tension it resolves, and the reason it holds up when a competitor reads it. One page, defensible in a board meeting.",
      },
      {
        number: "03",
        title: "Brand architecture",
        body: "How the master brand, products and sub-brands relate — what gets a name, what gets a descriptor, and what quietly disappears.",
      },
      {
        number: "04",
        title: "Naming",
        body: "Names for companies, products and platforms, taken through linguistic and trademark screening rather than presented as a mood board.",
      },
      {
        number: "05",
        title: "Messaging",
        body: "The hierarchy — what is said first, what is said to whom, and the proof under each claim. Built so sales, marketing and product say one thing.",
      },
      {
        number: "06 — the departure",
        title: "Audience & cultural insight",
        body: "The part most strategy skips. What your audience actually believes, what the category has trained them to expect, and where those two disagree. That gap is where the position comes from.",
        odd: true,
      },
    ],
    mapHeading: "Where the work lands.",
    mapNote: "An illustration of the method, not a client map. Select a position to read what it means in practice.",
    mapHint: "Select any point on the map. The coral one is the position we are usually hired to find.",
    howHeading: "How an engagement runs.",
    howNote: "Four to eight weeks for most positioning work. Longer if architecture and naming are in scope.",
    steps: [
      {
        label: "Week one",
        title: "Immersion",
        body: "Stakeholder interviews, sales calls, existing research, and every competitor's own words. We read what you already know before adding anything.",
      },
      {
        label: "Week two",
        title: "The pattern",
        body: "The category mapped until the default answer is obvious. This is the part that makes the departure arguable rather than merely different.",
      },
      {
        label: "Weeks three to four",
        title: "Territories",
        body: "Several positions, written properly and argued against each other. The weak ones are useful — they show where the edge of the category actually is.",
      },
      {
        label: "And then",
        title: "The one",
        body: "A single position, built out into architecture and messaging, with the proof under each claim and the language teams can actually use on Monday.",
      },
    ],
    getHeading: "What you get.",
    getNote: "Documents people use, not a deck that is admired once and filed. Select any of them to see what is inside.",
    deliverables: [
      {
        title: "Category map",
        body: "Every meaningful competitor, what they claim, the language they use to claim it, and where the claims overlap. Usually the first time a leadership team sees the category stated plainly — and usually the moment the brief changes.",
      },
      {
        title: "Positioning statement",
        body: "One page. The audience, the tension, the territory, the proof, and what the position deliberately gives up. If it does not sacrifice something, it is not a position — it is a description.",
      },
      {
        title: "Brand architecture",
        body: "The structure of the portfolio: what is named, what is described, what is retired, and the rule that decides where anything new goes. Written so it survives the next product launch without a workshop.",
      },
      {
        title: "Messaging framework",
        body: "The hierarchy from a single line down to audience-specific proof points, with the words to avoid because the category already owns them. Built for sales decks, careers pages and product copy alike.",
      },
      {
        title: "The working session",
        body: "Everything above, walked through with the people who will use it — not presented at them. Recorded, so the team that joins in six months hears the argument rather than inheriting the conclusion.",
      },
    ],
    connectsHeading: "Where it connects.",
    connectsNote:
      "Strategy that stops at a document is half a job. Most engagements carry straight into one of these, with the same people.",
    connects: [
      {
        number: "02",
        name: "Creative Studio",
        line: "The position made visible — identity, campaign platform, film and design systems.",
        href: "/capabilities/creative-studio",
      },
      {
        number: "03",
        name: "AI & Innovation",
        line: "Prototypes that test a territory in the world before the full build is committed.",
        href: "/capabilities/ai-and-innovation",
      },
      {
        number: "04",
        name: "Experiences",
        line: "The position as something people walk into, rather than something they read.",
        href: "/capabilities/experiences",
      },
      {
        number: "05",
        name: "Digital Growth",
        line: "The messaging tested at scale, where the market answers back with data.",
        href: "/capabilities/digital-growth",
      },
    ],
    faqHeading: "Questions we\nare usually asked.",
    faqNote: "If yours is not here, ask it directly — the answer will be a sentence, not a capability deck.",
    faqs: [
      {
        question: "How long does positioning work take?",
        answer:
          "Four to eight weeks for most positioning engagements. Architecture and naming add time, mainly because trademark screening runs on its own schedule. We will give you a date in the first conversation and tell you plainly if a deadline is not realistic.",
      },
      {
        question: "Do you need existing research, or do you run your own?",
        answer:
          "We start with what you already have — it is usually more than anyone remembers. Where there is a genuine gap we will scope primary research separately rather than folding a guess into the strategy and hoping nobody asks.",
      },
      {
        question: "Can you do strategy without doing the creative?",
        answer:
          "Yes. Plenty of positioning work is handed to an in-house team or an incumbent agency, and it is written to be handed over — the argument is in the document, not only in our heads. We would rather the work gets made well elsewhere than not at all.",
      },
      {
        question: "What size of company does this suit?",
        answer:
          "Anything from a funded startup entering a crowded category to an established business whose portfolio has outgrown its structure. What matters more than size is whether someone in the room can make a decision.",
      },
      {
        question: "How do you charge?",
        answer:
          "A fixed fee for a defined scope, agreed before we start. If you want to see how we think first, a paid discovery sprint is a sensible way to begin — short, self-contained, and useful to you whether or not the larger engagement follows.",
      },
      {
        question: "What if we disagree with the position you recommend?",
        answer:
          "Then we argue about it, which is the useful part. The territories are written to be argued with — several of them, deliberately, so the choice is yours and the reasoning is visible. A position nobody pushed back on is usually one nobody will defend later either.",
      },
    ],
    contactLine1: "Tell us what",
    contactLine2: "everyone else would do.",
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
