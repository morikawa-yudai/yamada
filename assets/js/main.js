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


  const hero = document.querySelector(".hero");
  const finePointer = window.matchMedia("(min-width: 761px) and (pointer: fine)").matches;
  if (hero && finePointer && !reducedMotion) {
    let heroFrame = 0;
    const updateHeroDepth = (event) => {
      if (heroFrame) cancelAnimationFrame(heroFrame);
      heroFrame = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
        const y = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
        hero.style.setProperty("--hero-x", `${x.toFixed(2)}px`);
        hero.style.setProperty("--hero-y", `${y.toFixed(2)}px`);
      });
    };
    hero.addEventListener("pointermove", updateHeroDepth, { passive: true });
    hero.addEventListener("pointerleave", () => {
      hero.style.setProperty("--hero-x", "0px");
      hero.style.setProperty("--hero-y", "0px");
    });
  }



  const heroVideo = hero?.querySelector(".hero-video");
  const desktopVideo = window.matchMedia("(min-width: 761px)").matches;
  if (hero && heroVideo && desktopVideo && !reducedMotion) {
    const showHeroVideo = () => hero.classList.add("hero-video-ready");
    if (heroVideo.readyState >= 2) showHeroVideo();
    else heroVideo.addEventListener("loadeddata", showHeroVideo, { once:true });
    heroVideo.play().catch(() => {});
  } else {
    heroVideo?.pause();
  }

  const heroPreviewImage = hero?.querySelector(".hero-preview-image");
  const heroKeywords = hero?.querySelector(".hero-keywords");
  const heroPreviewLinks = heroKeywords?.querySelectorAll("[data-hero-preview]") || [];
  if (hero && heroPreviewImage && heroKeywords && finePointer && !reducedMotion) {
    heroPreviewLinks.forEach((link) => {
      const source = link.dataset.heroPreview;
      if (source) {
        const preload = new Image();
        preload.src = source;
      }
      link.addEventListener("mouseenter", () => {
        heroKeywords.querySelectorAll("li").forEach((item) => item.classList.remove("is-active"));
        link.closest("li")?.classList.add("is-active");
        if (!source) {
          hero.classList.remove("is-previewing");
          return;
        }
        if (heroPreviewImage.getAttribute("src") !== source) {
          heroPreviewImage.classList.add("is-changing");
          heroPreviewImage.setAttribute("src", source);
        }
        const showPreview = () => {
          hero.classList.add("is-previewing");
          heroPreviewImage.classList.remove("is-changing");
        };
        if (heroPreviewImage.complete) showPreview();
        else heroPreviewImage.addEventListener("load", showPreview, { once:true });
      });
    });
    heroKeywords.addEventListener("mouseleave", () => {
      hero.classList.remove("is-previewing");
      heroKeywords.querySelectorAll("li").forEach((item) => item.classList.remove("is-active"));
    });
  }

  window.addEventListener("scroll", updateChrome, { passive: true });
  updateChrome();
})();
