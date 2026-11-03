import type { SiteSettings } from "@/lib/types";
import { Lockup } from "./Lockup";

const links = [
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/work", label: "Work" },
  { href: "/about/our-story", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
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
