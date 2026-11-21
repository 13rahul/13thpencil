from pathlib import Path

path = Path(r"D:\New folder\htdocs\13thpencil\public\_handoff\work.html")
text = path.read_text(encoding="utf-8")

NEW_CSS = r"""/* ---------- compact case study cards + service filter ---------- */
.cases{padding-top:clamp(20px,3.5vh,40px);padding-bottom:clamp(50px,9vh,100px)}
.wfilt{display:flex;flex-wrap:wrap;gap:4px clamp(14px,2.4vw,28px);align-items:center;
  margin:0 0 clamp(22px,4vh,40px);padding-bottom:clamp(14px,2vh,22px);border-bottom:1px solid var(--rule-on-ink)}
.wfilt__lab{font-family:var(--f-display);font-weight:600;font-size:.7rem;letter-spacing:.18em;
  text-transform:uppercase;color:var(--dim-2);margin-right:clamp(4px,1vw,12px)}
.wfilt button{appearance:none;border:0;background:none;cursor:pointer;padding:6px 0;color:var(--dim-2);
  font-family:var(--f-display);font-weight:600;font-size:.92rem;letter-spacing:-.01em;position:relative;
  transition:color .3s}
.wfilt button::after{content:"";position:absolute;left:0;right:0;bottom:-1px;height:2px;background:var(--eraser);
  transform:scaleX(0);transform-origin:left;transition:transform .35s var(--ease-out)}
.wfilt button:hover{color:var(--paper)}
.wfilt button[aria-pressed="true"]{color:var(--paper)}
.wfilt button[aria-pressed="true"]::after{transform:scaleX(1)}
.wfilt button:focus-visible{outline:2px solid var(--lacquer);outline-offset:4px}
.cases__g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(16px,2.6vw,28px)}
.cs{display:flex;flex-direction:column;min-width:0;color:inherit;background:var(--ink-2);text-decoration:none;
  transition:transform .45s var(--ease-out),opacity .35s,background .35s}
.cs.is-hide{display:none}
.cs:hover{transform:translateY(-3px)}
.cs__m{position:relative;aspect-ratio:2/1;overflow:hidden;background:#111}
.cs__m img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.1s var(--ease-out)}
.cs:hover .cs__m img{transform:scale(1.035)}
.cs__b{padding:clamp(14px,1.6vw,20px);display:flex;flex-direction:column;gap:.35em;flex:1}
.cs__k{font-family:var(--f-display);font-weight:600;font-size:.66rem;letter-spacing:.16em;text-transform:uppercase;color:var(--lacquer)}
.cs h2{font-family:var(--f-display);font-weight:800;font-size:clamp(1.15rem,1.7vw,1.55rem);letter-spacing:-.04em;
  line-height:.96;text-transform:uppercase;margin:0}
.cs p{font-family:var(--f-text);font-size:.92rem;line-height:1.45;color:var(--dim);margin:0;max-width:34ch}
.cs__go{margin-top:auto;padding-top:.7em;font-family:var(--f-display);font-weight:800;font-size:.86rem;
  border-bottom:2px solid var(--eraser);width:max-content}
.cs--bm .cs__m{background:#14150F}
.cs--dm{background:#F4ECE2;color:#4E1130}
.cs--dm .cs__k{color:#B8496A}
.cs--dm p{color:rgba(78,17,48,.72)}
.cs--dm .cs__go{border-bottom-color:#DA6381;color:#4E1130}
.cs--film{background:#0E0F10;color:#EDE5D6}
.cs--film .cs__k{color:#F4737E}
.cs--film p{color:#B8B1A5}
.cs--film .cs__go{border-bottom-color:#F4737E;color:#EDE5D6}
.cs--soon{border:1px dashed var(--rule-on-ink);background:transparent;pointer-events:none}
.cs--soon:hover{transform:none}
.cs--soon .cs__m{display:flex;align-items:center;justify-content:center;background:transparent}
.cs--soon .cs__ph{font-family:var(--f-display);font-weight:600;font-size:.78rem;letter-spacing:.18em;
  text-transform:uppercase;color:var(--dim-2)}
.cs--soon h2 em{font-style:normal;color:var(--eraser)}
.cases__empty{display:none;margin:clamp(28px,5vh,48px) 0 0;font-family:var(--f-text);font-style:italic;
  color:var(--dim-2);font-size:1.05rem}
.cases__empty.is-on{display:block}
@media (max-width:820px){.cases__g{grid-template-columns:1fr}.wfilt{gap:8px 18px}}
@media (prefers-reduced-motion: reduce){.cs,.cs__m img{transition:none}.cs:hover{transform:none}.cs:hover .cs__m img{transform:none}}

"""

start = text.index("/* ---------- compact case study cards ---------- */")
# Keep originals CSS for now if referenced, but replace from compact through end of compact block
end = text.index("/* ---------- 13th Pencil Originals ---------- */")
text = text[:start] + NEW_CSS + text[end:]

# Drop unused originals CSS block (through mobile of rules) — keep until wnote
orig_start = text.index("/* ---------- 13th Pencil Originals ---------- */")
wnote_css = text.index(".wnote{")
text = text[:orig_start] + text[wnote_css:]

NEW_HTML = r"""<section class="cases panel" id="cases" aria-label="Case studies">
  <div class="wrap">
    <div class="wfilt" role="toolbar" aria-label="Filter by service">
      <span class="wfilt__lab">Filter</span>
      <button type="button" data-filter="all" aria-pressed="true">All</button>
      <button type="button" data-filter="brand">Brand &amp; Strategy</button>
      <button type="button" data-filter="creative">Creative Studio</button>
      <button type="button" data-filter="ai">AI &amp; Innovation</button>
      <button type="button" data-filter="experiences">Experiences</button>
    </div>
    <div class="cases__g" id="casesGrid">
      <a class="cs cs--bm rv" data-services="brand creative" href="/work/beard-man-company">
        <div class="cs__m"><img src="/assets/media/beard-man/pack-1.webp" width="1536" height="1024" alt="Beard Man Company grooming range in orange and black" loading="lazy" decoding="async"></div>
        <div class="cs__b">
          <span class="cs__k">Case study &middot; Brand, packaging, apparel, website</span>
          <h2>Beard Man Company</h2>
          <p>Groom, never grow. A beard brand built the other way round from a blank page.</p>
          <span class="cs__go">Read case study &rarr;</span>
        </div>
      </a>
      <a class="cs cs--dm rv" data-d="1" data-services="brand" href="/work/dr-manjus">
        <div class="cs__m"><picture><source type="image/webp" srcset="/assets/media/dr-manjus/hc-signage-1400.webp 1400w" sizes="(max-width:820px) 100vw, 50vw"><img src="/assets/media/dr-manjus/hc-signage-1400.jpg" width="1400" height="838" alt="Dr Manju's Women Health Centre identity on clinic exterior" loading="lazy" decoding="async"></picture></div>
        <div class="cs__b">
          <span class="cs__k">Case study &middot; Healthcare brand identity</span>
          <h2>Dr Manju&rsquo;s</h2>
          <p>Care for every stage of you. A women&rsquo;s health identity in plum, rose and gold.</p>
          <span class="cs__go">Read case study &rarr;</span>
        </div>
      </a>
      <a class="cs cs--film rv" data-d="1" data-services="creative ai" href="/work/the-last-standard">
        <div class="cs__m"><img src="/assets/media/last-standard-poster.jpg" width="1280" height="720" alt="The Last Standard film poster" loading="lazy" decoding="async"></div>
        <div class="cs__b">
          <span class="cs__k">Case study &middot; AI film &middot; Original</span>
          <h2>The Last Standard</h2>
          <p>A self-initiated historical drama: on the night before a city falls, one order decides how a man is remembered.</p>
          <span class="cs__go">Read case study &rarr;</span>
        </div>
      </a>
      <a class="cs cs--film rv" data-d="2" data-services="creative ai" href="/work/greatness">
        <div class="cs__m"><img src="/assets/media/greatness-film-poster.jpg" width="1280" height="720" alt="Greatness film poster" loading="lazy" decoding="async"></div>
        <div class="cs__b">
          <span class="cs__k">Case study &middot; AI film &middot; Original</span>
          <h2>Greatness doesn&rsquo;t happen at ordinary speed.</h2>
          <p>A self-initiated motorsport film: pace, cut and the last calm second before the lights go out.</p>
          <span class="cs__go">Read case study &rarr;</span>
        </div>
      </a>
      <div class="cs cs--soon rv" data-d="2" data-services="brand creative ai experiences">
        <div class="cs__m"><span class="cs__ph">Coming</span></div>
        <div class="cs__b">
          <span class="cs__k">Not ours to show yet</span>
          <h2>The rest isn&rsquo;t public. <em>Yet.</em></h2>
          <p>When clients say yes, their work goes here.</p>
        </div>
      </div>
    </div>
    <p class="cases__empty" id="casesEmpty" role="status">Nothing in this service yet. Try another filter, or start a project with us.</p>
  </div>
</section>


"""

html_start = text.index('<section class="cases panel" id="cases"')
html_end = text.index('<section class="wnote panel">')
text = text[:html_start] + NEW_HTML + text[html_end:]

# Hero copy
text = text.replace(
    "<h1 class=\"rv\" data-d=\"1\">Two brands.<br><em>Both</em> real.</h1>\n    <div class=\"wi__row rv\" data-d=\"2\">\n      <p class=\"lede\" style=\"margin:0\">We would rather show you two things we are actually building than twelve we borrowed.</p>\n      <span class=\"wi__n\"><b>02</b> in progress</span>",
    "<h1 class=\"rv\" data-d=\"1\">Real work.<br><em>Shown as it is.</em></h1>\n    <div class=\"wi__row rv\" data-d=\"2\">\n      <p class=\"lede\" style=\"margin:0\">Client brands and films we made for ourselves — filter by the service that fits what you need.</p>\n      <span class=\"wi__n\"><b>04</b> case studies</span>",
)

FILTER_JS = r"""
(function(){
  "use strict";
  var bar=document.querySelector(".wfilt");
  var cards=[].slice.call(document.querySelectorAll("#casesGrid .cs"));
  var empty=document.getElementById("casesEmpty");
  if(!bar||!cards.length) return;
  var map={all:"all",brand:"brand",creative:"creative",ai:"ai",experiences:"experiences"};
  function apply(key){
    var k=map[key]||"all";
    var shown=0;
    cards.forEach(function(c){
      var services=(c.getAttribute("data-services")||"").split(/\s+/);
      var on=k==="all"||services.indexOf(k)!==-1;
      c.classList.toggle("is-hide",!on);
      if(on) shown++;
    });
    if(empty) empty.classList.toggle("is-on",shown===0);
    [].slice.call(bar.querySelectorAll("[data-filter]")).forEach(function(b){
      b.setAttribute("aria-pressed", b.getAttribute("data-filter")===k ? "true" : "false");
    });
    try{
      var url=new URL(window.location.href);
      if(k==="all") url.searchParams.delete("service");
      else url.searchParams.set("service", k);
      history.replaceState(null,"",url.pathname+url.search+url.hash);
    }catch(e){}
  }
  bar.addEventListener("click",function(e){
    var b=e.target.closest("[data-filter]");
    if(!b||!bar.contains(b)) return;
    apply(b.getAttribute("data-filter"));
  });
  var start="all";
  try{
    var q=new URL(window.location.href).searchParams.get("service");
    if(q&&map[q]) start=q;
    else if(location.hash){
      var h=location.hash.replace(/^#/,"");
      if(map[h]) start=h;
    }
  }catch(e){}
  apply(start);
})();
"""

# Insert filter JS before </script></body> — find last </script> before </body>
marker = "</script>\n</body>"
if marker not in text:
    raise SystemExit("script/body marker missing")
text = text.replace(marker, FILTER_JS + "\n</script>\n</body>", 1)

# Meta tweak
text = text.replace(
    "<title>Work: Brand Identity and Packaging Design | 13th Pencil</title>",
    "<title>Work &amp; Case Studies | 13th Pencil</title>",
)
text = text.replace(
    'content="Brand identity, packaging and ecommerce work for Beard Man Company, and a healthcare brand identity for Dr Manju\'s Women Health Centre, Visakhapatnam."',
    'content="Case studies from 13th Pencil: Beard Man Company, Dr Manju\'s, and self-initiated AI films The Last Standard and Greatness. Filter by brand, creative, AI or experiences."',
)

path.write_text(text, encoding="utf-8")
print("ok")
print("has originals section", 'id="originals"' in text)
print("has filter", 'data-filter="brand"' in text)
print("has film cards", "the-last-standard" in text and "greatness" in text)
print("has filter js", "casesEmpty" in text and "data-services" in text)
