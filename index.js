document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('#nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const glow = document.querySelector('.cursor-glow');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Developer portfolio visual system
     - Makes the existing SVG technology/social icons render reliably.
     - Adds graceful SVG fallbacks when a remote icon cannot be loaded.
     - Adds subtle developer-themed motion without changing the content.
  ------------------------------------------------------------------ */
  const motionStyle = document.createElement('style');
  motionStyle.textContent = `
    .stack-icon > img,
    .tech-list b > img,
    .social-contact > img { display:inline-block !important; visibility:visible !important; opacity:1 !important; }
    .stack-icon > img { width:38px; height:38px; object-fit:contain; filter:drop-shadow(0 8px 18px rgba(0,0,0,.24)); }
    .tech-list b > img { width:17px; height:17px; object-fit:contain; flex:0 0 17px; }
    .social-contact > img { width:22px; height:22px; object-fit:contain; flex:0 0 22px; }
    .stack-icon::before, .tech-list b::before, .social-contact::before { display:none !important; content:none !important; }
    .stack-icon { display:grid; place-items:center; }
    .stack-icon svg.fallback-icon { width:38px; height:38px; overflow:visible; }
    .dev-progress { position:fixed; inset:0 0 auto 0; height:2px; width:100%; transform-origin:left; transform:scaleX(0); background:linear-gradient(90deg,#69e8c9,#7dd3fc,#a78bfa); z-index:9999; pointer-events:none; box-shadow:0 0 14px rgba(105,232,201,.65); }
    .dev-terminal { position:absolute; left:clamp(12px,3vw,36px); bottom:clamp(18px,4vw,42px); width:min(290px,42vw); padding:13px 15px; border:1px solid rgba(105,232,201,.20); border-radius:12px; background:rgba(5,13,25,.76); backdrop-filter:blur(14px); box-shadow:0 18px 50px rgba(0,0,0,.28), inset 0 1px rgba(255,255,255,.04); color:#a7f3d0; font:500 11px/1.65 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace; z-index:3; overflow:hidden; }
    .dev-terminal::before { content:'●  ●  ●'; display:block; color:rgba(255,255,255,.30); letter-spacing:3px; margin-bottom:5px; font-size:8px; }
    .dev-terminal .terminal-line { white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
    .dev-terminal .prompt { color:#69e8c9; }
    .dev-terminal .cursor { display:inline-block; width:6px; height:12px; margin-left:3px; vertical-align:-2px; background:#69e8c9; animation:terminalBlink 1s steps(1,end) infinite; }
    .code-stream { position:absolute; inset:0; pointer-events:none; overflow:hidden; border-radius:inherit; opacity:.42; mask-image:linear-gradient(to bottom,transparent 0%,black 18%,black 78%,transparent 100%); }
    .code-stream span { position:absolute; top:-20px; color:rgba(105,232,201,.55); font:500 10px/1 ui-monospace,SFMono-Regular,Menlo,monospace; animation:codeFall linear infinite; }
    .dev-chip { position:absolute; top:18%; right:-4%; padding:8px 10px; border:1px solid rgba(125,211,252,.20); border-radius:9px; background:rgba(7,17,31,.72); color:#bae6fd; font:500 10px ui-monospace,SFMono-Regular,Menlo,monospace; box-shadow:0 12px 35px rgba(0,0,0,.22); z-index:3; animation:chipFloat 5s ease-in-out infinite; }
    .dev-chip::before { content:'>'; color:#69e8c9; margin-right:5px; }
    .section-wrap { scroll-margin-top:90px; }
    .stack-card:hover .stack-icon img { transform:translateY(-3px) rotate(-2deg) scale(1.08); filter:drop-shadow(0 10px 22px rgba(105,232,201,.24)); }
    .stack-icon img { transition:transform .35s ease, filter .35s ease; }
    .social-contact:hover img { transform:scale(1.12) rotate(-4deg); }
    .social-contact img { transition:transform .25s ease; }
    @keyframes terminalBlink { 50% { opacity:0; } }
    @keyframes codeFall { from { transform:translateY(-30px); opacity:0; } 12% { opacity:.8; } 80% { opacity:.55; } to { transform:translateY(390px); opacity:0; } }
    @keyframes chipFloat { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-9px); } }
    @media (max-width:700px) { .dev-terminal { width:205px; font-size:9px; } .dev-chip { display:none; } }
    @media (prefers-reduced-motion:reduce) { .dev-terminal .cursor,.dev-chip,.code-stream span { animation:none !important; } }
  `;
  document.head.appendChild(motionStyle);

  const makeFallbackIcon = (type, label) => {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 48 48');
    svg.setAttribute('class', 'fallback-icon');
    svg.setAttribute('aria-label', label || type);
    const stroke = '#69e8c9';
    if (type === 'ai') {
      svg.innerHTML = `<rect x="9" y="9" width="30" height="30" rx="7" fill="none" stroke="${stroke}" stroke-width="2"/><path d="M16 24h16M24 16v16M19 19l10 10M29 19 19 29" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="24" r="3" fill="${stroke}"/>`;
    } else if (type === 'infra') {
      svg.innerHTML = `<rect x="10" y="8" width="28" height="12" rx="3" fill="none" stroke="${stroke}" stroke-width="2"/><rect x="10" y="28" width="28" height="12" rx="3" fill="none" stroke="${stroke}" stroke-width="2"/><circle cx="16" cy="14" r="1.8" fill="${stroke}"/><circle cx="16" cy="34" r="1.8" fill="${stroke}"/><path d="M23 14h10M23 34h10" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>`;
    } else {
      svg.innerHTML = `<path d="M8 17a5 5 0 0 1 5-5h22a5 5 0 0 1 5 5v17a5 5 0 0 1-5 5H13a5 5 0 0 1-5-5V17Z" fill="none" stroke="${stroke}" stroke-width="2"/><path d="m17 23 5 4-5 4M26 31h6" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    return svg;
  };

  const repairIcons = () => {
    const stackIcons = document.querySelectorAll('.stack-card .stack-icon');
    const fallbackTypes = ['ai', 'infra', 'business'];
    stackIcons.forEach((box, index) => {
      const img = box.querySelector('img');
      if (img) {
        img.removeAttribute('width');
        img.removeAttribute('height');
        img.addEventListener('error', () => {
          if (!box.querySelector('.fallback-icon')) box.appendChild(makeFallbackIcon(index < 3 ? 'business' : fallbackTypes[index - 3], img.alt));
          img.style.display = 'none';
        }, { once: true });
      } else if (!box.querySelector('.fallback-icon')) {
        box.textContent = '';
        box.appendChild(makeFallbackIcon(fallbackTypes[index - 3] || 'business', box.closest('.stack-card')?.querySelector('h3')?.textContent));
      }
    });
    document.querySelectorAll('.tech-list b > img').forEach(img => {
      img.addEventListener('error', () => { img.style.display = 'none'; }, { once: true });
    });
  };
  repairIcons();

  const addDeveloperEffects = () => {
    const progress = document.createElement('div');
    progress.className = 'dev-progress';
    document.body.appendChild(progress);
    const updateProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive:true });

    const visual = document.querySelector('.hero-visual');
    if (visual && !reduceMotion) {
      const stream = document.createElement('div');
      stream.className = 'code-stream';
      const snippets = ['const build = () => {};','API /v1/users','git commit -m "ship"','<component />','async function deploy()','SELECT * FROM data','docker compose up','AI_AGENT = READY','npm run build','HTTP 200 OK'];
      snippets.forEach((text, i) => {
        const item = document.createElement('span');
        item.textContent = text;
        item.style.left = `${4 + Math.random() * 92}%`;
        item.style.animationDuration = `${7 + Math.random() * 7}s`;
        item.style.animationDelay = `${-Math.random() * 10}s`;
        item.style.opacity = `${.18 + Math.random() * .45}`;
        stream.appendChild(item);
      });
      visual.appendChild(stream);

      const terminal = document.createElement('div');
      terminal.className = 'dev-terminal';
      terminal.innerHTML = '<div class="terminal-line"><span class="prompt">$</span> whoami → jhonnyminian</div><div class="terminal-line"><span class="prompt">$</span> stack → fullstack + ai</div><div class="terminal-line"><span class="prompt">$</span> status → building<span class="cursor"></span></div>';
      visual.appendChild(terminal);

      const chip = document.createElement('div');
      chip.className = 'dev-chip';
      chip.textContent = 'deploy --production';
      visual.appendChild(chip);
    }

    document.querySelectorAll('.stack-card').forEach((card, index) => {
      card.style.setProperty('--card-delay', `${index * 70}ms`);
    });
  };
  addDeveloperEffects();

  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 20);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  menuToggle?.addEventListener('click', () => {
    const open = menu?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar navegación' : 'Abrir navegación');
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }));

  if (!reduceMotion && glow) {
    window.addEventListener('pointermove', event => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
    }, { passive: true });
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  if (!reduceMotion) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('pointermove', event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.setProperty('--rx', `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty('--ry', `${(x * 5).toFixed(2)}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });

    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - (rect.left + rect.width / 2);
        const y = event.clientY - (rect.top + rect.height / 2);
        button.style.transform = `translate(${x * .08}px, ${y * .08}px)`;
      });
      button.addEventListener('pointerleave', () => { button.style.transform = ''; });
    });
  }

  const canvas = document.querySelector('#network');
  const ctx = canvas?.getContext('2d');
  if (!ctx || reduceMotion) return;
  let width = 0, height = 0, points = [];
  const pointer = { x: -1000, y: -1000 };

  const resize = () => {
    width = canvas.width = window.innerWidth * devicePixelRatio;
    height = canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    const count = Math.min(70, Math.floor(window.innerWidth / 22));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .18,
      r: Math.random() * 1.5 + .4
    }));
  };
  const draw = () => {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of points) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -10 || p.x > window.innerWidth + 10) p.vx *= -1;
      if (p.y < -10 || p.y > window.innerHeight + 10) p.vy *= -1;
      const distance = Math.hypot(p.x - pointer.x, p.y - pointer.y);
      if (distance < 150) { p.x += (p.x - pointer.x) / 150 * .15; p.y += (p.y - pointer.y) / 150 * .15; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(105,232,201,.32)'; ctx.fill();
    }
    for (let i = 0; i < points.length; i++) for (let j = i + 1; j < points.length; j++) {
      const a = points[i], b = points[j], d = Math.hypot(a.x - b.x, a.y - b.y);
      if (d < 115) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = `rgba(105,232,201,${(1 - d / 115) * .055})`; ctx.stroke(); }
    }
    requestAnimationFrame(draw);
  };
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointermove', e => { pointer.x = e.clientX; pointer.y = e.clientY; }, { passive: true });
  resize(); draw();
});
