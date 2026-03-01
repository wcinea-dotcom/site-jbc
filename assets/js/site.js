/* =========================
   assets/site.js
   (menu dropdown + burger, sans casser ton design)
   ========================= */
(function () {
  // Dropdowns
  const toggles = document.querySelectorAll(".drop-toggle");
  toggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-target");
      const menu = document.getElementById(id);
      if (!menu) return;

      const isOpen = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("is-open", !isOpen);
    });
  });

  // Burger (mobile)
  const burger = document.getElementById("burger");
  const nav = document.getElementById("mainNav");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });
  }

  // Close dropdowns on outside click
  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof Element)) return;

    // Ignore clicks inside dropdown areas
    if (target.closest(".drop")) return;

    toggles.forEach(btn => btn.setAttribute("aria-expanded", "false"));
    document.querySelectorAll(".menu.is-open").forEach(m => m.classList.remove("is-open"));
  });
})();
