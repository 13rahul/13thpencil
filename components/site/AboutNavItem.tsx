"use client";

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ABOUT_LINKS } from "./about/about-links";

export function AboutNavItem() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const onAbout = pathname?.startsWith("/about") ?? false;

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
    };
  }, []);

  return (
    <div
      className={`site-header__item${open ? " is-open" : ""}${onAbout ? " is-current" : ""}`}
      ref={rootRef}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <a
        href="/about/our-story"
        className="site-header__about"
        aria-haspopup="true"
        aria-expanded={open}
        aria-controls={menuId}
        onFocus={() => setOpen(true)}
      >
        About
      </a>
      <div className="site-header__drop" id={menuId} role="menu">
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
  );
}
