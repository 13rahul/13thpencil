import type { SiteSettings } from "@/lib/types";
import { Lockup } from "./Lockup";

const links = [
  { href: "/work", label: "Work" },
  { href: "/about/our-story", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

const capabilityLinks = [
  { href: "/capabilities/brand-and-strategy", label: "Brand & Strategy" },
  { href: "/capabilities/creative-studio", label: "Creative Studio" },
  { href: "/capabilities/ai-and-innovation", label: "AI & Innovation" },
  { href: "/capabilities/experiences", label: "Experiences" },
];

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <>
      <canvas className="trail" id="trail" aria-hidden="true" />
      <div className="cursor" id="cursor" aria-hidden="true" />
      <div className="rail" aria-hidden="true">
        <span className="rail__fill" id="railFill" />
        <span className="rail__tip" id="railTip" />
      </div>

      <header className="site-header" id="siteHeader">
        <a className="site-header__logo" href="/" aria-label="13th Pencil, home">
          <Lockup />
        </a>
        <div className="site-header__right">
          <nav className="site-header__links" aria-label="Primary">
            <div className="site-header__item" data-nav-drop>
              <button
                type="button"
                className="site-header__about"
                aria-expanded="false"
                aria-haspopup="true"
                aria-controls="capDrop"
              >
                Capabilities
              </button>
              <div className="site-header__drop" id="capDrop">
                <div className="site-header__drop-in" role="menu">
                  {capabilityLinks.map((item) => (
                    <a key={item.href} role="menuitem" href={item.href}>
                      {item.label}
                    </a>
                  ))}
                  <span className="site-header__soon">
                    Digital Growth <i>Coming soon</i>
                  </span>
                </div>
              </div>
            </div>
            {links.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="site-header__cta" href="/start-a-project">
            {settings.ctaLabel}
          </a>
          <button
            className="site-header__burger"
            id="siteBurger"
            aria-expanded="false"
            aria-controls="siteMenu"
            aria-label="Open menu"
          >
            <span />
          </button>
        </div>
      </header>

      <div className="site-menu" id="siteMenu">
        <div className="site-menu__about" data-nav-fold>
          <button
            type="button"
            className="site-menu__about-btn"
            aria-expanded="false"
            aria-controls="siteCapList"
          >
            Capabilities
            <span className="site-menu__about-caret" aria-hidden="true" />
          </button>
          <div className="site-menu__about-list" id="siteCapList">
            {capabilityLinks.map((item) => (
              <a key={item.href} className="site-menu__sub" href={item.href}>
                {item.label}
              </a>
            ))}
            <span className="site-menu__sub site-menu__soon">
              Digital Growth <i>Coming soon</i>
            </span>
          </div>
        </div>
        {links.map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
        <a className="site-menu__cta" href="/start-a-project">
          {settings.ctaLabel}
        </a>
        <p className="site-menu__meta">
          <a href={`mailto:${settings.primaryEmail}`}>{settings.primaryEmail}</a>
        </p>
        <p className="site-menu__desc">{settings.menuDesc}</p>
      </div>
    </>
  );
}
