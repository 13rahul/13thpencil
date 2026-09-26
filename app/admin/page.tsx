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
          <span>Hero cycle, claim field, five moves, next links and CTA.</span>
        </Link>
        <Link className="admin__card" href="/admin/about/our-story">
          <strong>About — Our Story</strong>
          <span>Film hero, founder letter and made-by-us section.</span>
        </Link>
        <Link className="admin__card" href="/admin/about/why-13th-pencil">
          <strong>About — Why 13th Pencil</strong>
          <span>Generator labels, turn copy and trio cards.</span>
        </Link>
        <Link className="admin__card" href="/admin/about/our-approach">
          <strong>About — Our Approach</strong>
          <span>Lab poster copy, buys cards and CTA.</span>
        </Link>
        <Link className="admin__card" href="/admin/not-found">
          <strong>404 page</strong>
          <span>Heading, body and return button.</span>
        </Link>
      </div>
    </>
  );
}
