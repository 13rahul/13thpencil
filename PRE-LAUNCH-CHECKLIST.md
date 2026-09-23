# 13th Pencil — pre-launch checklist

Everything still needed before `13thpencil.com` goes public. Items are marked
**[YOU]** where 13th Pencil must supply information or make a decision, and
**[DEV]** where it is a developer task.

Only genuinely applicable items are listed. Nothing here is a placeholder
for its own sake.

---

## Blocking — the site should not go live without these

### 1. Email mailboxes  **[YOU]**
Two addresses are published on the page and both must receive mail:

- `hello@13thpencil.com` — new business, used by every "Start a project" CTA
- `people@13thpencil.com` — careers

Google Workspace, Fastmail, Zoho or your registrar's forwarding all work.
**A dead contact address on a creative company's homepage is worse than none.**

### 2. DNS and certificate  **[DEV]**
- Point `13thpencil.com` at the server
- Decide apex vs `www` as canonical and redirect the other
  (the sample configs assume apex; change them if you prefer `www`)
- Issue TLS and confirm `http://` redirects to `https://`
- If the canonical host changes, update the canonical link, `og:url`,
  `og:image`, `twitter:image`, `robots.txt` and `sitemap.xml`

### 3. Confirm the design on real devices  **[YOU + DEV]**
The build was verified by code review and measurement rather than by
being viewed on physical hardware. Before launch, open it on:

- A real phone (portrait and landscape)
- An iPad in portrait
- A laptop and a large desktop display

Check: the header lockup fits without crowding, the intro plays, capability
panels respond to tap, no horizontal scrolling, no clipped text.

---

## Strongly recommended before launch

### 4. Self-host the fonts  **[DEV]**
Files and instructions: `optional/self-hosted-fonts/`. A two-line change.

Removes the only third-party request the site makes, improves first paint, and
avoids the GDPR exposure of Google Fonts receiving visitor IP addresses — a live
issue in the EU and directly relevant if 13th Pencil works with European
clients. Verify rendering once after switching.

### 5. Replace the placeholder work  **[YOU]**
The "Selected thinking" section contains six honest placeholders describing
independent concepts, plus one frame reserved for the first client case study.
Nothing is fabricated and no fake clients exist.

This is the section most likely to be scrutinised by a prospect. Replace the
placeholders with real independent work as it is produced. The grid takes real
imagery without a redesign.

### 6. Privacy policy  **[YOU + DEV]**
Not legally required while the site sets no cookies, collects nothing and runs
no analytics — which is the current state. **Becomes required the moment
analytics is added** (item 8), and is expected by many corporate procurement
processes regardless.

If added, link it from the footer.

---

## Decisions you have not yet made

### 7. Social profiles  **[YOU]**
**No social links exist on the site.** None were invented. If 13th Pencil has or
wants LinkedIn, Instagram, Vimeo or Behance profiles, supply the URLs and they
can be added to the footer. Until then the footer is correct as it stands.

### 8. Analytics  **[YOU + DEV]**
Nothing is installed. No tracking, no cookies, no IDs.

A commented placeholder sits in `index.html` near the closing `</body>`. If you
want GA4, Tag Manager, Meta Pixel or LinkedIn Insight, paste the snippet there.

Two knock-on effects, both real:
- The sample CSP restricts scripts to `'self'`. The analytics host must be added
  explicitly or it will be blocked.
- Analytics sets cookies, which triggers the need for a consent banner and a
  privacy policy in the EU and UK.

Consider a cookieless analytics tool (Plausible, Fathom) if you want numbers
without the consent banner.

### 9. Contact form  **[YOU]**
There is currently no form — contact runs entirely through `mailto:` links, and
that is a deliberate, complete state rather than something half-built.

If you want a form instead, it is new work: a form endpoint, validation, spam
protection and a privacy notice. Decide before or after launch; the site is
fully functional without it.

### 10. Copy and legal details  **[YOU]**
- The footer reads "© 2026 13th Pencil — a creative and innovation company.
  Provisional identity; independent work in progress." Update when the identity
  is no longer provisional.
- No company registration number, VAT number or registered address appears
  anywhere. If 13th Pencil is a registered entity, some jurisdictions require
  these in the footer or an imprint page. Supply them if applicable.
- No office locations, phone numbers, client names, awards or statistics were
  invented anywhere on the site.

---

## Operational notes for the developer

### 11. Cache busting  **[DEV]**
`assets/css/styles.css` and `assets/js/site.js` are not fingerprinted, and the
sample configs cache them for 30 days. When deploying a change to either, rename
the files, purge the cache, or shorten that window. This is the one operational
gotcha in the project.

### 12. Security headers  **[DEV]**
Both sample configs ship a Content-Security-Policy that allows only `'self'`
plus the Google Fonts hosts. If you self-host the fonts (item 4), tighten it
further by removing `fonts.googleapis.com` and `fonts.gstatic.com`. If you add
analytics, widen it deliberately rather than removing it.

### 13. Search Console and indexing  **[DEV]**
- Submit `https://13thpencil.com/sitemap.xml` to Google Search Console
- Update `<lastmod>` in `sitemap.xml` when the content changes materially
- Confirm the social card renders correctly in the LinkedIn Post Inspector and
  Facebook Sharing Debugger before announcing the site

### 14. Outlined logo files  **[DEV / designer]**
The logo files in `assets/brand/` are fully outlined vectors with no font
dependency, so they open correctly anywhere. If a print supplier asks for a
different format (EPS, PDF, or a specific spot colour build), those are
straightforward conversions from the supplied SVGs.

---

## Not required

For the avoidance of doubt, none of the following apply to this site in its
current form:

- No environment variables, API keys, tokens or secrets
- No backend, database, runtime or application server
- No cookie banner while no analytics is installed
- No build step, package installation or CI pipeline
- No CDN required, though one will not hurt
- No npm dependencies to audit or update
