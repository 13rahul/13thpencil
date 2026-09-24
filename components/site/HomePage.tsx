import type { SiteContent } from "@/lib/types";
import { Breaks, enquiryMailto, Marked } from "@/lib/text";
import { Lockup } from "./Lockup";

export function HomePage({ content }: { content: SiteContent }) {
  const { settings, hero, erase, principle, capabilities, comein, work, process, studio, contact } =
    content;
  const firstCap = capabilities.items[0];

  return (
    <>
      <div className="loader" id="loader" aria-hidden="true">
        <div className="loader__strokes" id="loaderStrokes" />
        <div className="loader__cap annot">{settings.loaderCaption}</div>
        <div className="loader__logo" id="loaderLogo">
          <Lockup />
        </div>
      </div>

      <canvas className="trail" id="trail" aria-hidden="true" />
      <div className="cursor" id="cursor" aria-hidden="true" />
      <div className="rail" aria-hidden="true">
        <span className="rail__fill" id="railFill" />
        <span className="rail__tip" id="railTip" />
      </div>

      <header className="nav" id="nav">
        <a className="nav__logo" href="#top" aria-label="13th Pencil, home">
          <Lockup />
        </a>
        <div className="nav__right">
          <nav className="nav__links" aria-label="Primary">
            {settings.navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="nav__cta" href="/start-a-project">
            {settings.ctaLabel}
          </a>
          <button
            className="nav__burger"
            id="burger"
            aria-expanded="false"
            aria-controls="menu"
            aria-label="Open menu"
          >
            <span />
          </button>
        </div>
      </header>

      <div className="menu" id="menu">
        {settings.navItems.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a className="menu__cta" href="/start-a-project">
          {settings.ctaLabel}
        </a>
        <p className="menu__foot">
          <a href={`mailto:${settings.primaryEmail}`}>{settings.primaryEmail}</a>
        </p>
        <p className="menu__desc">{settings.menuDesc}</p>
      </div>

      <main id="top">
        <section className="hero panel panel--ink" id="hero">
          <div className="hero__bars" id="heroBars" aria-hidden="true" />
          <div className="wrap hero__inner">
            <h1 className="display hero__h">
              <span className="ln">
                <span>
                  {hero.headlineLine1Before}
                  <em>{hero.headlineEmphasis}</em>
                  {hero.headlineLine1After}
                </span>
              </span>
              <span className="ln">
                <span>{hero.headlineLine2}</span>
              </span>
            </h1>
            <div className="hero__row">
              <p className="hero__sub rv">{hero.subcopy}</p>
              <div className="hero__scroll rv" data-d="2" aria-hidden="true">
                <i />
                <span className="annot">{hero.scrollHint}</span>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee panel--paper" aria-hidden="true">
          <div className="marquee__in" id="marquee" />
        </div>

        <section className="erase panel panel--paper" id="erase">
          <div className="wrap">
            <p className="annot rv" style={{ marginBottom: "2.2em" }}>
              {erase.annotation}
            </p>
            <div className="erase__stack">
              <span className="erase__old">
                {erase.struckLine}
                <span className="erase__rub" />
              </span>
              <span className="erase__new">{erase.replacementLine}</span>
            </div>
            <div className="erase__foot">
              {erase.paragraphs.map((p, i) => (
                <p key={i} className="rv" {...(i > 0 ? { "data-d": String(i) } : {})}>
                  {p}
                </p>
              ))}
              <p className="note rv" data-d="2">
                {erase.closingNote}
              </p>
            </div>
          </div>
        </section>

        <section className="principle panel panel--paper" id="principle">
          <div className="wrap">
            <div className="principle__head">
              <h2 className="h2 rv">
                <Breaks text={principle.heading} />
              </h2>
              <div>
                <p className="lede rv" data-d="1">
                  {principle.lede}
                </p>
                <p className="note rv" data-d="2">
                  {principle.note}
                </p>
              </div>
            </div>
            <div className="grid13" id="grid13" aria-hidden="true" />
          </div>
        </section>

        <section className="caps panel panel--ink" id="capabilities">
          <div className="wrap">
            <div className="principle__head">
              <h2 className="h2 rv">
                <Breaks text={capabilities.heading} />
              </h2>
              <p className="note rv" data-d="1">
                {capabilities.intro}
              </p>
            </div>
            <div className="caps__grid">
              <div role="tablist" aria-label="Capabilities" id="capList">
                {capabilities.items.map((item, i) => {
                  const href =
                    item.pageHref ||
                    (item.slug === "strategy" ? "/capabilities/brand-and-strategy" : undefined);
                  return (
                    <div
                      key={item.slug}
                      className="cap"
                      data-cap={item.slug}
                      role="tab"
                      tabIndex={0}
                      aria-selected={i === 0}
                      aria-controls="capStage"
                    >
                      <span className="cap__i">{item.number}</span>
                      <span className="cap__name">
                        {item.name}
                        {href ? (
                          <a className="cap__go" href={href} aria-label={`Open ${item.name}`}>
                            <svg viewBox="0 0 24 24" aria-hidden="true">
                              <path d="M7 17 L17 7" />
                              <path d="M10 7 H17 V14" />
                            </svg>
                          </a>
                        ) : null}
                      </span>
                      <span className="cap__body">
                        <span className="cap__for">{item.forLine}</span>
                        <p>{item.description}</p>
                      </span>
                    </div>
                  );
                })}
              </div>
              <figure className="caps__stage" id="capStage" role="tabpanel" style={{ margin: 0 }}>
                <canvas id="capCanvas" />
                <figcaption id="capCaption">{firstCap?.canvasCaption}</figcaption>
              </figure>
            </div>
          </div>
        </section>

        <section className="comein panel panel--ink" id="comein">
          <div className="wrap">
            <div className="principle__head">
              <h2 className="h2 rv">
                <Breaks text={comein.heading} />
              </h2>
              <p className="note rv" data-d="1">
                {comein.intro}
              </p>
            </div>
            <div className="comein__list">
              {comein.items.map((item, i) => (
                <div key={i} className={item.marked ? "ci ci--mark rv" : "ci rv"}>
                  <p className="ci__q">
                    &ldquo;
                    <Marked text={item.quote} />
                    &rdquo;
                  </p>
                  <span className="ci__a">
                    <b>
                      {item.answerHeading === firstCap?.name && firstCap?.pageHref ? (
                        <a href={firstCap.pageHref}>{item.answerHeading}</a>
                      ) : (
                        item.answerHeading
                      )}
                    </b>
                    {item.answerDetail}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="work panel panel--paper" id="work">
          <div className="wrap">
            <div className="principle__head">
              <h2 className="h2 rv">{work.heading}</h2>
              <p className="note rv" data-d="1">
                {work.intro}
              </p>
            </div>
            <div className="work__grid" id="workGrid">
              {work.tiles.map((tile) => (
                <a key={tile.title} className={`tile tile--${tile.variant}`} href={tile.link || "#contact"}>
                  <span className="tile__f">{tile.format}</span>
                  <span className="tile__ph">
                    {tile.status}
                    <em>{tile.description}</em>
                  </span>
                  <span className="tile__meta">
                    <span className="tile__t">{tile.title}</span>
                    <span className="tile__k">{tile.kind}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="process panel panel--ink" id="process">
          <svg
            className="process__line"
            id="processLine"
            viewBox="0 0 1200 600"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              id="processPath"
              d="M0 520 C 200 520, 240 120, 430 160 S 720 520, 900 300 S 1120 90, 1200 140"
            />
          </svg>
          <div className="wrap">
            <h2 className="h2 rv">{process.heading}</h2>
            <div className="steps">
              {process.steps.map((step, i) => (
                <div key={step.title} className="step rv" {...(i > 0 ? { "data-d": String(i) } : {})}>
                  <span className="step__n">{step.label}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="studio panel panel--paper" id="studio">
          <div className="wrap studio__grid">
            <div>
              <h2 className="h2 rv">
                <Breaks text={studio.heading} />
              </h2>
              {studio.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className="rv"
                  data-d={String(i + 1)}
                  style={i === 0 ? { marginTop: "1.6em" } : undefined}
                >
                  {p}
                </p>
              ))}
            </div>
            <div className="rv" data-d="1">
              <ul className="facts">
                {studio.facts.map((fact) => (
                  <li key={fact.label}>
                    <b>{fact.label}</b>
                    <span>{fact.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="contact panel panel--ink" id="contact">
          <div className="wrap">
            <h2 className="display contact__h">
              <span>{contact.headlineBefore}</span>
              <span>
                {contact.headlineMid}{" "}
                <span className="swap" id="swapWord">
                  {contact.swapPhrases[0]}
                </span>
                .
              </span>
            </h2>
            <div className="cta-row">
              <a className="btn" href={enquiryMailto()}>
                {contact.ctaLabel}
              </a>
              <a className="big-link" href={`mailto:${settings.primaryEmail}`}>
                {settings.primaryEmail}
              </a>
            </div>
            <div className="contact__cols">
              <div>
                <p className="note">
                  {contact.newBusinessLabel}
                  <br />
                  <a
                    href={`mailto:${settings.primaryEmail}`}
                    style={{ borderBottom: "1px solid var(--lacquer)" }}
                  >
                    {settings.primaryEmail}
                  </a>
                </p>
              </div>
              <div>
                <p className="note">
                  {contact.careersLabel}
                  <br />
                  <a
                    href={`mailto:${settings.careersEmail}`}
                    style={{ borderBottom: "1px solid var(--lacquer)" }}
                  >
                    {settings.careersEmail}
                  </a>
                </p>
              </div>
              <div>
                <p className="note">{contact.supportingNote}</p>
              </div>
            </div>
            <div className="foot">
              <a href="#top" aria-label="13th Pencil" style={{ fontSize: "1.15rem" }}>
                <Lockup />
              </a>
              <span>{settings.footerLegal}</span>
              <button id="themeBtn" style={{ borderBottom: "1px solid currentColor" }}>
                {settings.invertLabel}
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
