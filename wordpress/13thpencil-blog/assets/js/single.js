(() => {
  const article = document.querySelector("[data-tpb-article]");
  if (!article) return;

  const headings = [...article.querySelectorAll("h2")].filter((h) => h.textContent.trim());
  const firstP = article.querySelector(":scope > p");
  if (!headings.length || !firstP) return;

  headings.forEach((h, i) => {
    if (!h.id) {
      const slug = h.textContent
        .trim()
        .toLowerCase()
        .replace(/['’]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      h.id = slug || `section-${i + 1}`;
    }
  });

  const toc = document.createElement("nav");
  toc.className = "tpb-toc";
  toc.setAttribute("aria-label", "Table of contents");
  toc.innerHTML = `
    <p class="tpb-toc__label">In this piece</p>
    <ol class="tpb-toc__list">
      ${headings
        .map(
          (h) =>
            `<li><a href="#${h.id}">${h.textContent.trim()}</a></li>`,
        )
        .join("")}
    </ol>
  `;
  firstP.after(toc);
})();

(() => {
  const copied = "Copied";
  document.querySelectorAll("[data-tpb-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const url = btn.getAttribute("data-tpb-copy");
      if (!url) return;
      try {
        await navigator.clipboard.writeText(url);
      } catch (err) {
        const input = document.createElement("input");
        input.value = url;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        input.remove();
      }
      const previous = btn.getAttribute("aria-label") || "Copy link";
      btn.setAttribute("aria-label", copied);
      btn.classList.add("is-copied");
      window.setTimeout(() => {
        btn.setAttribute("aria-label", previous);
        btn.classList.remove("is-copied");
      }, 1600);
    });
  });
})();

(() => {
  const rail = document.querySelector(".tpb-share--float");
  const footer = document.querySelector(".tpb-contact") || document.querySelector(".tpb-footer");
  if (!rail || !footer) return;

  function syncShareRail() {
    const footerTop = footer.getBoundingClientRect().top;
    const hide = footerTop < window.innerHeight - 24;
    rail.classList.toggle("is-hidden", hide);
    rail.setAttribute("aria-hidden", hide ? "true" : "false");
  }

  window.addEventListener("scroll", syncShareRail, { passive: true });
  window.addEventListener("resize", syncShareRail);
  syncShareRail();
})();
