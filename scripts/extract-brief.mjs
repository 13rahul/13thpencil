import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const src = process.argv[2] || "c:/Users/Dell/Downloads/Prototype form 13th Pencil.html";
const html = readFileSync(src, "utf8");
const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const css = html.match(/<style>([\s\S]*?)<\/style>/)?.[1];
if (!css) throw new Error("No CSS");

const js = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
if (!js) throw new Error("No JS");

const body = html.match(/<body>([\s\S]*)<script>/)?.[1];
if (!body) throw new Error("No body");

const wordmark = `<a class="wordmark" href="/" aria-label="13th Pencil, home"><span class="wm-type">13th Pencil</span></a>`;
const shell = body
  .replace(/<a class="wordmark"[\s\S]*?<\/a>/, wordmark)
  .replace(/href="https:\/\/13thpencil\.com"/g, 'href="/"');

let script = js
  .replace(
    `const request = simulateSubmit();`,
    `let request;
  try { request = submitBrief(); }
  catch (err) { busy = false; btn.classList.remove('press'); btn.removeAttribute('aria-busy'); setErr('send-err', err.message || 'Could not send. Try again.'); return; }`,
  )
  .replace(
    `function simulateSubmit(){ return wait(700) } // prototype only: pretends the server said yes`,
    `async function submitBrief(){
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
function simulateSubmit(){ return submitBrief(); }`,
  )
  .replace(
    `const ref = '13P-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 5).toUpperCase();`,
    `const ref = window.__briefRef || ('13P-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + Math.random().toString(36).slice(2, 5).toUpperCase());`,
  )
  .replace(
    `<div class="right"><button class="btn btn-big" id="sendBtn" data-hot>Send the brief →\${underline()}</button></div>`,
    `<div class="right"><p class="err" id="send-err" role="alert"></p><button class="btn btn-big" id="sendBtn" data-hot>Send the brief →\${underline()}</button></div>`,
  )
  .replace(
    `<a class="btn btn-big" href="https://13thpencil.com" target="_blank" rel="noopener" data-hot>Back to 13th Pencil →\${underline()}</a>`,
    `<a class="btn btn-big" href="/" data-hot>Back to 13th Pencil →\${underline()}</a>`,
  )
  .replace(
    `if (reduce) { await request; busy = false; return go(STEPS.length - 1); }
  await wait(160);
  Line.to(1, 650);                         // the journey completes, fast
  await wait(260);
  sweep();                                 // a stroke accelerates and leaves the grid
  await wait(520);
  $('#wipe').classList.add('go');          // brief screen transition
  await Promise.all([request, wait(640)]);`,
    `try { await request; } catch (err) {
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
  await wait(640);`,
  );

const extraCss = `
.wm-type{font-family:var(--grotesk);font-weight:800;font-stretch:110%;letter-spacing:-.04em;text-transform:uppercase;font-size:1.05rem;color:inherit}
body.light .wm-type{color:var(--ink)}
`;

mkdirSync(join(root, "public/assets/css"), { recursive: true });
mkdirSync(join(root, "public/assets/js"), { recursive: true });
mkdirSync(join(root, "components/brief"), { recursive: true });
writeFileSync(join(root, "public/assets/css/brief.css"), css + extraCss);
writeFileSync(join(root, "public/assets/js/brief.js"), script);
writeFileSync(join(root, "components/brief/shell.html"), shell.trim());
console.log("extracted brief assets");
