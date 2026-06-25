document.addEventListener("DOMContentLoaded", () => {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const body = document.body;
  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector(".menu-toggle");
  const navActions = document.querySelector(".nav-actions");
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (prefersReducedMotion) {
    body.classList.add("motion-reduced");
  }

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const closeMenu = () => {
    menuToggle?.setAttribute("aria-expanded", "false");
    navActions?.classList.remove("is-open");
    body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    navActions?.classList.toggle("is-open", !isOpen);
    body.classList.toggle("menu-open", !isOpen);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
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

  const revealItems = Array.from(document.querySelectorAll(".reveal"));

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.16 }
    );

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0.01 }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  }

  document.querySelectorAll("[data-tabs]").forEach((tabs) => {
    const buttons = Array.from(tabs.querySelectorAll(".tab-button"));
    const panels = Array.from(tabs.querySelectorAll(".tab-panel"));

    const activateTab = (button) => {
      const targetPanel = tabs.querySelector(`#${button.getAttribute("aria-controls")}`);

      buttons.forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("is-active", isActive);
        item.setAttribute("aria-selected", String(isActive));
        item.tabIndex = isActive ? 0 : -1;
      });

      panels.forEach((panel) => {
        const isActive = panel === targetPanel;
        panel.classList.toggle("is-active", isActive);
        panel.hidden = !isActive;
      });
    };

    buttons.forEach((button, index) => {
      button.tabIndex = button.classList.contains("is-active") ? 0 : -1;

      button.addEventListener("click", () => activateTab(button));

      button.addEventListener("keydown", (event) => {
        const direction = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;

        if (!direction) return;

        event.preventDefault();
        const nextIndex = (index + direction + buttons.length) % buttons.length;
        buttons[nextIndex].focus();
        activateTab(buttons[nextIndex]);
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

  window.addEventListener("scroll", setHeaderState, { passive: true });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 760) closeMenu();
  });

  setHeaderState();
});
