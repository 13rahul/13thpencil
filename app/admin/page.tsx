import Link from "next/link";

export default function AdminDashboard() {
  return (
    <>
      <p className="admin__lede">
        Edit the public website copy without touching the animations. Open a page, then save.
      </p>
      <div className="admin__cards">
        <Link className="admin__card" href="/admin/leads">
          <strong>Leads</strong>
          <span>Briefs from the Start a project wizard.</span>
        </Link>
        <Link className="admin__card" href="/admin/settings">
          <strong>Site settings</strong>
          <span>SEO, emails, navigation, footer and loader caption.</span>
        </Link>
        <Link className="admin__card" href="/admin/home">
          <strong>Home page</strong>
          <span>Hero, capabilities, contact and the other homepage sections.</span>
        </Link>
        <Link className="admin__card" href="/admin/capabilities/brand-and-strategy">
          <strong>Brand &amp; Strategy</strong>
          <span>Practice page: hero, when people call, verbs, method, thinking.</span>
        </Link>
        <Link className="admin__card" href="/admin/not-found">
          <strong>404 page</strong>
          <span>Heading, body and return button.</span>
        </Link>
      </div>
    </>
  );
}
