(function () {
  "use strict";
  document.querySelectorAll(".faq").forEach(function (faq) {
    faq.querySelectorAll("details").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        faq.querySelectorAll("details[open]").forEach(function (other) {
          if (other !== item) other.open = false;
        });
      });
    });
  });
})();
