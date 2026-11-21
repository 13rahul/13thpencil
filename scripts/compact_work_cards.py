from pathlib import Path

path = Path(r"D:\New folder\htdocs\13thpencil\public\_handoff\work.html")
text = path.read_text(encoding="utf-8")

NEW_CSS = r"""/* ---------- compact case study cards ---------- */
.cases{padding-top:clamp(28px,5vh,56px);padding-bottom:clamp(50px,9vh,100px)}
.cases__g{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:clamp(16px,2.6vw,28px)}
.cs{display:flex;flex-direction:column;min-width:0;color:inherit;background:var(--ink-2);text-decoration:none;
  transition:transform .45s var(--ease-out),background .35s}
.cs:hover{transform:translateY(-3px)}
.cs__m{position:relative;aspect-ratio:16/11;overflow:hidden;background:#111}
.cs__m img{width:100%;height:100%;object-fit:cover;display:block;transition:transform 1.1s var(--ease-out)}
.cs:hover .cs__m img{transform:scale(1.035)}
.cs__b{padding:clamp(16px,2vw,24px);display:flex;flex-direction:column;gap:.45em;flex:1}
.cs__k{font-family:var(--f-display);font-weight:600;font-size:.7rem;letter-spacing:.16em;text-transform:uppercase;color:var(--lacquer)}
.cs h2{font-family:var(--f-display);font-weight:800;font-size:clamp(1.35rem,2.1vw,1.85rem);letter-spacing:-.04em;
  line-height:.96;text-transform:uppercase;margin:0}
.cs p{font-family:var(--f-text);font-size:.98rem;line-height:1.5;color:var(--dim);margin:0;max-width:34ch}
.cs__go{margin-top:auto;padding-top:.85em;font-family:var(--f-display);font-weight:800;font-size:.92rem;
  border-bottom:2px solid var(--eraser);width:max-content}
.cs--bm .cs__m{background:#14150F}
.cs--dm{background:#F4ECE2;color:#4E1130}
.cs--dm .cs__k{color:#B8496A}
.cs--dm p{color:rgba(78,17,48,.72)}
.cs--dm .cs__go{border-bottom-color:#DA6381;color:#4E1130}
.cs--soon{border:1px dashed var(--rule-on-ink);background:transparent;pointer-events:none}
.cs--soon:hover{transform:none}
.cs--soon .cs__m{display:flex;align-items:center;justify-content:center;background:transparent}
.cs--soon .cs__ph{font-family:var(--f-display);font-weight:600;font-size:.78rem;letter-spacing:.18em;
  text-transform:uppercase;color:var(--dim-2)}
.cs--soon h2 em{font-style:normal;color:var(--eraser)}
@media (max-width:820px){.cases__g{grid-template-columns:1fr}}
@media (prefers-reduced-motion: reduce){.cs,.cs__m img{transition:none}.cs:hover{transform:none}.cs:hover .cs__m img{transform:none}}

"""

# Replace from stack CSS through card-3/redact block (before originals)
start = text.index("/* ---------- the stack ---------- */")
end = text.index("/* ---------- 13th Pencil Originals ---------- */")
text = text[:start] + NEW_CSS + text[end:]

# Drop old card media-query leftovers
old_mq = """@media (max-width:860px){
  .card__g{grid-template-columns:1fr;grid-template-rows:minmax(0,38%) auto;gap:clamp(14px,2.4vh,22px)}
  .card__vis{order:-1}
  .card__txt{justify-content:flex-start;gap:clamp(14px,2.2vh,22px)}
  .card__name{font-size:clamp(1.5rem,7.4vw,2.4rem);margin:.22em 0 .26em}
  .card__lines p{font-size:1rem}
  .card__lines p+p{display:none}
  .tags{margin-top:12px;font-size:.78rem}
  .c-no .card__g{grid-template-rows:auto}
  .c-no .card__lines p+p{display:block}
}
@media (max-height:700px) and (max-width:860px){.card__lines{display:none}}
@media (prefers-reduced-motion: reduce){
  .pill i{animation:none}
  .redact i{transition:none;transform:scaleX(1)}
}

"""
if old_mq in text:
    text = text.replace(old_mq, "")

NEW_HTML = r"""<section class="cases panel" id="cases" aria-label="Case studies">
  <div class="wrap">
    <div class="cases__g">
      <a class="cs cs--bm rv" href="/work/beard-man-company">
        <div class="cs__m"><img src="/assets/media/beard-man/pack-1.webp" width="1536" height="1024" alt="Beard Man Company grooming range in orange and black" loading="lazy" decoding="async"></div>
        <div class="cs__b">
          <span class="cs__k">01 &middot; Brand, packaging, apparel, website</span>
          <h2>Beard Man Company</h2>
          <p>Groom, never grow. A beard brand built the other way round from a blank page.</p>
          <span class="cs__go">Read case study &rarr;</span>
        </div>
      </a>
      <a class="cs cs--dm rv" data-d="1" href="/work/dr-manjus">
        <div class="cs__m"><picture><source type="image/webp" srcset="/assets/media/dr-manjus/hc-signage-1400.webp 1400w" sizes="(max-width:820px) 100vw, 50vw"><img src="/assets/media/dr-manjus/hc-signage-1400.jpg" width="1400" height="838" alt="Dr Manju's Women Health Centre identity on clinic exterior" loading="lazy" decoding="async"></picture></div>
        <div class="cs__b">
          <span class="cs__k">02 &middot; Healthcare brand identity</span>
          <h2>Dr Manju&rsquo;s</h2>
          <p>Care for every stage of you. A women&rsquo;s health identity in plum, rose and gold.</p>
          <span class="cs__go">Read case study &rarr;</span>
        </div>
      </a>
      <div class="cs cs--soon rv" data-d="2" aria-hidden="false">
        <div class="cs__m"><span class="cs__ph">Coming</span></div>
        <div class="cs__b">
          <span class="cs__k">03 &middot; Not ours to show yet</span>
          <h2>The rest isn&rsquo;t public. <em>Yet.</em></h2>
          <p>When clients say yes, their work goes here.</p>
        </div>
      </div>
    </div>
  </div>
</section>


"""

html_start = text.index('<div class="stack" id="stack">')
html_end = text.index("<!-- ========== 13TH PENCIL ORIGINALS ========== -->")
text = text[:html_start] + NEW_HTML + text[html_end:]

# Restore intro media to fill its column
text = text.replace(
    ".hm{position:relative;aspect-ratio:5/4;max-height:50vh;width:70%;max-width:100%;justify-self:end;overflow:hidden;border-radius:2px;background:#0f1011}",
    ".hm{position:relative;aspect-ratio:5/4;max-height:58vh;overflow:hidden;border-radius:2px;background:#0f1011}",
)
text = text.replace(
    "@media (max-width:900px){.hero--media .wrap{grid-template-columns:1fr}.hm{aspect-ratio:16/11;max-height:none;width:100%;justify-self:stretch}}",
    "@media (max-width:900px){.hero--media .wrap{grid-template-columns:1fr}.hm{aspect-ratio:16/11;max-height:none}}",
)

# Point schema at real case pages
text = text.replace(
    '"url":"https://13thpencil.com/work#dr-manjus"',
    '"url":"https://13thpencil.com/work/dr-manjus"',
)
text = text.replace(
    '"url":"https://13thpencil.com/work","creator":{"@id":"https://13thpencil.com/#org"},"genre":"Brand identity and packaging design"',
    '"url":"https://13thpencil.com/work/beard-man-company","creator":{"@id":"https://13thpencil.com/#org"},"genre":"Brand identity and packaging design"',
)

# Remove stack card scrub + compare slider scripts
old_js = """(function(){
  "use strict";
  var S=Scrub,cards=[].slice.call(document.querySelectorAll(".card"));
  /* each card shrinks back and darkens as the next one slides over it */
  cards.forEach(function(c,i){
    var next=cards[i+1];if(!next)return;
    var shade=c.querySelector(".card__shade");
    S.add(c,function(p){
      var e=S.ease(p);
      c.style.transform=S.rm?"none":"scale("+(1-.07*e)+")";
      if(shade)shade.style.opacity=(.55*e).toFixed(3);
    },.16,function(){return 1-next.getBoundingClientRect().top/window.innerHeight;});
  });

  /* Beardman: the route draws as the card arrives; a pin then rides it */
  var bm=cards[0],road=document.getElementById("bmRoad"),road2=bm.querySelector(".bm-road2"),
      pin=document.getElementById("bmPin"),bands=[].slice.call(bm.querySelectorAll(".bm-band")),
      L=road.getTotalLength(),drawn=0,t0=0,liveBM=false;
  function bmTick(now){
    if(!liveBM)return;
    if(!t0)t0=now;var t=(now-t0)/1000;
    drawn=S.rm?1:Math.min(1,t/2.2);var e=1-Math.pow(1-drawn,3);
    road.style.strokeDashoffset=1-e;road2.style.strokeDashoffset=1-Math.min(1,e*1.05);
    var u=S.rm?0.5:((t*.06)%1),pt=road.getPointAtLength(L*u*e);
    pin.setAttribute("cx",pt.x);pin.setAttribute("cy",pt.y);
    bands.forEach(function(b,k){var s=S.rm?1:Math.min(1,Math.max(0,(t-.3-k*.12)/.7));s=1-Math.pow(1-s,3);
      b.style.transform="scaleY("+s+")";});
    if(!S.rm)requestAnimationFrame(bmTick);
  }

  /* Dr Manju's: rings breathe outward, a space growing to fit */
  var dm=cards[1],rings=[].slice.call(dm.querySelectorAll(".dm-ring")),liveDM=false,d0=0;
  function dmTick(now){
    if(!liveDM)return;if(!d0)d0=now;var t=(now-d0)/1000;
    rings.forEach(function(r,k){
      var ph=(t*.22+k*.07)%1,s=.86+ph*.28;
      r.style.transform="scale("+s+")";
      r.style.opacity=(.55*Math.sin(Math.PI*ph)).toFixed(3);
    });
    if(!S.rm)requestAnimationFrame(dmTick);
  }

  var io=new IntersectionObserver(function(es){es.forEach(function(e){
    var c=e.target;
    if(c===bm){var was=liveBM;liveBM=e.isIntersecting;if(liveBM&&!was){t0=0;requestAnimationFrame(bmTick);}}
    if(c===dm){var w2=liveDM;liveDM=e.isIntersecting;if(liveDM&&!w2){requestAnimationFrame(dmTick);}}
    if(e.isIntersecting)c.classList.add("live");
  });},{threshold:.35});
  cards.forEach(function(c){io.observe(c);});
  if(S.rm){liveBM=liveDM=true;bmTick(performance.now());dmTick(performance.now());}
})();

(function(){
  "use strict";
  var RM=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function once(el,cls,th){if(!el)return;new IntersectionObserver(function(es,o){if(es[0].isIntersecting){el.classList.add(cls);o.disconnect();}},{threshold:th||.25}).observe(el);}
  once(document.getElementById("lead"),"in",.15);
  once(document.getElementById("pal"),"in",.3);
  /* compare slider: a range input over the image, so mouse, touch and keyboard all work */
  var cmp=document.getElementById("cmp");if(!cmp)return;
  var r=cmp.querySelector("input"),touched=false;
  function set(v){cmp.style.setProperty("--x",v+"%");}
  r.addEventListener("input",function(){touched=true;set(r.value);});
  /* when it first arrives, the divider sweeps across once to show it moves */
  if(!RM){new IntersectionObserver(function(es,o){
    if(!es[0].isIntersecting)return;o.disconnect();
    var t0=performance.now(),from=88,to=+r.value;
    (function step(now){if(touched)return;var u=Math.min(1,(now-t0)/1400),e=1-Math.pow(1-u,3);
      set((from+(to-from)*e).toFixed(2));if(u<1)requestAnimationFrame(step);})(t0);
  },{threshold:.5}).observe(cmp);}
})();
"""

if old_js not in text:
    raise SystemExit("old card/case JS block not found")
text = text.replace(old_js, "")

path.write_text(text, encoding="utf-8")
print("updated", path)
print("has stack", '<div class="stack"' in text)
print("has cases", 'class="cases panel"' in text)
print("has case section", 'id="dr-manjus"' in text)
print("has card scrub", "bmRoad" in text)
