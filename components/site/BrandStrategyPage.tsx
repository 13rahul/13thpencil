import type { SiteContent } from "@/lib/types";
import { Lockup } from "./Lockup";
import { BrandStrategyScene } from "./brand-strategy/BrandStrategyScene";

const HOME_NAV = [
  { label: "Principle", href: "/#principle" },
  { label: "Capabilities", href: "/#capabilities" },
  { label: "Where we help", href: "/#comein" },
  { label: "Thinking", href: "/#work" },
  { label: "Studio", href: "/#studio" },
];

export function BrandStrategyPage({ content }: { content: SiteContent }) {
  const { settings, brandStrategy } = content;

  return (
    <>
      <canvas className="trail" id="trail" aria-hidden="true" />
      <div className="cursor" id="cursor" aria-hidden="true" />
      <header className="nav on-paper" id="nav">
        <a className="nav__logo" href="/" aria-label="13th Pencil, home">
          <Lockup />
        </a>
        <div className="nav__right">
          <nav className="nav__links" aria-label="Primary">
            {HOME_NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="nav__cta" href="/start-a-project">
            {settings.ctaLabel}
          </a>
          <button className="nav__burger" id="burger" aria-expanded="false" aria-controls="menu" aria-label="Open menu">
            <span />
          </button>
        </div>
      </header>

      <div className="menu" id="menu">
        {HOME_NAV.map((item) => (
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

      <BrandStrategyScene page={brandStrategy} settings={settings} />
    </>
  );
}
