"use client";

import { useEffect, useRef, useState } from "react";
import type { BrandStrategyContent, SiteSettings } from "@/lib/types";
import { startProjectHref } from "@/lib/text";
import { SiteFooter } from "../SiteFooter";

function PinkMarks({ text }: { text: string }) {
  const parts = text.split(/(\*[^*]+\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("*") && part.endsWith("*") ? (
          <span key={i} className="pink">
            {part.slice(1, -1)}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

type ClaimItem = {
  el: HTMLSpanElement;
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  gx: number;
  gy: number;
  odd: boolean;
  plainW?: number;
  plainText?: string;
  oddW?: number;
  revealed?: boolean;
  ex?: number;
  ey?: number;
};

function clamp(v: number, a: number, b: number) {
  return v < a ? a : v > b ? b : v;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function ease(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function BrandStrategyScene({
  page,
  settings,
}: {
  page: BrandStrategyContent;
  settings: SiteSettings;
}) {
  const rootRef = useRef<HTMLElement | null>(null);
  const [lit, setLit] = useState(false);
  const [cycleWord, setCycleWord] = useState(page.cycleWords[0] || "innovative");
  const [cycleClass, setCycleClass] = useState("");

  useEffect(() => {
    requestAnimationFrame(() => setLit(true));
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const words = page.cycleWords?.length ? page.cycleWords : ["innovative"];
    if (reduce || words.length < 2) return;

    let ci = 0;
    const id = window.setInterval(() => {
      setCycleClass("cut");
      window.setTimeout(() => {
        ci = (ci + 1) % words.length;
        setCycleClass("wipe");
        window.setTimeout(() => {
          setCycleWord(words[ci]!);
          setCycleClass("");
        }, 170);
      }, 620);
    }, 2100);
    return () => clearInterval(id);
  }, [page.cycleWords]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
    const stage = root.querySelector<HTMLElement>("#bspStage");
    const scroller = root.querySelector<HTMLElement>("#bspScroller");
    const prog = root.querySelector<HTMLElement>("#bspProg");
    const hint = root.querySelector<HTMLElement>("#bspHint");
    const caps = Array.from(root.querySelectorAll<HTMLElement>(".bsp-cap"));
    const list = root.querySelector<HTMLElement>("#bspDoList");
    if (!stage || !scroller || !prog) return;

    let claims = (page.claims?.length ? page.claims : []).slice();
    const small = window.matchMedia("(max-width:760px)").matches;
    if (small) {
      claims = claims.slice().sort((a, b) => a.length - b.length).slice(0, 18);
    }
    const COUNT = small ? Math.min(18, claims.length) : claims.length;
    const COLS = small ? 3 : 5;
    let items: ClaimItem[] = [];
    let W = 0;
    let H = 0;
    const pointer = { x: -9999, y: -9999 };
    let p = 0;
    let raf = 0;
    let rb: number | undefined;

    function build() {
      stage!.querySelectorAll(".bsp-claim").forEach((n) => n.remove());
      items = [];
      W = stage!.clientWidth;
      H = stage!.clientHeight;
      const rows = Math.ceil(COUNT / COLS);
      const padX = Math.max(28, W * 0.07);
      const padY = Math.max(120, H * 0.2);
      const cw = (W - padX * 2) / COLS;
      const ch = (H - padY - H * 0.34) / rows;
      for (let i = 0; i < COUNT; i++) {
        const el = document.createElement("span");
        el.className = "bsp-claim";
        el.textContent = claims[i % claims.length]!;
        el.setAttribute("aria-hidden", "true");
        stage!.appendChild(el);
        const r = el.getBoundingClientRect();
        const gx = padX + (i % COLS) * cw + cw / 2;
        const gy = padY + Math.floor(i / COLS) * ch + ch / 2;
        items.push({
          el,
          w: r.width,
          h: r.height,
          x: Math.random() * (W - r.width) + r.width / 2,
          y: Math.random() * (H * 0.6 - r.height) + H * 0.16,
          vx: (Math.random() - 0.5) * 0.34,
          vy: (Math.random() - 0.5) * 0.34,
          gx,
          gy,
          odd: false,
        });
      }
      if (!items.length) return;
      const oddIdx = Math.min(
        items.length - 1,
        COLS * Math.floor(Math.ceil(COUNT / COLS) / 2) + Math.floor(COLS / 2),
      );
      const o = items[oddIdx]!;
      o.odd = true;
      o.plainW = o.w;
      o.plainText = o.el.textContent || "";
      o.el.classList.add("odd");
      o.el.textContent = "Unclaimed";
      const r2 = o.el.getBoundingClientRect();
      o.oddW = r2.width;
      o.h = r2.height;
      o.el.classList.remove("odd");
      o.el.textContent = o.plainText;
      o.revealed = false;
      o.w = o.plainW;
      o.ex = W - Math.max(40, W * 0.14) - o.oddW / 2;
      o.ey = Math.max(150, H * 0.24);
    }

    function readScroll() {
      const r = scroller!.getBoundingClientRect();
      const span = scroller!.offsetHeight - window.innerHeight;
      p = span > 0 ? clamp(-r.top / span, 0, 1) : 0;
      prog!.style.width = `${p * 100}%`;
      const phase = p < 0.3 ? 0 : p < 0.66 ? 1 : 2;
      caps.forEach((c, i) => {
        c.classList.toggle("on", i === phase && r.top < window.innerHeight * 0.6 && r.bottom > 0);
      });
      if (hint) hint.style.opacity = p < 0.22 ? "1" : "0";
    }

    function frame() {
      if (!document.hidden) {
        const vis = stage!.getBoundingClientRect();
        if (vis.bottom > 0 && vis.top < window.innerHeight) {
          const gridT = clamp((p - 0.24) / 0.16, 0, 1);
          const outT = clamp((p - 0.66) / 0.26, 0, 1);
          const gT = ease(gridT);
          const oT = ease(outT);
          for (let i = 0; i < items.length; i++) {
            const it = items[i]!;
            if (gT < 1) {
              it.x += it.vx;
              it.y += it.vy;
              if (it.x < it.w / 2 || it.x > W - it.w / 2) it.vx *= -1;
              if (it.y < it.h / 2 + 90 || it.y > H - it.h / 2 - H * 0.34) it.vy *= -1;
              if (pointer.x > -9000) {
                const dx = it.x - pointer.x;
                const dy = it.y - pointer.y;
                const d = Math.sqrt(dx * dx + dy * dy);
                if (d < 170 && d > 0.1) {
                  const f = (1 - d / 170) * 5.5;
                  it.x += (dx / d) * f;
                  it.y += (dy / d) * f;
                }
              }
            }
            let tx = lerp(it.x, it.gx, gT);
            let ty = lerp(it.y, it.gy, gT);
            let op = 1;
            let rot = 0;
            let sc = 1;
            if (it.odd) {
              const want = oT > 0.015;
              if (want !== it.revealed) {
                it.revealed = want;
                it.el.classList.toggle("odd", want);
                it.el.textContent = want ? "Unclaimed" : it.plainText || "";
                it.w = want ? it.oddW || it.w : it.plainW || it.w;
              }
              tx = lerp(tx, it.ex || tx, oT);
              ty = lerp(ty, it.ey || ty, oT);
              rot = oT * -8;
              sc = 1 + oT * 0.42;
            } else {
              op = 1 - oT * 0.76;
            }
            it.el.style.opacity = String(op);
            it.el.style.transform = `translate(${tx - it.w / 2}px,${ty - it.h / 2}px) rotate(${rot}deg) scale(${sc})`;
          }
        }
      }
      raf = requestAnimationFrame(frame);
    }

    build();

    const onResize = () => {
      clearTimeout(rb);
      rb = window.setTimeout(build, 250);
    };
    window.addEventListener("resize", onResize);

    let onMove: ((e: PointerEvent) => void) | undefined;
    let onLeave: (() => void) | undefined;
    if (fine && !reduce) {
      onMove = (e: PointerEvent) => {
        const r = stage!.getBoundingClientRect();
        pointer.x = e.clientX - r.left;
        pointer.y = e.clientY - r.top;
      };
      onLeave = () => {
        pointer.x = pointer.y = -9999;
      };
      stage.addEventListener("pointermove", onMove);
      stage.addEventListener("pointerleave", onLeave);
    }

    let onListEnter: (() => void) | undefined;
    let onListLeave: (() => void) | undefined;
    if (list && fine) {
      onListEnter = () => list.classList.add("dim");
      onListLeave = () => list.classList.remove("dim");
      list.addEventListener("pointerenter", onListEnter);
      list.addEventListener("pointerleave", onListLeave);
    }

    let ticking = false;
    const onScroll = () => {
      if (!reduce) readScroll();
      ticking = false;
    };
    const onScrollTick = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    };
    window.addEventListener("scroll", onScrollTick, { passive: true });

    if (reduce) {
      p = 1;
      readScroll();
      for (let k = 0; k < items.length; k++) {
        const it2 = items[k]!;
        const fx = it2.odd ? it2.ex || it2.gx : it2.gx;
        const fy = it2.odd ? it2.ey || it2.gy : it2.gy;
        if (it2.odd) {
          it2.el.classList.add("odd");
          it2.el.textContent = "Unclaimed";
          it2.w = it2.oddW || it2.w;
        }
        it2.el.style.opacity = it2.odd ? "1" : "0.24";
        it2.el.style.transform = `translate(${fx - it2.w / 2}px,${fy - it2.h / 2}px)${it2.odd ? " scale(1.4)" : ""}`;
      }
      caps[2]?.classList.add("on");
    } else {
      readScroll();
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScrollTick);
      if (onMove) stage.removeEventListener("pointermove", onMove);
      if (onLeave) stage.removeEventListener("pointerleave", onLeave);
      if (list && onListEnter) list.removeEventListener("pointerenter", onListEnter);
      if (list && onListLeave) list.removeEventListener("pointerleave", onListLeave);
      clearTimeout(rb);
      stage.querySelectorAll(".bsp-claim").forEach((n) => n.remove());
    };
  }, [page.claims]);

  const mail = `mailto:${settings.primaryEmail}?subject=${encodeURIComponent("Brand & Strategy — 13th Pencil")}`;

  return (
    <main
      className="bsp"
      id="top"
      ref={(node) => {
        rootRef.current = node;
      }}
    >
      <section className={`bsp-hero panel panel--ink${lit ? " lit" : ""}`} id="hero">
        <div className="wrap">
          <p className="bsp-eyebrow">
            <a href="/#capabilities">Capabilities</a>
            <span aria-hidden="true">/</span>
            <b>
              {page.number} — {page.practiceName}
            </b>
          </p>
          <h1>
            <span className="bsp-l1">{page.heroLine1}</span>
            <span className="bsp-l1">
              {page.heroSaysPrefix}{" "}
              <span className={`bsp-cyc ${cycleClass}`}>
                <span className="bsp-cyc__w">{cycleWord}</span>
                <span className="bsp-cyc__s" />
              </span>
            </span>
          </h1>
          <p className="bsp-hero__sub">{page.subcopy}</p>
        </div>
        <div className="bsp-scrollcue" aria-hidden="true">
          <i />
          <span>{page.scrollHint}</span>
        </div>
      </section>

      <div className="bsp-scroller" id="bspScroller">
        <div className="bsp-stage" id="bspStage">
          <div className="bsp-stage__prog" aria-hidden="true">
            <i id="bspProg" />
          </div>
          <p className="bsp-stage__hint" id="bspHint" aria-hidden="true">
            {page.stageHint}
          </p>
          <div className="bsp-stage__cap">
            {(page.captions || []).map((cap, i) => (
              <div key={i} className="bsp-cap" data-cap={i}>
                <h2>
                  <PinkMarks text={cap.heading} />
                </h2>
                <p>{cap.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="bsp-do panel panel--paper" id="do">
        <div className="wrap">
          <h2 className="bsp-do__h">{page.movesHeading}</h2>
          <div className="bsp-do__list" id="bspDoList">
            {(page.moves || []).map((move) => (
              <a key={move.number + move.title} className="bsp-row" href="#start">
                <span className="bsp-row__t">
                  <span className="bsp-row__n">{move.number}</span>
                  {move.title}
                </span>
                <span className="bsp-row__d">{move.detail}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bsp-next panel panel--ink">
        <div className="wrap">
          <h2 className="bsp-next__h">{page.nextHeading}</h2>
          <div className="bsp-next__g">
            {(page.connects || []).map((cc) => (
              <a key={cc.href} className="bsp-nx" href={cc.href}>
                <span className="bsp-nx__t">{cc.name}</span>
                <span className="bsp-nx__a" aria-hidden="true">
                  →
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="bsp-cta panel panel--ink" id="start">
        <div className="wrap">
          <h2>
            {page.contactLine1}
            <br />
            {page.contactLine2}
          </h2>
          <div className="cta-row">
            <a className="btn" href={startProjectHref}>
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
