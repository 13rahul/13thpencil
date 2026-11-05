import type { SiteSettings } from "@/lib/types";
import { Lockup } from "./Lockup";

const navigate = [
  { href: "/", label: "Home" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/work", label: "Work" },
  { href: "/about/our-story", label: "About" },
  { href: "/principle", label: "Principle" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

const capabilities = [
  { href: "/capabilities/brand-and-strategy", label: "Brand & Strategy" },
  { href: "/capabilities/creative-studio", label: "Creative Studio" },
  { href: "/capabilities/ai-and-innovation", label: "AI & Innovation" },
  { href: "/capabilities/experiences", label: "Experiences" },
];

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="sfoot">
      <div className="sfoot__g">
        <div className="sfoot__brand">
          <a href="/" aria-label="13th Pencil, home">
            <Lockup />
          </a>
          <p>13th Pencil · A Creative & Innovation Company</p>
          <p>Bangalore, India</p>
          <a className="mail" href={`mailto:${settings.primaryEmail}`}>
            {settings.primaryEmail}
          </a>
        </div>
        <nav aria-label="Footer">
          <p className="sfoot__h">Navigate</p>
          {navigate.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <nav aria-label="Capabilities">
          <p className="sfoot__h">Capabilities</p>
          {capabilities.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          <span>
            Digital Growth <i className="soon">Coming soon</i>
          </span>
        </nav>
      </div>
      <div className="sfoot__base">
        <span>{settings.footerLegal || "© 2026 13th Pencil. All rights reserved."}</span>
        <button id="siteThemeBtn" type="button">
          {settings.invertLabel || "Invert"}
        </button>
      </div>
    </footer>
  );
}
