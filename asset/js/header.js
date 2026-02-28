// Dropdown + Burger menu (simple, stable)
document.addEventListener("DOMContentLoaded", () => {
  const burger = document.getElementById("hdr-burger");
  const nav = document.getElementById("hdr-nav");

  if (burger && nav) {
    burger.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });
  }

  // Dropdowns
  document.querySelectorAll(".hdr-drop").forEach((drop) => {
    const btn = drop.querySelector(".hdr-dropbtn");
    if (!btn) return;

    btn.addEventListener("click", (e) => {
      e.preventDefault();

      // fermer les autres
      document.querySelectorAll(".hdr-drop.is-open").forEach((d) => {
        if (d !== drop) d.classList.remove("is-open");
      });

      drop.classList.toggle("is-open");
    });
  });

  // cliquer hors menu = fermer
  document.addEventListener("click", (e) => {
    const inside = e.target.closest(".hdr-drop");
    if (!inside) {
      document.querySelectorAll(".hdr-drop.is-open").forEach((d) => d.classList.remove("is-open"));
    }
  });
});
