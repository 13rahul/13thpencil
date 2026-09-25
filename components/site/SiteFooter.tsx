import type { SiteSettings } from "@/lib/types";
import { Lockup } from "./Lockup";

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <div className="foot">
      <a href="/#top" aria-label="13th Pencil" className="bs-lockup">
        <Lockup />
      </a>
      <span>{settings.footerLegal}</span>
      <button id="themeBtn" type="button">
        {settings.invertLabel}
      </button>
    </div>
  );
}
