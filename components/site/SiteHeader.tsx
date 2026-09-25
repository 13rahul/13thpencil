import type { SiteSettings } from "@/lib/types";
import { Lockup } from "./Lockup";

function href(path: string) {
  return path.startsWith("#") ? `/${path}` : path;
}

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  return (
    <>
      <canvas className="trail" id="trail" aria-hidden="true" />
      <div className="cursor" id="cursor" aria-hidden="true" />
      <div className="rail" aria-hidden="true">
        <span className="rail__fill" id="railFill" />
        <span className="rail__tip" id="railTip" />
      </div>

      <header className="nav" id="nav">
        <a className="nav__logo" href="/#top" aria-label="13th Pencil, home">
          <Lockup />
        </a>
        <div className="nav__right">
          <nav className="nav__links" aria-label="Primary">
            {settings.navItems.map((item) => (
              <a key={item.href} href={href(item.href)}>
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
        {settings.navItems.map((item) => (
          <a key={item.href} href={href(item.href)}>
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
    </>
  );
}
