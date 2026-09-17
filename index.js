document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('#nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const glow = document.querySelector('.cursor-glow');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const touch = window.matchMedia('(hover: none)').matches;

  const addLink = (rel, href, type) => {
    if (!document.head.querySelector(`link[rel="${rel}"]`)) {
      const link = document.createElement('link'); link.rel = rel; link.href = href; if (type) link.type = type; document.head.appendChild(link);
    }
  };
  addLink('icon', 'assets/favicon.svg', 'image/svg+xml');
  addLink('manifest', 'site.webmanifest');

  const skip = document.createElement('a');
  skip.className = 'skip-link'; skip.href = '#contenido'; skip.textContent = 'Saltar al contenido';
  document.body.prepend(skip);
  document.querySelector('main')?.setAttribute('id', 'contenido');

  const style = document.createElement('style');
  style.textContent = `
    .skip-link{position:fixed;left:12px;top:12px;z-index:10000;transform:translateY(-160%);padding:10px 14px;border-radius:10px;background:#69e8c9;color:#06101d;font-weight:800;text-decoration:none}.skip-link:focus{transform:none}
    .dev-progress{position:fixed;inset:0 0 auto;height:2px;transform-origin:left;background:linear-gradient(90deg,#69e8c9,#7dd3fc,#a78bfa);z-index:9999;pointer-events:none;box-shadow:0 0 14px rgba(105,232,201,.65)}
    .dev-terminal{position:absolute;left:clamp(12px,3vw,36px);bottom:clamp(18px,4vw,42px);width:min(290px,42vw);padding:13px 15px;border:1px solid rgba(105,232,201,.2);border-radius:12px;background:rgba(5,13,25,.76);backdrop-filter:blur(14px);box-shadow:0 18px 50px rgba(0,0,0,.28);color:#a7f3d0;font:500 11px/1.65 ui-monospace,SFMono-Regular,Menlo,monospace;z-index:3;overflow:hidden}.dev-terminal::before{content:'●  ●  ●';display:block;color:rgba(255,255,255,.3);letter-spacing:3px;margin-bottom:5px;font-size:8px}.dev-terminal .terminal-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.dev-terminal .prompt{color:#69e8c9}.dev-terminal .cursor{display:inline-block;width:6px;height:12px;margin-left:3px;vertical-align:-2px;background:#69e8c9;animation:terminalBlink 1s steps(1,end) infinite}
    .dev-chip{position:absolute;top:18%;right:-4%;padding:8px 10px;border:1px solid rgba(125,211,252,.2);border-radius:9px;background:rgba(7,17,31,.72);color:#bae6fd;font:500 10px ui-monospace,SFMono-Regular,Menlo,monospace;box-shadow:0 12px 35px rgba(0,0,0,.22);z-index:3;animation:chipFloat 5s ease-in-out infinite}.dev-chip::before{content:'>';color:#69e8c9;margin-right:5px}
    .code-stream{position:absolute;inset:0;pointer-events:none;overflow:hidden;border-radius:inherit;opacity:.42;mask-image:linear-gradient(to bottom,transparent,black 18%,black 78%,transparent)}.code-stream span{position:absolute;top:-20px;color:rgba(105,232,201,.55);font:500 10px/1 ui-monospace,SFMono-Regular,Menlo,monospace;animation:codeFall linear infinite}
    @keyframes terminalBlink{50%{opacity:0}}@keyframes codeFall{from{transform:translateY(-30px);opacity:0}12%{opacity:.8}80%{opacity:.55}to{transform:translateY(390px);opacity:0}}@keyframes chipFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-9px)}}
    @media(max-width:700px){.dev-terminal{width:205px;font-size:9px}.dev-chip{display:none}}@media(prefers-reduced-motion:reduce){.dev-terminal .cursor,.dev-chip,.code-stream span{animation:none!important}}
  `;
  document.head.appendChild(style);

  const progress = document.createElement('div'); progress.className = 'dev-progress'; document.body.appendChild(progress);
  const updateProgress = () => { const max = document.documentElement.scrollHeight - innerHeight; progress.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`; };
  addEventListener('scroll', updateProgress, { passive:true }); addEventListener('resize', updateProgress, { passive:true }); updateProgress();

  const onScroll = () => header?.classList.toggle('scrolled', scrollY > 20);
  onScroll(); addEventListener('scroll', onScroll, { passive:true });

  menuToggle?.addEventListener('click', () => {
    const open = menu?.classList.toggle('open') ?? false;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Cerrar navegación' : 'Abrir navegación');
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('open'); menuToggle?.setAttribute('aria-expanded','false'); }));

  if (!reduceMotion && !touch && glow) addEventListener('pointermove', e => { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; }, { passive:true });

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold:.12 });
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  if (!reduceMotion && !touch) {
    document.querySelectorAll('.tilt').forEach(card => {
      card.addEventListener('pointermove', e => { const r = card.getBoundingClientRect(); card.style.setProperty('--rx', `${(-((e.clientY-r.top)/r.height-.5)*5).toFixed(2)}deg`); card.style.setProperty('--ry', `${(((e.clientX-r.left)/r.width-.5)*5).toFixed(2)}deg`); });
      card.addEventListener('pointerleave', () => { card.style.setProperty('--rx','0deg'); card.style.setProperty('--ry','0deg'); });
    });
    document.querySelectorAll('.magnetic').forEach(button => {
      button.addEventListener('pointermove', e => { const r=button.getBoundingClientRect(); button.style.transform=`translate(${(e.clientX-(r.left+r.width/2))*.08}px,${(e.clientY-(r.top+r.height/2))*.08}px)`; });
      button.addEventListener('pointerleave', () => { button.style.transform=''; });
    });
  }

  const visual = document.querySelector('.hero-visual');
  if (visual && !reduceMotion && !touch) {
    const stream = document.createElement('div'); stream.className='code-stream';
    ['const build = () => {};','API /v1/users','git commit -m "ship"','<component />','async function deploy()','SELECT * FROM data','docker compose up','AI_AGENT = READY','npm run build','HTTP 200 OK'].forEach(text => { const item=document.createElement('span'); item.textContent=text; item.style.left=`${4+Math.random()*92}%`; item.style.animationDuration=`${7+Math.random()*7}s`; item.style.animationDelay=`${-Math.random()*10}s`; stream.appendChild(item); });
    visual.appendChild(stream);
    const terminal=document.createElement('div'); terminal.className='dev-terminal'; terminal.innerHTML='<div class="terminal-line"><span class="prompt">$</span> whoami → jhonnyminian</div><div class="terminal-line"><span class="prompt">$</span> stack → fullstack + ai</div><div class="terminal-line"><span class="prompt">$</span> status → building<span class="cursor"></span></div>'; visual.appendChild(terminal);
    const chip=document.createElement('div'); chip.className='dev-chip'; chip.textContent='deploy --production'; visual.appendChild(chip);
  }

  const canvas = document.querySelector('#network');
  const ctx = canvas?.getContext('2d');
  if (!ctx || reduceMotion || touch || innerWidth < 760) return;
  let points=[], raf=0, running=true, width=0, height=0; const pointer={x:-1000,y:-1000};
  const resize=()=>{ const dpr=Math.min(devicePixelRatio||1,2); width=innerWidth; height=innerHeight; canvas.width=width*dpr; canvas.height=height*dpr; canvas.style.width=`${width}px`; canvas.style.height=`${height}px`; ctx.setTransform(dpr,0,0,dpr,0,0); const count=Math.min(55,Math.floor(width/26)); points=Array.from({length:count},()=>({x:Math.random()*width,y:Math.random()*height,vx:(Math.random()-.5)*.16,vy:(Math.random()-.5)*.16,r:Math.random()*1.4+.4})); };
  const draw=()=>{ if(!running)return; ctx.clearRect(0,0,width,height); for(const p of points){p.x+=p.vx;p.y+=p.vy;if(p.x<-10||p.x>width+10)p.vx*=-1;if(p.y<-10||p.y>height+10)p.vy*=-1;const d=Math.hypot(p.x-pointer.x,p.y-pointer.y);if(d<150){p.x+=(p.x-pointer.x)/150*.12;p.y+=(p.y-pointer.y)/150*.12}ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);ctx.fillStyle='rgba(105,232,201,.28)';ctx.fill();} for(let i=0;i<points.length;i++)for(let j=i+1;j<points.length;j++){const a=points[i],b=points[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<110){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(105,232,201,${(1-d/110)*.05})`;ctx.stroke();}} raf=requestAnimationFrame(draw); };
  const stop=()=>{running=false;if(raf)cancelAnimationFrame(raf)}; const start=()=>{if(!running){running=true;draw()}};
  document.addEventListener('visibilitychange',()=>document.hidden?stop():start()); addEventListener('resize',resize,{passive:true}); addEventListener('pointermove',e=>{pointer.x=e.clientX;pointer.y=e.clientY},{passive:true}); resize(); draw();
});
