"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ABOUT_LINKS } from "./about/about-links";

export function AboutNavItem() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number>(0);
  const menuId = useId();
  const onAbout = pathname?.startsWith("/about") ?? false;

  function openMenu() {
    window.clearTimeout(closeTimer.current);
    setOpen(true);
  }

  function scheduleClose() {
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpen(false), 160);
  }

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div
      className={`site-header__item${open ? " is-open" : ""}${onAbout ? " is-current" : ""}`}
      ref={rootRef}
      onMouseEnter={openMenu}
      onMouseLeave={scheduleClose}
    >
      <a
        href="/about/our-story"
        className="site-header__about"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onFocus={openMenu}
      >
        About
      </a>
      <div className="site-header__drop" id={menuId} role="menu">
        <div className="site-header__drop-in">
          {ABOUT_LINKS.map((link) => (
            <a
              key={link.href}
              role="menuitem"
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
