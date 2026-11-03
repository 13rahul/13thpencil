# 13th Pencil Blog theme — setup checklist

Child theme path in this repo: `wordpress/13thpencil-blog/`

Upload zip (from repo root after packaging): `wordpress/13thpencil-blog.zip`

## Before you start

1. Keep **Astra** installed and active as the parent theme.
2. You need WP Admin access on https://blog.13thpencil.com

## Install

1. In WP Admin go to **Appearance → Themes → Add New → Upload Theme**.
2. Upload `13thpencil-blog.zip`.
3. Click **Activate** for **13th Pencil Blog**.
4. If upload is blocked, unzip and copy the `13thpencil-blog` folder to:
   `wp-content/themes/13thpencil-blog/` via Hostinger File Manager or SFTP, then activate it.

## Astra Customizer (quick pass)

**Appearance → Customize**

1. **Header Builder / Header**: leave empty or disable extra rows — the child theme replaces the header.
2. **Footer Builder / Footer**: same — child theme replaces the footer.
3. **Global → Colors**
   - Theme Color / Link: `#AE3450` (eraser-deep) or `#181A1C`
   - Text: `#181A1C`
   - Background: `#EDE5D6`
4. **Global → Typography**
   - Body: Newsreader (or leave default; child CSS forces Newsreader)
   - Headings: Bricolage Grotesque (or leave default; child CSS forces it)
5. **Blog → Blog / Archive**
   - Prefer a clean list (title, meta, excerpt) without heavy card shadows
6. **Site Identity**
   - Site title can stay “13th Pencil” or “Blog”
   - Logo is not required — the child theme draws the lockup and links to https://13thpencil.com

## Cache

1. Hostinger / LiteSpeed: purge all caches after activating.
2. Hard-refresh the blog once (`Ctrl+Shift+R`).

## What you should see

- Paper background (`#EDE5D6`), ink text
- Header lockup + About / Capabilities / Blog / Start a project
- About dropdown to main-site About pages
- Blog link marked current
- Footer lockup + legal line
- Posts still edited and listed with normal WordPress / Astra templates

## Optional later

- Add a “Blog” item on the main Next.js site header pointing to https://blog.13thpencil.com
- Submit https://blog.13thpencil.com/sitemap_index.xml (or Yoast/Rank Math sitemap) in Google Search Console for the blog property
