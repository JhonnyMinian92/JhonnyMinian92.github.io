document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const navActions = document.querySelector(".nav-actions");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);

  if (prefersReducedMotion) body.classList.add("motion-reduced");

  const closeMenu = () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    navActions?.classList.remove("is-open");
    body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    navActions?.classList.toggle("is-open", !open);
    body.classList.toggle("menu-open", !open);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      closeMenu();
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    });
  });

  const setHeaderState = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);
  window.addEventListener("scroll", setHeaderState, { passive: true });
  window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });
  setHeaderState();

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16 });
    document.querySelectorAll(".reveal").forEach((item) => revealObserver.observe(item));
  } else {
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
  }

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 });
    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const buttons = [...tabs.querySelectorAll(".tab-button")];
    const panels = [...tabs.querySelectorAll(".tab-panel")];
    const activate = (button) => {
      const target = tabs.querySelector(`#${button.getAttribute("aria-controls")}`);
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
        item.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        const active = panel === target;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    };
    buttons.forEach((button, index) => {
      button.tabIndex = button.classList.contains("is-active") ? 0 : -1;
      button.addEventListener("click", () => activate(button));
      button.addEventListener("keydown", (event) => {
        const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
        if (!direction) return;
        event.preventDefault();
        activate(buttons[(index + direction + buttons.length) % buttons.length]);
        buttons[(index + direction + buttons.length) % buttons.length].focus();
      });
    });
  });

  document.querySelectorAll(".contact-button, .btn, .nav-link, .social-link, .tab-button").forEach((control) => {
    control.addEventListener("pointerdown", (event) => {
      if (prefersReducedMotion) return;
      const ripple = document.createElement("span");
      const rect = control.getBoundingClientRect();
      ripple.className = "ripple";
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      control.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    });
  });

  // The carousel markup is intentionally static in index.html so it is visible
  // in View Source and works without JavaScript for its first project card.
  const projectGrid = document.querySelector("#proyectos .project-grid");
  const track = projectGrid?.querySelector(".production-track");
  const cards = projectGrid ? [...projectGrid.querySelectorAll(".production-card")] : [];
  const dots = projectGrid ? [...projectGrid.querySelectorAll(".production-dot")] : [];
  const counter = projectGrid?.querySelector(".production-counter");
  const viewport = projectGrid?.querySelector(".production-viewport");

  if (!projectGrid || !track || cards.length === 0 || !viewport) return;

  let current = 0;
  let timer = null;
  let startX = 0;

  const update = () => {
    const gap = parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "16") || 16;
    const cardWidth = cards[0].getBoundingClientRect().width + gap;
    const maxOffset = Math.max(0, track.scrollWidth - viewport.clientWidth);
    const offset = Math.min(current * cardWidth, maxOffset);
    track.style.transform = `translate3d(${-offset}px,0,0)`;
    cards.forEach((card, index) => card.classList.toggle("is-active", index === current));
    dots.forEach((dot, index) => dot.classList.toggle("is-active", index === current));
    if (counter) counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
  };

  const restart = () => {
    clearInterval(timer);
    if (!prefersReducedMotion) timer = setInterval(() => goTo(current + 1), 5200);
  };

  const goTo = (index, manual = false) => {
    current = (index + cards.length) % cards.length;
    update();
    if (manual) restart();
  };

  projectGrid.querySelector("[data-production-prev]")?.addEventListener("click", () => goTo(current - 1, true));
  projectGrid.querySelector("[data-production-next]")?.addEventListener("click", () => goTo(current + 1, true));
  dots.forEach((dot) => dot.addEventListener("click", () => goTo(Number(dot.dataset.index), true)));
  viewport.addEventListener("mouseenter", () => clearInterval(timer));
  viewport.addEventListener("mouseleave", restart);
  viewport.addEventListener("touchstart", (event) => { startX = event.touches[0].clientX; }, { passive: true });
  viewport.addEventListener("touchend", (event) => {
    const delta = event.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 45) goTo(current + (delta < 0 ? 1 : -1), true);
  }, { passive: true });
  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") goTo(current - 1, true);
    if (event.key === "ArrowRight") goTo(current + 1, true);
  });

  window.addEventListener("resize", update);
  update();
  restart();
});