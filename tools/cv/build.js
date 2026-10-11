// Builds the CV PDFs (ES/EN) from the content below.
// Usage: cd tools/cv && npm install && npm run build [-- es|en]
// Set CHROME_PATH if Chrome is not at the default Windows location, and CV_OUT_DIR to write the PDFs elsewhere.
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const OUT_DIR = path.resolve(process.env.CV_OUT_DIR || path.join(__dirname, '../../assets/cv'));
const CHROME = process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const font = (file) => fs.readFileSync(require.resolve(file)).toString('base64');
const FONTS = {
  inter: font('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2'),
  interExt: font('@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2'),
  mono400: font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'),
  mono500: font('@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff2'),
};
const PHOTO = fs.readFileSync(path.resolve(__dirname, '../../assets/jhonny.jpeg')).toString('base64');

const AUTOLINK_DEMO = 'https://portal-sd.securitydata.net.ec/app-security-data/#/formulario-autolink/RpN6Tsfpd4oHBQPDC6w-a3cs9STBEME5ELmL3JCegd8';

const CONTACT = {
  location: 'Machala, Ecuador',
  phone: '+593 98 110 0645',
  email: 'jhonnyminian@gmail.com',
  web: 'jhonnyminian92.github.io',
  linkedin: 'linkedin.com/in/jhonnyminian',
  github: 'github.com/JhonnyMinian92',
};

const requestedLanguage = process.argv[2];
if (requestedLanguage && !['es', 'en'].includes(requestedLanguage)) {
  throw new Error(`Unsupported CV language "${requestedLanguage}". Use "es" or "en".`);
}

// ---------------------------------------------------------------- courses
// Taken from the certificates in assets/certificados, plus the Python module of the master's and the
// courses listed in earlier CVs that have no PDF there. Item: [name ES, name EN, provider, year, hours, grade].
const COURSES = [
  [['Java y Spring', 'Java &amp; Spring'], [
    ['Java Spring', 'Java Spring', 'Platzi', 2023, 16],
    ['Fundamentos de Java Spring Boot', 'Java Spring Boot Fundamentals', 'Platzi', 2023, 16],
    ['Backend con Java: seguridad web con Spring Security', 'Java Backend: Web Security with Spring Security', 'Platzi', 2023, 13],
    ['Spring AI: crea APIs inteligentes con Spring Boot', 'Spring AI: Build Intelligent APIs with Spring Boot', 'Udemy', 2026, 7.5],
    ['Microservicios y aplicaciones reactivas con WebFlux y Kafka', 'Microservices and Reactive Applications with WebFlux and Kafka', 'Udemy', 2026, 16.5],
    ['Introducción a Java SE', 'Introduction to Java SE', 'Platzi', 2023, 15],
    ['Java SE orientado a objetos', 'Object-Oriented Java SE', 'Platzi', 2023, 16],
    ['Java SE: persistencia de datos', 'Java SE: Data Persistence', 'Platzi', 2023, 11],
    ['Programación funcional con Java SE', 'Functional Programming with Java SE', 'Platzi', 2023, 16],
    ['Java SE avanzado', 'Advanced Java SE', 'Platzi', 2023, 25],
    ['Testing en Java', 'Java Testing Basics', 'Platzi', 2023, 16],
    ['Programa Backend con Java · Escuela de Desarrollo Web', 'Backend with Java program · Web Development School', 'Platzi', 2023],
  ]],
  [['PHP y Laravel', 'PHP &amp; Laravel'], [
    ['PHP con Laravel', 'PHP with Laravel', 'Platzi', 2023, 19],
    ['API REST con PHP', 'REST APIs with PHP', 'Platzi', 2023, 18],
    ['Programación orientada a objetos en PHP', 'Object-Oriented Programming in PHP', 'Platzi', 2023, 8],
    ['PHP intermedio: cookies, sesiones y modularización', 'Intermediate PHP: Cookies, Sessions and Modularization', 'Platzi', 2023, 17],
    ['Introducción a PHP con Composer', 'Introduction to PHP with Composer', 'Platzi', 2023, 6],
    ['Programa Backend con PHP · Escuela de Desarrollo Web', 'Backend with PHP program · Web Development School', 'Platzi', 2023],
  ]],
  [['Frontend y Node.js', 'Frontend &amp; Node.js'], [
    ['Angular Pro: lleva tus bases al siguiente nivel', 'Angular Pro: Take Your Foundations to the Next Level', 'Udemy', 2026, 21.5],
    ['Backend con Node.js: base de datos con PostgreSQL', 'Node.js Backend: PostgreSQL Database', 'Platzi', 2024, 21],
    ['Creación de páginas web con ChatGPT', 'Building Web Pages with ChatGPT', 'Platzi', 2023, 9],
  ]],
  [['Python e inteligencia artificial', 'Python &amp; artificial intelligence'], [
    ['Python', 'Python', 'Platzi', 2024, 36],
    ['Programación en Python · Máster en IA', 'Python Programming · Master’s in AI', 'UNIR', 2025, null, 8.5],
    ['AWS Machine Learning Foundations', 'AWS Machine Learning Foundations', 'AWS', 2026],
    ['Bases de datos vectoriales y LLM RAG para aplicaciones de IA', 'Vector Databases and LLM RAG for AI Applications', 'Udemy', 2026, 13.5],
    ['Agentes de IA', 'AI Agents', 'Platzi', 2024],
    ['Prompt engineering con ChatGPT', 'Prompt Engineering with ChatGPT', 'Platzi', 2023, 15],
  ]],
  [['Bases de datos', 'Databases'], [
    ['Database Engineer / DBA: PostgreSQL, IBM Db2, MariaDB y NoSQL', 'Database Engineer / DBA: PostgreSQL, IBM Db2, MariaDB and NoSQL', 'Udemy', 2026, 18],
    ['PostgreSQL', 'PostgreSQL', 'Platzi', 2023, 15],
    ['Introducción a MongoDB', 'Introduction to MongoDB', 'Platzi', 2023, 13],
  ]],
  [['DevOps, Git y despliegue', 'DevOps, Git &amp; deployment'], [
    ['DevOps integral: Docker, Kubernetes, Jenkins, GitFlow y CI/CD', 'End-to-End DevOps: Docker, Kubernetes, Jenkins, GitFlow and CI/CD', 'Udemy', 2026, 16.5],
    ['DevOps (curso profesional)', 'Professional DevOps', 'Platzi', 2023, 16],
    ['Introducción a DevOps', 'Introduction to DevOps', 'Platzi', 2023, 10],
    ['DevOps con GitLab', 'DevOps with GitLab', 'Platzi', 2023, 24],
    ['Git y GitHub (curso profesional)', 'Professional Git and GitHub', 'Platzi', 2023, 22],
    ['Git y GitHub desde cero a experto', 'Git and GitHub from Zero to Expert', 'Udemy', 2026, 16],
    ['Introducción al despliegue de aplicaciones', 'Introduction to Application Deployment', 'Platzi', 2023, 11],
    ['Introducción a la terminal y línea de comandos', 'Introduction to the Terminal and Command Line', 'Platzi', 2023, 11],
  ]],
  [['Arquitectura y calidad de software', 'Software architecture &amp; quality'], [
    ['Ingeniería de software y arquitectura de software', 'Software Engineering and Software Architecture', 'Udemy', 2026, 20],
    ['Fundamentos de arquitectura de alta concurrencia', 'High-Concurrency Architecture Fundamentals', 'Platzi', 2024, 15],
    ['Patrones de diseño: soluciones prácticas y eficientes', 'Design Patterns: Practical and Efficient Solutions', 'Udemy', 2026, 10],
    ['Principios SOLID y Clean Code', 'SOLID Principles and Clean Code', 'Udemy', 2026, 6.5],
    ['Principios SOLID y Clean Code: escribe código de calidad', 'SOLID Principles and Clean Code: Write Quality Code', 'Udemy', 2026, 3.5],
    ['Fundamentos de ingeniería de software', 'Software Engineering Fundamentals', 'Platzi', 2024, 16],
    ['Fundamentos de pruebas de software', 'Software Testing Fundamentals', 'Platzi', 2024, 18],
    ['Programación orientada a objetos', 'Object-Oriented Programming', 'Platzi', 2023, 20],
  ]],
  [['Ciberseguridad', 'Cybersecurity'], [
    ['Hacking ético', 'Ethical Hacking', 'Platzi', 2024, 16],
    ['Pentesting con Metasploit', 'Pentesting with Metasploit', 'Platzi', 2024, 12],
    ['Pentesting de servicios de red', 'Network Services Pentesting', 'Platzi', 2024, 9],
    ['Hacking de aplicaciones web: server side', 'Web Application Hacking: Server Side', 'Platzi', 2024, 7],
    ['Introducción a la escalada de privilegios', 'Introduction to Privilege Escalation', 'Platzi', 2024, 10],
    ['Guía para aprender seguridad informática', 'Information Security Learning Guide', 'Platzi', 2024, 7],
  ]],
  [['Otros lenguajes y fundamentos', 'Other languages &amp; fundamentals'], [
    ['Kotlin desde cero', 'Kotlin from Scratch', 'Platzi', 2023, 20],
    ['Programación funcional con Scala', 'Functional Programming with Scala', 'Platzi', 2023, 16],
    ['Firebase para Android', 'Firebase for Android', ''],
    ['Programación básica', 'Programming Fundamentals', ''],
    ['Introducción a las startups blockchain', 'Introduction to Blockchain Startups', 'Platzi', 2023, 3],
  ]],
  [['Habilidades blandas', 'Soft skills'], [
    ['Educación continua en Liderazgo', 'Continuing Education Certificate in Leadership', 'MIU City University Miami', 2025, 45],
    ['Comunicación efectiva', 'Effective Communication', 'Santander Open Academy', 2026, 8],
    ['Pensamiento crítico y resolución de problemas', 'Critical Thinking and Problem Solving', 'Santander Open Academy', 2026, 8],
  ]],
];

// lang: 0 = ES, 1 = EN. Items become [name, provider, year, hours, grade].
const coursesIn = (lang) => COURSES.map(([group, items]) => [group[lang], items.map((item) => [item[lang], ...item.slice(2)])]);
const COURSE_ITEMS = COURSES.flatMap(([, items]) => items);
const COURSE_COUNT = COURSE_ITEMS.length;
const COURSE_HOURS = Math.floor(COURSE_ITEMS.reduce((sum, item) => sum + (item[4] || 0), 0));

const countProjects = (groups) => groups.reduce((sum, group) => sum + group.items.length, 0);

// ---------------------------------------------------------------- projects
const AUTOLINK_STACK = ['Angular', 'TypeScript', 'Java', 'Spring Boot', 'PostgreSQL', 'Camunda', 'Issabel · Asterisk', 'PHP 5', 'WhatsApp API', 'PWA', 'Chrome Extension'];
const SECURITY_EXTENSIONS_STACK = ['Angular 20', 'TypeScript', 'Nx', 'Rspack', 'Module Federation', 'Manifest V3', 'AWS S3'];

const PROJECTS_ES = [
  {
    title: 'Para empresas',
    items: [
      {
        name: 'AutoLink',
        meta: 'Security Data · sistema distribuido en producción',
        text: 'Plataforma para emitir y dar continuidad a trámites de firma electrónica. A partir de un enlace cifrado recupera la solicitud, valida identidad, RUC, correo y trámites duplicados en curso, reutiliza documentos en renovaciones y lleva al usuario a su siguiente paso —biometría, vídeo, pago o revisión— mediante procesos orquestados. Integra telefonía IP con Issabel PBX (Asterisk) sobre PHP 5 y mensajería con APIs de WhatsApp; expone un gateway B2B con autenticación HMAC y payloads cifrados, un buzón de recuperación de solicitudes fallidas, extensión de Chrome, PWA y SDK en TypeScript para integradores.',
        stack: AUTOLINK_STACK,
        link: { href: AUTOLINK_DEMO, label: 'Formulario AutoLink · portal-sd.securitydata.net.ec' },
      },
      {
        name: 'SingExtension',
        meta: 'Security Data · SDK en TypeScript para integradores',
        text: 'SDK en TypeScript que permite integrar AutoLink en plataformas y aplicaciones de otras empresas e instituciones que desean emitir o renovar los productos de Security Data.',
        stack: ['TypeScript', 'SDK', 'AutoLink'],
      },
      {
        name: 'EC Google Extension',
        meta: 'Security Data · extensión de Google Chrome · culminado',
        text: 'Extensión de Google Chrome con visor de PDF integrado para trabajar con documentos directamente desde el navegador.',
        stack: ['Chrome Extension', 'Visor PDF'],
      },
      {
        name: 'Security Extensions',
        meta: 'Security Data · microfrontends para gestión documental',
        text: 'Extensión de Chrome (Manifest V3) con arquitectura de microfrontends: shell y cuatro aplicaciones remotas con Angular, Nx, Rspack y Module Federation. Visor de PDF, firma digital, cifrado y certificados, Web Workers, CSP estricta e integración con AWS S3, Google Drive y Dropbox.',
        stack: SECURITY_EXTENSIONS_STACK,
      },
      {
        name: 'Security Image',
        meta: 'Security Data · gestor corporativo de imágenes · en producción',
        text: 'Carga de imágenes JPG y PNG de hasta 10 MB con enlaces de expiración configurable, cuotas de almacenamiento por usuario, biblioteca, administración de usuarios, plantillas y registro de actividad.',
        link: 'portal-sd.securitydata.net.ec/security-image/',
      },
      {
        name: 'Transporte y carga GPS',
        meta: 'Cooperativa de Transporte Unidos · trabajo de titulación',
        text: 'Sistema web para gestionar empresa, usuarios y roles, clientes, choferes, vehículos, fletes, contratos, facturación, compras y gastos, con seguimiento GPS de la carga: ubicación, hora de salida y llegada estimada. Publicado como libro en 2020 (ISBN 9786203032277).',
        stack: ['Aplicación web', 'MySQL', 'UML'],
      },
    ],
  },
  {
    title: 'Independientes y personales',
    items: [
      {
        name: 'Cúspide',
        meta: 'Sistema de control educativo · en producción',
        text: 'Gestión de clases, pagos, estudiantes y docentes, con panel de alumnos, matrículas, ingresos, gastos y balance mensual.',
        stack: ['PHP', 'Composer', 'Twig'],
        link: 'operacionadmin.com',
      },
      {
        name: 'Clinical Admin',
        meta: 'Gestión clínica · en producción',
        text: 'Agenda de citas por paciente, médico y especialidad, con estados de atención y confirmaciones por correo electrónico y WhatsApp.',
        stack: ['PHP', 'MySQL'],
        link: 'clinical-admin.xo.je',
      },
      {
        name: 'Mnemosine',
        meta: 'Memoria y contexto para agentes de IA · V1 en pruebas',
        text: 'Arquitectura de memoria de corto y largo plazo, episódica, semántica, procedimental y de entidades, con conocimiento, reglas, tareas y skills reutilizables por rol, lenguaje y arquitectura. Una API entrega a cada proyecto solo el contexto que necesita para que los agentes den continuidad al trabajo entre sesiones.',
        stack: ['Agentes de IA', 'API', 'Markdown', 'JSON'],
      },
      {
        name: 'Multimodal Early Fusion · Green AI',
        meta: 'Investigación en IA · repositorio público',
        text: 'Clasificación multimodal con fusión temprana de datos tabulares y texto aplicada a la predicción de churn, con foco en la eficiencia de los modelos (Green AI). Es la línea de investigación del TFM.',
        stack: ['Python', 'Jupyter', 'scikit-learn', 'XGBoost', 'TF-IDF'],
        link: 'github.com/JhonnyMinian92/multimodal-early-fusion-green-ai',
      },
      {
        name: 'uwuChat',
        meta: 'Atención al cliente omnicanal · multiempresa',
        text: 'Chat que unifica WhatsApp, Facebook Messenger, Instagram, Telegram, Discord y correo electrónico en una sola bandeja de atención por empresa.',
      },
    ],
  },
];

const PROJECTS_EN = [
  {
    title: 'For companies',
    items: [
      {
        name: 'AutoLink',
        meta: 'Security Data · distributed system in production',
        text: 'Platform for issuing and continuing electronic-signature procedures. An encrypted link restores the request, validates identity, tax ID (RUC), email and duplicate in-flight procedures, reuses documents on renewals and guides users to their next step —biometrics, video, payment or review— through orchestrated workflows. It integrates IP telephony through Issabel PBX (Asterisk) on PHP 5 and messaging through WhatsApp APIs, and exposes a B2B gateway with HMAC authentication and encrypted payloads, an inbox to recover failed requests, a Chrome extension, a PWA and a TypeScript SDK for integrators.',
        stack: AUTOLINK_STACK,
        link: { href: AUTOLINK_DEMO, label: 'AutoLink form · portal-sd.securitydata.net.ec' },
      },
      {
        name: 'SingExtension',
        meta: 'Security Data · TypeScript SDK for integrators',
        text: 'TypeScript SDK that lets other companies and institutions embed AutoLink in their own platforms and apps to issue or renew Security Data products.',
        stack: ['TypeScript', 'SDK', 'AutoLink'],
      },
      {
        name: 'EC Google Extension',
        meta: 'Security Data · Google Chrome extension · completed',
        text: 'Google Chrome extension with a built-in PDF viewer to work with documents directly in the browser.',
        stack: ['Chrome Extension', 'PDF viewer'],
      },
      {
        name: 'Security Extensions',
        meta: 'Security Data · microfrontends for document management',
        text: 'Chrome extension (Manifest V3) built on a microfrontend architecture: a shell and four remote apps with Angular, Nx, Rspack and Module Federation. PDF viewer, digital signatures, encryption and certificates, Web Workers, a strict CSP and integration with AWS S3, Google Drive and Dropbox.',
        stack: SECURITY_EXTENSIONS_STACK,
      },
      {
        name: 'Security Image',
        meta: 'Security Data · corporate image manager · in production',
        text: 'JPG and PNG uploads of up to 10 MB with configurable link expiration, per-user storage quotas, a library, user administration, templates and activity logs.',
        link: 'portal-sd.securitydata.net.ec/security-image/',
      },
      {
        name: 'Transport &amp; GPS cargo tracking',
        meta: 'Cooperativa de Transporte Unidos · graduation project',
        text: 'Web system to manage the company, users and roles, customers, drivers, vehicles, freight, contracts, invoicing, purchases and expenses, with GPS cargo tracking: location, departure time and estimated arrival. Published as a book in 2020 (ISBN 9786203032277).',
        stack: ['Web application', 'MySQL', 'UML'],
      },
    ],
  },
  {
    title: 'Independent &amp; personal',
    items: [
      {
        name: 'Cúspide',
        meta: 'Education management system · in production',
        text: 'Classes, payments, students and teachers, with a dashboard for students, enrollments, income, expenses and monthly balance.',
        stack: ['PHP', 'Composer', 'Twig'],
        link: 'operacionadmin.com',
      },
      {
        name: 'Clinical Admin',
        meta: 'Clinic management · in production',
        text: 'Appointment scheduling by patient, doctor and specialty, with attendance status and email and WhatsApp confirmations.',
        stack: ['PHP', 'MySQL'],
        link: 'clinical-admin.xo.je',
      },
      {
        name: 'Mnemosine',
        meta: 'Memory and context for AI agents · V1 in testing',
        text: 'Short- and long-term, episodic, semantic, procedural and entity memory architecture, with knowledge, rules, tasks and reusable skills by role, language and architecture. An API gives each project only the context it needs so agents can carry work forward across sessions.',
        stack: ['AI agents', 'API', 'Markdown', 'JSON'],
      },
      {
        name: 'Multimodal Early Fusion · Green AI',
        meta: 'AI research · public repository',
        text: 'Multimodal classification with early fusion of tabular data and text applied to churn prediction, with a focus on model efficiency (Green AI). It is the research line of my master’s thesis.',
        stack: ['Python', 'Jupyter', 'scikit-learn', 'XGBoost', 'TF-IDF'],
        link: 'github.com/JhonnyMinian92/multimodal-early-fusion-green-ai',
      },
      {
        name: 'uwuChat',
        meta: 'Omnichannel customer service · multi-company',
        text: 'Chat that brings WhatsApp, Facebook Messenger, Instagram, Telegram, Discord and email together in a single support inbox per company.',
      },
    ],
  },
];

// ---------------------------------------------------------------- content
const CONTENT = {
  es: {
    lang: 'es',
    locale: 'es-EC',
    file: 'Jhonny-Minan-CV-ES.pdf',
    docTitle: 'Jhonny Miñan — Currículum',
    title: 'Senior Software Engineer · Full Stack · Inteligencia Artificial',
    subtitle: 'Ingeniero de Sistemas · Máster en Inteligencia Artificial',
    stack: {
      label: 'Tecnologías que domino',
      groups: [
        ['Lenguajes', ['Java', 'PHP', 'Python', 'C#', 'TypeScript']],
        ['Bases de datos', ['PostgreSQL', 'MySQL', 'Redis']],
        ['Frameworks', ['Spring Boot', 'Laravel', 'Angular', 'React']],
        ['DevOps y Git', ['Docker', 'GitHub', 'GitLab']],
        ['IA y automatización', ['Agentes de IA', 'n8n', 'LLM', 'RAG', 'Machine Learning', 'Deep Learning', 'NLP']],
      ],
    },
    facts: [
      ['8+', 'años desarrollando software'],
      ['MSc', 'Inteligencia Artificial · UNIR'],
      [String(COURSE_COUNT), 'cursos y certificaciones'],
      [`${COURSE_HOURS} h`, 'de formación certificada'],
      [String(countProjects(PROJECTS_ES)), 'proyectos para empresas y personales'],
    ],
    labels: { profile: 'Perfil profesional', experience: 'Experiencia profesional', additional: 'Experiencia complementaria', education: 'Formación académica', projects: 'Proyectos', skills: 'Habilidades técnicas', softSkills: 'Habilidades blandas', courses: 'Cursos y certificaciones', learned: 'Lo que aprendí:', hours: 'h certificadas', coursesWord: 'cursos', grade: 'nota', page: 'Página', updated: 'Actualizado' },
    coursesNote: 'Certificados verificables en <a href="https://platzi.com/p/JhonnyMinian92/">platzi.com/p/JhonnyMinian92</a> y en <a href="https://jhonnyminian92.github.io/#certificados">jhonnyminian92.github.io/#certificados</a>.',
    profile: 'Ingeniero de Sistemas y Máster en Inteligencia Artificial con más de 8 años desarrollando software y trayectoria en tecnología desde 2010. Como Desarrollador Senior Full Stack en Security Data diseño, construyo y mantengo sistemas distribuidos en producción con <b>Java&nbsp;· Spring Boot</b>, <b>PHP</b>, <b>Angular</b>, <b>React</b> y <b>PostgreSQL</b>, como AutoLink, plataforma de trámites de firma electrónica integrada con telefonía Issabel/Asterisk y APIs de WhatsApp; además desarrollo SDKs en TypeScript y extensiones de Google Chrome. Domino también <b>Laravel</b>, <b>Python</b>, <b>C#</b>, <b>MySQL</b>, <b>Redis</b>, <b>Docker</b>, <b>GitHub</b> y <b>GitLab</b>, y aplico IA a problemas reales: <b>agentes de IA</b>, automatizaciones con <b>n8n</b>, Machine Learning, NLP y RAG. Mi base en soporte, redes, servidores y emprendimiento me da una visión completa, de la infraestructura al producto.',
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
          'Desarrollo y mantenimiento full stack de sistemas en producción de una empresa de firma electrónica: servicios backend con <b>Java&nbsp;· Spring Boot</b> y <b>PHP</b>, interfaces con <b>Angular</b>, <b>React</b> y <b>TypeScript</b>, APIs REST, microservicios y capas de datos en <b>PostgreSQL</b>; depuración, refactorización e integración con Asterisk y agentes de IA.',
          'Diseñé y desarrollé <b>AutoLink</b>, sistema distribuido —Angular, Spring Boot, PostgreSQL, Issabel/Asterisk con PHP 5 y APIs de WhatsApp— que automatiza la emisión y renovación de firma electrónica, con procesos orquestados, gateway B2B con HMAC, extensión de Chrome, PWA y SDK en TypeScript.',
          'Entregué <b>SingExtension</b> (SDK en TypeScript para integrar AutoLink en plataformas de terceros), <b>EC Google Extension</b> (extensión de Google Chrome con visor de PDF), microfrontends Angular con Nx y Module Federation para gestión documental y <b>Security Image</b>, gestor corporativo de imágenes en producción.',
        ],
      },
      {
        org: 'Codeandolo',
        period: '2010 — actualidad',
        role: 'Desarrollador de software independiente',
        bullets: ['Aplicaciones de escritorio y web a medida para clientes y proyectos propios. Comencé con <b>Java</b> y <b>C#&nbsp;·&nbsp;.NET</b> y evolucioné hacia <b>PHP&nbsp;·&nbsp;Laravel</b>, <b>Python</b> y <b>TypeScript</b>.'],
      },
    ],
    earlier: [
      ['Explofrap', 'Analista de Sistemas', 'ene 2016 — jul 2017', 'Desarrollo en Visual Basic, servidores y arquitectura de red.'],
      ['Supercompu TIC', 'Fundador y propietario', '2014 — 2017', 'Emprendimiento de servicios técnicos y soluciones informáticas.'],
      ['Almacén V&amp;A', 'Analista de Sistemas', '2012 — 2014', 'De técnico auxiliar a jefe del departamento de TI.'],
    ],
    additional: [
      ['Diners Club del Ecuador', 'Oficial de Crédito', '2017 — 2021', 'Análisis y gestión crediticia de cartera de tarjetas; experiencia en procesos, riesgo y atención al cliente.'],
      ['Gestiona GTX', 'Gestor Domiciliario', '2017 — 2021', 'Negociación y gestión de cartera vencida y prelegal, en paralelo con Diners Club.'],
      ['Grupo Open', 'Jefe Técnico Informático', '2015 — 2016', 'Mantenimiento correctivo y preventivo de equipos en agencias de Huaquillas, Arenillas y Santa Rosa.'],
      ['Marcimex', 'Promotor Informático', '2015 — 2016', 'Venta técnica de equipos informáticos y gestión de garantías.'],
    ],
    education: [
      {
        degree: 'Máster Universitario en Inteligencia Artificial',
        school: 'Universidad Internacional de La Rioja (UNIR), España',
        period: '2025 — 2026',
        lines: ['<b>Título:</b> Máster Universitario en Inteligencia Artificial. Máster culminado: TFM defendido en septiembre de 2026, promedio final 8/10; título en trámite administrativo.'],
        learned: 'programación en Python —tipos y estructuras de datos, funciones y librería estándar, POO y aspectos avanzados—, análisis de datos con NumPy y pandas y visualización con Matplotlib y Seaborn; Machine Learning supervisado y no supervisado, redes neuronales y Deep Learning, procesamiento del lenguaje natural (NLP), visión artificial, razonamiento y planificación automática, cloud para IA y gestión de proyectos de IA. En la práctica: pipelines reproducibles con scikit-learn, XGBoost y TF-IDF; fusión multimodal de datos tabulares y texto; supervisión débil; validación cruzada, agrupada y hold-out; evaluación con F1-Macro, MCC, Balanced Accuracy, ROC-AUC y Log Loss, y análisis de fugas de datos y de la capacidad de generalización.',
        after: ['<b>TFM:</b> Pipeline software reproducible para la clasificación multimodal de intenciones de renovación y negociabilidad mediante fusión temprana de datos tabulares y texto.'],
      },
      {
        degree: 'Ingeniería de Sistemas',
        school: 'Universidad Técnica de Machala (UTMACH), Ecuador',
        period: '2009 — 2020',
        lines: ['<b>Título:</b> Ingeniero de Sistemas.'],
        learned: 'lógica de programación, algoritmos y estructuras de datos; programación estructurada y orientada a objetos; ingeniería de software —requerimientos, análisis y diseño con UML, pruebas y mantenimiento—; diseño y administración de bases de datos relacionales con SQL; desarrollo de aplicaciones web y de escritorio; sistemas operativos, arquitectura de computadores, redes y telecomunicaciones; seguridad informática; gestión de proyectos de TI; y matemáticas, estadística e investigación de operaciones aplicadas a la toma de decisiones.',
        after: ['<b>Trabajo de titulación:</b> sistema web de gestión de transporte y seguimiento de carga por GPS para la Cooperativa de Transporte Unidos, publicado en 2020 (ISBN 9786203032277).'],
      },
    ],
    projects: PROJECTS_ES,
    skills: [
      ['Lenguajes', '<b>Java</b> · <b>PHP</b> · <b>Python</b> · <b>C#</b> · <b>TypeScript</b> · JavaScript · SQL · Kotlin · Scala · Visual Basic'],
      ['Backend', '<b>Spring Boot</b> · Spring Security · Spring WebFlux · Spring AI · <b>Laravel</b> · .NET · Node.js · Express · APIs REST · Microservicios · Kafka · Composer · Twig'],
      ['Frontend', '<b>Angular</b> · <b>React</b> · TypeScript · HTML5 · CSS3 · Microfrontends (Nx, Module Federation, Rspack) · PWA · Extensiones de Chrome (Manifest V3) · AngularJS · Diseño responsive'],
      ['Bases de datos', '<b>PostgreSQL</b> · <b>MySQL</b> · <b>Redis</b> · MongoDB · MariaDB · IBM Db2 · Bases de datos vectoriales · Modelado relacional'],
      ['DevOps y Git', '<b>Docker</b> · <b>GitHub</b> · <b>GitLab</b> · Git · GitFlow · CI/CD · GitHub Actions · Jenkins · Kubernetes · Linux y terminal · Despliegue de aplicaciones'],
      ['IA y datos', '<b>Agentes de IA</b> · <b>n8n</b> · <b>LLM</b> · <b>RAG</b> · <b>Machine Learning</b> · <b>Deep Learning</b> · <b>NLP</b> · Visión artificial · Prompt engineering · scikit-learn · XGBoost · PyTorch · TensorFlow · Keras · pandas · NumPy · Matplotlib · Seaborn · Jupyter'],
      ['Integración', 'Issabel PBX · Asterisk · APIs de WhatsApp · Camunda (BPM) · Gateway B2B · HMAC · Cifrado de payloads · SDKs en TypeScript'],
      ['Seguridad', 'Firma digital y certificados · Cifrado · CSP · Hacking ético · Pentesting (Metasploit) · Seguridad de aplicaciones web'],
      ['Arquitectura', 'Clean Code · SOLID · Clean Architecture · Patrones de diseño · Arquitectura de software · Alta concurrencia · POO · Programación funcional · Pruebas de software · UML'],
      ['Herramientas', 'VS Code · Cursor · NetBeans · Microsoft Visio'],
      ['Infraestructura', 'Redes · Servidores · Soporte técnico · Mantenimiento de hardware'],
    ],
    softSkills: [
      ['Liderazgo y motivación de equipos', 'Certificado de 45 h (MIU City University Miami); jefatura de TI en Almacén V&amp;A y Grupo Open.'],
      ['Comunicación efectiva y asertiva', 'Certificado de Santander Open Academy; trato claro con usuarios, clientes y equipos.'],
      ['Pensamiento crítico y resolución de problemas', 'Certificado de Santander Open Academy; diagnóstico de fallos en producción.'],
      ['Inteligencia emocional y empatía', 'Habilidades intra e interpersonales y asertividad (formación en liderazgo).'],
      ['Trabajo en equipo y colaboración', 'Coordinación con equipos de desarrollo, soporte y operación.'],
      ['Negociación y manejo de conflictos', 'Negociación de cartera vencida y prelegal en Gestiona GTX.'],
      ['Orientación al cliente', 'Atención y asesoría en Diners Club, Supercompu TIC y Marcimex.'],
      ['Pensamiento analítico', 'Análisis de sistemas, procesos y riesgo antes de diseñar.'],
      ['Aprendizaje continuo y adaptabilidad', `${COURSE_COUNT} cursos certificados; de soporte TI a Senior Full Stack e IA.`],
      ['Iniciativa y emprendimiento', 'Fundador de Supercompu TIC; desarrollador independiente desde 2010.'],
      ['Organización y gestión del tiempo', 'Ingeniería y máster cursados mientras trabajaba.'],
      ['Responsabilidad y compromiso', 'Sistemas en producción y promociones internas en Security Data.'],
    ],
    courses: coursesIn(0),
  },
  en: {
    lang: 'en',
    locale: 'en-US',
    file: 'Jhonny-Minan-CV-EN.pdf',
    docTitle: 'Jhonny Miñan — Curriculum Vitae',
    title: 'Senior Software Engineer · Full Stack · Artificial Intelligence',
    subtitle: 'Systems Engineer · Master’s in Artificial Intelligence',
    stack: {
      label: 'Technologies I master',
      groups: [
        ['Languages', ['Java', 'PHP', 'Python', 'C#', 'TypeScript']],
        ['Databases', ['PostgreSQL', 'MySQL', 'Redis']],
        ['Frameworks', ['Spring Boot', 'Laravel', 'Angular', 'React']],
        ['DevOps &amp; Git', ['Docker', 'GitHub', 'GitLab']],
        ['AI &amp; automation', ['AI agents', 'n8n', 'LLMs', 'RAG', 'Machine Learning', 'Deep Learning', 'NLP']],
      ],
    },
    facts: [
      ['8+', 'years building software'],
      ['MSc', 'Artificial Intelligence · UNIR'],
      [String(COURSE_COUNT), 'courses and certifications'],
      [`${COURSE_HOURS} h`, 'of certified training'],
      [String(countProjects(PROJECTS_EN)), 'company and personal projects'],
    ],
    labels: { profile: 'Professional profile', experience: 'Professional experience', additional: 'Additional experience', education: 'Education', projects: 'Projects', skills: 'Technical skills', softSkills: 'Soft skills', courses: 'Courses and certifications', learned: 'What I learned:', hours: 'certified hours', coursesWord: 'courses', grade: 'grade', page: 'Page', updated: 'Updated' },
    coursesNote: 'Certificates can be verified at <a href="https://platzi.com/p/JhonnyMinian92/">platzi.com/p/JhonnyMinian92</a> and <a href="https://jhonnyminian92.github.io/#certificados">jhonnyminian92.github.io/#certificados</a>.',
    profile: 'Systems Engineer with a Master’s in Artificial Intelligence, 8+ years of software development experience and a career in technology since 2010. As a Senior Full Stack Developer at Security Data, I design, build and maintain distributed production systems with <b>Java&nbsp;· Spring Boot</b>, <b>PHP</b>, <b>Angular</b>, <b>React</b> and <b>PostgreSQL</b>, such as AutoLink, an electronic-signature platform integrated with Issabel/Asterisk telephony and WhatsApp APIs; I also build TypeScript SDKs and Google Chrome extensions. I am equally proficient in <b>Laravel</b>, <b>Python</b>, <b>C#</b>, <b>MySQL</b>, <b>Redis</b>, <b>Docker</b>, <b>GitHub</b> and <b>GitLab</b>, and I apply AI to real problems: <b>AI agents</b>, <b>n8n</b> automations, Machine Learning, NLP and RAG. A background in IT support, networking, servers and entrepreneurship gives me a full view, from infrastructure to product.',
    experience: [
      {
        org: 'Security Data',
        period: '2021 — present',
        roles: [
          ['Senior Full Stack Developer', 'present'],
          ['Full Stack Developer · Mid-Level', 'promoted Mar 2024'],
          ['Full Stack Developer · Junior', 'Dec 2022 — Mar 2024'],
          ['Registration Operator &amp; IT Support', 'Jul 2021 — Jan 2023'],
        ],
        bullets: [
          'Full stack development and maintenance of production systems for an electronic-signature company: backend services with <b>Java&nbsp;· Spring Boot</b> and <b>PHP</b>, interfaces with <b>Angular</b>, <b>React</b> and <b>TypeScript</b>, REST APIs, microservices and <b>PostgreSQL</b> data layers; debugging, refactoring and integrations with Asterisk and AI agents.',
          'Designed and built <b>AutoLink</b>, a distributed system —Angular, Spring Boot, PostgreSQL, Issabel/Asterisk with PHP 5 and WhatsApp APIs— that automates the issuance and renewal of electronic signatures, with orchestrated workflows, an HMAC-secured B2B gateway, a Chrome extension, a PWA and a TypeScript SDK.',
          'Delivered <b>SingExtension</b> (TypeScript SDK that embeds AutoLink in third-party platforms), <b>EC Google Extension</b> (Google Chrome extension with a PDF viewer), Angular microfrontends with Nx and Module Federation for document management, and <b>Security Image</b>, a corporate image manager in production.',
        ],
      },
      {
        org: 'Codeandolo',
        period: '2010 — present',
        role: 'Independent Software Developer',
        bullets: ['Custom desktop and web applications for clients and own projects. I started with <b>Java</b> and <b>C#&nbsp;·&nbsp;.NET</b> and moved on to <b>PHP&nbsp;·&nbsp;Laravel</b>, <b>Python</b> and <b>TypeScript</b>.'],
      },
    ],
    earlier: [
      ['Explofrap', 'Systems Analyst', 'Jan 2016 — Jul 2017', 'Visual Basic development, servers and network architecture.'],
      ['Supercompu TIC', 'Founder &amp; Owner', '2014 — 2017', 'Technical services and IT solutions business.'],
      ['Almacén V&amp;A', 'Systems Analyst', '2012 — 2014', 'From technical assistant to head of the IT department.'],
    ],
    additional: [
      ['Diners Club del Ecuador', 'Credit Officer', '2017 — 2021', 'Credit analysis and credit card portfolio management; experience with processes, risk and customer service.'],
      ['Gestiona GTX', 'Field Collections Specialist', '2017 — 2021', 'Negotiation and management of overdue and pre-legal portfolios, alongside the role at Diners Club.'],
      ['Grupo Open', 'IT Technical Lead', '2015 — 2016', 'Corrective and preventive equipment maintenance across branches in Huaquillas, Arenillas and Santa Rosa.'],
      ['Marcimex', 'IT Sales Promoter', '2015 — 2016', 'Technical sales of computer equipment and warranty management.'],
    ],
    education: [
      {
        degree: 'Master’s Degree in Artificial Intelligence',
        school: 'Universidad Internacional de La Rioja (UNIR), Spain',
        period: '2025 — 2026',
        lines: ['<b>Degree:</b> Máster Universitario en Inteligencia Artificial. Completed: thesis defended in September 2026, final average 8/10; diploma being processed.'],
        learned: 'Python programming —data types and structures, functions and the standard library, OOP and advanced features—, data analysis with NumPy and pandas and visualization with Matplotlib and Seaborn; supervised and unsupervised Machine Learning, neural networks and Deep Learning, natural language processing (NLP), computer vision, automated reasoning and planning, cloud for AI and AI project management. In practice: reproducible pipelines with scikit-learn, XGBoost and TF-IDF; multimodal fusion of tabular data and text; weak supervision; cross-validation, grouped validation and hold-out; evaluation with F1-Macro, MCC, Balanced Accuracy, ROC-AUC and Log Loss, plus analysis of data leakage and generalization.',
        after: ['<b>Thesis:</b> Reproducible software pipeline for the multimodal classification of renewal and negotiability intents through early fusion of tabular data and text.'],
      },
      {
        degree: 'B.Eng. in Systems Engineering',
        school: 'Universidad Técnica de Machala (UTMACH), Ecuador',
        period: '2009 — 2020',
        lines: ['<b>Degree:</b> Ingeniero de Sistemas (Systems Engineer).'],
        learned: 'programming logic, algorithms and data structures; structured and object-oriented programming; software engineering —requirements, analysis and design with UML, testing and maintenance—; relational database design and administration with SQL; web and desktop application development; operating systems, computer architecture, networks and telecommunications; information security; IT project management; and mathematics, statistics and operations research applied to decision-making.',
        after: ['<b>Graduation project:</b> web system for transport management and GPS cargo tracking for Cooperativa de Transporte Unidos, published in 2020 (ISBN 9786203032277).'],
      },
    ],
    projects: PROJECTS_EN,
    skills: [
      ['Languages', '<b>Java</b> · <b>PHP</b> · <b>Python</b> · <b>C#</b> · <b>TypeScript</b> · JavaScript · SQL · Kotlin · Scala · Visual Basic'],
      ['Backend', '<b>Spring Boot</b> · Spring Security · Spring WebFlux · Spring AI · <b>Laravel</b> · .NET · Node.js · Express · REST APIs · Microservices · Kafka · Composer · Twig'],
      ['Frontend', '<b>Angular</b> · <b>React</b> · TypeScript · HTML5 · CSS3 · Microfrontends (Nx, Module Federation, Rspack) · PWA · Chrome Extensions (Manifest V3) · AngularJS · Responsive design'],
      ['Databases', '<b>PostgreSQL</b> · <b>MySQL</b> · <b>Redis</b> · MongoDB · MariaDB · IBM Db2 · Vector databases · Relational modeling'],
      ['DevOps &amp; Git', '<b>Docker</b> · <b>GitHub</b> · <b>GitLab</b> · Git · GitFlow · CI/CD · GitHub Actions · Jenkins · Kubernetes · Linux &amp; terminal · Application deployment'],
      ['AI &amp; data', '<b>AI agents</b> · <b>n8n</b> · <b>LLMs</b> · <b>RAG</b> · <b>Machine Learning</b> · <b>Deep Learning</b> · <b>NLP</b> · Computer vision · Prompt engineering · scikit-learn · XGBoost · PyTorch · TensorFlow · Keras · pandas · NumPy · Matplotlib · Seaborn · Jupyter'],
      ['Integration', 'Issabel PBX · Asterisk · WhatsApp APIs · Camunda (BPM) · B2B gateway · HMAC · Payload encryption · TypeScript SDKs'],
      ['Security', 'Digital signatures &amp; certificates · Encryption · CSP · Ethical hacking · Pentesting (Metasploit) · Web application security'],
      ['Architecture', 'Clean Code · SOLID · Clean Architecture · Design patterns · Software architecture · High concurrency · OOP · Functional programming · Software testing · UML'],
      ['Tools', 'VS Code · Cursor · NetBeans · Microsoft Visio'],
      ['Infrastructure', 'Networking · Servers · IT support · Hardware maintenance'],
    ],
    softSkills: [
      ['Leadership &amp; team motivation', '45-hour Leadership certificate (MIU City University Miami); head of IT at Almacén V&amp;A and Grupo Open.'],
      ['Effective &amp; assertive communication', 'Santander Open Academy certificate; clear communication with users, clients and teams.'],
      ['Critical thinking &amp; problem solving', 'Santander Open Academy certificate; diagnosing failures in production.'],
      ['Emotional intelligence &amp; empathy', 'Intra- and interpersonal skills and assertiveness (leadership training).'],
      ['Teamwork &amp; collaboration', 'Coordination with development, support and operations teams.'],
      ['Negotiation &amp; conflict management', 'Negotiation of overdue and pre-legal portfolios at Gestiona GTX.'],
      ['Customer focus', 'Customer service and advice at Diners Club, Supercompu TIC and Marcimex.'],
      ['Analytical thinking', 'Analysis of systems, processes and risk before designing.'],
      ['Continuous learning &amp; adaptability', `${COURSE_COUNT} certified courses; from IT support to Senior Full Stack and AI.`],
      ['Initiative &amp; entrepreneurship', 'Founder of Supercompu TIC; independent developer since 2010.'],
      ['Organization &amp; time management', 'Engineering degree and master’s completed while working.'],
      ['Responsibility &amp; commitment', 'Production systems and internal promotions at Security Data.'],
    ],
    courses: coursesIn(1),
  },
};

// ---------------------------------------------------------------- template
const css = `
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${FONTS.inter}) format('woff2');font-weight:100 900;unicode-range:U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD}
@font-face{font-family:Inter;src:url(data:font/woff2;base64,${FONTS.interExt}) format('woff2');font-weight:100 900;unicode-range:U+0100-02AF,U+0304,U+0308,U+0329,U+1E00-1E9F,U+1EF2-1EFF,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF}
@font-face{font-family:Plex;src:url(data:font/woff2;base64,${FONTS.mono400}) format('woff2');font-weight:400}
@font-face{font-family:Plex;src:url(data:font/woff2;base64,${FONTS.mono500}) format('woff2');font-weight:500}
@page{size:A4;margin:11mm 14mm 13mm}
:root{--ink:#0f172a;--text:#334155;--muted:#64748b;--faint:#94a3b8;--line:#e2e8f0;--accent:#0f766e;--accent-ink:#134e4a;--accent-soft:#f0fdfa;--accent-line:#99f6e4;--chip:#f8fafc}
*{box-sizing:border-box;margin:0;padding:0}
html{font-size:8.5pt}
body{font-family:Inter,sans-serif;color:var(--text);line-height:1.43;font-feature-settings:"cv11","ss01";-webkit-print-color-adjust:exact;print-color-adjust:exact}
a{color:inherit;text-decoration:none}
b{color:var(--ink);font-weight:600}

header{padding-bottom:3.4mm;border-bottom:1.4pt solid var(--ink)}
.head{display:grid;grid-template-columns:auto 1fr auto;gap:5mm;align-items:center}
.photo{display:block;width:24mm;height:30mm;object-fit:cover;object-position:50% 18%;border-radius:2.4mm;border:.6pt solid var(--line)}
h1{font-size:21pt;line-height:1.05;font-weight:700;letter-spacing:-.025em;color:var(--ink);white-space:nowrap}
.title{margin-top:2mm;font-size:10pt;font-weight:500;color:var(--accent);letter-spacing:.005em}
.subtitle{margin-top:.9mm;font-size:8.7pt;color:var(--muted)}
.contact{list-style:none;text-align:right;font-size:8.2pt;line-height:1.55;color:var(--text)}
.contact a{color:var(--ink)}

.stackband{margin-top:3.2mm;padding:2.2mm 3mm 2.6mm;background:var(--accent-soft);border:.6pt solid var(--accent-line);border-radius:2mm}
.sb-label{margin-bottom:1.6mm;font-size:7.4pt;font-weight:650;letter-spacing:.09em;text-transform:uppercase;color:var(--accent)}
.sb-groups{display:grid;grid-template-columns:max-content max-content;justify-content:space-between;gap:1.6mm 5mm}
.sb-group{display:flex;align-items:center;flex-wrap:wrap;gap:1.3mm}
.sb-group:last-child:nth-child(odd){grid-column:1/-1}
.sb-group > span{width:25.5mm;font-size:7.3pt;font-weight:600;line-height:1.2;color:var(--accent-ink)}
.sb-group b{padding:.4mm 1.6mm;border:.6pt solid var(--accent-line);border-radius:1.2mm;background:#fff;font-size:8.2pt;font-weight:650;line-height:1.35;color:var(--ink);white-space:nowrap}

.facts{display:grid;grid-template-columns:repeat(var(--n),1fr);margin-top:3.2mm;border-bottom:.6pt solid var(--line)}
.facts div{padding:0 0 2.6mm 3.4mm;border-left:.6pt solid var(--line)}
.facts div:first-child{padding-left:0;border-left:0}
.facts strong{display:block;font-size:15pt;line-height:1.1;font-weight:650;letter-spacing:-.02em;color:var(--ink)}
.facts span{display:block;margin-top:.8mm;font-size:7.5pt;line-height:1.35;color:var(--muted)}

section{margin-top:4mm}
h2{display:flex;align-items:center;gap:3mm;margin-bottom:1.6mm;font-size:7.6pt;font-weight:650;letter-spacing:.09em;text-transform:uppercase;color:var(--accent);break-after:avoid}
h2::after{content:"";flex:1;height:.6pt;background:var(--line)}
h3.sub{display:flex;align-items:baseline;gap:1.6mm;margin:2mm 0 .4mm;font-size:8pt;font-weight:650;letter-spacing:.05em;text-transform:uppercase;color:var(--ink);break-after:avoid}
h3.sub small{font-family:Plex,monospace;font-size:7pt;font-weight:400;letter-spacing:0;color:var(--faint)}
.profile{font-size:8.9pt;line-height:1.56;color:var(--text)}

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
/* Native markers: a positioned ::before would be painted after the rest of the page and break the PDF text order. */
.bullets{margin-top:1.2mm;padding-left:3.3mm}
.bullets li{padding-left:.3mm;margin-top:.8mm;font-size:8.6pt;line-height:1.45}
.bullets li::marker{color:var(--accent);font-size:1.2em}
a.demo{display:inline-block;font-family:Plex,monospace;font-size:7.3pt;color:var(--accent);border-bottom:.5pt solid var(--accent)}
a.demo::after{content:" ↗"}

.compact{list-style:none}
.compact li{display:grid;grid-template-columns:31mm 1fr;column-gap:5mm;padding:1.5mm 0;font-size:8.5pt;line-height:1.45;break-inside:avoid}
.compact .when{padding-top:0}
.earlier{border-top:.6pt solid var(--line)}
.compact li + li{border-top:.6pt solid var(--line)}
.compact .what b{font-weight:600}
.compact .what i{font-style:normal;color:var(--accent);font-weight:500}

.project{display:grid;grid-template-columns:31mm 1fr;column-gap:5mm;padding:1.5mm 0;break-inside:avoid}
.project + .project{border-top:.6pt solid var(--line)}
.pname{font-size:9.4pt;font-weight:650;color:var(--ink);line-height:1.35;letter-spacing:-.01em}
.pmeta{font-size:8.3pt;font-weight:500;color:var(--accent)}
.ptext{margin-top:.3mm;font-size:8.4pt}
.pfoot{display:flex;flex-wrap:wrap;align-items:center;gap:1mm 4mm;margin-top:.9mm;font-family:Plex,monospace;font-size:7.3pt;color:var(--muted)}
.pfoot > a{color:var(--ink)}
.tags{display:flex;flex-wrap:wrap;gap:1mm}
.tags span{padding:.1mm 1.3mm;border:.5pt solid var(--line);border-radius:1mm;background:var(--chip);font-size:6.9pt;color:var(--text)}

.edu{display:grid;grid-template-columns:31mm 1fr;column-gap:5mm;padding:1.6mm 0;break-inside:avoid}
.edu + .edu{border-top:.6pt solid var(--line)}
.degree{font-size:10pt;font-weight:650;color:var(--ink);letter-spacing:-.01em}
.school{font-size:8.7pt;font-weight:500;color:var(--accent)}
.edu p{margin-top:.6mm;font-size:8.5pt}
.edu p.learned{padding:1.2mm 2.4mm;border-left:1.2pt solid var(--accent-line);background:var(--accent-soft);border-radius:0 1.2mm 1.2mm 0;font-size:8.3pt}

/* One row per category, so a page break never splits a label from its list. */
.skills > div{display:grid;grid-template-columns:31mm 1fr;column-gap:5mm;break-inside:avoid}
.skills dt,.skills dd{padding:.9mm 0;border-bottom:.6pt solid var(--line)}
.skills dt{font-size:8.3pt;font-weight:600;color:var(--ink)}
.skills dd{font-size:8.3pt}
.skills dd b{color:var(--accent-ink);font-weight:650}

.soft{list-style:none;display:grid;grid-template-columns:repeat(3,1fr);gap:2mm 5mm}
.soft li{padding-left:2.6mm;border-left:1.2pt solid var(--accent-line);break-inside:avoid}
.soft b{display:block;font-size:8.4pt;line-height:1.35}
.soft span{display:block;margin-top:.3mm;font-size:7.6pt;line-height:1.38;color:var(--muted)}

.csum{font-size:8.3pt;color:var(--text)}
.csum b{color:var(--accent-ink)}
.cnote{margin-top:.4mm;font-size:7.6pt;color:var(--muted)}
.cnote a{font-family:Plex,monospace;font-size:7.2pt;color:var(--ink)}
.ccols{margin-top:1.8mm;column-count:2;column-gap:8mm}
.cgroup h3{display:flex;justify-content:space-between;margin:2mm 0 .3mm;padding-bottom:.5mm;border-bottom:.8pt solid var(--accent-line);font-size:7.5pt;font-weight:650;letter-spacing:.06em;text-transform:uppercase;color:var(--accent);break-after:avoid}
.cgroup:first-child h3{margin-top:0}
.cgroup h3 small{font-family:Plex,monospace;font-size:7pt;font-weight:400;letter-spacing:0;color:var(--faint)}
.courses{list-style:none}
.courses li{display:flex;justify-content:space-between;align-items:baseline;gap:2.4mm;padding:.75mm 0;border-bottom:.5pt solid var(--line);font-size:8.2pt;line-height:1.38;color:var(--ink);break-inside:avoid}
.courses li span{flex:none;font-size:7.3pt;color:var(--muted);white-space:nowrap;font-variant-numeric:tabular-nums}
`;

function render(c) {
  const L = c.labels;
  const num = (value) => value.toLocaleString(c.locale);
  const linkTo = (link) =>
    typeof link === 'string' ? `<a href="https://${link}">${link}</a>` : `<a class="demo" href="${link.href}">${link.label}</a>`;

  const job = (j) => `
    <article class="job">
      <div class="when">${j.period}</div>
      <div>
        <div class="org">${j.org}</div>
        ${j.role ? `<div class="role">${j.role}</div>` : ''}
        ${j.roles ? `<ul class="roles">${j.roles.map(([r, p]) => `<li><span>${r}</span><span>${p}</span></li>`).join('')}</ul>` : ''}
        <ul class="bullets">${j.bullets.map((b) => `<li>${b}</li>`).join('')}</ul>
      </div>
    </article>`;
  const row = ([o, r, p, d]) => `<li><span class="when">${p}</span><span class="what"><b>${o}</b> · <i>${r}</i> — ${d}</span></li>`;
  const project = (p) => `
    <article class="project">
      <div class="pname">${p.name}</div>
      <div>
        <div class="pmeta">${p.meta}</div>
        <p class="ptext">${p.text}</p>
        ${p.stack || p.link ? `<div class="pfoot">${p.stack ? `<div class="tags">${p.stack.map((t) => `<span>${t}</span>`).join('')}</div>` : ''}${p.link ? linkTo(p.link) : ''}</div>` : ''}
      </div>
    </article>`;

  const courseMeta = ([, provider, year, hours, grade]) =>
    [provider, year, hours && `${num(hours)} h`, grade && `${L.grade} ${num(grade)}/10`].filter(Boolean).join(' · ');
  const providers = {};
  c.courses.forEach(([, items]) => items.forEach(([, provider]) => provider && (providers[provider] = (providers[provider] || 0) + 1)));
  const providerList = Object.entries(providers)
    .sort((a, b) => b[1] - a[1])
    .map(([name, n]) => `${name} (${n})`)
    .join(' · ');

  return `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><title>${c.docTitle}</title><style>${css}</style></head><body>
  <header>
    <div class="head">
      <img class="photo" src="data:image/jpeg;base64,${PHOTO}" alt="Jhonny Darwin Miñan Girón">
      <div>
        <h1>Jhonny Darwin Miñan Girón</h1>
        <div class="title">${c.title}</div>
        <div class="subtitle">${c.subtitle}</div>
      </div>
      <ul class="contact">
        <li>${CONTACT.location}</li>
        <li><a href="tel:${CONTACT.phone.replace(/\s/g, '')}">${CONTACT.phone}</a></li>
        <li><a href="mailto:${CONTACT.email}">${CONTACT.email}</a></li>
        <li><a href="https://${CONTACT.web}">${CONTACT.web}</a></li>
        <li><a href="https://www.${CONTACT.linkedin}">${CONTACT.linkedin}</a></li>
        <li><a href="https://${CONTACT.github}">${CONTACT.github}</a></li>
      </ul>
    </div>
    <div class="stackband">
      <div class="sb-label">${c.stack.label}</div>
      <div class="sb-groups">${c.stack.groups.map(([label, items]) => `<div class="sb-group"><span>${label}</span>${items.map((t) => `<b>${t}</b>`).join('')}</div>`).join('')}</div>
    </div>
  </header>

  <div class="facts" style="--n:${c.facts.length}">${c.facts.map(([n, l]) => `<div><strong>${n}</strong><span>${l}</span></div>`).join('')}</div>

  <section><h2>${L.profile}</h2><p class="profile">${c.profile}</p></section>

  <section><h2>${L.experience}</h2>${c.experience.map(job).join('')}
    <ul class="compact earlier">${c.earlier.map(row).join('')}</ul>
  </section>

  <section><h2>${L.additional}</h2>
    <ul class="compact">${c.additional.map(row).join('')}</ul>
  </section>

  <section><h2>${L.education}</h2>
    ${c.education
      .map(
        (e) => `
    <article class="edu">
      <div class="when">${e.period}</div>
      <div>
        <div class="degree">${e.degree}</div><div class="school">${e.school}</div>
        ${e.lines.map((l) => `<p>${l}</p>`).join('')}
        <p class="learned"><b>${L.learned}</b> ${e.learned}</p>
        ${e.after.map((l) => `<p>${l}</p>`).join('')}
      </div>
    </article>`,
      )
      .join('')}
  </section>

  <section><h2>${L.projects}</h2>${c.projects
    .map((g) => `<h3 class="sub">${g.title} <small>${g.items.length}</small></h3>${g.items.map(project).join('')}`)
    .join('')}</section>

  <section><h2>${L.skills}</h2>
    <dl class="skills">${c.skills.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>
  </section>

  <section><h2>${L.softSkills}</h2>
    <ul class="soft">${c.softSkills.map(([k, v]) => `<li><b>${k}</b><span>${v}</span></li>`).join('')}</ul>
  </section>

  <section><h2>${L.courses}</h2>
    <p class="csum"><b>${COURSE_COUNT} ${L.coursesWord}</b> · <b>${num(COURSE_HOURS)} ${L.hours}</b> · ${providerList}</p>
    <p class="cnote">${c.coursesNote}</p>
    <div class="ccols">${c.courses
      .map(
        ([group, items]) => `<div class="cgroup"><h3>${group} <small>${items.length}</small></h3>
        <ul class="courses">${items.map((item) => `<li>${item[0]}<span>${courseMeta(item)}</span></li>`).join('')}</ul></div>`,
      )
      .join('')}</div>
  </section>
</body></html>`;
}

const footer = (c) => {
  const updated = new Date().toLocaleDateString(c.locale, { month: 'long', year: 'numeric' });
  return `<div style="width:100%;padding:0 14mm;font-family:Arial,sans-serif;font-size:6.5pt;color:#94a3b8;display:flex;justify-content:space-between">
  <span>Jhonny Miñan · ${CONTACT.phone} · ${CONTACT.email} · ${c.labels.updated}: ${updated}</span>
  <span>${c.labels.page} <span class="pageNumber"></span> / <span class="totalPages"></span></span>
</div>`;
};

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
