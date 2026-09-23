(function(){
  "use strict";
  var $ = function(s,c){return (c||document).querySelector(s);};
  var $$ = function(s,c){return Array.prototype.slice.call((c||document).querySelectorAll(s));};
  var cms = {};
  try {
    var cmsEl = document.getElementById("site-content");
    if (cmsEl && cmsEl.textContent) cms = JSON.parse(cmsEl.textContent);
  } catch (e) {}
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = window.matchMedia("(hover:hover) and (pointer:fine)").matches;
  var css = function(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim();};

  /* ---------- 1. INTRO: twelve behave, the thirteenth doesn't ---------- */
  var loader = $("#loader"), strokes = $("#loaderStrokes");
  for(var i=0;i<13;i++){
    var s = document.createElement("i");
    if(i===12) s.className = "thirteen";
    strokes.appendChild(s);
  }
  var items = $$("#loaderStrokes i");
  function endIntro(){
    loader.classList.add("is-done");
    document.body.classList.remove("is-locked");
    setTimeout(function(){ loader.hidden = true; }, 1100);
    $("#hero").classList.add("lit");
  }
  if(reduce){
    loader.hidden = true; $("#hero").classList.add("lit");
  }else{
    document.body.classList.add("is-locked");
    items.forEach(function(el,idx){
      setTimeout(function(){
        el.classList.add("on");
        if(idx===12) setTimeout(function(){ el.classList.add("go"); }, 260);
      }, 60 + idx*55);
    });
    setTimeout(function(){
      strokes.style.transition = "opacity .5s"; strokes.style.opacity = ".14";
      $("#loaderLogo").classList.add("in");
    }, 1180);
    setTimeout(endIntro, 2250);
    window.addEventListener("keydown", function(e){ if(e.key==="Escape") endIntro(); });
  }

  /* ---------- 2. HERO: a rhythm of marks, one of which leaves it ----------
     The count follows the viewport rather than spelling out thirteen. */
  var bars = $("#heroBars");
  var barCount = Math.max(7, Math.min(17, Math.round(window.innerWidth/86)));
  var breakAt = barCount - 2;
  for(var b=0;b<barCount;b++){
    var el = document.createElement("b");
    if(b===breakAt) el.className = "thirteen";
    el.style.transitionDelay = (0.9 + b*0.045) + "s";
    bars.appendChild(el);
  }

  var reflowBars;
  window.addEventListener("resize", function(){
    clearTimeout(reflowBars);
    reflowBars = setTimeout(function(){
      var want = Math.max(7, Math.min(17, Math.round(window.innerWidth/86)));
      if(want === bars.children.length) return;
      bars.innerHTML = "";
      for(var i=0;i<want;i++){
        var e2 = document.createElement("b");
        if(i===want-2) e2.className = "thirteen";
        bars.appendChild(e2);
      }
    }, 220);
  });

  /* ---------- 3. MARQUEE — one word faces the other way ---------- */
  var words = (cms.marqueeWords && cms.marqueeWords.length)
    ? cms.marqueeWords
    : ["Brand","Strategy","Creative","Film","Identity","AI","Experiences","Systems","Growth","Craft","Otherwise"];
  var odd = words.length - 1;               /* one word faces the other way */
  var mq = $("#marquee"), runOne = "";
  words.forEach(function(w,ix){
    runOne += '<span'+(ix===odd?' class="odd"':'')+'>'+w+'</span><span aria-hidden="true">·</span>';
  });
  mq.innerHTML = runOne + runOne;

  /* ---------- 4. THE 13TH PRINCIPLE grid ---------- */
  var g = $("#grid13");
  for(var r=0;r<3;r++){
    var row = document.createElement("div"); row.className = "row13";
    for(var c=0;c<13;c++){
      var m = document.createElement("b");
      if(c===12) m.className = "thirteen";
      row.appendChild(m);
    }
    g.appendChild(row);
  }

  /* ---------- 5. REVEALS ---------- */
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  },{threshold:.18, rootMargin:"0px 0px -8% 0px"});
  $$(".rv").forEach(function(n){ io.observe(n); });

  /* ---------- 6. ERASE THE OBVIOUS ---------- */
  var eraseSec = $("#erase");
  var io2 = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ eraseSec.classList.add("is-on"); io2.disconnect(); } });
  },{threshold:.45});
  io2.observe(eraseSec);

  /* ---------- 7. NAV: colour follows the panel behind it ---------- */
  var nav = $("#nav"), lastY = 0;
  var panels = $$(".panel");
  function navTone(){
    var y = nav.getBoundingClientRect().bottom - 8;
    for(var i=0;i<panels.length;i++){
      var r = panels[i].getBoundingClientRect();
      if(r.top <= y && r.bottom >= y){
        nav.classList.toggle("on-paper", panels[i].classList.contains("panel--paper"));
        break;
      }
    }
  }

  /* ---------- 8. RAIL + PROCESS LINE + PARALLAX ---------- */
  var railFill = $("#railFill"), railTip = $("#railTip");
  var path = $("#processPath"), pathLen = path.getTotalLength();
  path.style.strokeDasharray = pathLen; path.style.strokeDashoffset = pathLen;
  var processSec = $("#process");
  var ticking = false;
  function onScroll(){
    var y = window.scrollY || window.pageYOffset;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    var p = h > 0 ? Math.min(1, y/h) : 0;
    railFill.style.height = (p*100) + "%";
    railTip.style.top = (p*100) + "%";
    var pr = processSec.getBoundingClientRect();
    var prog = 1 - (pr.bottom - window.innerHeight*0.25) / (pr.height + window.innerHeight*0.5);
    prog = Math.max(0, Math.min(1, prog));
    path.style.strokeDashoffset = pathLen * (1 - prog);
    nav.classList.toggle("hide", y > lastY + 6 && y > 600);
    if(y < lastY - 6 || y < 600) nav.classList.remove("hide");
    lastY = y;
    navTone();
    ticking = false;
  }
  window.addEventListener("scroll", function(){
    if(!ticking){ ticking = true; requestAnimationFrame(onScroll); }
  }, {passive:true});
  onScroll();

  /* ---------- 9. CURSOR + GRAPHITE TRAIL ---------- */
  if(fine && !reduce){
    var dot = $("#cursor"), cv = $("#trail"), ctx = cv.getContext("2d"), dpr = Math.min(2, window.devicePixelRatio||1);
    var px = -100, py = -100, mx = -100, my = -100, drawing = false;
    function sizeTrail(){ cv.width = innerWidth*dpr; cv.height = innerHeight*dpr; ctx.scale(dpr,dpr); }
    sizeTrail();
    window.addEventListener("resize", function(){ ctx.setTransform(1,0,0,1,0,0); sizeTrail(); });
    document.addEventListener("mousemove", function(e){
      mx = e.clientX; my = e.clientY; drawing = true;
      dot.style.transform = "translate(" + mx + "px," + my + "px) translate(-50%,-50%)";
    });
    var lacquer = css("--lacquer") || "#F5B301";
    (function loop(){
      if(document.hidden){ requestAnimationFrame(loop); return; }
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0,0,0,.055)";
      ctx.fillRect(0,0,innerWidth,innerHeight);
      ctx.globalCompositeOperation = "source-over";
      if(drawing && px > -50){
        ctx.strokeStyle = lacquer; ctx.lineWidth = 1.6; ctx.lineCap = "round";
        ctx.globalAlpha = .55;
        ctx.beginPath(); ctx.moveTo(px,py); ctx.lineTo(mx,my); ctx.stroke();
        ctx.globalAlpha = 1;
      }
      px = mx; py = my;
      requestAnimationFrame(loop);
    })();
    $$("a, button").forEach(function(a){
      a.addEventListener("mouseenter", function(){ dot.classList.add("big"); });
      a.addEventListener("mouseleave", function(){ dot.classList.remove("big"); });
    });
  }

  /* ---------- 10. CAPABILITIES — the page performs each discipline ---------- */
  var stage = $("#capStage"), canvas = $("#capCanvas"), c = canvas.getContext("2d");
  var small = window.matchMedia("(max-width:760px)").matches;
  var caps = $$(".cap"), cap = "strategy", t = 0, W = 0, H = 0;
  var cdpr = Math.min(small ? 1.5 : 2, window.devicePixelRatio||1);
  var captions = Object.assign({
    strategy:"Order, and the one line refusing it",
    creative:"A line that will not sit still",
    ai:"Pattern-finding, one node off-model",
    experiences:"Something entering the room",
    growth:"Compounding, not spiking"
  }, cms.captions || {});
  function sizeCanvas(){
    var r = stage.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W*cdpr; canvas.height = H*cdpr;
    c.setTransform(cdpr,0,0,cdpr,0,0);
  }
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
  window.addEventListener("load", sizeCanvas);
  var stageVisible = true;
  new IntersectionObserver(function(en){ stageVisible = en[0].isIntersecting; },{threshold:.02}).observe(stage);

  var nodes = [];
  var nodeCount = small ? 22 : 40;
  for(var n=0;n<nodeCount;n++) nodes.push({x:Math.random(),y:Math.random(),vx:(Math.random()-.5)*.0014,vy:(Math.random()-.5)*.0014});
  var scrib = [], ripples = [], pointer = {x:.5,y:.5};
  stage.addEventListener("pointermove", function(e){
    var r = stage.getBoundingClientRect();
    pointer.x = (e.clientX-r.left)/r.width; pointer.y = (e.clientY-r.top)/r.height;
    if(cap==="experiences" && ripples.length < 22 && t%4===0) ripples.push({x:pointer.x,y:pointer.y,r:0});
  });

  function draw(){
    if(!stageVisible || document.hidden){ requestAnimationFrame(draw); return; }
    t++;
    var ink = getComputedStyle(stage).getPropertyValue("--stage-ink").trim() || "#EDE5D6";
    var lac = css("--lacquer"), era = css("--eraser");
    c.clearRect(0,0,W,H);
    c.lineCap = "round";

    if(cap==="strategy"){
      var count = 9, gap = W/(count+1);
      for(var i=0;i<count;i++){
        var x = gap*(i+1);
        var settle = Math.min(1, t/70);
        var wob = (1-settle) * Math.sin(t*.05+i) * H*.12;
        var isThirteen = (i===count-1);
        c.strokeStyle = isThirteen ? era : ink;
        c.globalAlpha = isThirteen ? 1 : .42;
        c.lineWidth = isThirteen ? 4 : 2;
        c.beginPath();
        if(isThirteen){
          c.save(); c.translate(x, H*.5 + Math.sin(t*.02)*8); c.rotate(.28 + Math.sin(t*.015)*.12);
          c.moveTo(0,-H*.30); c.lineTo(0,H*.30); c.stroke(); c.restore();
        }else{
          c.moveTo(x, H*.22 + wob); c.lineTo(x, H*.78 + wob); c.stroke();
        }
      }
      c.globalAlpha = .18; c.strokeStyle = ink; c.lineWidth = 1;
      c.beginPath(); c.moveTo(W*.06,H*.5); c.lineTo(W*.94,H*.5); c.stroke();
    }

    else if(cap==="creative"){
      if(t%2===0){
        var a = t*.021;
        scrib.push({
          x: W*.5 + Math.cos(a*1.3)*W*.31 + Math.sin(a*.47)*W*.12,
          y: H*.5 + Math.sin(a*1.7)*H*.30 + Math.cos(a*.31)*H*.12
        });
      }
      if(scrib.length > 200) scrib.shift();
      c.strokeStyle = ink; c.lineWidth = 1.4; c.globalAlpha = .5;
      c.beginPath();
      scrib.forEach(function(p,ix){ ix ? c.lineTo(p.x,p.y) : c.moveTo(p.x,p.y); });
      c.stroke();
      if(scrib.length){
        var last = scrib[scrib.length-1];
        c.globalAlpha = 1; c.fillStyle = lac;
        c.beginPath(); c.arc(last.x,last.y,4.5,0,6.284); c.fill();
      }
    }

    else if(cap==="ai"){
      nodes.forEach(function(p,ix){
        p.x += p.vx; p.y += p.vy;
        if(p.x<0||p.x>1) p.vx*=-1;
        if(p.y<0||p.y>1) p.vy*=-1;
      });
      c.lineWidth = 1;
      for(var i2=0;i2<nodes.length;i2++){
        for(var j=i2+1;j<nodes.length;j++){
          var dx=(nodes[i2].x-nodes[j].x)*W, dy=(nodes[i2].y-nodes[j].y)*H;
          var d = Math.sqrt(dx*dx+dy*dy);
          if(d < W*.15){
            c.globalAlpha = (1 - d/(W*.15))*.32; c.strokeStyle = ink;
            c.beginPath(); c.moveTo(nodes[i2].x*W,nodes[i2].y*H); c.lineTo(nodes[j].x*W,nodes[j].y*H); c.stroke();
          }
        }
      }
      nodes.forEach(function(p,ix){
        var off = (ix===nodes.length-1);     /* exactly one node off-model */
        c.globalAlpha = 1; c.fillStyle = off ? era : ink;
        c.beginPath(); c.arc(p.x*W,p.y*H, off?5.5:2, 0, 6.284); c.fill();
      });
    }

    else if(cap==="experiences"){
      if(t%26===0) ripples.push({x:pointer.x,y:pointer.y,r:0});
      ripples = ripples.filter(function(rp){ return rp.r < Math.max(W,H); });
      ripples.forEach(function(rp,ix){
        rp.r += 2.4;
        c.globalAlpha = Math.max(0, .5 - rp.r/Math.max(W,H)*.5);
        var lead = (ix%7===6);
        c.strokeStyle = lead ? era : ink;
        c.lineWidth = lead ? 3 : 1.4;
        c.beginPath(); c.arc(rp.x*W, rp.y*H, rp.r, 0, 6.284); c.stroke();
      });
      c.globalAlpha = 1; c.fillStyle = lac;
      c.beginPath(); c.arc(pointer.x*W, pointer.y*H, 5, 0, 6.284); c.fill();
    }

    else if(cap==="growth"){
      var bars2 = 10, bw = W/(bars2*1.7);
      for(var k=0;k<bars2;k++){
        var target = Math.pow((k+1)/bars2, 1.8);
        var grow = Math.min(1, t/90);
        var hh = target*H*.72*grow;
        var bx = W*.09 + k*(W*.82/bars2);
        var odd2 = (k===bars2-1);
        c.globalAlpha = odd2 ? 1 : .34;
        c.fillStyle = odd2 ? era : ink;
        if(odd2) hh *= 1 + Math.sin(t*.04)*.08 + .18;
        c.fillRect(bx, H*.86-hh, bw, hh);
      }
      c.globalAlpha = .9; c.strokeStyle = lac; c.lineWidth = 2;
      c.beginPath();
      for(var q=0;q<=60;q++){
        var xx = W*.09 + (W*.82)*(q/60);
        var yy = H*.86 - Math.pow(q/60,1.8)*H*.72*Math.min(1,t/90);
        q ? c.lineTo(xx,yy) : c.moveTo(xx,yy);
      }
      c.stroke();
    }
    c.globalAlpha = 1;
    if(!reduce || t < 100) requestAnimationFrame(draw);
  }
  requestAnimationFrame(draw);

  function setCap(name){
    cap = name; t = 0; scrib = []; ripples = [];
    caps.forEach(function(el){ el.setAttribute("aria-selected", String(el.dataset.cap === name)); });
    $("#capCaption").textContent = captions[name];
    if(reduce) requestAnimationFrame(draw);
  }
  caps.forEach(function(el){
    el.addEventListener("click", function(){
      setCap(el.dataset.cap);
      if(!fine) el.scrollIntoView({block:"nearest", behavior: reduce ? "auto" : "smooth"});
    });
    if(fine) el.addEventListener("mouseenter", function(){ setCap(el.dataset.cap); });
    el.addEventListener("focus", function(){ setCap(el.dataset.cap); });
  });

  /* ---------- 11. WORK TILES — slight tilt toward the cursor ---------- */
  if(fine && !reduce){
    $$(".tile").forEach(function(tile){
      tile.addEventListener("mousemove", function(e){
        var r = tile.getBoundingClientRect();
        var rx = ((e.clientY - r.top)/r.height - .5) * -4;
        var ry = ((e.clientX - r.left)/r.width - .5) * 4;
        tile.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) scale(1.012)";
      });
      tile.addEventListener("mouseleave", function(){ tile.style.transform = ""; });
    });
  }

  /* ---------- 12. CONTACT: the word that refuses to settle ---------- */
  var swaps = (cms.swaps && cms.swaps.length)
    ? cms.swaps
    : ["came back rejected","nobody has approved","is still an argument","sounds too expensive","everyone has an answer for"];
  var swapEl = $("#swapWord"), si = 0;
  if(!reduce){
    setInterval(function(){
      si = (si+1) % swaps.length;
      swapEl.style.transition = "opacity .3s, transform .3s";
      swapEl.style.opacity = "0"; swapEl.style.transform = "translateY(-.12em)";
      setTimeout(function(){
        swapEl.textContent = swaps[si];
        swapEl.style.opacity = "1"; swapEl.style.transform = "none";
        swapEl.style.color = (si===swaps.length-1) ? css("--eraser") : css("--lacquer");
      }, 320);
    }, 3200);
  }

  /* ---------- 13. MENU + THEME ---------- */
  var burger = $("#burger"), menu = $("#menu");
  burger.addEventListener("click", function(){
    var open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-locked", open);
    nav.classList.toggle("menu-open", open);
  });
  $$("#menu a").forEach(function(a){
    a.addEventListener("click", function(){
      menu.classList.remove("open"); document.body.classList.remove("is-locked");
      nav.classList.remove("menu-open");
      burger.setAttribute("aria-expanded","false");
    });
  });
  $("#themeBtn").addEventListener("click", function(){
    var cur = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", cur === "dark" ? "light" : "dark");
    navTone();
  });
})();
