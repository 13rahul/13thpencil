"use client";

import { useRef, useState } from "react";
import type { AboutWhyContent, SiteSettings } from "@/lib/types";
import { SiteFooter } from "../SiteFooter";
import { AboutPager } from "./AboutPager";
import { AboutSubnav } from "./AboutSubnav";
import { StrongMarks } from "./TextMarks";

const V = ["craft", "build", "create", "design", "shape", "engineer", "unlock", "ignite", "architect", "deliver"];
const A = [
  "bold",
  "fearless",
  "iconic",
  "human",
  "purposeful",
  "future-facing",
  "category-defining",
  "unforgettable",
  "authentic",
  "meaningful",
];
const W = ["changing", "connected", "complex", "noisy", "fast-moving", "borderless", "post-digital", "attention-scarce"];
const N = ["brands", "ideas", "experiences", "stories", "platforms", "campaigns"];
const NP = ["brands", "businesses", "challengers", "founders", "teams"];
const N2 = ["growth", "impact", "belief", "momentum", "relevance", "advantage", "meaning", "results"];
const X = ["strategy", "creativity", "data", "technology", "design", "culture", "insight", "craft"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

const TEMPLATES = [
  (p: typeof pick) => `We ${p(V)} ${p(A)} ${p(N)} for a ${p(W)} world.`,
  (p: typeof pick) => `${p(A).replace(/^./, (c) => c.toUpperCase())} ${p(N)} that drive real ${p(N2)}.`,
  (p: typeof pick) => `Where ${p(X)} meets ${p(X)}.`,
  (p: typeof pick) => `We turn ${p(X)} into ${p(N2)}.`,
  (p: typeof pick) => `Building ${p(A)} ${p(N)} for the ${p(W)} age.`,
  (p: typeof pick) => `Strategy-led. Creatively ${p(A)}. Relentlessly focused on ${p(N2)}.`,
  (p: typeof pick) => `We help ${p(NP)} find their ${p(N2)}.`,
  (p: typeof pick) => `The ${p(A)} partner for ${p(A)} ${p(NP)}.`,
];

const NUDGES: Record<number, string> = {
  3: "Three in a row. Not one of them is wrong.",
  6: "Six now. Your competitor can make these too.",
  10: "Ten. This is the part of the job that used to be billable.",
  16: "Still going? So is the machine. It will never get tired and it will never get better.",
  25: "Twenty-five perfectly acceptable positioning lines. Pick your favourite — it will not matter.",
};

export function Why13thPencilScene({
  settings,
  page,
}: {
  settings: SiteSettings;
  page: AboutWhyContent;
}) {
  const [line, setLine] = useState(page.genInitialLine);
  const [flip, setFlip] = useState(false);
  const [spin, setSpin] = useState(false);
  const [count, setCount] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [nudge, setNudge] = useState("");
  const [marks, setMarks] = useState(0);
  const seenRef = useRef<Record<string, number>>({});
  const t0Ref = useRef<number | null>(null);

  function makeLine() {
    for (let i = 0; i < 24; i++) {
      const s = TEMPLATES[Math.floor(Math.random() * TEMPLATES.length)]!(pick);
      if (!seenRef.current[s]) {
        seenRef.current[s] = 1;
        return s;
      }
    }
    return TEMPLATES[0]!(pick);
  }

  function shoot() {
    if (!t0Ref.current) t0Ref.current = Date.now();
    const n = count + 1;
    setCount(n);
    setLine(makeLine());
    setFlip(false);
    requestAnimationFrame(() => setFlip(true));
    setSpin(false);
    requestAnimationFrame(() => setSpin(true));
    setMarks((m) => Math.min(m + 1, 90));
    setSeconds(Math.max(1, Math.round((Date.now() - t0Ref.current) / 1000)));
    if (NUDGES[n]) setNudge(NUDGES[n]!);
  }

  const mail = `mailto:${settings.primaryEmail}?subject=${encodeURIComponent("Project enquiry — 13th Pencil")}`;

  return (
    <main className="about about-why" id="top">
      <section className="gen panel panel--ink" id="gen">
        <div className="wrap">
          <p className="eyebrow gen__eb">
            <a href="/about/our-story">About</a>
            <span aria-hidden="true">/</span>
            <b>{page.crumbLabel}</b>
          </p>
          <p className="gen__label">{page.genLabel}</p>
          <p className={`gen__line${flip ? " flip" : ""}`} aria-live="polite">
            {line}
          </p>
          <div className="gen__bar">
            <button className={`genbtn${spin ? " spin" : ""}`} type="button" onClick={shoot}>
              <i aria-hidden="true" />
              {page.genButton}
            </button>
            <span className="gen__count">
              {count > 0 ? (
                <>
                  <b>{count}</b>
                  {` line${count === 1 ? "" : "s"} in ${seconds} second${seconds === 1 ? "" : "s"}. Cost: nothing.`}
                </>
              ) : (
                page.genCountIdle
              )}
            </span>
          </div>
          <p className={`gen__nudge${nudge ? " on" : ""}`}>{nudge}</p>
        </div>
        <div className="gen__marks" aria-hidden="true">
          {Array.from({ length: marks }, (_, i) => (
            <b key={i} />
          ))}
        </div>
      </section>

      <AboutSubnav current="/about/why-13th-pencil" />

      <section className="turn panel panel--paper">
        <div className="wrap">
          <h2 className="rv">{page.turnHeading}</h2>
          <div className="turn__body">
            <div>
              <p className="rv" data-d="1">
                <StrongMarks text={page.turnLeft1} />
              </p>
              <p className="rv" data-d="2">
                {page.turnLeft2}
              </p>
            </div>
            <div>
              <p className="rv" data-d="2">
                {page.turnRight1}
              </p>
              <p className="note rv" data-d="3">
                {page.turnNote}
              </p>
            </div>
          </div>

          <div className="trio">
            {(page.trio || []).map((item, i) => (
              <div key={item.number} className="trio__c rv" data-d={i || undefined}>
                <span className="trio__k">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <figure className="about-art about-art--tall">
        <picture>
          <source srcSet="/assets/img/collage.webp" type="image/webp" />
          <img src="/assets/img/collage.jpg" alt={page.artAlt} loading="lazy" decoding="async" />
        </picture>
        <figcaption className="about-art__cap">{page.artCaption}</figcaption>
      </figure>

      <section className="about-cta panel panel--ink" id="start">
        <div className="wrap">
          <AboutPager flush label={page.pagerLabel} href={page.pagerHref} title={page.pagerTitle} />
          <h2 style={{ marginTop: "clamp(46px,7vh,90px)" }}>{page.ctaHeading}</h2>
          <div className="cta-row">
            <a className="btn" href="/start-a-project">
              {settings.ctaLabel}
            </a>
            <a className="big-link" href={mail}>
              {settings.primaryEmail}
            </a>
          </div>
          <SiteFooter settings={settings} />
        </div>
      </section>
    </main>
  );
}
