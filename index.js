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

  /* Production projects showcase */
  const projectsSection = document.querySelector("#proyectos");
  const projectGrid = projectsSection?.querySelector(".project-grid");

  if (projectsSection && projectGrid) {
    projectGrid.setAttribute("aria-hidden", "true");

    const showcase = document.createElement("div");
    showcase.className = "production-showcase";
    showcase.innerHTML = `
      <div class="showcase-heading">
        <div>
          <span class="showcase-kicker">PROYECTOS EN PRODUCCIÓN</span>
          <h3>Soluciones reales, utilizadas y entregadas</h3>
          <p>Una selección de sistemas desarrollados para resolver necesidades reales. Desliza, explora y visita cada proyecto.</p>
        </div>
        <div class="showcase-controls" aria-label="Controles del carrusel">
          <button class="showcase-arrow showcase-prev" type="button" aria-label="Proyecto anterior">←</button>
          <button class="showcase-arrow showcase-next" type="button" aria-label="Siguiente proyecto">→</button>
        </div>
      </div>

      <div class="showcase-viewport">
        <div class="showcase-track" role="region" aria-label="Carrusel de proyectos en producción">
          <article class="showcase-card is-active" data-project="cuspide">
            <a class="showcase-media" href="https://operacionadmin.com/" target="_blank" rel="noopener noreferrer" aria-label="Abrir Cúspide en producción">
              <img src="https://image.thum.io/get/width/1200/crop/760/https://operacionadmin.com/" alt="Vista previa del sistema de gestión educativa Cúspide" loading="eager" />
              <span class="showcase-media-overlay"><span>Ver proyecto ↗</span></span>
              <span class="showcase-status">● EN PRODUCCIÓN</span>
            </a>
            <div class="showcase-card-body">
              <div class="showcase-card-top">
                <span class="showcase-number">01</span>
                <span class="showcase-type">Gestión educativa</span>
              </div>
              <h4>Cúspide</h4>
              <p>Plataforma de gestión educativa para administrar estudiantes, docentes, clases, pagos y operación académica.</p>
              <div class="showcase-tags"><span>PHP</span><span>Gestión</span><span>Web</span></div>
              <a class="showcase-link" href="https://operacionadmin.com/" target="_blank" rel="noopener noreferrer">Visitar Cúspide <span>→</span></a>
            </div>
          </article>

          <article class="showcase-card" data-project="clinic">
            <a class="showcase-media" href="https://clinical-admin.xo.je/" target="_blank" rel="noopener noreferrer">
              <img src="https://image.thum.io/get/width/1200/crop/760/https://clinical-admin.xo.je/" alt="Vista previa del sistema de gestión de clínicas" loading="lazy" />
              <span class="showcase-media-overlay"><span>Ver proyecto ↗</span></span>
              <span class="showcase-status">● EN PRODUCCIÓN</span>
            </a>
            <div class="showcase-card-body">
              <div class="showcase-card-top">
                <span class="showcase-number">02</span>
                <span class="showcase-type">Gestión clínica</span>
              </div>
              <h4>Clinical Admin</h4>
              <p>Sistema de gestión para clínicas y centros de especialidades, orientado a organizar la operación y atención.</p>
              <div class="showcase-tags"><span>PHP</span><span>Salud</span><span>Web</span></div>
              <a class="showcase-link" href="https://clinical-admin.xo.je/" target="_blank" rel="noopener noreferrer">Visitar Clinical Admin <span>→</span></a>
            </div>
          </article>

          <article class="showcase-card showcase-card-placeholder" data-project="future-1">
            <div class="showcase-placeholder-media"><span>03</span><strong>PRÓXIMO PROYECTO</strong><small>Miniatura próximamente</small></div>
            <div class="showcase-card-body">
              <div class="showcase-card-top"><span class="showcase-number">03</span><span class="showcase-type">Próximamente</span></div>
              <h4>Nuevo proyecto</h4>
              <p>Este espacio queda preparado para tu próximo proyecto vendido y publicado en producción.</p>
              <div class="showcase-tags"><span>Próximamente</span></div>
            </div>
          </article>

          <article class="showcase-card showcase-card-placeholder" data-project="future-2">
            <div class="showcase-placeholder-media"><span>04</span><strong>PRÓXIMO PROYECTO</strong><small>Miniatura próximamente</small></div>
            <div class="showcase-card-body">
              <div class="showcase-card-top"><span class="showcase-number">04</span><span class="showcase-type">Próximamente</span></div>
              <h4>Nuevo proyecto</h4>
              <p>Segundo espacio preparado para incorporar la siguiente solución destacada.</p>
              <div class="showcase-tags"><span>Próximamente</span></div>
            </div>
          </article>
        </div>
      </div>

      <div class="showcase-footer">
        <div class="showcase-dots" role="tablist" aria-label="Seleccionar proyecto"></div>
        <span class="showcase-counter" aria-live="polite">01 / 04</span>
      </div>
    `;

    projectsSection.querySelector(".section-heading")?.insertAdjacentElement("afterend", showcase);

    const style = document.createElement("style");
    style.textContent = `
      .projects-section { overflow: hidden; }
      .projects-section > .project-grid { display: none; }

      .production-showcase {
        --showcase-accent: #66e3c4;
        --showcase-accent-2: #7c6cff;
        --showcase-bg: rgba(10, 18, 35, .72);
        position: relative;
        margin-top: 2rem;
        padding: clamp(1.2rem, 2vw, 2rem);
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 30px;
        background:
          radial-gradient(circle at 90% 10%, rgba(124,108,255,.16), transparent 30%),
          radial-gradient(circle at 5% 90%, rgba(102,227,196,.11), transparent 32%),
          var(--showcase-bg);
        box-shadow: 0 30px 90px rgba(0,0,0,.25);
        backdrop-filter: blur(18px);
      }
      .showcase-heading {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        gap: 1.5rem;
        margin-bottom: 1.4rem;
      }
      .showcase-kicker {
        display: inline-flex;
        margin-bottom: .6rem;
        color: var(--showcase-accent);
        font-size: .72rem;
        font-weight: 800;
        letter-spacing: .18em;
      }
      .showcase-heading h3 {
        margin: 0;
        font-size: clamp(1.45rem, 3vw, 2.35rem);
        line-height: 1.05;
      }
      .showcase-heading p {
        max-width: 680px;
        margin: .7rem 0 0;
        color: rgba(255,255,255,.68);
        line-height: 1.65;
      }
      .showcase-controls { display: flex; gap: .65rem; flex-shrink: 0; }
      .showcase-arrow {
        width: 48px;
        height: 48px;
        border: 1px solid rgba(255,255,255,.14);
        border-radius: 50%;
        background: rgba(255,255,255,.055);
        color: #fff;
        font-size: 1.25rem;
        cursor: pointer;
        transition: transform .25s ease, background .25s ease, border-color .25s ease;
      }
      .showcase-arrow:hover { transform: translateY(-3px); background: rgba(255,255,255,.11); border-color: rgba(102,227,196,.5); }
      .showcase-viewport { overflow: hidden; border-radius: 22px; }
      .showcase-track {
        display: flex;
        gap: 1rem;
        will-change: transform;
        transition: transform .65s cubic-bezier(.22,1,.36,1);
        touch-action: pan-y;
      }
      .showcase-card {
        flex: 0 0 min(82vw, 430px);
        overflow: hidden;
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 24px;
        background: linear-gradient(160deg, rgba(255,255,255,.09), rgba(255,255,255,.035));
        box-shadow: 0 20px 50px rgba(0,0,0,.22);
        transform: scale(.965);
        opacity: .78;
        transition: transform .5s ease, opacity .5s ease, border-color .5s ease, box-shadow .5s ease;
      }
      .showcase-card.is-active {
        transform: scale(1);
        opacity: 1;
        border-color: rgba(102,227,196,.28);
        box-shadow: 0 28px 70px rgba(0,0,0,.3), 0 0 0 1px rgba(102,227,196,.04);
      }
      .showcase-media {
        position: relative;
        display: block;
        height: 255px;
        overflow: hidden;
        background: linear-gradient(135deg, #16233f, #0d1426);
      }
      .showcase-media img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top center;
        display: block;
        transition: transform .7s cubic-bezier(.22,1,.36,1), filter .5s ease;
      }
      .showcase-card:hover .showcase-media img { transform: scale(1.045); filter: saturate(1.08); }
      .showcase-media::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(180deg, transparent 45%, rgba(4,9,19,.72));
        pointer-events: none;
      }
      .showcase-media-overlay {
        position: absolute;
        inset: 0;
        z-index: 2;
        display: grid;
        place-items: center;
        background: rgba(4,9,19,.42);
        opacity: 0;
        transition: opacity .3s ease;
      }
      .showcase-media-overlay span {
        padding: .75rem 1rem;
        border: 1px solid rgba(255,255,255,.25);
        border-radius: 999px;
        background: rgba(7,13,27,.75);
        color: #fff;
        font-weight: 800;
        backdrop-filter: blur(10px);
      }
      .showcase-card:hover .showcase-media-overlay { opacity: 1; }
      .showcase-status {
        position: absolute;
        z-index: 3;
        left: 1rem;
        bottom: .9rem;
        padding: .42rem .65rem;
        border: 1px solid rgba(102,227,196,.26);
        border-radius: 999px;
        background: rgba(7,13,27,.72);
        color: var(--showcase-accent);
        font-size: .68rem;
        font-weight: 800;
        letter-spacing: .08em;
        backdrop-filter: blur(10px);
      }
      .showcase-card-body { padding: 1.25rem; }
      .showcase-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-bottom: .7rem;
      }
      .showcase-number { color: var(--showcase-accent); font-weight: 900; font-size: .75rem; letter-spacing: .12em; }
      .showcase-type { color: rgba(255,255,255,.5); font-size: .72rem; font-weight: 700; text-transform: uppercase; letter-spacing: .08em; }
      .showcase-card h4 { margin: 0; font-size: 1.5rem; }
      .showcase-card-body p { min-height: 74px; margin: .65rem 0 1rem; color: rgba(255,255,255,.66); line-height: 1.6; font-size: .94rem; }
      .showcase-tags { display: flex; flex-wrap: wrap; gap: .45rem; margin-bottom: 1.1rem; }
      .showcase-tags span {
        padding: .38rem .62rem;
        border: 1px solid rgba(255,255,255,.1);
        border-radius: 999px;
        background: rgba(255,255,255,.045);
        color: rgba(255,255,255,.72);
        font-size: .7rem;
        font-weight: 700;
      }
      .showcase-link {
        display: inline-flex;
        align-items: center;
        gap: .55rem;
        color: #fff;
        font-weight: 800;
        text-decoration: none;
        transition: color .25s ease, gap .25s ease;
      }
      .showcase-link:hover { color: var(--showcase-accent); gap: .8rem; }
      .showcase-placeholder-media {
        height: 255px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: .45rem;
        background:
          radial-gradient(circle at 30% 30%, rgba(124,108,255,.24), transparent 35%),
          radial-gradient(circle at 70% 70%, rgba(102,227,196,.13), transparent 38%),
          #10192d;
        color: rgba(255,255,255,.75);
      }
      .showcase-placeholder-media span { font-size: 2.6rem; font-weight: 900; color: rgba(255,255,255,.16); }
      .showcase-placeholder-media strong { font-size: .75rem; letter-spacing: .14em; color: var(--showcase-accent); }
      .showcase-placeholder-media small { color: rgba(255,255,255,.4); }
      .showcase-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 1.1rem;
      }
      .showcase-dots { display: flex; gap: .45rem; }
      .showcase-dot {
        width: 8px;
        height: 8px;
        padding: 0;
        border: 0;
        border-radius: 999px;
        background: rgba(255,255,255,.22);
        cursor: pointer;
        transition: width .3s ease, background .3s ease;
      }
      .showcase-dot.is-active { width: 26px; background: var(--showcase-accent); }
      .showcase-counter { color: rgba(255,255,255,.45); font-size: .72rem; font-weight: 800; letter-spacing: .12em; }

      @media (max-width: 760px) {
        .production-showcase { border-radius: 22px; padding: 1rem; }
        .showcase-heading { align-items: flex-start; flex-direction: column; }
        .showcase-controls { width: 100%; justify-content: flex-end; }
        .showcase-card { flex-basis: min(84vw, 360px); }
        .showcase-media, .showcase-placeholder-media { height: 215px; }
        .showcase-card-body p { min-height: 0; }
      }

      @media (prefers-reduced-motion: reduce) {
        .showcase-track, .showcase-card, .showcase-media img, .showcase-media-overlay, .showcase-arrow { transition: none !important; }
      }
    `;
    document.head.appendChild(style);

    const track = showcase.querySelector(".showcase-track");
    const cards = Array.from(showcase.querySelectorAll(".showcase-card"));
    const dots = showcase.querySelector(".showcase-dots");
    const counter = showcase.querySelector(".showcase-counter");
    const prev = showcase.querySelector(".showcase-prev");
    const next = showcase.querySelector(".showcase-next");
    let current = 0;
    let autoplayTimer;
    let startX = 0;
    let deltaX = 0;

    cards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.className = "showcase-dot";
      dot.type = "button";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Ir al proyecto ${index + 1}`);
      dot.addEventListener("click", () => goTo(index, true));
      dots.appendChild(dot);
    });

    const update = () => {
      const gap = 16;
      const cardWidth = cards[0]?.getBoundingClientRect().width || 0;
      const offset = Math.max(0, current * (cardWidth + gap));
      track.style.transform = `translate3d(-${offset}px, 0, 0)`;

      cards.forEach((card, index) => {
        const active = index === current;
        card.classList.toggle("is-active", active);
        card.setAttribute("aria-current", active ? "true" : "false");
      });

      Array.from(dots.children).forEach((dot, index) => dot.classList.toggle("is-active", index === current));
      counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(cards.length).padStart(2, "0")}`;
    };

    const goTo = (index, restart = false) => {
      current = (index + cards.length) % cards.length;
      update();
      if (restart) restartAutoplay();
    };

    const restartAutoplay = () => {
      window.clearInterval(autoplayTimer);
      if (prefersReducedMotion) return;
      autoplayTimer = window.setInterval(() => goTo(current + 1), 5200);
    };

    prev.addEventListener("click", () => goTo(current - 1, true));
    next.addEventListener("click", () => goTo(current + 1, true));

    track.addEventListener("pointerdown", (event) => {
      startX = event.clientX;
      deltaX = 0;
      track.setPointerCapture?.(event.pointerId);
    });
    track.addEventListener("pointermove", (event) => {
      if (!startX) return;
      deltaX = event.clientX - startX;
    });
    track.addEventListener("pointerup", () => {
      if (Math.abs(deltaX) > 50) goTo(current + (deltaX < 0 ? 1 : -1), true);
      startX = 0;
      deltaX = 0;
    });
    track.addEventListener("pointercancel", () => {
      startX = 0;
      deltaX = 0;
    });

    showcase.addEventListener("mouseenter", () => window.clearInterval(autoplayTimer));
    showcase.addEventListener("mouseleave", restartAutoplay);
    showcase.addEventListener("focusin", () => window.clearInterval(autoplayTimer));
    showcase.addEventListener("focusout", restartAutoplay);
    window.addEventListener("resize", update, { passive: true });

    update();
    restartAutoplay();
  }
});
