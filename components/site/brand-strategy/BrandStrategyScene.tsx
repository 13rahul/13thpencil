"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { BrandStrategyContent, SiteSettings } from "@/lib/types";
import { enquiryMailto } from "@/lib/text";
import { Lockup } from "../Lockup";
import {
  ArchitectureSketch,
  HeroStroke,
  InsightSketch,
  MessagingSketch,
  NamingSketch,
  PathSketch,
  PositioningSketch,
} from "./sketches";

const SKETCHES = [
  PositioningSketch,
  ArchitectureSketch,
  NamingSketch,
  MessagingSketch,
  InsightSketch,
];

function strokeLength(shape: SVGGeometryElement) {
  try {
    return shape.getTotalLength() || 400;
  } catch {
    return 400;
  }
}

function hideMarks(scope: HTMLElement) {
  scope.querySelectorAll<SVGGeometryElement>(".draw:not(.draw--dot)").forEach((shape) => {
    const length = strokeLength(shape);
    gsap.set(shape, { strokeDasharray: length, strokeDashoffset: length });
  });
  const dots = gsap.utils.toArray<HTMLElement>(scope.querySelectorAll(".draw--dot"));
  if (dots.length) gsap.set(dots, { scale: 0, transformOrigin: "50% 50%" });
}

function drawTimeline(slide: HTMLElement, paused = true) {
  const strokes = gsap.utils.toArray<Element>(slide.querySelectorAll(".draw:not(.draw--dot)"));
  const dots = gsap.utils.toArray<Element>(slide.querySelectorAll(".draw--dot"));
  const wipe = slide.querySelector(".bs-wipe");
  const crosses = gsap.utils.toArray<Element>(slide.querySelectorAll(".bs-strike__cross"));
  const shifts = gsap.utils.toArray<Element>(slide.querySelectorAll(".bs-shift"));
  const tl = gsap.timeline({ paused });
  if (strokes.length) {
    tl.fromTo(strokes, { strokeDashoffset: (i, el) => strokeLength(el as SVGGeometryElement) }, { strokeDashoffset: 0, duration: 1, ease: "none", stagger: 0.07, immediateRender: true }, 0);
  }
  if (dots.length) tl.to(dots, { scale: 1, duration: 0.18, ease: "none" }, 0.72);
  if (wipe) tl.fromTo(wipe, { scaleX: 0 }, { scaleX: 1, duration: 0.28, ease: "none", immediateRender: true }, 0.5);
  if (crosses.length) {
    tl.fromTo(crosses, { scaleX: 0 }, { scaleX: 1, duration: 0.4, stagger: 0.08, ease: "none", immediateRender: true }, 0.12);
  }
  if (shifts.length) {
    tl.fromTo(shifts, { y: 14, opacity: 0.15 }, { y: 0, opacity: 1, duration: 0.36, stagger: 0.06, ease: "none", immediateRender: true }, 0.22);
  }
  return tl;
}

function scrubDraw(slide: HTMLElement, vars: ScrollTrigger.Vars) {
  hideMarks(slide);
  ScrollTrigger.create({
    ...vars,
    animation: drawTimeline(slide),
    scrub: 0.85,
    invalidateOnRefresh: true,
  });
}

function setDraws(draws: gsap.core.Timeline[], t: number) {
  draws.forEach((draw, index) => {
    const start = index === 0 ? 0 : index - 0.28;
    draw.progress(Math.max(0, Math.min(1, (t - start) / 0.24)));
  });
}

function setIndex(work: HTMLElement, index: number, total: number) {
  const label = work.querySelector(".bs-work__idx");
  if (label) label.textContent = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  work.querySelectorAll<HTMLElement>(".bs-work__dot").forEach((dot, i) => {
    dot.setAttribute("aria-current", i === index ? "true" : "false");
  });
}

export function BrandStrategyScene({
  page,
  settings,
}: {
  page: BrandStrategyContent;
  settings: SiteSettings;
}) {
  const root = useRef<HTMLElement>(null);
  const struck = page.strikeLines.filter((line) => !line.keep);
  const kept = page.strikeLines.find((line) => line.keep);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.matchMedia("(min-width: 901px)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        el.querySelector(".bs-work")?.classList.add("is-swipe");
        gsap.set(el.querySelectorAll(".draw"), { strokeDashoffset: 0, scale: 1 });
        gsap.set(el.querySelectorAll(".bs-wipe, .bs-strike__cross"), { scaleX: 1 });
        return;
      }

      el.querySelectorAll<HTMLElement>(".bs-hero, .bs-strike, .bs-path, .bs-close").forEach((slide, index) => {
        scrubDraw(slide, {
          trigger: slide,
          start: index === 0 ? "top top" : "top 78%",
          end: index === 0 ? "bottom 45%" : "center 32%",
        });
      });

      const work = el.querySelector<HTMLElement>(".bs-work");
      const view = el.querySelector<HTMLElement>(".bs-work__view");
      const track = el.querySelector<HTMLElement>(".bs-work__track");
      const slides = gsap.utils.toArray<HTMLElement>(".bs-work .bs-draw");
      if (!work || !view || !track || !slides.length) return;

      const goTo = (index: number) => {
        const next = Math.max(0, Math.min(slides.length - 1, index));
        const pin = ScrollTrigger.getById("bs-work");
        if (pin) {
          const y = pin.start + (pin.end - pin.start) * (next / Math.max(1, slides.length - 1));
          window.scrollTo({ top: y, behavior: reduce ? "auto" : "smooth" });
          return;
        }
        view.scrollTo({ left: next * view.clientWidth, behavior: reduce ? "auto" : "smooth" });
      };

      work.querySelectorAll<HTMLButtonElement>("[data-work-to]").forEach((btn) => {
        btn.addEventListener("click", () => goTo(Number(btn.dataset.workTo)));
      });

      if (wide && !reduce) {
        work.classList.add("is-pinned");
        const steps = Math.max(1, slides.length - 1);
        slides.forEach((slide) => hideMarks(slide));
        const draws = slides.map((slide) => drawTimeline(slide, true));
        gsap.to(track, {
          x: () => -(track.scrollWidth - work.clientWidth),
          ease: "none",
          scrollTrigger: {
            id: "bs-work",
            trigger: work,
            start: "top top",
            end: () => `+=${steps * window.innerHeight * 2.4}`,
            pin: true,
            scrub: 1.25,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const t = self.progress * steps;
              setIndex(work, Math.round(t), slides.length);
              setDraws(draws, t);
            },
          },
        });
        return;
      }

      work.classList.add("is-swipe");
      slides.forEach((slide) => hideMarks(slide));
      const draws = slides.map((slide) => drawTimeline(slide, true));
      const onScroll = () => {
        const width = Math.max(1, view.clientWidth);
        const i = Math.round(view.scrollLeft / width);
        setIndex(work, i, slides.length);
        setDraws(draws, view.scrollLeft / width);
      };
      view.addEventListener("scroll", onScroll, { passive: true });
      onScroll();
    }, el);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, []);

  return (
    <main className="bs" ref={root} id="top">
      <section className="bs-slide bs-hero panel panel--paper">
        <div className="wrap bs-hero__inner">
          <div className="bs-art" aria-hidden="true">
            <HeroStroke />
          </div>
          <p className="tick bs-id">
            {page.number} / {page.practiceName}
          </p>
          <h1 className="display bs-hero__h">
            <span className="bs-ln">{page.heroBefore}</span>
            <span className="bs-ln">
              <em className="bs-mark">
                {page.heroEmphasis}
                <i className="bs-wipe" />
              </em>
              {page.heroAfter}
            </span>
          </h1>
          <p className="lede bs-hero__sub">{page.subcopy}</p>
        </div>
      </section>

      <section className="bs-slide bs-strike panel panel--paper" id="strike">
        <div className="wrap">
          <h2 className="h2">{page.strikeHeading}</h2>
          <ul className="bs-card">
            {struck.map((line) => (
              <li key={line.text}>
                <span>{line.text}</span>
                <i className="bs-strike__cross" />
              </li>
            ))}
          </ul>
          {kept ? <p className="bs-kept">{kept.text}</p> : null}
        </div>
      </section>

      <section className="bs-work" id="work" aria-label={page.practiceName}>
        <div className="bs-work__view">
          <div className="bs-work__track">
            {page.verbs.map((verb, index) => {
              const Sketch = SKETCHES[index] ?? PositioningSketch;
              const ink = index % 2 === 0;
              return (
                <article
                  className={ink ? "bs-draw panel panel--ink" : "bs-draw is-flip panel panel--paper"}
                  key={verb.label}
                >
                  <div className="wrap bs-split">
                    <div className="bs-art" aria-hidden="true">
                      <Sketch />
                    </div>
                    <div className="bs-copy">
                      <p className="tick bs-num">{String(index + 1).padStart(2, "0")}</p>
                      <h2 className={verb.depart ? "pink" : undefined}>{verb.label}</h2>
                      <p>{verb.body}</p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="bs-work__bar">
          <span className="tick bs-work__idx">01 / {String(page.verbs.length).padStart(2, "0")}</span>
          <div className="bs-work__dots" role="tablist" aria-label="Practices">
            {page.verbs.map((verb, index) => (
              <button
                type="button"
                className="bs-work__dot"
                key={verb.label}
                data-work-to={index}
                aria-label={verb.label}
                aria-current={index === 0 ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bs-slide bs-path panel panel--paper" id="method">
        <div className="wrap">
          <h2 className="h2">{page.pathHeading}</h2>
          <div className="bs-path__board">
            <div className="bs-art" aria-hidden="true">
              <PathSketch />
            </div>
            <ol className="bs-stops">
              {page.pathSteps.map((step, index) => (
                <li className="bs-shift" key={step.title}>
                  <span className="tick">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="bs-slide bs-close panel panel--ink" id="contact">
        <div className="wrap">
          <p className="tick bs-close__links" id="others">
            {page.othersHeading}
          </p>
          <div className="bs-close__others">
            {page.others.map((item) => (
              <a className="bs-shift" key={item.name} href={item.href}>
                <b>{item.name}</b>
                <span>{item.line}</span>
              </a>
            ))}
          </div>
          <h2 className="h2">
            {page.contactBefore}{" "}
            <em className="bs-mark">
              {page.contactEmphasis}
              <i className="bs-wipe" />
            </em>
            {page.contactAfter}
          </h2>
          <div className="bs-close__row">
              <a className="btn" href={enquiryMailto()}>
                {settings.ctaLabel}
              </a>
              <a className="bs-mail" href={`mailto:${settings.primaryEmail}`}>
                {settings.primaryEmail}
              </a>
          </div>
          <div className="foot">
            <a href="/" aria-label="13th Pencil" className="bs-lockup">
              <Lockup />
            </a>
            <span>{settings.footerLegal}</span>
            <button id="themeBtn" type="button">
              {settings.invertLabel}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
