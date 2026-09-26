import type { ReactNode } from "react";
import type { SiteSettings } from "@/lib/types";
import { AboutMobileGroup } from "./AboutMobileGroup";
import { AboutNavItem } from "./AboutNavItem";
import { Lockup } from "./Lockup";

function href(path: string) {
  return path.startsWith("#") ? `/${path}` : path;
}

function isCapabilities(label: string) {
  return /capabilities/i.test(label);
}

export function SiteHeader({ settings }: { settings: SiteSettings }) {
  const desktopLinks: ReactNode[] = [];
  let aboutInDesktop = false;
  for (const item of settings.navItems) {
    if (!aboutInDesktop && isCapabilities(item.label)) {
      desktopLinks.push(<AboutNavItem key="about" />);
      aboutInDesktop = true;
    }
    desktopLinks.push(
      <a key={item.href} href={href(item.href)}>
        {item.label}
      </a>,
    );
  }
  if (!aboutInDesktop) desktopLinks.unshift(<AboutNavItem key="about" />);

  const mobileLinks: ReactNode[] = [];
  let aboutInMobile = false;
  for (const item of settings.navItems) {
    if (!aboutInMobile && isCapabilities(item.label)) {
      mobileLinks.push(<AboutMobileGroup key="about" />);
      aboutInMobile = true;
    }
    mobileLinks.push(
      <a key={item.href} href={href(item.href)}>
        {item.label}
      </a>,
    );
  }
  if (!aboutInMobile) {
    mobileLinks.unshift(<AboutMobileGroup key="about" />);
  }

  return (
    <>
      <canvas className="trail" id="trail" aria-hidden="true" />
      <div className="cursor" id="cursor" aria-hidden="true" />
      <div className="rail" aria-hidden="true">
        <span className="rail__fill" id="railFill" />
        <span className="rail__tip" id="railTip" />
      </div>

      <header className="site-header" id="siteHeader">
        <a className="site-header__logo" href="/#top" aria-label="13th Pencil, home">
          <Lockup />
        </a>
        <div className="site-header__right">
          <nav className="site-header__links" aria-label="Primary">
            {desktopLinks}
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
        {mobileLinks}
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
