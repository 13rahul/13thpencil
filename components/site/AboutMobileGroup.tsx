"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { ABOUT_LINKS } from "./about/about-links";

export function AboutMobileGroup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const listId = useId();
  const onAbout = pathname?.startsWith("/about") ?? false;

  useEffect(() => {
    const menu = document.getElementById("siteMenu");
    if (!menu) return;

    function syncClosed() {
      if (!menu?.classList.contains("is-open")) setOpen(false);
    }

    const observer = new MutationObserver(syncClosed);
    observer.observe(menu, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="site-menu__about">
      <button
        type="button"
        className={`site-menu__about-btn${onAbout ? " is-current" : ""}`}
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        About
        <span className="site-menu__about-caret" aria-hidden="true" />
      </button>
      <div id={listId} className={`site-menu__about-list${open ? " is-open" : ""}`} hidden={!open}>
        {ABOUT_LINKS.map((link) => (
          <a key={link.href} className="site-menu__sub" href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
    </div>
  );
}
