// Builds the CV PDFs (ES/EN) from the content below.
// Usage: cd tools/cv && npm install && npm run build [-- es|en]
// Set CHROME_PATH if Chrome is not at the default Windows location.
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const OUT_DIR = path.resolve(__dirname, '../../assets/cv');
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const font = (file) => fs.readFileSync(require.resolve(file)).toString('base64');
const FONTS = {
  inter: font('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
  interExt: font('@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2'),
  mono400: font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'),
  mono500: font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2'),
};

const AUTOLINK_DEMO = 'https://portal-sd.securitydata.net.ec/app-security-data/#/formulario-autolink/RpN6Tsfpd4oHBQPDC6w-a3cs9STBEME5ELmL3JCegd8';

const CONTACT = {
  location: 'Machala, Ecuador',
  email: 'jhonnyminian@gmail.com',
  web: 'jhonnyminian92.github.io',
  linkedin: 'linkedin.com/in/jhonnyminian',
  github: 'github.com/JhonnyMinian92',
};

const requestedLanguage = process.argv[2];
if (requestedLanguage && !['es', 'en'].includes(requestedLanguage)) {
  throw new Error(`Unsupported CV language "${requestedLanguage}". Use "es" or "en".`);
}

// ---------------------------------------------------------------- content
const CONTENT = {
  es: {
    lang: 'es',
    file: 'Jhonny-Minan-CV-ES.pdf',
    docTitle: 'Jhonny Miñan — Currículum',
    title: 'Senior Software Engineer · Full Stack · Inteligencia Artificial',
    facts: [
      ['8+', 'años desarrollando software'],
      ['MSc', 'Inteligencia Artificial, UNIR'],
      ['2010', 'en tecnología desde'],
      ['10', 'sistemas propios en desarrollo'],
    ],
    labels: { profile: 'Perfil', experience: 'Experiencia', additional: 'Experiencia complementaria', projects: 'Proyectos', education: 'Formación', certifications: 'Certificaciones', skills: 'Competencias técnicas', page: 'Página' },
    profile: 'Ingeniero de software full stack con 8+ años desarrollando software y Máster en Inteligencia Artificial. Construyo y mantengo sistemas en producción con Java, Spring Boot, PHP y TypeScript; diseño plataformas distribuidas de procesos como AutoLink, con gateway B2B y SDK en TypeScript; y aplico IA, agentes y automatización a problemas reales. Mi base en soporte, redes, servidores y emprendimiento me da una visión completa, de la infraestructura al producto.',
    experience: [
      {
        org: 'Security Data',
        period: '2021 — actualidad',
        roles: [
          ['Desarrollador Senior Full Stack', 'actualidad'],
          ['Desarrollador Full Stack · Mid-Level', 'promoción: mar 2024'],
          ['Desarrollador Full Stack · Junior', 'dic 2022 — mar 2024'],
          ['Operador de Registro y Soporte TI', 'jul 2021 — ene 2023'],
        ],
        bullets: [
          'Progresión interna de Operador de Registro y Soporte TI a Full Stack Junior, Mid-Level y Senior. Desarrollo y mantenimiento de sistemas en producción con Java/Spring Boot, PHP y TypeScript: servicios backend, APIs, capas de datos, depuración y refactorización; integración con Asterisk y agentes de IA.',
          '<b>AutoLink</b>: plataforma distribuida para emitir y dar continuidad a trámites de firma electrónica. Desde un enlace cifrado recupera la solicitud, valida identidad, RUC y trámites en curso, reutiliza documentos en renovaciones y guía al usuario hacia biometría, vídeo, pago o revisión mediante procesos orquestados.',
          `Gateway B2B de AutoLink con autenticación HMAC y payloads cifrados, extensión de Chrome, PWA, SDK en TypeScript para integradores y buzón de recuperación de solicitudes fallidas. <a class="demo" href="${AUTOLINK_DEMO}">Formulario AutoLink · portal-sd.securitydata.net.ec</a>`,
          'Extensiones <b>SingExtension</b> y <b>EC Google Extension</b> (visor de PDF); microfrontends con Angular, Nx y Module Federation para gestión documental; firma digital, cifrado y políticas estrictas de seguridad.',
          '<b>Security Image</b>: gestor corporativo de imágenes JPG y PNG con enlaces de expiración configurable, cuotas de almacenamiento por usuario, administración de usuarios, plantillas y registro.',
        ],
      },
      {
        org: 'Codeandolo',
        period: '2010 — actualidad',
        role: 'Desarrollador de software independiente',
        bullets: ['Aplicaciones de escritorio y web para clientes y proyectos propios.'],
      },
    ],
    earlier: [
      ['Explofrap', 'Analista de Sistemas', 'ene 2016 — jul 2017', 'Desarrollo en Visual Basic, servidores y arquitectura de red.'],
      ['Supercompu TIC', 'Fundador y propietario', '2014 — 2017', 'Servicios técnicos y soluciones informáticas.'],
      ['Almacén V&amp;A', 'Analista de Sistemas', '2012 — 2014', 'De técnico auxiliar a jefe del departamento de TI.'],
    ],
    additional: [
      ['Diners Club del Ecuador', 'Oficial de Crédito', '2017 — 2021', 'Análisis y gestión crediticia de cartera de tarjetas; experiencia en procesos, riesgo y atención al cliente.'],
      ['Gestiona GTX', 'Gestor Domiciliario', '2017 — 2021', 'Negociación y gestión de cartera vencida y prelegal, en paralelo con Diners Club.'],
      ['Grupo Open', 'Jefe Técnico Informático', '2015 — 2016', 'Mantenimiento correctivo y preventivo en agencias de Huaquillas, Arenillas y Santa Rosa.'],
      ['Marcimex', 'Promotor Informático', '2015 — 2016', 'Venta técnica de equipos y gestión de garantías.'],
    ],
    projects: [
      { name: 'Mnemosine', meta: 'Memoria y contexto para agentes de IA · V1 en pruebas', text: 'Arquitectura de memoria de corto y largo plazo, episódica, semántica y procedimental, con conocimiento, reglas, tareas y skills. Expone por API el contexto necesario para dar continuidad al trabajo entre sesiones y proyectos.' },
      { name: 'EcuApp', meta: 'Fundador · suite de 10 sistemas en desarrollo', text: '<b>Gestión:</b> Hefesto (inventario), Mercurio (facturación electrónica), Atenea (educación) y Panacea (salud). <b>Seguridad:</b> Heimdall (autenticación) y Tyr (firma electrónica). <b>IA:</b> Forcis (audio a texto), Poseidon (texto a voz), Loki (clonación de voz) y Thot (OCR de imágenes y PDF).', stack: 'Java · Spring Boot, Python, PHP · Laravel' },
      { name: 'Cúspide', meta: 'Sistema de control educativo · en producción', link: 'operacionadmin.com', text: 'Clases, pagos, estudiantes y docentes, con panel de matrículas, ingresos, gastos y balance.', stack: 'PHP, Twig' },
      { name: 'Clinical Admin', meta: 'Gestión clínica · en producción', link: 'clinical-admin.xo.je', text: 'Agenda de citas por paciente, médico y especialidad, con estados de atención y confirmaciones por correo y WhatsApp.', stack: 'PHP, MySQL' },
      { name: 'Security Image', meta: 'Gestión corporativa de imágenes · en producción', link: 'portal-sd.securitydata.net.ec/security-image/', text: 'Carga y gestión de imágenes JPG y PNG con enlaces de expiración configurable, cuotas de almacenamiento por usuario, administración, plantillas y registro.' },
      { name: 'Multimodal Early Fusion · Green AI', meta: 'Investigación en IA', link: 'github.com/JhonnyMinian92/multimodal-early-fusion-green-ai', text: 'Clasificación multimodal con fusión temprana de datos tabulares y texto, y eficiencia de modelos.', stack: 'Python, scikit-learn, XGBoost' },
    ],
    education: [
      {
        degree: 'Máster Universitario en Inteligencia Artificial',
        school: 'Universidad Internacional de La Rioja (UNIR)',
        period: '2025 — 2026',
        lines: ['Máster culminado; TFM defendido en septiembre de 2026 y título en trámite administrativo. Promedio final: 8/10.', '<b>TFM:</b> Pipeline software reproducible para clasificar intenciones de renovación y negociabilidad mediante fusión temprana de datos tabulares y texto.', 'Machine Learning, Deep Learning, NLP, Visión Artificial, Razonamiento y Planificación Automática, Cloud para IA y Gestión de Proyectos de IA.'],
      },
      { degree: 'Ingeniería de Sistemas', school: 'Universidad Técnica de Machala', period: '2009 — 2020', lines: ['<b>Trabajo de titulación:</b> sistema web de gestión de transporte y seguimiento de carga por GPS, publicado en 2020 (ISBN 9786203032277).'] },
    ],
    certifications: [
      ['AWS Machine Learning Foundations', '2026'],
      ['Programación en Python', '2025'],
      ['Fundamentos de Java Spring Boot', ''],
      ['Programación Orientada a Objetos con Java SE', ''],
      ['Firebase para Android', ''],
      ['Programación Básica', ''],
    ],
    skills: [
      ['Lenguajes', 'Java, PHP, TypeScript, JavaScript, Python, SQL'],
      ['Backend', 'Spring Boot, Laravel, Node.js, Express, APIs REST, Microservicios'],
      ['Frontend', 'Angular, Microfrontends (Nx, Module Federation), Chrome Extensions (Manifest V3), HTML, CSS'],
      ['Datos', 'PostgreSQL, MySQL, MongoDB, Redis'],
      ['IA y ML', 'Machine Learning, NLP, Visión Artificial, Agentes de IA, Prompt Engineering, scikit-learn, XGBoost, PyTorch'],
      ['Integración', 'Camunda (BPM), Gateway B2B, SDKs en TypeScript, HMAC, cifrado de payloads, Asterisk'],
      ['Herramientas', 'Git, GitHub, GitLab, Docker, Cursor'],
      ['Prácticas', 'Clean Code, Clean Architecture, Análisis de Sistemas, Documentación técnica'],
    ],
  },
  en: {
    lang: 'en',
    file: 'Jhonny-Minan-CV-EN.pdf',
    docTitle: 'Jhonny Miñan — Curriculum Vitae',
    title: 'Senior Software Engineer · Full Stack · Artificial Intelligence',
    facts: [
      ['8+', 'years building software'],
      ['MSc', 'Artificial Intelligence, UNIR'],
      ['2010', 'in technology since'],
      ['10', 'own systems in development'],
    ],
    labels: { profile: 'Profile', experience: 'Experience', additional: 'Additional experience', projects: 'Projects', education: 'Education', certifications: 'Certifications', skills: 'Technical skills', page: 'Page' },
    profile: 'Full stack software engineer with 8+ years of software development experience and a Master’s degree in Artificial Intelligence. I build and maintain production systems with Java, Spring Boot, PHP and TypeScript; design distributed process platforms such as AutoLink, with a B2B gateway and a TypeScript SDK; and apply AI, agents and automation to real problems. A background in IT support, networking, servers and entrepreneurship gives me a full view, from infrastructure to product.',
    experience: [
      {
        org: 'Security Data',
        period: '2021 — present',
        roles: [
          ['Senior Full Stack Developer', 'present'],
          ['Full Stack Developer · Mid-Level', 'promoted Mar 2024'],
          ['Full Stack Developer · Junior', 'Dec 2022 — Mar 2024'],
          ['Registration Operator & IT Support', 'Jul 2021 — Jan 2023'],
        ],
        bullets: [
          'Progressed internally from Registration Operator & IT Support to Full Stack Developer (Junior, Mid-Level and Senior). Build and maintain production systems with Java/Spring Boot, PHP and TypeScript: backend services, APIs, data layers, debugging and refactoring; integrations with Asterisk and AI agents.',
          '<b>AutoLink</b>: a distributed platform for issuing and continuing electronic-signature procedures. An encrypted link restores a request, validates identity, tax ID and in-flight procedures, reuses documents on renewals and guides users to their next task —biometrics, video, payment or review— through orchestrated workflows.',
          `AutoLink B2B gateway with HMAC authentication and encrypted payloads, a Chrome extension, PWA, TypeScript SDK for integrators and an inbox to recover failed requests. <a class="demo" href="${AUTOLINK_DEMO}">AutoLink form · portal-sd.securitydata.net.ec</a>`,
          '<b>SingExtension</b> and <b>EC Google Extension</b> (PDF viewer); Angular microfrontends with Nx and Module Federation for document management; digital signatures, encryption and strict security policies.',
          '<b>Security Image</b>: corporate JPG and PNG image manager with configurable link expiration, per-user storage quotas, user administration, templates and activity logs.',
        ],
      },
      {
        org: 'Codeandolo',
        period: '2010 — present',
        role: 'Independent Software Developer',
        bullets: ['Desktop and web applications for clients and own projects.'],
      },
    ],
    earlier: [
      ['Explofrap', 'Systems Analyst', 'Jan 2016 — Jul 2017', 'Visual Basic development, servers and network architecture.'],
      ['Supercompu TIC', 'Founder &amp; Owner', '2014 — 2017', 'Technical services and IT solutions company.'],
      ['Almacén V&amp;A', 'Systems Analyst', '2012 — 2014', 'From technical assistant to head of the IT department.'],
    ],
    additional: [
      ['Diners Club del Ecuador', 'Credit Officer', '2017 — 2021', 'Credit analysis and credit card portfolio management; experience with processes, risk and customer service.'],
      ['Gestiona GTX', 'Field Collections Specialist', '2017 — 2021', 'Negotiation and management of overdue and pre-legal portfolios, alongside the role at Diners Club.'],
      ['Grupo Open', 'IT Technical Lead', '2015 — 2016', 'Corrective and preventive maintenance across branches in Huaquillas, Arenillas and Santa Rosa.'],
      ['Marcimex', 'IT Sales Promoter', '2015 — 2016', 'Technical equipment sales and warranty management.'],
    ],
    projects: [
      { name: 'Mnemosine', meta: 'Memory and context for AI agents · V1 in testing', text: 'Short- and long-term, episodic, semantic and procedural memory architecture, with knowledge, rules, tasks and skills. An API provides the context each project needs to carry work forward across sessions and projects.' },
      { name: 'EcuApp', meta: 'Founder · suite of 10 systems in development', text: '<b>Business:</b> Hefesto (inventory), Mercurio (electronic invoicing), Atenea (education) and Panacea (healthcare). <b>Security:</b> Heimdall (authentication) and Tyr (electronic signatures). <b>AI:</b> Forcis (speech-to-text), Poseidon (text-to-speech), Loki (voice cloning) and Thot (image and PDF OCR).', stack: 'Java · Spring Boot, Python, PHP · Laravel' },
      { name: 'Cúspide', meta: 'Education management system · in production', link: 'operacionadmin.com', text: 'Classes, payments, students and teachers, with a dashboard for enrollments, income, expenses and balance.', stack: 'PHP, Twig' },
      { name: 'Clinical Admin', meta: 'Clinic management · in production', link: 'clinical-admin.xo.je', text: 'Appointment scheduling by patient, doctor and specialty, with attendance status and email and WhatsApp confirmations.', stack: 'PHP, MySQL' },
      { name: 'Security Image', meta: 'Corporate image management · in production', link: 'portal-sd.securitydata.net.ec/security-image/', text: 'JPG and PNG image uploads with configurable link expiration, per-user storage quotas, user administration, templates and activity logs.' },
      { name: 'Multimodal Early Fusion · Green AI', meta: 'AI research', link: 'github.com/JhonnyMinian92/multimodal-early-fusion-green-ai', text: 'Multimodal classification with early fusion of tabular data and text, and model efficiency.', stack: 'Python, scikit-learn, XGBoost' },
    ],
    education: [
      { degree: 'Master’s Degree in Artificial Intelligence', school: 'Universidad Internacional de La Rioja (UNIR), Spain', period: '2025 — 2026', lines: ['Degree completed; thesis defended in September 2026, with the diploma in administrative processing. Final average: 8/10.', '<b>Thesis:</b> Reproducible software pipeline for classifying renewal and negotiability intents through early fusion of tabular data and text.', 'Machine Learning, Deep Learning, NLP, Computer Vision, Automated Reasoning and Planning, Cloud for AI and AI Project Management.'] },
      { degree: 'B.Eng. in Systems Engineering', school: 'Universidad Técnica de Machala, Ecuador', period: '2009 — 2020', lines: ['<b>Graduation project:</b> web system for transport management and GPS cargo tracking, published in 2020 (ISBN 9786203032277).'] },
    ],
    certifications: [
      ['AWS Machine Learning Foundations', '2026'],
      ['Python Programming', '2025'],
      ['Java Spring Boot Fundamentals', ''],
      ['Object-Oriented Programming with Java SE', ''],
      ['Firebase for Android', ''],
      ['Programming Fundamentals', ''],
    ],
    skills: [
      ['Languages', 'Java, PHP, TypeScript, JavaScript, Python, SQL'],
      ['Backend', 'Spring Boot, Laravel, Node.js, Express, REST APIs, Microservices'],
      ['Frontend', 'Angular, Microfrontends (Nx, Module Federation), Chrome Extensions (Manifest V3), HTML, CSS'],
      ['Data', 'PostgreSQL, MySQL, MongoDB, Redis'],
      ['AI & ML', 'Machine Learning, NLP, Computer Vision, AI Agents, Prompt Engineering, scikit-learn, XGBoost, PyTorch'],
      ['Integration', 'Camunda (BPM), B2B gateways, TypeScript SDKs, HMAC, payload encryption, Asterisk'],
      ['Tools', 'Git, GitHub, GitLab, Docker, Cursor'],
      ['Practices', 'Clean Code, Clean Architecture, Systems Analysis, Technical Documentation'],
    ],
  },
};

// ---------------------------------------------------------------- template
const css = `
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${FONTS.inter}) format('woff2');font-weight:100 900;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${FONTS.interExt}) format('woff2');font-weight:100 900;unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:Plex;src:url(data:font/woff2;base64,${FONTS.mono400}) format('woff2');font-weight:400}
@font-face{font-family:Plex;src:url(data:font/woff2;base64,${FONTS.mono500}) format('woff2');font-weight:500}
@page{size:A4;margin:13mm 15mm 14mm}
:root{--ink:#0f172a;--text:#334155;--muted:#64748b;--faint:#94a3b8;--line:#e2e8f0;--accent:#0f766e;--accent-soft:#f0fdfa}
*{box-sizing:border-box;margin:0;padding:0}
html{font-size:8.6pt}
body{font-family:Inter,sans-serif;color:var(--text);line-height:1.45;font-feature-settings:"cv11","ss01";-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:inherit;text-decoration:none}
b{color:var(--ink);font-weight:600}

header{display:grid;grid-template-columns:1fr auto;gap:8mm;align-items:end;padding-bottom:4.2mm;border-bottom:1.4pt solid var(--ink)}
h1{font-size:24pt;line-height:1;font-weight:700;letter-spacing:-.025em;color:var(--ink)}
.title{margin-top:2.6mm;font-size:10.2pt;font-weight:500;color:var(--accent);letter-spacing:.005em}
.contact{list-style:none;text-align:right;font-size:8.3pt;line-height:1.62;color:var(--text)}
.contact a{color:var(--ink)}

.facts{display:grid;grid-template-columns:repeat(4,1fr);margin-top:3.6mm;border-bottom:.6pt solid var(--line)}
.facts div{padding:0 0 3mm 3.6mm;border-left:.6pt solid var(--line)}
.facts div:first-child{padding-left:0;border-left:0}
.facts strong{display:block;font-size:15pt;line-height:1.1;font-weight:650;letter-spacing:-.02em;color:var(--ink)}
.facts span{display:block;margin-top:.8mm;font-size:7.6pt;line-height:1.35;color:var(--muted)}

section{margin-top:4.6mm}
h2{display:flex;align-items:center;gap:3mm;margin-bottom:2mm;font-size:7.6pt;font-weight:650;letter-spacing:.09em;text-transform:uppercase;color:var(--accent);break-after:avoid}
h2::after{content:"";flex:1;height:.6pt;background:var(--line)}
.profile{font-size:9pt;line-height:1.58;color:var(--text)}

.job{display:grid;grid-template-columns:31mm 1fr;column-gap:5mm;padding:2mm 0;break-inside:avoid}
.job + .job{border-top:.6pt solid var(--line)}
.when{font-family:Plex,monospace;font-size:7.6pt;line-height:1.75;color:var(--muted);padding-top:.5mm}
.org{font-size:10.4pt;font-weight:650;color:var(--ink);letter-spacing:-.01em}
.role{font-size:9pt;font-weight:500;color:var(--accent)}
.roles{list-style:none;margin:1mm 0 1.4mm;padding-left:3.2mm;border-left:1.2pt solid var(--accent)}
.roles li{display:flex;justify-content:space-between;gap:4mm;font-size:8.6pt;line-height:1.65}
.roles li span:first-child{font-weight:500;color:var(--ink)}
.roles li:first-child span:first-child{color:var(--accent);font-weight:600}
.roles li span:last-child{font-family:Plex,monospace;font-size:7.5pt;color:var(--muted)}
.bullets{list-style:none;margin-top:1.2mm}
.bullets li{position:relative;padding-left:3.6mm;margin-top:.7mm;font-size:8.6pt;line-height:1.45}
.bullets a.demo{display:inline-block;margin-left:1.2mm;font-family:Plex,monospace;font-size:7.4pt;color:var(--accent);border-bottom:.5pt solid var(--accent)}
.bullets a.demo::after{content:" ↗"}
.bullets li::before{content:"";position:absolute;left:.4mm;top:1.9mm;width:1.3mm;height:1.3mm;border-radius:50%;background:var(--accent)}

.compact{list-style:none}
.compact li{display:grid;grid-template-columns:31mm 1fr;column-gap:5mm;padding:1.5mm 0;font-size:8.5pt;line-height:1.45;break-inside:avoid}
.compact .when{padding-top:0}
.earlier{border-top:.6pt solid var(--line)}
.compact li + li{border-top:.6pt solid var(--line)}
.compact .what b{font-weight:600}
.compact .what i{font-style:normal;color:var(--accent);font-weight:500}

.project{display:grid;grid-template-columns:31mm 1fr;column-gap:5mm;padding:1.8mm 0;break-inside:avoid}
.project + .project{border-top:.6pt solid var(--line)}
.pname{font-size:9.6pt;font-weight:650;color:var(--ink);line-height:1.35;letter-spacing:-.01em}
.pmeta{font-size:8.4pt;font-weight:500;color:var(--accent)}
.ptext{margin-top:.4mm;font-size:8.6pt}
.pfoot{display:flex;flex-wrap:wrap;gap:1mm 4mm;margin-top:.6mm;font-family:Plex,monospace;font-size:7.4pt;color:var(--muted)}
.pfoot a{color:var(--ink)}

.edu{display:grid;grid-template-columns:31mm 1fr;column-gap:5mm;padding:1.8mm 0;break-inside:avoid}
.edu + .edu{border-top:.6pt solid var(--line)}
.degree{font-size:10pt;font-weight:650;color:var(--ink);letter-spacing:-.01em}
.school{font-size:8.8pt;font-weight:500;color:var(--accent)}
.edu p{margin-top:.7mm;font-size:8.6pt}

.certs{list-style:none;display:grid;grid-template-columns:1fr 1fr;column-gap:8mm}
.certs li{display:flex;justify-content:space-between;gap:3mm;padding:1.1mm 0;border-bottom:.6pt solid var(--line);font-size:8.6pt;color:var(--ink)}
.certs li span{font-family:Plex,monospace;font-size:7.5pt;color:var(--muted)}

.skills{display:grid;grid-template-columns:31mm 1fr;column-gap:5mm;row-gap:1.1mm}
.skills dt{font-size:8.4pt;font-weight:600;color:var(--ink)}
.skills dd{font-size:8.6pt}

`;

const esc = (s) => s; // content is authored HTML (only <b> and entities)

function render(c) {
  const job = (j) => `
    <article class="job">
      <div class="when">${j.period}</div>
      <div>
        <div class="org">${j.org}</div>
        ${j.role ? `<div class="role">${j.role}</div>` : ''}
        ${j.roles ? `<ul class="roles">${j.roles.map(([r, p]) => `<li><span>${r}</span><span>${p}</span></li>`).join('')}</ul>` : ''}
        <ul class="bullets">${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul>
      </div>
    </article>`;
  const row = ([o, r, p, d]) => `<li><span class="when">${p}</span><span class="what"><b>${o}</b> · <i>${r}</i> — ${d}</span></li>`;
  const project = (p) => `
    <article class="project">
      <div class="pname">${p.name}</div>
      <div>
        <div class="pmeta">${p.meta}</div>
        <p class="ptext">${p.text}</p>
        ${p.stack || p.link ? `<div class="pfoot">${p.stack ? `<span>${p.stack}</span>` : ''}${p.link ? `<a href="https://${p.link}">${p.link}</a>` : ''}</div>` : ''}
      </div>
    </article>`;

  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><title>${c.docTitle}</title><style>${css}</style></head><body>
  <header>
    <div>
      <h1>Jhonny Darwin Miñan Girón</h1>
      <div class="title">${c.title}</div>
    </div>
    <ul class="contact">
      <li>${CONTACT.location}</li>
      <li><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
      <li><a href="https://${CONTACT.web}">${CONTACT.web}</a></li>
      <li><a href="https://www.${CONTACT.linkedin}">${CONTACT.linkedin}</a></li>
      <li><a href="https://${CONTACT.github}">${CONTACT.github}</a></li>
    </ul>
  </header>

  <div class="facts">${c.facts.map(([n, l]) => `<div><strong>${n}</strong><span>${l}</span></div>`).join('')}</div>

  <section><h2>${c.labels.profile}</h2><p class="profile">${c.profile}</p></section>

  <section><h2>${c.labels.experience}</h2>${c.experience.map(job).join('')}
    <ul class="compact earlier">${c.earlier.map(row).join('')}</ul>
  </section>

  <section><h2>${c.labels.additional}</h2>
    <ul class="compact">${c.additional.map(row).join('')}</ul>
  </section>

  <section><h2>${c.labels.projects}</h2>${c.projects.map(project).join('')}</section>

  <section><h2>${c.labels.education}</h2>
    ${c.education
      .map(
        (e) => `
    <article class="edu">
      <div class="when">${e.period}</div>
      <div><div class="degree">${e.degree}</div><div class="school">${e.school}</div>${e.lines.map((l) => `<p>${l}</p>`).join('')}</div>
    </article>`,
      )
      .join('')}
  </section>

  <section><h2>${c.labels.certifications}</h2>
    <ul class="certs">${c.certifications.map(([n, y]) => `<li>${n}<span>${y}</span></li>`).join('')}</ul>
  </section>

  <section><h2>${c.labels.skills}</h2>
    <dl class="skills">${c.skills.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
  </section>
</body></html>`;
}

const footer = (c) => `<div style="width:100%;padding:0 15mm;font-family:Arial,sans-serif;font-size:6.5pt;color:#94a3b8;display:flex;justify-content:space-between">
  <span>Jhonny Miñan · ${CONTACT.email}</span>
  <span>${c.labels.page} <span class="pageNumber"></span> / <span class="totalPages"></span></span>
</div>`;

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: true });
  const page = await browser.newPage();
  const versions = requestedLanguage ? [CONTENT[requestedLanguage]] : Object.values(CONTENT);
  for (const c of versions) {
    const html = render(c);
    if (process.env.CV_DEBUG) fs.writeFileSync(path.join(__dirname, `cv-${c.lang}.html`), html);
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluateHandle('document.fonts.ready');
    const out = path.join(OUT_DIR, c.file);
    await page.pdf({
      path: out,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: footer(c),
      tagged: true,
      outline: false,
    });
    console.log('built', path.relative(process.cwd(), out));
  }
  await browser.close();
})();
