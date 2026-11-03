(() => {
  const header = document.getElementById("siteHeader");
  const burger = document.getElementById("siteBurger");
  const menu = document.getElementById("siteMenu");
  const aboutItem = document.querySelector("[data-tpb-about]");
  const aboutTrigger = document.querySelector("[data-tpb-about-trigger]");
  const mobileAboutBtn = document.querySelector("[data-tpb-mobile-about-btn]");
  const mobileAboutList = document.getElementById("tpbMobileAbout");

  let aboutCloseTimer = 0;

  function setMenuOpen(open) {
    if (!menu || !burger || !header) return;
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    header.classList.toggle("is-menu-open", open);
    document.documentElement.classList.toggle("tpb-menu-open", open);
    if (!open && mobileAboutBtn && mobileAboutList) {
      mobileAboutBtn.setAttribute("aria-expanded", "false");
      mobileAboutList.classList.remove("is-open");
    }
  }

  function openAbout() {
    window.clearTimeout(aboutCloseTimer);
    if (!aboutItem || !aboutTrigger) return;
    aboutItem.classList.add("is-open");
    aboutTrigger.setAttribute("aria-expanded", "true");
  }

  function scheduleCloseAbout() {
    window.clearTimeout(aboutCloseTimer);
    aboutCloseTimer = window.setTimeout(() => {
      if (!aboutItem || !aboutTrigger) return;
      aboutItem.classList.remove("is-open");
      aboutTrigger.setAttribute("aria-expanded", "false");
    }, 160);
  }

  if (burger && menu) {
    burger.addEventListener("click", () => {
      setMenuOpen(!menu.classList.contains("is-open"));
    });
  }

  if (aboutItem && aboutTrigger) {
    aboutItem.addEventListener("mouseenter", openAbout);
    aboutItem.addEventListener("mouseleave", scheduleCloseAbout);
    aboutTrigger.addEventListener("focus", openAbout);
    aboutItem.addEventListener("focusin", openAbout);
    aboutItem.addEventListener("focusout", (e) => {
      if (!aboutItem.contains(e.relatedTarget)) scheduleCloseAbout();
    });
  }

  if (mobileAboutBtn && mobileAboutList) {
    mobileAboutBtn.addEventListener("click", () => {
      const open = mobileAboutBtn.getAttribute("aria-expanded") !== "true";
      mobileAboutBtn.setAttribute("aria-expanded", open ? "true" : "false");
      mobileAboutList.classList.toggle("is-open", open);
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      setMenuOpen(false);
      scheduleCloseAbout();
    }
  });
})();
