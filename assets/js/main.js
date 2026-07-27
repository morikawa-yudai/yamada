(() => {
  const body = document.body;
  const header = document.getElementById("header");
  const menuButton = document.getElementById("menu-button");
  const nav = document.getElementById("global-nav");
  const pageTop = document.getElementById("page-top");
  const floatingLinks = document.querySelector(".floating-links");

  const updateChrome = () => {
    const scrolled = window.scrollY > 24;
    header?.classList.toggle("scrolled", scrolled);
    pageTop?.classList.toggle("visible", window.scrollY > 600);
    floatingLinks?.classList.toggle("is-over-hero", window.scrollY < 180);
  };

  menuButton?.addEventListener("click", () => {
    const open = !body.classList.contains("menu-open");
    body.classList.toggle("menu-open", open);
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("menu-open");
      menuButton?.setAttribute("aria-expanded", "false");
      menuButton?.setAttribute("aria-label", "メニューを開く");
    });
  });

  pageTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const reveals = document.querySelectorAll(".reveal");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    reveals.forEach((node) => node.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach((node) => observer.observe(node));
  }

  window.addEventListener("scroll", updateChrome, { passive: true });
  updateChrome();
})();
