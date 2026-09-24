
/* ==========================================================================
   Architecture (maps to the suggested production components):
   ProjectForm   → state S, STEPS config, go()/render()
   IntroScreen   → static markup above + bindIntro()
   QuestionScreen→ questionShell()
   TextInput     → textField()
   ChoiceCards   → cardsBody() (multi), panelsBody() (ambition), rowsBody() (timeline)
   ProjectStory  → storyBody()
   FileUpload    → uploadBody()
   ProgressLine  → Line object (fixed SVG journey + tip)
   BriefReview   → reviewScreen()
   SuccessScreen → successScreen()
   ========================================================================== */
(() => {
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------------- state (local only for the prototype) ---------------- */
const S = { name:'', company:'', solo:false, email:'', phone:'', directions:[], story:'', ambition:'', timeline:'', files:[] };

const DIRECTIONS = [
  ['brand',   'Build a brand'],
  ['ignore',  'Make something impossible to ignore'],
  ['exp',     'Create an experience'],
  ['ai',      'Do something with AI'],
  ['rethink', 'Rethink something that already exists'],
  ['unknown', 'I don’t know yet — that’s why I’m here'],
];
/* Prototype labels only. Replace with real investment ranges in production. */
const AMBITION = [
  ['lean',      'Keep it lean',            'Focused scope. Sharp choices.'],
  ['proper',    'Build it properly',       'The full thinking, made well.'],
  ['statement', 'Let’s make a statement',  'Room to be ambitious.'],
  ['talk',      'Let’s talk first',        'We’ll scope it together.'],
];
const TIMELINE = [
  ['yesterday', 'Yesterday 😬'],
  ['weeks',     'Next few weeks'],
  ['months',    'Next few months'],
  ['exploring', 'We’re exploring'],
];

/* Each step: where the line should have reached (0–1), which world it lives in, and its phrase. */
const STEPS = [
  { id:'intro',     theme:'dark',  p:.018 },
  { id:'name',      theme:'light', p:.075, n:1, phrase:'The line has started.' },
  { id:'company',   theme:'light', p:.15,  n:2, phrase:'Still finding its feet.' },
  { id:'email',     theme:'dark',  p:.235, n:3, phrase:'The line is getting somewhere.' },
  { id:'phone',     theme:'dark',  p:.31,  n:4, phrase:'Taking the scenic route.' },
  { id:'direction', theme:'light', p:.41,  n:5, phrase:'Now it has a direction.' },
  { id:'story',     theme:'light', p:.52,  n:6, phrase:'This is where it gets interesting.' },
  { id:'ambition',  theme:'dark',  p:.66,  n:7, phrase:'Picking up speed.' },
  { id:'timeline',  theme:'light', p:.75,  n:8, phrase:'Nearly a shape.' },
  { id:'upload',    theme:'light', p:.83,  phrase:'An optional detour.' },
  { id:'review',    theme:'light', p:.91,  phrase:'Look where it went.' },
  { id:'success',   theme:'dark',  p:1 },
];
let idx = 0, editReturn = false, busy = false;

/* ---------------- ProgressLine ---------------- */
const Line = (() => {
  const svg = $('#line'), main = $('#lineMain'), ghost = $('#lineGhost'), tip = $('#lineTip');
  let L = 1, cur = 0, target = 0, extra = 0, raf = 0;
  // seeded random so the "hand" draws the same line every visit
  const rng = seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const LAND = [[-.02,.2],[.08,.14],[.18,.12],[.26,.2],[.31,.33],[.24,.47],[.34,.57],[.46,.53],[.5,.44],[.44,.4],[.41,.48],[.5,.61],[.6,.76],[.72,.72],[.7,.52],[.78,.32],[.9,.2],[.87,.44],[.95,.62],[.88,.86],[.99,.93],[1.12,.97]];
  const PORT = [[-.03,.12],[.22,.09],[.5,.13],[.24,.22],[.58,.29],[.86,.25],[.72,.38],[.46,.45],[.52,.39],[.6,.43],[.5,.5],[.2,.59],[.36,.69],[.8,.67],[.92,.79],[.52,.86],[.14,.91],[.58,.96],[1.15,1.02]];
  function build(){
    const w = innerWidth, h = innerHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const way = (h > w * 1.05 ? PORT : LAND).map(([x, y]) => [x * w, y * h]);
    const r = rng(1313), amp = Math.min(w, h) * .007;
    // add hand wobble between waypoints
    const pts = [];
    for (let i = 0; i < way.length - 1; i++) {
      const [x1, y1] = way[i], [x2, y2] = way[i + 1], dx = x2 - x1, dy = y2 - y1, len = Math.hypot(dx, dy) || 1;
      const nx = -dy / len, ny = dx / len, steps = 3;
      for (let s = 0; s < steps; s++) {
        const t = s / steps, j = (r() - .5) * 2 * amp * (s ? 1 : .3);
        pts.push([x1 + dx * t + nx * j, y1 + dy * t + ny * j]);
      }
    }
    pts.push(way[way.length - 1]);
    // Catmull-Rom → cubic Bézier
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
      const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
      const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
      d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)},${c2[0].toFixed(1)} ${c2[1].toFixed(1)},${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
    }
    main.setAttribute('d', d); ghost.setAttribute('d', d);
    ghost.setAttribute('transform', 'translate(1.6 1.1)');
    L = main.getTotalLength();
    [main, ghost].forEach(p => p.style.strokeDasharray = `${L} ${L}`);
    paint(cur);
  }
  function paint(v){
    const off = L * (1 - Math.min(v, 1));
    main.style.strokeDashoffset = off; ghost.style.strokeDashoffset = off + 6;
    if (v <= 0 || v >= 1) { tip.setAttribute('cx', -20); tip.setAttribute('cy', -20); return; }
    const pt = main.getPointAtLength(L * v);
    tip.setAttribute('cx', pt.x); tip.setAttribute('cy', pt.y);
  }
  function to(v, dur = 1000){
    target = v; cancelAnimationFrame(raf);
    if (reduce || !dur) { cur = v; paint(cur); return; }
    const from = cur, t0 = performance.now();
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const step = now => { const t = Math.min(1, (now - t0) / dur); cur = from + (target - from) * ease(t); paint(cur); if (t < 1) raf = requestAnimationFrame(step); };
    raf = requestAnimationFrame(step);
  }
  addEventListener('resize', () => { clearTimeout(build.t); build.t = setTimeout(build, 120); });
  return { build, to, get value(){ return target }, show(v){ svg.style.opacity = v ? 1 : 0 } };
})();

/* ---------------- small building blocks ---------------- */
const underline = () => `<svg class="draw" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M1 6 C 18 3, 36 8, 54 5 S 86 3, 99 6"/></svg>`;
const circle = () => `<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M10 24 C 8 8, 62 1, 90 9 C 104 14, 97 35, 58 38 C 26 41, 1 33, 5 18 C 7 10, 22 5, 36 4"/></svg>`;
const qTitle = (lines, id, cls = '') => `<h2 class="q ${cls}" id="${id}">${lines.map((l, i) => `<span class="ln"><span style="--i:${i}">${l}</span></span>`).join('')}</h2>`;
const labelRow = (txt, extra = '') => `<div class="label"><span class="dash"></span><span>${txt}</span>${extra}</div>`;
const navRow = ({ skip = false, next = 'Continue →', hint = 'Press Enter ↵' } = {}) => `
  <div class="nav">
    <button class="ghost-btn" data-act="back" data-hot>← Back</button>
    <div class="right">
      ${hint ? `<span class="hint">${hint}</span>` : ''}
      ${skip ? `<button class="ghost-btn" data-act="skip" data-hot>${skip}</button>` : ''}
      <button class="btn" data-act="next" data-hot>${editReturn ? 'Back to the brief →' : next}${underline()}</button>
    </div>
  </div>`;

/* TextInput */
const textField = ({ id, type = 'text', value = '', placeholder, autocomplete, inputmode, labelledby, disabled = false }) => `
  <div class="field">
    <input id="${id}" name="${id}" type="${type}" value="${esc(value)}" placeholder="${placeholder}" ${autocomplete ? `autocomplete="${autocomplete}"` : ''} ${inputmode ? `inputmode="${inputmode}"` : ''} aria-labelledby="${labelledby}" aria-describedby="${id}-err" ${disabled ? 'disabled' : ''} spellcheck="false">
    ${underline()}
  </div>
  <p class="err" id="${id}-err" role="alert"></p>`;

/* QuestionScreen shell */
function questionShell({ theme, label, lines, qcls = '', body, nav, extraCls = '', aside = '' }){
  return `<section class="screen ${extraCls}" data-theme-name="${theme}">
    <div>${label}${qTitle(lines, 'qt', qcls)}${aside}</div>
    <div class="answer" style="max-width:none">${body}</div>
    ${nav}
  </section>`;
}

/* ---------------- screen builders ---------------- */
const screens = {
  name: () => questionShell({
    label: labelRow('First things first.'), lines: ['What do', 'we call you?'],
    body: `<div style="max-width:880px">${textField({ id:'f-name', value:S.name, placeholder:'Your name', autocomplete:'name', labelledby:'qt' })}</div>`,
    nav: navRow(),
  }),
  company: () => questionShell({
    label: labelRow('Now we know you.', S.name ? `<span class="hand" style="font-size:1.5rem;letter-spacing:0;text-transform:none;transform:rotate(-3deg);display:inline-block">nice to meet you, ${esc(first(S.name))}.</span>` : ''),
    lines: ['Where are you', 'making things', 'happen?'],
    body: `<div style="max-width:880px">${textField({ id:'f-company', value:S.company, placeholder:'Company / brand name', autocomplete:'organization', labelledby:'qt', disabled:S.solo })}</div>
      <div class="or-row"><span class="or">or, equally good —</span>
      <button class="solo" id="soloBtn" aria-pressed="${S.solo}" data-hot>Just me, for now.${circle()}</button></div>`,
    nav: navRow(),
  }),
  email: () => questionShell({
    label: labelRow('So we can write back.'), lines: ['Where should', 'we find you?'],
    body: `<div style="max-width:880px">${textField({ id:'f-email', type:'email', value:S.email, placeholder:'Email address', autocomplete:'email', inputmode:'email', labelledby:'qt' })}</div>
      <p class="micro" style="margin:0">We promise not to become that newsletter.</p>`,
    nav: navRow(),
  }),
  phone: () => questionShell({
    label: labelRow('Only if you like.'), lines: ['And the', 'famous', '10 digits?'],
    body: `<div style="max-width:880px">${textField({ id:'f-phone', type:'tel', value:S.phone, placeholder:'Phone number', autocomplete:'tel', inputmode:'tel', labelledby:'qt' })}</div>
      <p class="micro" style="margin:0">Optional. Some conversations are better spoken.</p>`,
    nav: navRow({ skip:'Skip →' }),
  }),
  direction: () => questionShell({
    extraCls: 'gridded',
    label: labelRow('Now the interesting part.', `<span style="opacity:.55">Pick one, or several</span>`),
    lines: ['What are we', 'getting', 'ourselves into?'], qcls: 'long',
    body: cardsBody() + `<p class="err" id="dir-err" role="alert"></p>`,
    nav: navRow({ hint:'Keys A–F to mark · Enter to continue' }),
  }),
  story: () => questionShell({
    label: labelRow('No need to make it sound professional.'), lines: ['Give us', 'the messy', 'version.'],
    body: storyBody(),
    nav: navRow({ hint:'⌘ / Ctrl + Enter to continue' }),
  }),
  ambition: () => questionShell({
    label: labelRow('Be honest. It helps.'), lines: ['How ambitious', 'are we allowed', 'to be?'], qcls: 'long',
    body: panelsBody() + `<p class="err" id="amb-err" role="alert"></p>`,
    nav: navRow({ hint:'Keys A–D to choose' }),
  }),
  timeline: () => questionShell({
    label: labelRow('One last thing.'), lines: ['When does this', 'need to exist', 'in the real world?'], qcls: 'long',
    body: rowsBody() + `<p class="err" id="tl-err" role="alert"></p>`,
    nav: navRow({ hint:'Keys A–D to choose' }),
  }),
  upload: () => questionShell({
    label: labelRow('Optional, but useful.'), lines: ['Got something', 'we should see?'],
    aside: `<p class="aside" style="margin:18px 0 0">A brief. A deck. A sketch.<br>A screenshot from your Notes app.<br>We’re not judging.</p>`,
    body: uploadBody(),
    nav: navRow({ skip: S.files.length ? false : 'Skip this →', next: S.files.length ? 'Continue →' : 'Continue →', hint:'' }),
  }),
  review: () => reviewScreen(),
  success: () => successScreen(),
};

/* ChoiceCards (multi-select) — the last card deliberately sits outside the grid */
function cardsBody(){
  return `<div class="cards" role="group" aria-labelledby="qt">${DIRECTIONS.map(([k, t], i) => {
    const on = S.directions.includes(k), brk = k === 'unknown';
    return `<button class="card${brk ? ' break' : ''}" data-dir="${k}" aria-pressed="${on}" data-hot>
      <span class="k"><span>${'ABCDEF'[i]}</span><span class="m">Marked</span></span>
      <span><span class="t">${t}${circle()}</span>${brk ? `<span class="aside" style="display:block;margin-top:8px">A perfectly good answer.</span>` : ''}</span>
      <span class="u"></span></button>`;
  }).join('')}</div>`;
}
/* ProjectStory */
function storyBody(){
  return `<div class="story-wrap">
    <p class="prompts"><span>The idea.</span><span>The problem.</span><span>The half-thought.</span><span>The thing someone said couldn’t be done.</span></p>
    <div class="canvas">
      <textarea id="f-story" aria-labelledby="qt" aria-describedby="f-story-err" placeholder="Start anywhere...">${esc(S.story)}</textarea>
      <div class="count"><span id="wc">${wc(S.story)}</span><span>Rough is fine</span></div>
      <p class="err" id="f-story-err" role="alert"></p>
    </div></div>`;
}
/* ChoiceCards (single, ambition) */
function panelsBody(){
  return `<div class="panels" role="radiogroup" aria-labelledby="qt">${AMBITION.map(([k, t, d], i) => `
    <button class="panel" role="radio" data-amb="${k}" aria-checked="${S.ambition === k}" tabindex="${(S.ambition ? S.ambition === k : i === 0) ? 0 : -1}" data-hot>
      <span class="k">${'ABCD'[i]}</span>
      <span><span class="t">${t}<svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="M1 5 C 16 9, 30 2, 48 6 S 80 3, 99 5"/></svg></span></span>
      <span class="d">${d}</span></button>`).join('')}</div>`;
}
/* ChoiceCards (single, timeline) */
function rowsBody(){
  return `<div class="rows" role="radiogroup" aria-labelledby="qt">${TIMELINE.map(([k, t], i) => `
    <button class="row" role="radio" data-tl="${k}" aria-checked="${S.timeline === k}" tabindex="${(S.timeline ? S.timeline === k : i === 0) ? 0 : -1}" data-hot>
      <span class="dot"><svg viewBox="0 0 26 26" aria-hidden="true"><circle cx="13" cy="13" r="8"/><path pathLength="1" d="M6 15 C 4 6, 15 2, 21 7 C 26 12, 20 23, 12 22 C 6 21, 4 15, 8 10"/></svg></span>
      <span class="t">${t}</span><span class="k">${'ABCD'[i]}</span></button>`).join('')}</div>`;
}
/* FileUpload */
function uploadBody(){
  return `<div class="drop" id="drop">
      <span class="cm a"></span><span class="cm b"></span><span class="cm c"></span><span class="cm d"></span>
      <div><div class="big">Drop it here</div><div class="or2">or</div>
      <label class="btn" for="f-files" data-hot style="display:inline-block;cursor:pointer">Choose a file${underline()}</label>
      <input class="sr" type="file" id="f-files" multiple></div>
    </div>
    <ul class="files" id="fileList" aria-live="polite">${fileItems()}</ul>
    <p class="err" id="up-err" role="alert"></p>`;
}
const fileItems = () => S.files.map((f, i) => `<li><span class="n">${esc(f.name)}</span><span style="display:flex;gap:16px;align-items:center;white-space:nowrap"><span style="opacity:.55">${size(f.size)}</span><button data-rm="${i}" data-hot>Remove</button></span></li>`).join('');

/* BriefReview */
function reviewScreen(){
  const dirs = S.directions.map(k => DIRECTIONS.find(d => d[0] === k)[1]).join(' + ');
  const amb = AMBITION.find(a => a[0] === S.ambition), tl = TIMELINE.find(t => t[0] === S.timeline);
  const story = S.story.trim(), excerpt = story.length > 170 ? story.slice(0, 170).replace(/\s+\S*$/, '') + '…' : story;
  const item = (l, v, step, cls = '') => `<div class="item"><span class="l">${l}</span><span class="v ${cls}">${v}</span><button class="e" data-edit="${step}" data-hot aria-label="Edit ${l}">Edit →</button></div>`;
  const today = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }).toUpperCase();
  return `<section class="screen review" data-theme-name="light">
    <div>${labelRow('Look what we made.')}${qTitle(['This is starting', 'to look like', 'something.'], 'qt')}</div>
    <div class="answer" style="max-width:none">
      <article class="sheet" aria-labelledby="qt">
        <div class="hd"><span>Brief / draft 01</span><span class="y">Not sent yet</span><span>${today}</span></div>
        ${item('Name', esc(S.name), 'name')}
        ${item('Company', S.solo ? 'Just me, for now' : esc(S.company), 'company')}
        ${item('Direction', esc(dirs), 'direction')}
        ${item('The messy version', `“${esc(excerpt)}”`, 'story', 'q2')}
        ${item('Ambition', esc(amb ? amb[1] : ''), 'ambition')}
        ${item('Timeline', esc(tl ? tl[1] : ''), 'timeline')}
        ${item('Attachments', S.files.length ? `${S.files.length} file${S.files.length > 1 ? 's' : ''}` : '<span class="none">None</span>', 'upload')}
        <p class="foot">We’ll reply to the email you gave us. Your contact details stay off this page.</p>
      </article>
    </div>
    <div class="nav">
      <button class="ghost-btn" data-act="back" data-hot>← Back</button>
      <div class="right"><p class="err" id="send-err" role="alert"></p><button class="btn btn-big" id="sendBtn" data-hot>Send the brief →${underline()}</button></div>
    </div>
  </section>`;
}
/* SuccessScreen */
function successScreen(){
  const ref = window.__briefRef || ('13P-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 5).toUpperCase());
  return `<section class="screen success" data-theme-name="dark">
    <div class="label" style="color:var(--paper)"><span class="dash"></span><span>Brief received / 13P</span></div>
    <div style="align-self:center; display:grid; gap:clamp(18px,3vh,30px)">
      ${qTitle(["It’s officially", 'an idea now.'], 'qt')}
      <p class="sub">We’ll take it from here.</p>
      <span class="hand note">See? That wasn’t a form.</span>
    </div>
    <div class="nav" style="align-items:end">
      <span class="status">Reference ${ref}</span>
      <a class="btn btn-big" href="/" data-hot>Back to 13th Pencil →${underline()}</a>
    </div>
  </section>`;
}

/* ---------------- helpers ---------------- */
function first(n){ return n.trim().split(/\s+/)[0] }
function wc(s){ const n = s.trim() ? s.trim().split(/\s+/).length : 0; return n === 1 ? '1 word' : `${n} words` }
function size(b){ return b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.max(1, Math.round(b / 1024)) + ' KB' }
function setErr(id, msg){ const e = document.getElementById(id); if (e) e.textContent = msg || '' }

/* ---------------- validation: personality, but clear ---------------- */
function validate(){
  const id = STEPS[idx].id;
  if (id === 'name') {
    S.name = $('#f-name').value.trim();
    if (!S.name) return setErr('f-name-err', 'We’ll need something to call you. A first name is plenty.'), focusEl('#f-name'), false;
  }
  if (id === 'company') {
    S.company = $('#f-company').value.trim();
    if (!S.company && !S.solo) return setErr('f-company-err', 'Add a company or brand name, or choose “Just me, for now”.'), focusEl('#f-company'), false;
  }
  if (id === 'email') {
    S.email = $('#f-email').value.trim();
    if (!S.email) return setErr('f-email-err', 'We need an email to write back to you.'), focusEl('#f-email'), false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(S.email)) return setErr('f-email-err', 'Something looks off. Give that email another look.'), focusEl('#f-email'), false;
  }
  if (id === 'phone') {
    S.phone = $('#f-phone').value.trim();
    const digits = S.phone.replace(/\D/g, '');
    if (S.phone && (digits.length < 7 || digits.length > 15 || /[^\d\s()+.-]/.test(S.phone))) return setErr('f-phone-err', 'That number doesn’t look quite right. Check it, or skip this one.'), focusEl('#f-phone'), false;
  }
  if (id === 'direction' && !S.directions.length) return setErr('dir-err', 'Mark at least one. “I don’t know yet” counts.'), false;
  if (id === 'story') {
    S.story = $('#f-story').value;
    if (!S.story.trim()) return setErr('f-story-err', 'Even one rough sentence helps. Start anywhere.'), focusEl('#f-story'), false;
  }
  if (id === 'ambition' && !S.ambition) return setErr('amb-err', 'Pick the one closest to where you are. “Let’s talk first” is fine.'), false;
  if (id === 'timeline' && !S.timeline) return setErr('tl-err', 'Choose the closest one. “We’re exploring” is a real answer.'), false;
  return true;
}
function focusEl(sel){ const el = $(sel); if (el) el.focus({ preventScroll:true }) }
function saveCurrent(){ // keep answers when moving backwards
  const m = { name:'#f-name', company:'#f-company', email:'#f-email', phone:'#f-phone', story:'#f-story' };
  const id = STEPS[idx].id; if (m[id] && $(m[id])) S[id] = id === 'story' ? $(m[id]).value : $(m[id]).value.trim();
}

/* ---------------- navigation ---------------- */
function go(to, opts = {}){
  if (busy || to < 0 || to >= STEPS.length) return;
  busy = true;
  const old = $('#stage .screen');
  const swap = () => { old && old.remove(); idx = to; render(opts.focus !== false); busy = false; };
  if (old && !reduce) { old.classList.add('leaving'); setTimeout(swap, 330); } else swap();
}
function next(){
  if (!validate()) return;
  if (editReturn) { editReturn = false; return go(STEPS.findIndex(s => s.id === 'review')); }
  go(idx + 1);
}
function back(){
  if (idx === 0) return;
  saveCurrent();
  if (editReturn) { editReturn = false; return go(STEPS.findIndex(s => s.id === 'review')); }
  go(idx - 1);
}

function render(focus = true){
  const st = STEPS[idx];
  document.body.classList.toggle('light', st.theme === 'light');
  $('#count').textContent = st.n ? `${String(st.n).padStart(2, '0')} / 08` : (st.id === 'upload' ? 'Extra' : st.id === 'review' ? 'Review' : '');
  $('#phrase').textContent = st.phrase || '';
  Line.show(st.id !== 'success');
  Line.to(st.p + (st.id === 'story' ? storyBonus() : 0), 1100);
  const stage = $('#stage');
  if (st.id === 'intro') { stage.innerHTML = introHTML; bindIntro(); }
  else { stage.insertAdjacentHTML('beforeend', screens[st.id]()); bind(st.id); }
  scrollTo({ top:0 });
  $('#announce').textContent = st.n ? `Question ${st.n} of 8` : st.id === 'review' ? 'Review your brief' : st.id === 'success' ? 'Brief sent' : '';
  if (!focus) return;
  setTimeout(() => {
    const t = $('#stage .screen input:not([type=file]):not(:disabled), #stage .screen textarea, #stage .card, #stage [role=radio][tabindex="0"], #stage .btn');
    t && t.focus({ preventScroll:true });
  }, reduce ? 0 : 420);
}
const introHTML = $('#stage').innerHTML;

/* ---------------- binding per screen ---------------- */
function bindIntro(){ $('#startBtn').addEventListener('click', () => go(1)); }

function bind(id){
  const scr = $('#stage .screen:last-child');
  scr.querySelectorAll('[data-act="next"]').forEach(b => b.addEventListener('click', next));
  scr.querySelectorAll('[data-act="back"]').forEach(b => b.addEventListener('click', back));
  scr.querySelectorAll('[data-act="skip"]').forEach(b => b.addEventListener('click', () => {
    if (id === 'phone') S.phone = '';
    if (editReturn) { editReturn = false; return go(STEPS.findIndex(s => s.id === 'review')); }
    go(idx + 1);
  }));
  scr.querySelectorAll('input:not([type=file])').forEach(inp => {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); next(); } });
    inp.addEventListener('input', () => setErr(inp.id + '-err', ''));
  });

  if (id === 'company') {
    const btn = $('#soloBtn'), inp = $('#f-company');
    btn.addEventListener('click', () => {
      S.solo = !S.solo; btn.setAttribute('aria-pressed', S.solo); inp.disabled = S.solo; setErr('f-company-err', '');
      if (S.solo) { S.company = ''; inp.value = ''; } else inp.focus();
    });
  }
  if (id === 'direction') {
    scr.querySelectorAll('.card').forEach(c => c.addEventListener('click', () => toggleDir(c)));
  }
  if (id === 'story') {
    const ta = $('#f-story');
    ta.addEventListener('input', () => {
      S.story = ta.value; $('#wc').textContent = wc(ta.value); setErr('f-story-err', '');
      Line.to(STEPS[idx].p + storyBonus(), 500); // the line keeps travelling while they write
    });
    ta.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); next(); } });
  }
  if (id === 'ambition') radios(scr, '.panel', 'amb', k => { S.ambition = k; setErr('amb-err', ''); });
  if (id === 'timeline') radios(scr, '.row', 'tl', k => { S.timeline = k; setErr('tl-err', ''); });
  if (id === 'upload') bindUpload(scr);
  if (id === 'review') {
    scr.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => { editReturn = true; go(STEPS.findIndex(s => s.id === b.dataset.edit)); }));
    $('#sendBtn').addEventListener('click', send);
  }
}
function storyBonus(){ return Math.min(.07, S.story.trim().length / 2600) }
function toggleDir(c){
  const k = c.dataset.dir, on = c.getAttribute('aria-pressed') !== 'true';
  c.setAttribute('aria-pressed', on);
  S.directions = on ? [...S.directions, k] : S.directions.filter(x => x !== k);
  setErr('dir-err', '');
}
/* radio groups with arrow-key support */
function radios(scr, sel, attr, onPick){
  const items = [...scr.querySelectorAll(sel)];
  const pick = (el, focus) => {
    items.forEach(i => { i.setAttribute('aria-checked', i === el); i.tabIndex = i === el ? 0 : -1; });
    onPick(el.dataset[attr]); if (focus) el.focus();
  };
  items.forEach((el, i) => {
    el.addEventListener('click', () => pick(el));
    el.addEventListener('keydown', e => {
      const d = { ArrowDown:1, ArrowRight:1, ArrowUp:-1, ArrowLeft:-1 }[e.key];
      if (d) { e.preventDefault(); pick(items[(i + d + items.length) % items.length], true); }
    });
  });
}
function bindUpload(scr){
  const drop = $('#drop'), input = $('#f-files');
  const add = list => {
    const MAX = 25 * 1048576; let rejected = 0;
    [...list].forEach(f => { if (f.size > MAX) rejected++; else S.files.push(f); });
    setErr('up-err', rejected ? `${rejected === 1 ? 'One file is' : rejected + ' files are'} over 25 MB. Send a link in the messy version instead.` : '');
    refreshFiles(scr);
  };
  input.addEventListener('change', () => { add(input.files); input.value = ''; });
  ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', e => e.dataTransfer && add(e.dataTransfer.files));
  scr.addEventListener('click', e => { const b = e.target.closest('[data-rm]'); if (b) { S.files.splice(+b.dataset.rm, 1); refreshFiles(scr); } });
}
function refreshFiles(scr){
  $('#fileList').innerHTML = fileItems();
  const skip = scr.querySelector('[data-act="skip"]'); if (skip) skip.hidden = !!S.files.length;
}

/* ---------------- submission moment ---------------- */
async function send(){
  const btn = $('#sendBtn'); if (busy) return; busy = true;
  btn.classList.add('press'); btn.setAttribute('aria-busy', 'true');

  /* ------------------------------------------------------------------
     BACKEND CONNECTION POINT
     In production, replace simulateSubmit() with a real request, e.g.:
       const fd = new FormData();
       Object.entries({ name:S.name, company:S.solo ? '' : S.company, solo:S.solo,
         email:S.email, phone:S.phone, directions:S.directions.join(','),
         story:S.story, ambition:S.ambition, timeline:S.timeline })
         .forEach(([k, v]) => fd.append(k, v));
       S.files.forEach(f => fd.append('files', f));
       await fetch('/api/briefs', { method:'POST', body:fd });
     On failure: stay on the review screen and show an error in #send-err.
     ------------------------------------------------------------------ */
  let request;
  try { request = submitBrief(); }
  catch (err) { busy = false; btn.classList.remove('press'); btn.removeAttribute('aria-busy'); setErr('send-err', err.message || 'Could not send. Try again.'); return; }

  try { await request; } catch (err) {
    busy = false; btn.classList.remove('press'); btn.removeAttribute('aria-busy');
    setErr('send-err', err.message || 'Could not send the brief. Try again.');
    return;
  }
  if (reduce) { busy = false; return go(STEPS.length - 1); }
  await wait(160);
  Line.to(1, 650);
  await wait(260);
  sweep();
  await wait(520);
  $('#wipe').classList.add('go');
  await wait(640);
  const old = $('#stage .screen'); old && old.remove();
  idx = STEPS.length - 1; render();
  requestAnimationFrame(() => { const w = $('#wipe'); w.style.transition = 'opacity .5s'; w.style.opacity = 0; setTimeout(() => { w.className = ''; w.removeAttribute('style'); }, 520); });
  $('#sweep').innerHTML = '';
  busy = false;
}
async function submitBrief(){
  const fd = new FormData();
  fd.append('name', S.name);
  fd.append('company', S.solo ? '' : S.company);
  fd.append('solo', S.solo ? '1' : '0');
  fd.append('email', S.email);
  fd.append('phone', S.phone);
  fd.append('directions', S.directions.join(','));
  fd.append('story', S.story);
  fd.append('ambition', S.ambition);
  fd.append('timeline', S.timeline);
  S.files.forEach(f => fd.append('files', f));
  const res = await fetch('/api/briefs', { method:'POST', body: fd });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Could not send the brief. Try again.');
  window.__briefRef = data.reference || '';
  return data;
}
function simulateSubmit(){ return submitBrief(); }
const wait = ms => new Promise(r => setTimeout(r, ms));
function sweep(){
  const w = innerWidth, h = innerHeight, s = $('#sweep');
  s.setAttribute('viewBox', `0 0 ${w} ${h}`);
  const d = `M${-40} ${h * .78} C ${w * .22} ${h * .92}, ${w * .34} ${h * .2}, ${w * .55} ${h * .42} S ${w * .86} ${h * .9}, ${w + 160} ${h * .06}`;
  s.innerHTML = `<path d="${d}" stroke-width="${Math.max(6, Math.min(w, h) * .018)}" pathLength="1" style="stroke-dasharray:1 1; stroke-dashoffset:1; transition:stroke-dashoffset .55s cubic-bezier(.7,0,.3,1)"/>`;
  requestAnimationFrame(() => requestAnimationFrame(() => { s.firstChild.style.strokeDashoffset = 0; }));
}

/* ---------------- global keys ---------------- */
addEventListener('keydown', e => {
  const st = STEPS[idx].id, tag = (e.target.tagName || '').toLowerCase();
  if (e.key === 'Escape' && st !== 'intro' && st !== 'success') { e.preventDefault(); back(); return; }
  if (tag === 'input' || tag === 'textarea' || e.metaKey || e.ctrlKey || e.altKey) return;
  const letter = e.key.length === 1 ? 'ABCDEF'.indexOf(e.key.toUpperCase()) : -1;
  if (st === 'direction' && letter > -1 && letter < 6) { e.preventDefault(); toggleDir($$('.card')[letter]); return; }
  if ((st === 'ambition' || st === 'timeline') && letter > -1 && letter < 4) { e.preventDefault(); $$(st === 'ambition' ? '.panel' : '.row')[letter].click(); return; }
  if (e.key === 'Enter' && ['direction', 'ambition', 'timeline', 'upload'].includes(st) && !e.target.closest('button,label,a')) { e.preventDefault(); next(); }
});
const $$ = s => [...document.querySelectorAll(s)];

/* ---------------- cursor detail ---------------- */
if (matchMedia('(pointer:fine)').matches && !reduce) {
  const c = $('#cur'); let x = -50, y = -50, tx = -50, ty = -50;
  addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; c.style.opacity = 1; c.classList.toggle('hot', !!e.target.closest('[data-hot]')); });
  document.addEventListener('pointerleave', () => c.style.opacity = 0);
  (function loop(){ x += (tx - x) * .22; y += (ty - y) * .22; c.style.transform = `translate(${x}px,${y}px)`; requestAnimationFrame(loop); })();
}

/* paper texture used on card hover */
document.documentElement.style.setProperty('--tex', `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='p'><feTurbulence type='fractalNoise' baseFrequency='1.2' numOctaves='3'/><feColorMatrix values='0 0 0 0 .08  0 0 0 0 .07  0 0 0 0 .05  0 0 0 .08 0'/></filter><rect width='100%' height='100%' filter='url(%23p)'/></svg>")`);

/* ---------------- boot (keeps answers across a live republish) ---------------- */
function start(saved){
  if (saved && saved.S) { Object.assign(S, saved.S, { files:[] }); idx = Math.min(saved.idx || 0, STEPS.length - 2); }
  Line.build();
  if (idx) { $('#stage').innerHTML = ''; render(false); } else { bindIntro(); Line.to(STEPS[0].p, 1400); }
  window.claude?.hot?.snapshot?.(() => ({ S:{ ...S, files:[] }, idx }));
}
window.claude?.hot?.ready ? window.claude.hot.ready(start) : start(window.claude?.hot?.data ?? {});
})();
