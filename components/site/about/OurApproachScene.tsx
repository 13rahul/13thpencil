"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { AboutApproachContent, SiteSettings } from "@/lib/types";
import { SiteFooter } from "../SiteFooter";
import { AboutPager } from "./AboutPager";
import { AboutSubnav } from "./AboutSubnav";

const NOTES: [string, string][] = [
  [
    "The first thing that works",
    "Legible, centred, on brief. Nothing is wrong with it. This is where most projects are signed off, and a machine can reach it in seconds.",
  ],
  [
    "Someone looks again",
    "The type grows. Still centred, still safe, but somebody has noticed the headline is the point and the rest is not.",
  ],
  [
    "Hierarchy arrives",
    "Sizes separate. The eye is finally told where to go first instead of being left to decide.",
  ],
  [
    "The centre gives way",
    "It moves left. Centring is the default that happens when no one has made a decision about position.",
  ],
  ["Space opens", "Margins widen. The work stops filling the frame and starts using it."],
  [
    "Tracking tightens",
    "Display type gets drawn closer. Small, invisible, and the difference between typeset and designed.",
  ],
  [
    "Supporting text recedes",
    "The credit line stops competing. Quietening things is how you make one thing loud.",
  ],
  [
    "A field appears",
    "Ground is introduced behind the type. The composition gains depth rather than sitting flat.",
  ],
  [
    "Contrast sharpens",
    "The headline goes to full weight against the field. Now it reads from across a room.",
  ],
  [
    "The mark is introduced",
    "One coral stroke. Placed, not decorated — it goes where the eye needs to land last.",
  ],
  [
    "Everything is re-measured",
    "Optical spacing, not mathematical. By eye, because by number always looks slightly wrong.",
  ],
  [
    "Something is removed",
    "The last pass takes things away rather than adding them. Restraint is the expensive part.",
  ],
  [
    "The one worth signing",
    "Nothing here happened by default. Every position, weight and gap was argued for — and it could not be anyone else's.",
  ],
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

type PosterStyles = {
  pad: string;
  alignItems: string;
  textAlign: string;
  justifyContent: string;
  ebFontSize: string;
  ebLetterSpacing: string;
  ebOpacity: number;
  ebMarginBottom: string;
  ebColor: string;
  titleSize: string;
  titleLineHeight: number;
  titleLetterSpacing: string;
  titleWeight: number;
  titleColor: string;
  t2Opacity: number;
  t2Color: string;
  blockOpacity: number;
  blockWidth: string;
  posterBg: string;
  ruleOpacity: number;
  ruleWidth: string;
  ruleHeight: string;
  ruleMarginTop: string;
  ruleTransform: string;
  fSize: string;
  fLetterSpacing: string;
  fOpacity: number;
  fColor: string;
  fVisibility: "hidden" | "visible";
  vColor: string;
};

function computeStyles(v: number, width: number): PosterStyles {
  const t = (v - 1) / 12;
  const e = ease(t);
  const W = width || 600;
  return {
    pad: `${lerp(0.055, 0.085, e) * W}px`,
    alignItems: t < 0.25 ? "center" : "flex-start",
    textAlign: t < 0.25 ? "center" : "left",
    justifyContent: t < 0.33 ? "center" : "flex-start",
    ebFontSize: `${lerp(0.026, 0.0205, e) * W}px`,
    ebLetterSpacing: `${lerp(0.02, 0.14, e)}em`,
    ebOpacity: lerp(1, 0.62, e),
    ebMarginBottom: `${lerp(0.02, 0.075, e) * W}px`,
    ebColor: t > 0.58 ? "#A7ADB4" : "#5C6268",
    titleSize: `${lerp(0.062, 0.125, e) * W}px`,
    titleLineHeight: lerp(1.34, 0.92, e),
    titleLetterSpacing: `${lerp(0, -0.045, e)}em`,
    titleWeight: t < 0.18 ? 600 : 800,
    titleColor: t > 0.58 ? "#EDE5D6" : "#181A1C",
    t2Opacity: t > 0.15 ? 1 : 0.68,
    t2Color: t > 0.62 ? "#F4737E" : "inherit",
    blockOpacity: t > 0.55 ? 1 : 0,
    blockWidth: t > 0.55 ? `${lerp(62, 100, (t - 0.55) / 0.45)}%` : "0%",
    posterBg: t > 0.55 ? "#23272B" : "#E2D8C4",
    ruleOpacity: t > 0.68 ? 1 : 0,
    ruleWidth: t > 0.68 ? `${lerp(0.1, 0.34, (t - 0.68) / 0.32) * W}px` : "0px",
    ruleHeight: `${lerp(5, 8, e)}px`,
    ruleMarginTop: `${lerp(0.02, 0.045, e) * W}px`,
    ruleTransform: t > 0.92 ? "rotate(-1.6deg)" : "none",
    fSize: `${lerp(0.024, 0.0185, e) * W}px`,
    fLetterSpacing: `${lerp(0.02, 0.12, e)}em`,
    fOpacity: t > 0.5 ? lerp(1, 0.5, e) : lerp(1, 0.8, e),
    fColor: t > 0.58 ? "#A7ADB4" : "#5C6268",
    fVisibility: v >= 12 ? "hidden" : "visible",
    vColor: t > 0.58 ? "#A7ADB4" : "#5C6268",
  };
}

export function OurApproachScene({
  settings,
  page,
}: {
  settings: SiteSettings;
  page: AboutApproachContent;
}) {
  const [version, setVersion] = useState(1);
  const [width, setWidth] = useState(600);
  const posterRef = useRef<HTMLElement | null>(null);
  const labRef = useRef<HTMLElement | null>(null);
  const userTookOver = useRef(false);

  useEffect(() => {
    const el = posterRef.current;
    if (!el) return;
    const measure = () => setWidth(el.clientWidth || 600);
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !labRef.current) return;
    let played = false;
    let id: number | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !played) {
          played = true;
          let v = 1;
          id = window.setInterval(() => {
            if (userTookOver.current) {
              clearInterval(id);
              return;
            }
            v++;
            if (v > 13) {
              clearInterval(id);
              return;
            }
            setVersion(v);
          }, 620);
        }
      },
      { threshold: 0.45 },
    );
    io.observe(labRef.current);
    return () => {
      io.disconnect();
      if (id) clearInterval(id);
    };
  }, []);

  const styles = computeStyles(version, width);
  const note = NOTES[version - 1]!;
  const mail = `mailto:${settings.primaryEmail}?subject=${encodeURIComponent("Project enquiry — 13th Pencil")}`;

  return (
    <main className="about about-approach" id="top">
      <section
        className="lab panel panel--ink"
        id="lab"
        ref={(node) => {
          labRef.current = node;
        }}
      >
        <div className="wrap">
          <p className="eyebrow" style={{ marginBottom: "clamp(16px,2.4vh,30px)" }}>
            <a href="/about/our-story">About</a>
            <span aria-hidden="true">/</span>
            <b>{page.crumbLabel}</b>
          </p>
          <div className="lab__top">
            <h1>{page.heroHeading}</h1>
            <p className="lab__hint">{page.heroHint}</p>
          </div>

          <div className="lab__grid">
            <figure
              className="poster"
              id="poster"
              ref={(node) => {
                posterRef.current = node;
              }}
              style={{ background: styles.posterBg }}
            >
              <span className="poster__v" style={{ color: styles.vColor }}>
                V{version < 10 ? `0${version}` : version}
              </span>
              <span
                className="poster__block"
                aria-hidden="true"
                style={{ opacity: styles.blockOpacity, width: styles.blockWidth }}
              />
              <div
                className="poster__in"
                style={{
                  padding: styles.pad,
                  alignItems: styles.alignItems as CSSProperties["alignItems"],
                  textAlign: styles.textAlign as CSSProperties["textAlign"],
                  justifyContent: styles.justifyContent as CSSProperties["justifyContent"],
                }}
              >
                <span
                  className="poster__eb"
                  style={{
                    fontSize: styles.ebFontSize,
                    letterSpacing: styles.ebLetterSpacing,
                    opacity: styles.ebOpacity,
                    marginBottom: styles.ebMarginBottom,
                    color: styles.ebColor,
                  }}
                >
                  {page.posterEyebrow}
                </span>
                <h2
                  className="poster__t"
                  style={{
                    fontSize: styles.titleSize,
                    lineHeight: styles.titleLineHeight,
                    letterSpacing: styles.titleLetterSpacing,
                    fontWeight: styles.titleWeight,
                    color: styles.titleColor,
                  }}
                >
                  <span>{page.posterLine1}</span>
                  <span style={{ opacity: styles.t2Opacity, color: styles.t2Color }}>
                    {page.posterLine2}
                  </span>
                </h2>
                <span
                  className="poster__rule"
                  style={{
                    opacity: styles.ruleOpacity,
                    width: styles.ruleWidth,
                    height: styles.ruleHeight,
                    marginTop: styles.ruleMarginTop,
                    transform: styles.ruleTransform,
                  }}
                />
                <span
                  className="poster__f"
                  style={{
                    fontSize: styles.fSize,
                    letterSpacing: styles.fLetterSpacing,
                    opacity: styles.fOpacity,
                    color: styles.fColor,
                    visibility: styles.fVisibility,
                  }}
                >
                  {page.posterFooter}
                </span>
              </div>
            </figure>

            <div className="ctrl">
              <div className={`ctrl__n${version === 13 ? " hot" : ""}`}>
                {version < 10 ? `0${version}` : version}
              </div>
              <p className="ctrl__t">{note[0]}</p>
              <p className="ctrl__d" id="ctrlD">
                {note[1]}
              </p>
              <input
                className={`slider${version === 13 ? " done" : ""}`}
                type="range"
                min={1}
                max={13}
                step={1}
                value={version}
                aria-label="Version, one to thirteen"
                aria-describedby="ctrlD"
                onChange={(e) => {
                  userTookOver.current = true;
                  setVersion(Number(e.target.value));
                }}
              />
              <div className="ticks">
                <span>{page.sliderStartLabel}</span>
                <b>{page.sliderEndLabel}</b>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutSubnav current="/about/our-approach" />

      <section className="buys panel panel--paper">
        <div className="wrap">
          <h2 className="rv">{page.buysHeading}</h2>
          <div className="buys__g">
            {(page.buys || []).map((buy, i) => (
              <div key={buy.key} className="buys__c rv" data-d={i || undefined}>
                <span className="buys__k">{buy.key}</span>
                <h3>{buy.title}</h3>
                <p>{buy.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
