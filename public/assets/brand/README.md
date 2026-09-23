# 13th Pencil — brand assets

All logo files here are **fully outlined vectors**. The wordmark's letterforms
have been converted to paths, so nothing depends on a font being installed.
They open and render correctly in any browser, vector editor or print workflow.

---

## The three assets

**Lockup** — symbol plus wordmark. The primary mark, and what the website header
uses. Default everywhere the brand is introduced.

**Symbol** — the framed shaft with the coral stroke leaving it. For the favicon,
social avatars, app icons and merchandise — places where the name is already
established. **It does not replace the wordmark in the website navigation.**

**Signature stroke** — the coral gesture on its own. An underline, a divider, a
mark on the one element that breaks a pattern. Never a substitute for the logo.

---

## Files

| File | Use |
|---|---|
| `13thpencil-lockup-paper.svg` | **Primary.** Paper lockup, coral stroke — for dark backgrounds |
| `13thpencil-lockup-graphite.svg` | Graphite lockup, coral stroke — for light backgrounds |
| `13thpencil-lockup-mono-paper.svg` | Single colour, light — engraving, one-colour print, signage |
| `13thpencil-lockup-mono-graphite.svg` | Single colour, dark — same |
| `13thpencil-wordmark-paper.svg` | Wordmark alone, light |
| `13thpencil-wordmark-graphite.svg` | Wordmark alone, dark |
| `13thpencil-symbol-paper.svg` | Symbol, light, coral stroke |
| `13thpencil-symbol-graphite.svg` | Symbol, dark, coral stroke |
| `13thpencil-symbol-mono-paper.svg` | Symbol, single colour light |
| `13thpencil-symbol-mono-graphite.svg` | Symbol, single colour dark |
| `13thpencil-signature-stroke.svg` | The coral gesture alone |
| `13thpencil-pencil-one.svg` | The drawn shaft that replaces the "1" |
| `favicon.svg` | Browser tab icon, vector |
| `favicon-32.png` | 32×32 fallback |
| `apple-touch-icon.png` | 180×180 iOS home screen |
| `icon-512.png` | 512×512 for the web manifest |

---

## Colours

| Name | Hex | Role |
|---|---|---|
| Graphite | `#181A1C` | The dark ground |
| Paper | `#EDE5D6` | The light ground |
| Eraser Coral | `#F4737E` | The stroke, and only the element that departs |
| Lacquer | `#F5B301` | Interaction and emphasis — **never in the logo** |

---

## Rules

**Minimum sizes.** Lockup: 180px wide on screen, 32mm in print. Below that, use
the symbol — the symbol is built to survive 16px. Never shrink the lockup past
its minimum to make it fit.

**Clear space.** Minimum 0.5× the symbol height on all four sides; 1× preferred.
Nothing enters it — no type, no rule, no image edge, no other logo.

**The stroke.** Always coral in both full-colour versions. It becomes a single
tone only when the whole mark does. Never a third colour of its own.

**On imagery.** Place the lockup on a plain area, or on a graphite scrim at 70%
or more. Never straight onto a busy or mid-tone photograph.

**Never:** rotate, skew or distort it; recolour the stroke; add shadows or
effects; reset the wordmark in another typeface; box it in a keyline; lock a
tagline or the company descriptor beneath it; alter the gap between symbol and
wordmark; or separate the symbol from the wordmark in primary use.

---

## Why the logo is inline SVG in the page

The website draws the lockup as inline SVG plus live text rather than loading
these files. That is deliberate: it inherits `currentColor`, so it flips with
the light/dark theme automatically, stays crisp at any size, and costs no extra
request.

These files exist for everything *outside* the website — decks, proposals,
print, merchandise, social profiles, partner and press use.

If you ever replace the inline version in `index.html`, match it against
`13thpencil-lockup-paper.svg`; the two were generated from the same geometry.

---

## Typefaces

The wordmark is set in **Bricolage Grotesque**, weight 800, tracked −0.04em,
with the "1" replaced by a drawn shaft. Body copy on the site uses
**Newsreader**.

Both are licensed under the **SIL Open Font License 1.1** — free for commercial
use, redistributable, no purchase required. Licence texts and the font files are
in `optional/self-hosted-fonts/` at the project root.

Because the files here are outlined, you do not need either font installed to
use them.
