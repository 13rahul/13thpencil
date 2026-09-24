"use client";

import { usePathname, useRouter } from "next/navigation";
import { HOME_SECTIONS } from "@/lib/default-content";

const TITLES: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/leads": "Leads",
  "/admin/settings": "Site settings",
  "/admin/home": "Home page",
  "/admin/not-found": "404 page",
  "/admin/capabilities/brand-and-strategy": "Brand & Strategy",
};

export function Topbar({
  email,
  onMenu,
}: {
  email: string;
  onMenu: () => void;
}) {
  const path = usePathname();
  const router = useRouter();
  const section = HOME_SECTIONS.find((item) => path === `/admin/home/${item.key}`);
  const title = section
    ? `Home page — ${section.label}`
    : path.startsWith("/admin/leads/")
      ? "Lead"
      : TITLES[path] || "Admin";

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="admin__top">
      <div className="admin__top-actions">
        <button type="button" className="admin__menu" onClick={onMenu} aria-label="Open menu">
          Menu
        </button>
        <h1>{title}</h1>
      </div>
      <div className="admin__top-actions">
        <span className="admin__email">{email}</span>
        <button type="button" className="admin__btn admin__btn--ghost" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
}
