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

  if (prefersReducedMotion) body.classList.add("motion-reduced");

  const setHeaderState = () => header?.classList.toggle("is-scrolled", window.scrollY > 12);

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

  const revealItems = Array.from(document.querySelectorAll(".reveal"));
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.16 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
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
    const buttons = Array.from(tabs.querySelectorAll(".tab-button"));
    const panels = Array.from(tabs.querySelectorAll(".tab-panel"));

    const activateTab = (button) => {
      const targetPanel = tabs.querySelector(`#${button.getAttribute("aria-controls")}`);
      buttons.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
        item.tabIndex = active ? 0 : -1;
      });
      panels.forEach((panel) => {
        const active = panel === targetPanel;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
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
  window.addEventListener("resize", () => { if (window.innerWidth > 760) closeMenu(); });
  setHeaderState();

  /* Production projects carousel: built from the existing projects section. */
  const projectGrid = document.querySelector("#proyectos .project-grid");
  if (projectGrid) {
    const cards = Array.from(projectGrid.querySelectorAll(".project-card"));
    const cuspide = cards.find((card) => card.textContent.includes("Cúspide"));
    const projects = [
      {
        title: "Cúspide",
        type: "Gestión educativa",
        description: "Plataforma de gestión educativa para administrar estudiantes, docentes, clases, pagos y operación académica.",
        tags: ["PHP", "Gestión", "Web"],
        url: "https://operacionadmin.com/",
        image: "https://image.thum.io/get/width/1200/crop/760/noanimate/https://operacionadmin.com/"
      },
      {
        title: "Clinical Admin",
        type: "Gestión clínica",
        description: "Sistema de gestión para clínicas y centros de especialidades, orientado a organizar la operación y atención.",
        tags: ["PHP", "Salud", "Web"],
        url: "https://clinical-admin.xo.je/",
        image: "https://image.thum.io/get/width/1200/crop/760/noanimate/https://clinical-admin.xo.je/"
      },
      {
        title: "Próximo proyecto",
        type: "Próximamente",
        description: "Espacio preparado para el próximo proyecto vendido y publicado en producción.",
        tags: ["Próximamente"],
        url: "#",
        image: ""
      },
      {
        title: "Próximo proyecto",
        type: "Próximamente",
        description: "Segundo espacio preparado para incorporar la siguiente solución destacada.",
        tags: ["Próximamente"],
        url: "#",
        image: ""
      }
    ];

    projectGrid.classList.add("production-project-grid");
    projectGrid.setAttribute("aria-label", "Proyectos destacados en producción");
    projectGrid.innerHTML = `
      <div class="production-carousel-head">
        <div>
          <span class="production-kicker">PROYECTOS EN PRODUCCIÓN</span>
          <h3>Soluciones reales, vendidas y en funcionamiento</h3>
          <p>Explora algunos de los sistemas que he desarrollado y llevado a producción.</p>
        </div>
        <div class="production-controls">
          <button type="button" class="production-arrow" data-production-prev aria-label="Proyecto anterior">←</button>
          <button type="button" class="production-arrow" data-production-next aria-label="Siguiente proyecto">→</button>
        </div>
      </div>
      <div class="production-viewport">
        <div class="production-track">
          ${projects.map((project, index) => `
            <article class="production-card${index === 0 ? " is-active" : ""}" data-index="${index}">
              ${project.url !== "#" ? `<a class="production-thumb" href="${project.url}" target="_blank" rel="noopener noreferrer" aria-label="Visitar ${project.title}"><img src="${project.image}" alt="Miniatura de ${project.title}" loading="${index === 0 ? "eager" : "lazy"}"><span class="production-thumb-label">VISITAR PROYECTO ↗</span><span class="production-live">● PRODUCCIÓN</span></a>` : `<div class="production-thumb production-placeholder"><span class="placeholder-number">0${index + 1}</span><strong>PRÓXIMO PROYECTO</strong><small>Miniatura próximamente</small></div>`}
              <div class="production-card-body">
                <div class="production-meta"><span>0${index + 1}</span><small>${project.type}</small></div>
                <h4>${project.title}</h4>
                <p>${project.description}</p>
                <div class="production-tags">${project.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
                ${project.url !== "#" ? `<a class="production-visit" href="${project.url}" target="_blank" rel="noopener noreferrer">Ver proyecto <span>→</span></a>` : ""}
              </div>
            </article>
          `).join("")}
        </div>
      </div>
      <div class="production-footer"><div class="production-dots"></div><span class="production-counter">01 / 04</span></div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      .production-project-grid { display:block !important; position:relative; margin-top:1.5rem; }
      .production-carousel-head { display:flex; align-items:flex-end; justify-content:space-between; gap:1.5rem; margin-bottom:1.25rem; }
      .production-kicker { display:block; margin-bottom:.55rem; color:#66e3c4; font-size:.72rem; font-weight:900; letter-spacing:.18em; }
      .production-carousel-head h3 { margin:0; font-size:clamp(1.35rem,2.5vw,2rem); line-height:1.1; }
      .production-carousel-head p { margin:.55rem 0 0; color:rgba(255,255,255,.65); }
      .production-controls { display:flex; gap:.55rem; flex-shrink:0; }
      .production-arrow { width:46px; height:46px; border:1px solid rgba(255,255,255,.14); border-radius:50%; background:rgba(255,255,255,.06); color:inherit; font-size:1.2rem; cursor:pointer; transition:transform .25s ease,background .25s ease; }
      .production-arrow:hover { transform:translateY(-2px); background:rgba(102,227,196,.13); }
      .production-viewport { overflow:hidden; border-radius:22px; }
      .production-track { display:flex; gap:1rem; transition:transform .6s cubic-bezier(.22,1,.36,1); will-change:transform; }
      .production-card { flex:0 0 min(82vw,430px); overflow:hidden; border:1px solid rgba(255,255,255,.1); border-radius:24px; background:linear-gradient(150deg,rgba(255,255,255,.08),rgba(255,255,255,.035)); opacity:.72; transform:scale(.97); transition:opacity .45s ease,transform .45s ease,border-color .45s ease; }
      .production-card.is-active { opacity:1; transform:scale(1); border-color:rgba(102,227,196,.35); }
      .production-thumb { position:relative; display:block; height:250px; overflow:hidden; background:linear-gradient(135deg,#182642,#0c1425); text-decoration:none; }
      .production-thumb img { width:100%; height:100%; display:block; object-fit:cover; object-position:top center; transition:transform .65s ease; }
      .production-thumb:hover img { transform:scale(1.04); }
      .production-thumb::after { content:""; position:absolute; inset:0; background:linear-gradient(180deg,transparent 42%,rgba(4,8,18,.78)); pointer-events:none; }
      .production-thumb-label { position:absolute; z-index:2; inset:0; display:grid; place-items:center; color:#fff; font-weight:900; opacity:0; transition:opacity .25s ease; }
      .production-thumb:hover .production-thumb-label { opacity:1; }
      .production-live { position:absolute; z-index:3; left:1rem; bottom:.85rem; padding:.4rem .65rem; border:1px solid rgba(102,227,196,.3); border-radius:999px; background:rgba(4,8,18,.72); color:#66e3c4; font-size:.66rem; font-weight:900; letter-spacing:.08em; }
      .production-placeholder { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.45rem; background:radial-gradient(circle at 25% 20%,rgba(124,108,255,.25),transparent 35%),radial-gradient(circle at 75% 75%,rgba(102,227,196,.14),transparent 35%),#10192d; color:rgba(255,255,255,.65); }
      .production-placeholder::after { display:none; }
      .placeholder-number { font-size:3rem; line-height:1; font-weight:900; color:rgba(255,255,255,.12); }
      .production-placeholder strong { color:#66e3c4; font-size:.72rem; letter-spacing:.14em; }
      .production-placeholder small { color:rgba(255,255,255,.4); }
      .production-card-body { padding:1.2rem; }
      .production-meta { display:flex; justify-content:space-between; gap:1rem; margin-bottom:.6rem; }
      .production-meta span { color:#66e3c4; font-size:.74rem; font-weight:900; letter-spacing:.12em; }
      .production-meta small { color:rgba(255,255,255,.5); font-size:.7rem; font-weight:800; text-transform:uppercase; letter-spacing:.08em; }
      .production-card h4 { margin:0; font-size:1.5rem; }
      .production-card-body p { min-height:72px; margin:.55rem 0 1rem; color:rgba(255,255,255,.66); line-height:1.6; font-size:.93rem; }
      .production-tags { display:flex; flex-wrap:wrap; gap:.4rem; margin-bottom:1rem; }
      .production-tags span { padding:.35rem .6rem; border:1px solid rgba(255,255,255,.1); border-radius:999px; background:rgba(255,255,255,.045); color:rgba(255,255,255,.7); font-size:.68rem; font-weight:800; }
      .production-visit { color:#fff; font-weight:900; text-decoration:none; transition:color .2s ease; }
      .production-visit:hover { color:#66e3c4; }
      .production-visit span { margin-left:.35rem; }
      .production-footer { display:flex; align-items:center; justify-content:space-between; margin-top:1rem; }
      .production-dots { display:flex; gap:.4rem; }
      .production-dot { width:8px; height:8px; padding:0; border:0; border-radius:999px; background:rgba(255,255,255,.22); cursor:pointer; transition:width .25s ease,background .25s ease; }
      .production-dot.is-active { width:25px; background:#66e3c4; }
      .production-counter { color:rgba(255,255,255,.45); font-size:.7rem; font-weight:900; letter-spacing:.12em; }
      @media (max-width:760px) { .production-carousel-head{align-items:flex-start;flex-direction:column}.production-controls{align-self:flex-end}.production-card{flex-basis:min(84vw,360px)}.production-thumb{height:215px}.production-card-body p{min-height:0} }
      @media (prefers-reduced-motion:reduce) { .production-track,.production-card,.production-thumb img{transition:none !important} }
    `;
    document.head.appendChild(style);

    const track = projectGrid.querySelector(".production-track");
    const productionCards = Array.from(projectGrid.querySelectorAll(".production-card"));
    const dots = projectGrid.querySelector(".production-dots");
    const counter = projectGrid.querySelector(".production-counter");
    let current = 0;
    let timer = null;

    productionCards.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = `production-dot${index === 0 ? " is-active" : ""}`;
      dot.setAttribute("aria-label", `Ir al proyecto ${index + 1}`);
      dot.addEventListener("click", () => goTo(index, true));
      dots.appendChild(dot);
    });

    const updateCarousel = () => {
      const gap = 16;
      const width = productionCards[0]?.getBoundingClientRect().width || 0;
      track.style.transform = `translate3d(-${current * (width + gap)}px,0,0)`;
      productionCards.forEach((card, index) => card.classList.toggle("is-active", index === current));
      Array.from(dots.children).forEach((dot, index) => dot.classList.toggle("is-active", index === current));
      counter.textContent = `${String(current + 1).padStart(2, "0")} / ${String(productionCards.length).padStart(2, "0")}`;
    };

    function goTo(index, restart = false) {
      current = (index + productionCards.length) % productionCards.length;
      updateCarousel();
      if (restart) startAutoplay();
    }

    function startAutoplay() {
      if (prefersReducedMotion) return;
      window.clearInterval(timer);
      timer = window.setInterval(() => goTo(current + 1), 5200);
    }

    projectGrid.querySelector("[data-production-prev]").addEventListener("click", () => goTo(current - 1, true));
    projectGrid.querySelector("[data-production-next]").addEventListener("click", () => goTo(current + 1, true));
    projectGrid.addEventListener("mouseenter", () => window.clearInterval(timer));
    projectGrid.addEventListener("mouseleave", startAutoplay);
    window.addEventListener("resize", updateCarousel, { passive:true });
    updateCarousel();
    startAutoplay();
  }
});
