import type { SiteSettings } from "@/lib/types";
import { Lockup } from "./Lockup";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <div className="site-footer">
      <a href="/#top" aria-label="13th Pencil" className="site-footer__brand">
        <Lockup />
      </a>
      <span className="site-footer__legal">{settings.footerLegal}</span>
      <button id="siteThemeBtn" className="site-footer__theme" type="button">
        {settings.invertLabel}
      </button>
    </div>
  );
}
