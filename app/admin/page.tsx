import Link from "next/link";
import { HOME_SECTIONS } from "@/lib/default-content";

export default function AdminDashboard() {
  return (
    <>
      <p className="admin__lede">
        Edit the public website copy without touching the animations. Each card opens one section of
        the homepage, plus site-wide settings and the 404 page.
      </p>
      <div className="admin__cards">
        <Link className="admin__card" href="/admin/settings">
          <strong>Site settings</strong>
          <span>SEO, emails, navigation, footer and loader caption.</span>
        </Link>
        {HOME_SECTIONS.map((section) => (
          <Link key={section.key} className="admin__card" href={`/admin/home/${section.key}`}>
            <strong>{section.label}</strong>
            <span>{section.hint}</span>
          </Link>
        ))}
        <Link className="admin__card" href="/admin/not-found">
          <strong>404 page</strong>
          <span>Heading, body and return button.</span>
        </Link>
      </div>
    </>
  );
}
