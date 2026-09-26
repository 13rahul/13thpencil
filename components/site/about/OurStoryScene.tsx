"use client";

import { useEffect, useRef, useState } from "react";
import type { AboutOurStoryContent, SiteSettings } from "@/lib/types";
import { SiteFooter } from "../SiteFooter";
import { AboutPager } from "./AboutPager";
import { AboutSubnav } from "./AboutSubnav";
import { EmMarks } from "./TextMarks";

const ART_SRC = [
  { webp: "/assets/img/wall.webp", jpg: "/assets/img/wall.jpg" },
  { webp: "/assets/img/collage.webp", jpg: "/assets/img/collage.jpg" },
];

export function OurStoryScene({
  settings,
  page,
}: {
  settings: SiteSettings;
  page: AboutOurStoryContent;
}) {
  const [lit, setLit] = useState(false);
  const [playing, setPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const letterRef = useRef<HTMLElement | null>(null);
  const signRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setLit(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const video = videoRef.current;
    if (video) {
      if (reduce) {
        try {
          video.pause();
        } catch {
          /* poster */
        }
        setPlaying(false);
      } else {
        const play = video.play();
        if (play && play.catch) play.catch(() => setPlaying(false));
      }
    }

    const letter = letterRef.current;
    const sign = signRef.current;
    if (!letter || !sign) return;

    const lines = Array.from(letter.querySelectorAll<HTMLElement>(".l"));
    if (reduce) {
      lines.forEach((l) => l.classList.add("in"));
      sign.classList.add("in");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          lines.forEach((l, i) => {
            window.setTimeout(() => l.classList.add("in"), 140 + i * 420);
          });
          window.setTimeout(() => sign.classList.add("in"), 140 + lines.length * 420);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(letter);
    return () => io.disconnect();
  }, []);

  function toggleFilm() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => undefined);
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  const mail = `mailto:${settings.primaryEmail}?subject=${encodeURIComponent("Project enquiry — 13th Pencil")}`;

  return (
    <main className="about about-story" id="top">
      <section className={`filmhero panel panel--ink${lit ? " lit" : ""}`} id="hero">
        <div className="filmhero__media">
          <video
            ref={videoRef}
            id="heroVid"
            playsInline
            muted
            loop
            preload="metadata"
            poster="/assets/video/poster.jpg"
            aria-label={page.videoAriaLabel}
          >
            <source src="/assets/video/13thpencil-film.webm" type="video/webm" />
            <source src="/assets/video/13thpencil-film.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="filmhero__scrim" aria-hidden="true" />
        <div className="filmhero__vig" aria-hidden="true" />
        <div className="wrap filmhero__in">
          <p className="eyebrow filmhero__eb">
            <a href="/about/our-story">About</a>
            <span aria-hidden="true">/</span>
            <b>{page.crumbLabel}</b>
          </p>
          <h1>
            <span className="ln">
              <span>{page.heroLine1}</span>
            </span>
            <span className="ln">
              <span>{page.heroLine2}</span>
            </span>
          </h1>
          <p className="filmhero__sub">{page.heroSub}</p>
        </div>
        <button className="vidbtn" type="button" aria-pressed={playing} onClick={toggleFilm}>
          <span aria-hidden="true">{playing ? "❙❙" : "▶"}</span>
          <span>{playing ? "Pause film" : "Play film"}</span>
        </button>
      </section>

      <AboutSubnav current="/about/our-story" />

      <section
        className="letter panel panel--paper"
        id="letter"
        ref={(node) => {
          letterRef.current = node;
        }}
      >
        <div className="letter__paper">
          <p className="letter__from l">{page.letterFrom}</p>
          {(page.letterParagraphs || []).map((para, i) => (
            <p key={i} className="l">
              <EmMarks text={para} />
            </p>
          ))}
          <p className="l small">{page.letterClosing}</p>
          <div
            className="sign"
            id="sign"
            ref={(node) => {
              signRef.current = node;
            }}
          >
            <svg viewBox="0 0 220 120" role="img" aria-label="Signed P K">
              <path d="M34 100C34 72 36 44 40 24c14-4 30-2 33 10 3 11-9 20-24 21-4 0-7 0-9-1" />
              <path d="M112 22c-4 26-6 52-6 78" />
              <path d="M178 26c-20 18-38 32-56 42 16 8 32 20 44 34" />
            </svg>
            <span>{page.signLabel}</span>
          </div>
        </div>
      </section>

      <section className="made panel panel--ink">
        <div className="wrap">
          <h2 className="made__h rv">{page.madeHeading}</h2>
          <p className="lede made__lede rv" data-d="1">
            {page.madeLede}
          </p>
          <div className="made__g">
            {(page.artworks || []).map((art, i) => {
              const src = ART_SRC[i] || ART_SRC[0]!;
              return (
                <figure key={art.caption} className="made__i rv" data-d={i || undefined}>
                  <picture>
                    <source srcSet={src.webp} type="image/webp" />
                    <img src={src.jpg} alt={art.alt} loading="lazy" decoding="async" />
                  </picture>
                  <figcaption>{art.caption}</figcaption>
                </figure>
              );
            })}
          </div>
          <p className="note made__note rv" data-d="2">
            {page.madeNote}
          </p>
        </div>
      </section>

      <section className="about-cta panel panel--ink" id="start" style={{ paddingTop: "clamp(20px,4vh,54px)" }}>
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
