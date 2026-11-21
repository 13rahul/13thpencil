from pathlib import Path
import re

root = Path(r"D:\New folder\htdocs\13thpencil\public\_handoff")
files = sorted(
    list(root.glob("*.html"))
    + list((root / "capabilities").glob("*.html"))
    + list((root / "work").glob("*.html"))
)

CSS = r"""
.nav__item{position:relative;display:flex;align-items:center}
.nav__item:hover::before,.nav__item.is-open::before,.nav__item:focus-within::before{
  content:"";position:absolute;left:-16px;right:-16px;top:100%;height:22px;z-index:69}
.nav__trigger{position:relative;padding:4px 0;border:0;background:none;color:inherit;cursor:pointer;
  font-family:var(--f-display);font-weight:600;font-size:.9rem;letter-spacing:-.01em;line-height:inherit}
.nav__trigger::after{content:"";position:absolute;left:0;bottom:0;height:2px;width:100%;background:var(--lacquer);transform:scaleX(0);transform-origin:right;transition:transform .45s var(--ease-out)}
.nav__item:hover .nav__trigger::after,.nav__item:focus-within .nav__trigger::after,.nav__item.is-open .nav__trigger::after,.nav__item.is-current .nav__trigger::after{transform:scaleX(1);transform-origin:left}
.nav__drop{position:absolute;top:100%;left:50%;transform:translateX(-50%);min-width:240px;padding:14px 0 10px;color:var(--paper);
  opacity:0;visibility:hidden;pointer-events:none;transition:opacity .2s var(--ease),visibility .2s;z-index:70}
.nav__drop-in{background:var(--ink);border:1px solid var(--rule-on-ink);box-shadow:0 18px 40px rgba(0,0,0,.28);padding:10px 0}
.nav__item:hover .nav__drop,.nav__item:focus-within .nav__drop,.nav__item.is-open .nav__drop{opacity:1;visibility:visible;pointer-events:auto}
.nav__drop a,.nav__drop .nav-soon{display:flex;align-items:center;gap:.55em;padding:.55em 1.1em;font-family:var(--f-display);font-weight:600;font-size:.88rem;
  letter-spacing:-.01em;color:var(--dim-2);white-space:nowrap;transition:color .25s,background .25s}
.nav__drop a::after{display:none}
.nav__drop a:hover,.nav__drop a:focus-visible,.nav__drop a[aria-current]{color:var(--paper);background:rgba(237,229,214,.06)}
.nav__drop .nav-soon{cursor:default}
.nav__drop .nav-soon i{display:inline-block;font-style:normal;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;
  border:1px solid currentColor;border-radius:99px;padding:.28em .55em;line-height:1}
@media (hover:none){
  .nav__item:hover .nav__drop{opacity:0;visibility:hidden;pointer-events:none}
  .nav__item.is-open .nav__drop,.nav__item:focus-within .nav__drop{opacity:1;visibility:visible;pointer-events:auto}
}
.menu__fold{display:flex;flex-direction:column}
.menu__fold-btn{display:flex;align-items:center;justify-content:space-between;gap:1rem;width:100%;
  font-family:var(--f-display);font-weight:800;font-size:clamp(2rem,8.4vw,4.6rem);line-height:1.04;letter-spacing:-.04em;
  text-transform:uppercase;padding:.1em 0;color:inherit;background:none;border:0;text-align:left;cursor:pointer}
.menu__fold-btn:hover{color:var(--lacquer)}
.menu__fold-btn.is-current{color:var(--lacquer)}
.menu__fold-caret{display:inline-block;width:.42em;height:.42em;border-right:2px solid currentColor;border-bottom:2px solid currentColor;
  transform:rotate(45deg) translateY(-.12em);transition:transform .25s var(--ease);flex-shrink:0}
.menu__fold-btn[aria-expanded="true"] .menu__fold-caret{transform:rotate(-135deg) translateY(.08em)}
.menu__fold-list{display:none;flex-direction:column;padding:.15em 0 .35em}
.menu__fold-list.is-open{display:flex}
.menu a.menu__sub,.menu span.menu__sub{font-size:clamp(1.05rem,3.4vw,1.6rem);color:var(--dim-2);padding-left:1.4em;text-transform:none;
  font-weight:600;letter-spacing:-.02em;line-height:1.2}
.menu a.menu__sub:hover{color:var(--lacquer);padding-left:1.5em}
.menu span.menu__soon{display:flex;align-items:center;flex-wrap:wrap;gap:.45em;cursor:default}
.menu span.menu__soon i{display:inline-block;font-style:normal;font-size:.58rem;letter-spacing:.14em;text-transform:uppercase;
  border:1px solid currentColor;border-radius:99px;padding:.28em .55em;line-height:1}
"""

JS = r"""
  function closeNavDrops(except){
    Array.prototype.forEach.call(document.querySelectorAll("[data-nav-drop].is-open"), function(item){
      if(except && item === except) return;
      item.classList.remove("is-open");
      var b = item.querySelector("[aria-expanded]");
      if(b) b.setAttribute("aria-expanded", "false");
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll("[data-nav-drop]"), function(item){
    var btn = item.querySelector("button");
    if(!btn) return;
    btn.addEventListener("click", function(e){
      e.preventDefault();
      e.stopPropagation();
      var open = !item.classList.contains("is-open");
      closeNavDrops(open ? item : null);
      item.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("click", function(e){
    if(!e.target.closest("[data-nav-drop]")) closeNavDrops();
  });
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape") closeNavDrops();
  });
  Array.prototype.forEach.call(document.querySelectorAll("[data-nav-fold]"), function(fold){
    var btn = fold.querySelector("button");
    var list = fold.querySelector(".menu__fold-list");
    if(!btn || !list) return;
    btn.addEventListener("click", function(){
      var open = !list.classList.contains("is-open");
      list.classList.toggle("is-open", open);
      btn.setAttribute("aria-expanded", String(open));
    });
  });
"""

ACTIVE = {
    "brand-and-strategy.html": "/capabilities/brand-and-strategy",
    "creative-studio.html": "/capabilities/creative-studio",
    "ai-and-innovation.html": "/capabilities/ai-and-innovation",
    "experiences.html": "/capabilities/experiences",
}

CAP_LINKS = [
    ("/capabilities/brand-and-strategy", "Brand &amp; Strategy"),
    ("/capabilities/creative-studio", "Creative Studio"),
    ("/capabilities/ai-and-innovation", "AI &amp; Innovation"),
    ("/capabilities/experiences", "Experiences"),
]


def desk_html(current=False, active_href=None):
    cur_attr = ' aria-current="page"' if current else ""
    item_cls = "nav__item is-current" if current else "nav__item"
    items = []
    for href, label in CAP_LINKS:
        ac = ' aria-current="page"' if active_href == href else ""
        items.append(f'            <a role="menuitem" href="{href}"{ac}>{label}</a>')
    body = "\n".join(items)
    return f"""      <div class="{item_cls}" data-nav-drop>
        <button type="button" class="nav__trigger"{cur_attr} aria-expanded="false" aria-haspopup="true" aria-controls="capDrop">Capabilities</button>
        <div class="nav__drop" id="capDrop">
          <div class="nav__drop-in" role="menu">
{body}
          </div>
        </div>
      </div>"""


def mobile_html(current=False, active_href=None):
    cur_cls = "menu__fold-btn is-current" if current else "menu__fold-btn"
    items = []
    for href, label in CAP_LINKS:
        ac = ' aria-current="page"' if active_href == href else ""
        items.append(f'    <a class="menu__sub" href="{href}"{ac}>{label}</a>')
    body = "\n".join(items)
    return f"""  <div class="menu__fold" data-nav-fold>
    <button type="button" class="{cur_cls}" aria-expanded="false" aria-controls="capMenuList">Capabilities<span class="menu__fold-caret" aria-hidden="true"></span></button>
    <div class="menu__fold-list" id="capMenuList">
{body}
    </div>
  </div>"""


def inject_js(text: str) -> str:
    if "closeNavDrops" in text:
        return text
    patterns = [
        r'  var burger = \$\("#burger"\), menu = \$\("#menu"\);',
        r'  var burger=\$\("#burger"\), menu=\$\("#menu"\);',
        r'  var b=\$\("#burger"\),m=\$\("#menu"\);',
    ]
    for pat in patterns:
        m = re.search(pat, text)
        if m:
            return text[: m.start()] + JS + "\n" + text[m.start() :]
    raise SystemExit("no js marker")


for path in files:
    text = path.read_text(encoding="utf-8")
    name = path.name
    active = ACTIVE.get(name)
    is_cap = active is not None

    if "data-nav-drop" in text and "closeNavDrops" in text:
        print("ok already", path.relative_to(root))
        continue

    if ".nav__item{" not in text:
        m = re.search(r"@media \(max-width:1080px\)\{\.nav__links\{display:none\}", text)
        if not m:
            raise SystemExit(f"no css anchor in {path}")
        text = text[: m.start()] + CSS + "\n" + text[m.start() :]

    if "data-nav-drop" not in text:
        desk_pat = re.compile(r'      <a href="/#capabilities"( aria-current="page")?>Capabilities</a>\n')
        desk_matches = list(desk_pat.finditer(text))
        if not desk_matches:
            raise SystemExit(f"no desktop cap link in {path}")
        first = desk_matches[0]
        text = text[: first.start()] + desk_html(current=is_cap, active_href=active) + "\n" + text[first.end() :]

        mob_pat = re.compile(
            r'(<div class="menu" id="menu">\n)  <a href="/#capabilities"( aria-current="page")?>Capabilities</a>\n'
        )
        if not mob_pat.search(text):
            raise SystemExit(f"no mobile cap link in {path}")
        text = mob_pat.sub(r"\1" + mobile_html(current=is_cap, active_href=active) + "\n", text, count=1)

    try:
        text = inject_js(text)
    except SystemExit:
        raise SystemExit(f"no js marker in {path}")

    path.write_text(text, encoding="utf-8")
    print("updated", path.relative_to(root))

print("done", len(files))
