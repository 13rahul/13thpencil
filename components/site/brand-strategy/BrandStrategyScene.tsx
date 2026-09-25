"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { BrandStrategyContent, SiteSettings } from "@/lib/types";
import { Breaks, Marked, startProjectHref } from "@/lib/text";
import { SiteFooter } from "../SiteFooter";

type MapPos = { x: number; y: number; t: string; b: string; odd?: boolean };

const MAP_POS: MapPos[] = [
  {
    x: 32,
    y: 64,
    t: "The cluster",
    b: "Most categories look like this: every brand claiming a slightly different adjective for the same idea, packed so tightly a customer cannot tell them apart. Being inside it is not a failure of execution. It is a failure of position.",
  },
  {
    x: 39,
    y: 70,
    t: "The cluster",
    b: "Two competitors can sit a millimetre apart on a map like this and spend years outspending each other to own the same word. The budget is real. The distance between them is not.",
  },
  {
    x: 27,
    y: 72,
    t: "The cluster",
    b: "The safest-looking spot on the map is the most crowded one. It feels like consensus because it is — which is exactly why it does not sell anything.",
  },
  {
    x: 44,
    y: 62,
    t: "The cluster",
    b: "Tidy, defensible, indistinguishable. This is where most strategy decks land, because the process rewarded agreement rather than argument.",
  },
  {
    x: 35,
    y: 77,
    t: "The cluster",
    b: "Being close to the category average is comfortable and cheap to approve. It is also the position that requires the largest media budget to be noticed at all.",
  },
  {
    x: 46,
    y: 55,
    t: "Convention, well executed",
    b: "Conventional positioning done properly. It works when you have the largest budget in the category and can simply be seen more often than everyone else. For everyone else it is an expensive way to be forgotten.",
  },
  {
    x: 20,
    y: 40,
    t: "Loud, not owned",
    b: "High distinctiveness inside category convention: a brand shouting the same claim more energetically. It buys short-term attention and leaves nothing behind when the spend stops.",
  },
  {
    x: 64,
    y: 76,
    t: "Different, about nothing",
    b: "Distinctive execution on an empty idea. It gets noticed and then fails to mean anything, so attention never converts into preference. Novelty is not a position.",
  },
  {
    x: 71,
    y: 46,
    t: "Nearly there",
    b: "Genuine territory, half committed to. Usually a brand that found the right idea and then softened it in review until it was comfortable enough to approve.",
  },
  {
    x: 51,
    y: 31,
    t: "Borrowed territory",
    b: "A position that belongs to someone else in an adjacent category. It reads as fresh for about a year, until the comparison becomes the story.",
  },
  {
    x: 82,
    y: 20,
    odd: true,
    t: "The departure",
    b: "Own territory, high distinctiveness, and a reason to be there that competitors cannot copy by editing their adjectives. It is harder to defend in a meeting, which is precisely why it is still available. This is the position we are hired to find.",
  },
];

const DEFAULT_MAP = { t: MAP_POS[0].t, b: MAP_POS[0].b };

const SUBNAV = [
  { href: "#heard", label: "What we hear" },
  { href: "#what", label: "What it covers" },
  { href: "#map", label: "Where it lands" },
  { href: "#how", label: "How it runs" },
  { href: "#get", label: "What you get" },
  { href: "#connects", label: "Where it connects" },
  { href: "#faq", label: "Questions" },
];

function layBars(host: HTMLElement) {
  const want = Math.max(7, Math.min(17, Math.round(window.innerWidth / 86)));
  if (host.children.length === want) return;
  host.innerHTML = "";
  for (let i = 0; i < want; i++) {
    const b = document.createElement("b");
    if (i === want - 3) b.className = "odd";
    host.appendChild(b);
  }
}

function wireDisclosure(scope: HTMLElement, itemSel: string, bodySel: string, single: boolean, reduce: boolean) {
  scope.querySelectorAll<HTMLElement>(itemSel).forEach((item) => {
    const btn = item.querySelector<HTMLButtonElement>("button");
    const body = item.querySelector<HTMLElement>(bodySel);
    if (!btn || !body) return;
    btn.addEventListener("click", () => {
      const open = item.hasAttribute("open");
      if (single) {
        scope.querySelectorAll<HTMLElement>(itemSel).forEach((other) => {
          if (other === item) return;
          other.removeAttribute("open");
          const ob = other.querySelector<HTMLElement>(bodySel);
          const obBtn = other.querySelector("button");
          if (ob) gsap.to(ob, { height: 0, duration: reduce ? 0 : 0.42, ease: "power2.out" });
          obBtn?.setAttribute("aria-expanded", "false");
        });
      }
      if (open) {
        item.removeAttribute("open");
        btn.setAttribute("aria-expanded", "false");
        gsap.to(body, { height: 0, duration: reduce ? 0 : 0.42, ease: "power2.out" });
      } else {
        item.setAttribute("open", "");
        btn.setAttribute("aria-expanded", "true");
        gsap.set(body, { height: "auto" });
        const h = body.offsetHeight;
        gsap.fromTo(body, { height: 0 }, { height: h, duration: reduce ? 0 : 0.48, ease: "power2.out" });
      }
    });
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
  const [mapRead, setMapRead] = useState(DEFAULT_MAP);
  const [mapOn, setMapOn] = useState<number | null>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setNavH = () => {
      const nav = document.getElementById("nav");
      if (nav) document.documentElement.style.setProperty("--navh", `${nav.offsetHeight}px`);
    };
    setNavH();

    const bars = el.querySelector<HTMLElement>("#bspBars");
    if (bars) layBars(bars);

    const dels = el.querySelector<HTMLElement>("#dels");
    const faqs = el.querySelector<HTMLElement>("#faqs");
    if (dels) wireDisclosure(dels, ".del", ".del__body", true, reduce);
    if (faqs) wireDisclosure(faqs, ".faq", ".faq__body", false, reduce);

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(el.querySelectorAll(".bsp-reveal, .bsp-line > span, #bspBars b"), {
          clearProps: "all",
          opacity: 1,
          y: 0,
          scaleY: 1,
          rotate: 0,
        });
        el.querySelector("#hero")?.classList.add("lit");
        return;
      }

      const hero = el.querySelector("#hero");
      const barNodes = bars ? gsap.utils.toArray<HTMLElement>("#bspBars b") : [];
      const lines = gsap.utils.toArray<HTMLElement>(".bsp-line > span", hero || el);
      const enter = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (barNodes.length) {
        gsap.set(barNodes, { scaleY: 0, transformOrigin: "bottom center" });
        enter.to(
          barNodes,
          {
            scaleY: 1,
            duration: 0.9,
            stagger: 0.035,
            ease: "power2.out",
            onComplete() {
              const odd = bars?.querySelector("b.odd");
              if (odd) gsap.to(odd, { rotation: 9, duration: 0.55, ease: "power2.out" });
            },
          },
          0.1,
        );
      }
      if (lines.length) {
        gsap.set(lines, { yPercent: 110 });
        enter.to(lines, { yPercent: 0, duration: 1.05, stagger: 0.1 }, 0.2);
      }
      enter.add(() => hero?.classList.add("lit"), 0.55);
      enter.from(".bsp-crumb, .bsp-tick, .hero__row", { y: 18, opacity: 0, duration: 0.7, stagger: 0.08 }, 0.55);

      gsap.utils.toArray<HTMLElement>(".bsp-reveal").forEach((node) => {
        const delay = Number(node.dataset.d || 0) * 0.08;
        gsap.from(node, {
          y: 28,
          opacity: 0,
          duration: 0.85,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: node,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });
      });

      gsap.utils.toArray<HTMLElement>(".hq").forEach((row, i) => {
        gsap.from(row, {
          x: i % 2 === 0 ? -36 : 36,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 88%", toggleActions: "play none none none" },
        });
      });

      gsap.from(".ws", {
        y: 40,
        opacity: 0,
        duration: 0.75,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: ".work", start: "top 78%", toggleActions: "play none none none" },
      });

      const mapStage = el.querySelector(".map__stage");
      if (mapStage) {
        gsap.from(".map__stage", {
          scale: 0.96,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: "#map", start: "top 70%", toggleActions: "play none none none" },
        });
        gsap.from(".dot", {
          scale: 0,
          opacity: 0,
          duration: 0.45,
          stagger: 0.04,
          ease: "back.out(1.6)",
          scrollTrigger: { trigger: ".map__stage", start: "top 75%", toggleActions: "play none none none" },
        });
        const odd = mapStage.querySelector(".dot--odd");
        if (odd) {
          gsap.fromTo(
            odd,
            { boxShadow: "0 0 0 0 rgba(244,115,126,0.0)" },
            {
              boxShadow: "0 0 0 10px rgba(244,115,126,0.18)",
              duration: 1.4,
              repeat: 1,
              yoyo: true,
              ease: "sine.inOut",
              scrollTrigger: { trigger: odd, start: "top 80%", toggleActions: "play none none none" },
            },
          );
        }
      }

      gsap.from(".step", {
        y: 32,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: ".steps", start: "top 80%", toggleActions: "play none none none" },
      });

      gsap.from(".del", {
        y: 20,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: "#dels", start: "top 82%", toggleActions: "play none none none" },
      });

      gsap.from(".cc", {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".conn", start: "top 80%", toggleActions: "play none none none" },
      });

      gsap.from(".faq", {
        y: 18,
        opacity: 0,
        duration: 0.55,
        stagger: 0.06,
        ease: "power2.out",
        scrollTrigger: { trigger: "#faqs", start: "top 85%", toggleActions: "play none none none" },
      });

      gsap.from("#start .cta__h .bsp-line > span", {
        yPercent: 100,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: { trigger: "#start", start: "top 75%", toggleActions: "play none none none" },
      });

      const links = gsap.utils.toArray<HTMLAnchorElement>("#subnavIn a");
      const targets = links.map((a) => el.querySelector(a.getAttribute("href") || ""));
      ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate() {
          const probe = window.innerHeight * 0.35;
          let best = -1;
          let bestTop = -Infinity;
          targets.forEach((t, i) => {
            if (!t) return;
            const top = t.getBoundingClientRect().top;
            if (top <= probe && top > bestTop) {
              bestTop = top;
              best = i;
            }
          });
          links.forEach((a, i) => {
            const on = i === best;
            a.classList.toggle("on", on);
            if (on) a.setAttribute("aria-current", "true");
            else a.removeAttribute("aria-current");
          });
          if (best > -1) {
            const bar = el.querySelector<HTMLElement>("#subnavIn");
            const active = links[best];
            if (bar && active) {
              const l = active.offsetLeft;
              const r = l + active.offsetWidth;
              if (l < bar.scrollLeft || r > bar.scrollLeft + bar.clientWidth) {
                bar.scrollTo({ left: Math.max(0, l - 24), behavior: "smooth" });
              }
            }
          }
        },
      });
    }, el);

    let resizeT: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = setTimeout(() => {
        setNavH();
        if (bars) layBars(bars);
        ScrollTrigger.refresh();
      }, 220);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeT);
      ctx.revert();
    };
  }, []);

  const showMap = (index: number) => {
    const p = MAP_POS[index];
    setMapOn(index);
    setMapRead({ t: p.t, b: p.b });
  };

  return (
    <main className="bsp" ref={root} id="top">
      <section className="hero panel panel--ink bsp-hero" id="hero">
        <div className="hero__bars" id="bspBars" aria-hidden="true" />
        <div className="wrap hero__inner">
          <nav className="crumb bsp-crumb" aria-label="Breadcrumb">
            <a href="/">13th Pencil</a>
            <span aria-hidden="true">/</span>
            <a href="/#capabilities">Capabilities</a>
            <span aria-hidden="true">/</span>
            <b>
              {page.number} — {page.practiceName}
            </b>
          </nav>
          <h1 className="h1 hero__h">
            <span className="bsp-line">
              <span>{page.heroLine1}</span>
            </span>
            <span className="bsp-line">
              <span>
                {page.heroLine2Before}
                <em>{page.heroEmphasis}</em>
                {page.heroLine2After}
              </span>
            </span>
          </h1>
          <p className="tick bsp-tick">{page.heroTick}</p>
          <div className="hero__row">
            <p className="hero__sub">{page.subcopy}</p>
          </div>
        </div>
      </section>

      <div className="subnav" id="subnav">
        <div className="wrap subnav__in" id="subnavIn">
          {SUBNAV.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <section className="sec panel panel--paper" id="heard">
        <div className="wrap">
          <div className="head">
            <h2 className="h2 bsp-reveal">
              <Breaks text={page.heardHeading} />
            </h2>
            <p className="note bsp-reveal" data-d="1">
              {page.heardNote}
            </p>
          </div>
          <div className="heard">
            {page.heard.map((item) => (
              <div key={item.quote} className={item.marked ? "hq hq--mark" : "hq"}>
                <p className="hq__q">
                  <Marked text={item.quote} />
                </p>
                <span className="hq__a">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec panel panel--ink" id="what">
        <div className="wrap">
          <div className="head">
            <h2 className="h2 bsp-reveal">
              <Breaks text={page.workHeading} />
            </h2>
            <p className="note bsp-reveal" data-d="1">
              {page.workNote}
            </p>
          </div>
          <div className="work">
            {page.workstreams.map((ws) => (
              <div key={ws.number} className={ws.odd ? "ws ws--odd" : "ws"}>
                <span className="ws__n">{ws.number}</span>
                <h3 className="ws__t">{ws.title}</h3>
                <p className="ws__d">{ws.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec panel panel--paper" id="map">
        <div className="wrap">
          <div className="head">
            <h2 className="h2 bsp-reveal">{page.mapHeading}</h2>
            <p className="note bsp-reveal" data-d="1">
              {page.mapNote}
            </p>
          </div>
          <div className="map">
            <div className="map__plot bsp-reveal">
              <div className="map__ys" aria-hidden="true">
                <span className="map__ylab map__ylab--hi">High distinctiveness</span>
                <span className="map__ylab map__ylab--lo">Low distinctiveness</span>
              </div>
              <div
                className="map__stage"
                role="group"
                aria-label="Positioning map. Select a position to read about it."
                onMouseLeave={() => {
                  setMapOn(null);
                  setMapRead(DEFAULT_MAP);
                }}
              >
                <span className="map__line map__line--h" aria-hidden="true" />
                <span className="map__line map__line--v" aria-hidden="true" />
                <span className="map__ring" aria-hidden="true" />
                <span className="map__ringlab" aria-hidden="true">
                  the cluster
                </span>
                {MAP_POS.map((p, i) => (
                  <button
                    key={`${p.x}-${p.y}`}
                    type="button"
                    className={`dot${p.odd ? " dot--odd" : ""}${mapOn === i ? " is-on" : ""}`}
                    style={{ left: `${p.x}%`, top: `${p.y}%` }}
                    aria-label={p.t}
                    onMouseEnter={() => showMap(i)}
                    onFocus={() => showMap(i)}
                    onClick={(e) => {
                      e.preventDefault();
                      showMap(i);
                    }}
                  />
                ))}
                {MAP_POS.filter((p) => p.odd).map((p) => (
                  <span key={`tag-${p.x}`} className="map__tag" style={{ left: `${p.x}%`, top: `${p.y}%` }}>
                    the 13th position
                  </span>
                ))}
              </div>
              <div className="map__xlabs" aria-hidden="true">
                <span>Category convention</span>
                <span>Own territory</span>
              </div>
            </div>
            <div className="map__side">
              <div className="map__read" aria-live="polite">
                <h3>{mapRead.t}</h3>
                <p>{mapRead.b}</p>
              </div>
              <p className="map__hint">{page.mapHint}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sec panel panel--ink" id="how">
        <div className="wrap">
          <div className="head">
            <h2 className="h2 bsp-reveal">{page.howHeading}</h2>
            <p className="note bsp-reveal" data-d="1">
              {page.howNote}
            </p>
          </div>
          <div className="steps">
            {page.steps.map((step) => (
              <div key={step.title} className="step">
                <span className="step__n">{step.label}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec panel panel--paper" id="get">
        <div className="wrap">
          <div className="head">
            <h2 className="h2 bsp-reveal">{page.getHeading}</h2>
            <p className="note bsp-reveal" data-d="1">
              {page.getNote}
            </p>
          </div>
          <div className="dels" id="dels">
            {page.deliverables.map((del) => (
              <div key={del.title} className="del">
                <button type="button" className="del__btn" aria-expanded="false">
                  <span className="del__t">{del.title}</span>
                  <span className="del__ic" aria-hidden="true" />
                </button>
                <div className="del__body">
                  <p>{del.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sec panel panel--ink" id="connects">
        <div className="wrap">
          <div className="head">
            <h2 className="h2 bsp-reveal">{page.connectsHeading}</h2>
            <p className="note bsp-reveal" data-d="1">
              {page.connectsNote}
            </p>
          </div>
          <div className="conn">
            {page.connects.map((cc) => (
              <a key={cc.name} className="cc" href={cc.href}>
                <span className="cc__n">{cc.number}</span>
                <h3 className="cc__t">
                  {cc.name} <span aria-hidden="true">→</span>
                </h3>
                <p className="cc__d">{cc.line}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sec panel panel--ink bsp-faq" id="faq">
        <div className="wrap">
          <div className="head">
            <h2 className="h2 bsp-reveal">
              <Breaks text={page.faqHeading} />
            </h2>
            <p className="note bsp-reveal" data-d="1">
              {page.faqNote}
            </p>
          </div>
          <div className="faqs" id="faqs">
            {page.faqs.map((faq) => (
              <div key={faq.question} className="faq">
                <button type="button" className="faq__btn" aria-expanded="false">
                  <span className="faq__q">{faq.question}</span>
                  <span className="faq__ic" aria-hidden="true">
                    +
                  </span>
                </button>
                <div className="faq__body">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta panel panel--ink" id="start">
        <div className="wrap">
          <h2 className="h1 cta__h">
            <span className="bsp-line">
              <span>{page.contactLine1}</span>
            </span>
            <span className="bsp-line">
              <span>{page.contactLine2}</span>
            </span>
          </h2>
          <div className="cta-row">
            <a className="btn" href={startProjectHref}>
              {settings.ctaLabel}
            </a>
            <a className="big-link" href={`mailto:${settings.primaryEmail}`}>
              {settings.primaryEmail}
            </a>
          </div>
          <SiteFooter settings={settings} />
        </div>
      </section>
    </main>
  );
}
