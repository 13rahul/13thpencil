"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const path = usePathname();

  function itemClass(href: string, exact = false) {
    const active = exact ? path === href : path === href || path.startsWith(`${href}/`);
    return active ? "is-active" : undefined;
  }

  return (
    <aside className={open ? "admin__sidebar is-open" : "admin__sidebar"}>
      <div className="admin__brand">
        <span>13th Pencil</span>
        <button type="button" className="admin__menu" onClick={onClose} aria-label="Close menu">
          ×
        </button>
      </div>
      <nav className="admin__nav" onClick={onClose}>
        <Link href="/admin" className={itemClass("/admin", true)}>
          Dashboard
        </Link>
        <Link href="/admin/leads" className={itemClass("/admin/leads")}>
          Leads
        </Link>
        <Link href="/admin/settings" className={itemClass("/admin/settings", true)}>
          Site settings
        </Link>
        <p className="admin__group">Pages</p>
        <Link href="/admin/home" className={itemClass("/admin/home")}>
          Home page
        </Link>
        <Link
          href="/admin/capabilities/brand-and-strategy"
          className={itemClass("/admin/capabilities/brand-and-strategy", true)}
        >
          Brand &amp; Strategy
        </Link>
        <Link href="/admin/not-found" className={itemClass("/admin/not-found", true)}>
          404 page
        </Link>
      </nav>
      <div className="admin__foot">
        <Link href="/" className="admin__back">
          ← View site
        </Link>
      </div>
    </aside>
  );
}
