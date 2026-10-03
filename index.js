document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.classList.add('js-ready');
  const translations = {
    'Perfil': 'Profile',
    'Trayectoria': 'Experience',
    'Proyectos': 'Projects',
    'Formación': 'Education',
    'Certificados': 'Certificates',
    'Contacto': 'Contact',
    'CERTIFICADOS · APRENDIZAJE CONTINUO': 'CERTIFICATES · CONTINUOUS LEARNING',
    'Formación verificable': 'Verified learning',
    'Aprender, practicar y': 'Learn, practice and',
    'seguir creciendo.': 'keep growing.',
    'Explora mis certificados de Platzi, Udemy y formación complementaria. Abre cualquier tarjeta para consultar el PDF.': 'Browse my Platzi, Udemy and additional training certificates. Open any card to view its PDF.',
    'Todos': 'All',
    'Otros': 'Other',
    'Buscar certificados': 'Search certificates',
    'Buscar por curso o tecnología…': 'Search by course or technology…',
    'No hay certificados que coincidan con la búsqueda.': 'No certificates match your search.',
    'Ver certificado': 'View certificate',
    'Formación complementaria': 'Additional training',
    'Ver repositorio ↗': 'View repository ↗',
    'AutoLink · datos básicos': 'AutoLink · basic details',
    'AutoLink · resumen y pago': 'AutoLink · order and payment summary',
    'AutoLink · solicitud en revisión': 'AutoLink · request under review',
    'ECUAPP · ECUADOR': 'ECUAPP · ECUADOR',
    'Formación continua en Platzi y Udemy.': 'Ongoing learning through Platzi and Udemy.',
    'Seleccionar idioma del currículum': 'Choose CV language',
    'Currículum en español': 'CV in Spanish',
    '8+ AÑOS DESARROLLANDO SOFTWARE': '8+ YEARS BUILDING SOFTWARE',
    'Ingeniería de software con una trayectoria que hoy': 'Software engineering with a career that now',
    'converge en IA.': 'converges in AI.',
    'Soy': "I'm",
    ', ingeniero de sistemas y máster en Inteligencia Artificial. Empecé en soporte, redes y servidores; pasé por análisis de sistemas y emprendimiento; y hoy trabajo en': ', a systems engineer with a master’s degree in Artificial Intelligence. I started in IT support, networking and servers; moved into systems analysis and entrepreneurship; and now work in',
    'ingeniería de software full stack, IA aplicada, agentes y automatización': 'full-stack software engineering, applied AI, agents and automation',
    '. Entiendo el sistema completo —datos, servicios, interfaz y operación— y llevo una idea desde el problema hasta un producto que funciona en producción.': '. I understand the whole system —data, services, interface and operations— and take an idea from the initial problem to a working product in production.',
    'Ver trayectoria': 'View experience',
    'Contactarme': 'Contact me',
    '8+ años': '8+ years',
    'desarrollando software': 'building software',
    '2021 → hoy': '2021 → present',
    'de soporte a Senior': 'from IT support to Senior',
    'Security Data · de soporte a Senior': 'Security Data · from IT support to Senior',
    'Máster en IA · UNIR': 'MSc in AI · UNIR',
    'Perfil visual': 'Profile portrait',
    'SOFTWARE ENGINEER': 'SOFTWARE ENGINEER',
    'Arquitectura + ejecución': 'Architecture + delivery',
    'RESUMEN EJECUTIVO': 'EXECUTIVE SUMMARY',
    'Una trayectoria, varias capas': 'A career across multiple layers',
    'No nací en una sola capa del stack.': 'I did not start in just one layer of the stack.',
    'La recorrí.': 'I have worked across it.',
    'Mi perfil no se explica solo por el stack actual. Se explica por la suma de etapas: operación y soporte, análisis de sistemas, emprendimiento, desarrollo de software en producción y formación de posgrado en IA.': 'My profile is shaped by more than my current tech stack. It reflects a combination of IT operations and support, systems analysis, entrepreneurship, production software development and postgraduate AI studies.',
    'Software independiente': 'Independent software development',
    'Primeras aplicaciones de escritorio y web': 'First desktop and web applications',
    'Análisis + sistemas': 'Systems analysis',
    'Responsable del departamento de TI': 'Head of the IT department',
    'Emprendimiento': 'Entrepreneurship',
    'Supercompu TIC: servicios y soluciones informáticas': 'Supercompu TIC: IT services and solutions',
    'Infraestructura': 'Infrastructure',
    'Redes, servidores y desarrollo en Visual Basic': 'Networking, servers and Visual Basic development',
    'Software en producción': 'Production software',
    'De soporte TI a Full Stack en Security Data': 'From IT support to Full Stack at Security Data',
    'IA aplicada': 'Applied AI',
    'Máster en IA, agentes y EcuApp': 'Master’s in AI, agents and EcuApp',
    'Construcción integral': 'End-to-end engineering',
    'Backend, frontend, APIs, bases de datos, integraciones y sistemas empresariales, con una mirada que empieza en el problema y termina en la operación.': 'Backend, frontend, APIs, databases, integrations and business systems, with an approach that starts with the problem and considers how the solution will run.',
    'La IA ya es parte del oficio': 'AI is now part of the craft',
    'Uso y diseño de agentes, automatización, contexto y memoria como herramientas reales de desarrollo y como componentes de nuevos productos.': 'I use and design agents, automation, context and memory as practical development tools and as building blocks for new products.',
    'Ingeniería con sentido de negocio': 'Engineering with business context',
    'La experiencia con clientes, operación y emprendimiento ayuda a traducir necesidades ambiguas en decisiones técnicas y productos utilizables.': 'Experience with customers, operations and entrepreneurship helps translate ambiguous needs into technical decisions and usable products.',
    'PERFIL PROFESIONAL': 'PROFESSIONAL PROFILE',
    'Más que código': 'More than code',
    'Una evolución desde la infraestructura hasta la': 'From infrastructure to',
    'ingeniería de sistemas.': 'systems engineering.',
    'Inteligencia Artificial.': 'Artificial Intelligence.',
    'Mi experiencia se ha construido en entornos muy distintos: soporte y hardware, redes y servidores, análisis de sistemas, desarrollo de aplicaciones, atención al cliente, gestión operativa y emprendimiento.': 'My experience spans very different environments: IT support and hardware, networking and servers, systems analysis, application development, customer service, operations management and entrepreneurship.',
    'Ese recorrido definió mi forma de trabajar: primero entiendo el contexto, después modelo el problema, diseño la solución y recién entonces implemento y pruebo. Hoy aplico esa misma disciplina a la': 'That journey shaped how I work: first I understand the context, then model the problem and design a solution, and only then implement and test it. Today I apply the same discipline to',
    'Inteligencia Artificial y al desarrollo asistido por agentes': 'Artificial Intelligence and agent-assisted development',
    'Entiendo antes de construir': 'Understand before building',
    'Contexto, requerimientos, flujos, restricciones y arquitectura antes de convertir una necesidad en código.': 'Understand context, requirements, workflows, constraints and architecture before turning a need into code.',
    'Pienso en sistema, no en pantalla': 'Think in systems, not screens',
    'La solución incluye datos, servicios, integraciones, operación, seguridad, mantenimiento y evolución.': 'A solution includes data, services, integrations, operations, security, maintenance and future growth.',
    'Busco producción, no solo demo': 'Build for production, not just demos',
    'Funcionalidad, documentación, pruebas y una base técnica que permita que el proyecto siga creciendo.': 'Deliver functionality, documentation, testing and a technical foundation that lets the project grow.',
    'Uso IA como multiplicador': 'Use AI as a force multiplier',
    'Agentes, contexto, memoria y automatización para acelerar el trabajo sin perder control sobre la ingeniería.': 'Use agents, context, memory and automation to move faster without losing engineering discipline.',
    'Tecnología aplicada': 'Technology in practice',
    'Una base Full Stack reforzada con': 'A Full Stack foundation strengthened by',
    'IA y arquitectura.': 'AI and architecture.',
    'El stack importa; más importante es saber dónde encaja cada pieza dentro de un sistema real.': 'The tech stack matters; knowing where each part fits in a real system matters more.',
    'Backend y APIs': 'Backend and APIs',
    'Servicios empresariales, APIs REST y microservicios mantenibles, con foco en integración, depuración y estabilidad en producción.': 'Maintainable business services, REST APIs and microservices, focused on integration, debugging and production stability.',
    'Frontend y extensiones': 'Frontend and extensions',
    'Interfaces web, microfrontends con Module Federation y extensiones de Google Chrome para flujos operativos.': 'Web interfaces, Module Federation microfrontends and Google Chrome extensions for operational workflows.',
    'Inteligencia Artificial': 'Artificial Intelligence',
    'IA aplicada al desarrollo y al producto: agentes, automatización, NLP, visión artificial y modelos de aprendizaje automático.': 'AI applied to software development and products: agents, automation, NLP, computer vision and machine learning.',
    'Datos e integración': 'Data and integration',
    'Modelado, persistencia y servicios externos para sistemas que necesitan comunicarse de forma confiable.': 'Data modeling, persistence and external services for systems that need to communicate reliably.',
    'Automatización e infraestructura': 'Automation and infrastructure',
    'Tareas repetitivas convertidas en flujos reproducibles, sobre una base práctica en soporte, redes y servidores.': 'Turn repetitive tasks into repeatable workflows, backed by practical experience in IT support, networking and servers.',
    'Producto y contexto': 'Product and context',
    'Traducción de necesidades de usuarios y de la operación en decisiones técnicas, documentación y software útil.': 'Translate user and operational needs into technical decisions, documentation and useful software.',
    'TRAYECTORIA': 'CAREER',
    'Historia profesional': 'Career history',
    'Una progresión que se puede': 'A progression you can',
    'ver.': 'see.',
    'Las etapas se superponen porque en distintos periodos combiné empleo, trabajo independiente, emprendimiento y formación.': 'Some dates overlap because I combined employment, independent work, entrepreneurship and education during different periods.',
    'HITO ACTUAL': 'CURRENT ROLE',
    'Progresión interna: Operador de Registro / Soporte TI → Full Stack Junior → Full Stack Mid-Level → Senior.': 'Career progression: Registration Operator / IT Support → Junior Full Stack → Mid-Level Full Stack → Senior.',
    '2021 — ACTUALIDAD': '2021 — PRESENT',
    'Desarrollador Senior Full Stack': 'Senior Full Stack Developer',
    'Ingresé como Operador de Registro y Soporte TI y pasé a desarrollo: Full Stack Junior desde diciembre de 2022 y Mid-Level desde marzo de 2024. Desarrollo y mantengo sistemas en producción con PHP, Java y JavaScript: servicios backend, integración de APIs, capas de datos, depuración y refactorización. Desarrollé': 'I joined as a Registration Operator and IT Support specialist, then moved into development: Junior Full Stack from December 2022 and Mid-Level from March 2024. I build and maintain production systems with PHP, Java and JavaScript, including backend services, API integrations, data layers, debugging and refactoring. I developed',
    ', que creció de de un formulario de registro a una plataforma distribuida de emisión y continuidad de trámites de firma electrónica: a partir de un enlace cifrado recupera la solicitud, valida identidad, RUC y trámites en curso, reutiliza documentos en renovaciones y lleva al usuario a su siguiente tarea (biometría, vídeo, pago o revisión) sobre procesos orquestados. Posteriormente, incluye un gateway B2B con autenticación HMAC y payloads cifrados, y Posterior maduro como una extensión de Chrome + PWA y un SDK en TypeScript para integradores. También entregué las extensiones SingExtension y EC Google Extension (visor de PDF) y trabajo con arquitectura de microfrontends.': '. AutoLink evolved from a registration form into a distributed platform for issuing and continuing electronic-signature procedures. An encrypted link restores a request, validates identity, tax ID and in-progress procedures, reuses documents for renewals, and guides users to their next task —biometrics, video, payment or review— through orchestrated workflows. The platform also includes a B2B gateway with HMAC authentication and encrypted payloads, a Chrome extension, a PWA and a TypeScript SDK for integrators. I also delivered the SingExtension and EC Google Extension (PDF viewer) and work with microfrontend architecture.',
    'Agent AI': 'AI Agents',
    'Ver formulario AutoLink ↗': 'View AutoLink form ↗',
    'Oficial de Crédito': 'Credit Officer',
    'Análisis y gestión crediticia de cartera de tarjetas de crédito. Una etapa fuera de la tecnología que amplió mi comprensión de procesos, riesgo, operación y atención al cliente.': 'Analyzed and managed credit card portfolios. This experience outside technology broadened my understanding of business processes, risk, operations and customer service.',
    'Gestor Domiciliario': 'Field Collections Specialist',
    'Negociación y gestión de carteras vencidas y prelegal, desarrollada en paralelo con la etapa en Diners Club.': 'Negotiated and managed overdue and pre-legal accounts alongside my role at Diners Club.',
    'Analista de Sistemas': 'Systems Analyst',
    'Análisis de sistemas, desarrollo de aplicaciones con Visual Basic, arquitectura de red y administración de servidores.': 'Systems analysis, Visual Basic application development, network architecture and server administration.',
    'Propietario y fundador': 'Founder and Owner',
    'Emprendimiento propio de servicios técnicos y soluciones informáticas, combinando operación, cliente, soporte y gestión.': 'Founded an IT services and solutions business, combining operations, customer service, technical support and management.',
    'Jefe Técnico Informático': 'IT Technical Lead',
    'Mantenimiento correctivo y preventivo de equipos en agencias de Huaquillas, Arenillas y Santa Rosa.': 'Performed corrective and preventive equipment maintenance at branches in Huaquillas, Arenillas and Santa Rosa.',
    'Promotor Informático': 'IT Sales Promoter',
    'Promoción de equipos y accesorios informáticos y control de garantías, etapa desarrollada en paralelo con Grupo Open.': 'Promoted IT equipment and accessories and managed warranties alongside my role at Grupo Open.',
    'Almacén V&A': 'V&A Store',
    'Progresión desde técnico auxiliar hasta técnico jefe y responsable del departamento de informática: soporte, operación tecnológica y mantenimiento de sistemas.': 'Progressed from assistant technician to lead technician and head of IT, covering support, technology operations and systems maintenance.',
    'Desarrollador de software independiente': 'Independent Software Developer',
    'Desarrollo de aplicaciones de escritorio y web, comenzando con Java y .NET y evolucionando hacia un stack más amplio.': 'Developed desktop and web applications, starting with Java and .NET and expanding to a broader technology stack.',
    'ECUAPP · ECOSISTEMA': 'ECUAPP · ECOSYSTEM',
    'Una suite de software para negocios, construida alrededor de': 'A business software suite built around',
    'IA + producto.': 'AI + product.',
    'EcuApp es la startup que estoy construyendo: un conjunto de sistemas independientes que resuelven necesidades concretas —inventario, facturación electrónica, educación, salud, autenticación, firma electrónica— y servicios de IA para voz y documentos.': 'EcuApp is the startup I am building: a suite of independent systems for specific needs —inventory, electronic invoicing, education, healthcare, authentication and electronic signatures— alongside AI services for voice and documents.',
    'Cada sistema vive en su propio repositorio dentro de la organización EcuApp en GitHub. La idea es que puedan usarse por separado o combinarse según el cliente.': 'Each system lives in its own repository within the EcuApp organization on GitHub. They can be used independently or combined to meet each customer’s needs.',
    'ESTADO ACTUAL': 'CURRENT STATUS',
    'En construcción': 'In development',
    'EcuApp todavía no es una empresa consolidada. Sus sistemas están en desarrollo activo en repositorios privados de la organización.': 'EcuApp is not yet an established company. Its systems are actively being developed in the organization’s private repositories.',
    'sistemas': 'systems',
    'áreas': 'areas',
    'PIEZA CENTRAL · V1 EN PRUEBAS': 'CORE COMPONENT · V1 IN TESTING',
    'Capa de memoria y contexto para proyectos y agentes de IA: conocimiento, reglas, tareas, requerimientos y skills reutilizables. El objetivo es que cada proyecto consuma desde una API solo el contexto que necesita, sin duplicar su memoria en cada repositorio.': 'A memory and context layer for AI projects and agents, covering knowledge, rules, tasks, requirements and reusable skills. Each project can retrieve just the context it needs through an API, without duplicating its memory across repositories.',
    'Arquitectura de memoria y contexto para agentes y proyectos de software. Organiza memoria de corto y largo plazo, episódica, semántica y procedimental, junto con reglas, tareas y skills por rol, lenguaje y arquitectura. Es la pieza que da continuidad al trabajo con IA entre sesiones y proyectos.': 'Memory and context architecture for AI agents and software projects. It organizes short- and long-term, episodic, semantic and procedural memory, along with rules, tasks and skills by role, language and architecture. It helps carry AI-assisted work forward across sessions and projects.',
    'Cada sistema usa el lenguaje que mejor encaja con su dominio:': 'Each system uses the language best suited to its domain:',
    'para firma electrónica, facturación, autenticación, inventario y datos clínicos;': 'for electronic signatures, invoicing, authentication, inventory and clinical data;',
    'para la gestión educativa, centrada en formularios y reportes.': 'for education management, with its forms and reporting needs.',
    'para los modelos de voz y OCR; y': 'for voice and OCR models; and',
    'Gestión empresarial': 'Business management',
    'Seguridad y documentos': 'Security and documents',
    'IA aplicada a voz y documentos': 'AI for voice and documents',
    'GESTIÓN · INVENTARIO': 'BUSINESS · INVENTORY',
    'Manejo, venta, control y distribución de inventario para todo tipo de producto.': 'Manage, sell, track and distribute all types of inventory.',
    'Transacciones y concurrencia para stock, ventas y distribución, con integración directa a Mercurio.': 'Transactions and concurrency for stock, sales and distribution, with direct integration to Mercurio.',
    'GESTIÓN · FACTURACIÓN': 'BUSINESS · INVOICING',
    'Software de facturación electrónica.': 'Electronic invoicing software.',
    'La firma de comprobantes del SRI con certificado .p12 se apoya en las mismas librerías Java que Tyr.': 'Signing SRI invoices with a .p12 certificate uses the same Java libraries as Tyr.',
    'GESTIÓN · EDUCACIÓN': 'BUSINESS · EDUCATION',
    'Sistema de gestión educativa.': 'Education management system.',
    'Gestión con mucho formulario, reporte y portal: Laravel acelera el CRUD y abarata el hosting.': 'For a form-, report- and portal-heavy system, Laravel speeds up CRUD development and reduces hosting costs.',
    'GESTIÓN · SALUD': 'BUSINESS · HEALTHCARE',
    'Sistema de gestión médica.': 'Medical management system.',
    'Datos clínicos sensibles, auditoría e interoperabilidad HL7 FHIR con HAPI FHIR.': 'Sensitive clinical data, auditing and HL7 FHIR interoperability with HAPI FHIR.',
    'SEGURIDAD · ACCESO': 'SECURITY · ACCESS',
    'Sistema de control de autenticación.': 'Authentication and access-control system.',
    'Spring Security y Spring Authorization Server para OAuth 2.0 y OpenID Connect.': 'Spring Security and Spring Authorization Server for OAuth 2.0 and OpenID Connect.',
    'SEGURIDAD · DOCUMENTOS': 'SECURITY · DOCUMENTS',
    'Firma de documentos con firma electrónica.': 'Electronic document signing.',
    'Las librerías ecuatorianas de firma con certificados .p12 solo existen en Java.': 'Ecuadorian libraries for signing with .p12 certificates are available only for Java.',
    'IA · VOZ': 'AI · VOICE',
    'Conversión de audio a texto.': 'Speech-to-text.',
    'Reconocimiento de voz con modelos como Whisper, cuyo ecosistema es Python.': 'Speech recognition with models such as Whisper, in the Python ecosystem.',
    'Conversión de texto a voz.': 'Text-to-speech.',
    'Síntesis de voz con modelos TTS abiertos como Piper, nativos de Python.': 'Speech synthesis with open TTS models such as Piper, built for Python.',
    'Clonación de voz a partir de audios de ejemplo.': 'Voice cloning from sample audio.',
    'Modelos de clonación como XTTS u OpenVoice, construidos sobre PyTorch.': 'Voice cloning models such as XTTS and OpenVoice, built on PyTorch.',
    'IA · DOCUMENTOS': 'AI · DOCUMENTS',
    'OCR de imágenes y archivos PDF.': 'OCR for images and PDF files.',
    'OCR con Tesseract o PaddleOCR y extracción de PDF con PyMuPDF.': 'OCR with Tesseract or PaddleOCR and PDF extraction with PyMuPDF.',
    'PROYECTOS · EVIDENCIA': 'PROJECTS · SELECTED WORK',
    'Trabajo visible': 'Selected work',
    'De la visión a': 'From vision to',
    'artefactos concretos.': 'tangible results.',
    'Explorar GitHub ↗': 'Explore GitHub ↗',
    'EDUCACIÓN · EN PRODUCCIÓN': 'EDUCATION · IN PRODUCTION',
    'Sistema de control educativo para clases, pagos, estudiantes y docentes, con un panel de alumnos, matrículas, ingresos, gastos y balance mensual.': 'An education management system for classes, payments, students and teachers, with a dashboard for enrollment, income, expenses and monthly balance.',
    'SALUD · EN PRODUCCIÓN': 'HEALTHCARE · IN PRODUCTION',
    'Administración de una clínica: agenda de citas por paciente, médico y especialidad, estados de atención y confirmaciones por correo y WhatsApp.': 'Clinic management with appointment scheduling by patient, doctor and specialty, visit status tracking, and email and WhatsApp confirmations.',
    'SEGURIDAD · EMPRESARIAL': 'SECURITY · BUSINESS',
    'Gestor de imágenes desplegado en el portal de Security Data: carga de JPG y PNG, enlaces con expiración configurable, cuota de almacenamiento por usuario, administración de usuarios, plantillas y registro.': 'An image manager deployed on the Security Data portal, with JPG and PNG uploads, configurable link expiration, per-user storage quotas, user management, templates and activity logs.',
    'IA · INVESTIGACIÓN': 'AI · RESEARCH',
    'Experimentación pública sobre clasificación multimodal con fusión temprana de datos tabulares y texto, y sobre la eficiencia de los modelos (Green AI). Es la misma línea de investigación de mi Trabajo Fin de Máster.': 'Public experiments in multimodal classification using early fusion of tabular and text data, and in model efficiency (Green AI). This is the same research area as my master’s thesis.',
    'Vista previa conceptual de Mnemosine': 'Conceptual preview of Mnemosine',
    'Panel de Cúspide con alumnos, matrículas, ingresos y gastos': 'Cúspide dashboard with students, enrollment, income and expenses',
    'Agenda de citas de Clinical Admin': 'Clinical Admin appointment schedule',
    'Panel de Security Image con carga de imágenes, cuota y biblioteca': 'Security Image dashboard with image uploads, quotas and library',
    'Abrir repositorio de Mnemosine': 'Open the Mnemosine repository',
    'Abrir repositorio Multimodal Early Fusion': 'Open the Multimodal Early Fusion repository',
    'Abrir Cúspide': 'Open Cúspide',
    'Abrir Clinical Admin': 'Open Clinical Admin',
    'Abrir Security Image': 'Open Security Image',
    'FORMACIÓN': 'EDUCATION',
    'Base académica': 'Academic background',
    'Ingeniería +': 'Engineering +',
    'La formación académica se desarrolló en paralelo con el trabajo. El Máster en Inteligencia Artificial está culminado —TFM defendido en septiembre de 2026— y el título se encuentra en proceso administrativo.': 'I pursued my education while working. I completed the Master’s in Artificial Intelligence and defended my thesis in September 2026; the diploma is being processed.',
    'Máster Universitario en Inteligencia Artificial': 'Master’s Degree in Artificial Intelligence',
    'UNIR · promedio final 8/10 · TFM: «Pipeline software reproducible para la clasificación multimodal de intenciones de renovación y negociabilidad mediante fusión temprana de datos tabulares y texto»': 'UNIR · final average: 8/10 · Thesis: “Reproducible software pipeline for multimodal classification of renewal and negotiability intents through early fusion of tabular and text data”',
    'Ingeniería de Sistemas': 'Systems Engineering',
    'Universidad Técnica de Machala · trabajo de titulación: sistema web de gestión de transporte y seguimiento de carga por GPS (publicado en 2020, ISBN 9786203032277)': 'Technical University of Machala · capstone: web-based transport management and GPS cargo-tracking system (published in 2020, ISBN 9786203032277)',
    'Formación complementaria': 'Additional training',
    'Programación en Python': 'Python Programming',
    'AWS Machine Learning Foundations (2026) · Programación en Python (2025)': 'AWS Machine Learning Foundations (2026) · Python Programming (2025)',
    'Java, Spring Boot y Android': 'Java, Spring Boot and Android',
    'Fundamentos de Java Spring Boot · Programación Orientada a Objetos con Java SE · Firebase para Android · Programación Básica': 'Java Spring Boot Fundamentals · Object-Oriented Programming with Java SE · Firebase for Android · Programming Fundamentals',
    'ÁREAS DE LA MAESTRÍA': 'MASTER’S COURSEWORK',
    'Machine Learning no supervisado · Cloud para IA · Gestión de proyectos de IA · NLP · Razonamiento y planificación automática · Redes neuronales y Deep Learning · Técnicas de Machine Learning · Visión Artificial': 'Unsupervised Machine Learning · Cloud for AI · AI project management · NLP · Automated reasoning and planning · Neural networks and deep learning · Machine learning techniques · Computer vision',
    'Formación continua en Platzi y Udemy.': 'Ongoing learning through Platzi and Udemy.',
    'CONTACTO': 'CONTACT',
    'Una trayectoria construida.': 'A career built with purpose.',
    'Ahora, nuevos sistemas.': 'Now, building what comes next.',
    'Si buscas a alguien para construir software de producción, automatizar procesos o aplicar IA y agentes a un problema real, escríbeme. También converso con gusto sobre EcuApp y Mnemosine.': 'If you are looking for someone to build production software, automate processes or apply AI and agents to a real-world problem, get in touch. I would also be happy to talk about EcuApp and Mnemosine.',
    'Descargar CV ES': 'Download English CV',
    'También disponible en': 'Also available in',
    'Machala, Ecuador · Software + IA': 'Machala, Ecuador · Software + AI',
    'Volver arriba ↑': 'Back to top ↑',
  };
  const certificates = [
    ['Comunciación eficaz.pdf', 'other'],
    ['Liderazgo o Gestion.pdf', 'other'],
    ['Manejo de conflictos y resolución de problema.pdf', 'other'],
    ['Versionamiento y uso de Git.pdf', 'udemy'],
    ['diploam-springboot-udemy.pdf', 'udemy'],
    ['diploma-agentes-ia.pdf', 'platzi'],
    ['diploma-angular-udemy.pdf', 'udemy'],
    ['diploma-api-rest.pdf', 'platzi'],
    ['diploma-arquitectura-alta-concurrencia.pdf', 'platzi'],
    ['diploma-arquitectura-udemy.pdf', 'udemy'],
    ['diploma-backend-nodejs-postgres.pdf', 'platzi'],
    ['diploma-base-vectorial-udemy.pdf', 'udemy'],
    ['diploma-clean-code-udemy.pdf', 'udemy'],
    ['diploma-curso-php-laravel.pdf', 'platzi'],
    ['diploma-dba-udemy.pdf', 'udemy'],
    ['diploma-despliegue-apps.pdf', 'platzi'],
    ['diploma-devops-udemy.pdf', 'udemy'],
    ['diploma-devops.pdf', 'platzi'],
    ['diploma-escalada-privilegios.pdf', 'platzi'],
    ['diploma-ethical-hacking.pdf', 'platzi'],
    ['diploma-git-github.pdf', 'platzi'],
    ['diploma-gitlab.pdf', 'platzi'],
    ['diploma-guia-seguridad-informatica.pdf', 'platzi'],
    ['diploma-hacking-aplicaciones-web-server-side.pdf', 'platzi'],
    ['diploma-hacking-servicios-red.pdf', 'platzi'],
    ['diploma-ingenieria2017.pdf', 'platzi'],
    ['diploma-intro-startups-blockchain.pdf', 'platzi'],
    ['diploma-introduccion-devops-22.pdf', 'platzi'],
    ['diploma-java-avanzado.pdf', 'platzi'],
    ['diploma-java-basico.pdf', 'platzi'],
    ['diploma-java-funcional.pdf', 'platzi'],
    ['diploma-java-oop.pdf', 'platzi'],
    ['diploma-java-persistencia.pdf', 'platzi'],
    ['diploma-java-spring-security.pdf', 'platzi'],
    ['diploma-java-spring.pdf', 'platzi'],
    ['diploma-kotlin-2021.pdf', 'platzi'],
    ['diploma-metasploit.pdf', 'platzi'],
    ['diploma-mongodb.pdf', 'platzi'],
    ['diploma-oop.pdf', 'platzi'],
    ['diploma-patrones-udemy.pdf', 'udemy'],
    ['diploma-php-composer.pdf', 'platzi'],
    ['diploma-php-cookies-sesiones.pdf', 'platzi'],
    ['diploma-php-poo.pdf', 'platzi'],
    ['diploma-postgresql-19.pdf', 'platzi'],
    ['diploma-prompt-engineering-chatgpt.pdf', 'platzi'],
    ['diploma-pruebas-software.pdf', 'platzi'],
    ['diploma-python.pdf', 'platzi'],
    ['diploma-scala.pdf', 'platzi'],
    ['diploma-solid-udemy.pdf', 'udemy'],
    ['diploma-spring-boot.pdf', 'platzi'],
    ['diploma-terminal-21.pdf', 'platzi'],
    ['diploma-testing-java.pdf', 'platzi'],
    ['diploma-web-chatgpt.pdf', 'platzi'],
    ['diploma-web-java.pdf', 'platzi'],
    ['diploma-web-php.pdf', 'platzi'],
    ['diploma-webflux-udemy.pdf', 'udemy'],
  ];
  const certificateTitleOverrides = {
    'Comunciación eficaz.pdf': 'Comunicación eficaz',
    'Liderazgo o Gestion.pdf': 'Liderazgo o gestión',
    'Manejo de conflictos y resolución de problema.pdf': 'Manejo de conflictos y resolución de problemas',
    'Versionamiento y uso de Git.pdf': 'Versionamiento y uso de Git',
    'diploma-arquitectura-udemy.pdf': 'Arquitectura de software',
    'diploam-springboot-udemy.pdf': 'Spring Boot',
    'diploma-agentes-ia.pdf': 'Agentes de inteligencia artificial',
    'diploma-angular-udemy.pdf': 'Angular',
    'diploma-api-rest.pdf': 'API REST',
    'diploma-arquitectura-alta-concurrencia.pdf': 'Arquitectura de alta concurrencia',
    'diploma-backend-nodejs-postgres.pdf': 'Backend con Node.js y PostgreSQL',
    'diploma-base-vectorial-udemy.pdf': 'Bases de datos vectoriales',
    'diploma-clean-code-udemy.pdf': 'Clean Code',
    'diploma-curso-php-laravel.pdf': 'PHP con Laravel',
    'diploma-dba-udemy.pdf': 'Administración de bases de datos (DBA)',
    'diploma-despliegue-apps.pdf': 'Despliegue de aplicaciones',
    'diploma-devops-udemy.pdf': 'DevOps',
    'diploma-devops.pdf': 'DevOps',
    'diploma-escalada-privilegios.pdf': 'Escalada de privilegios',
    'diploma-ethical-hacking.pdf': 'Ethical Hacking',
    'diploma-git-github.pdf': 'Git y GitHub',
    'diploma-gitlab.pdf': 'GitLab',
    'diploma-guia-seguridad-informatica.pdf': 'Guía de seguridad informática',
    'diploma-hacking-aplicaciones-web-server-side.pdf': 'Hacking de aplicaciones web (server-side)',
    'diploma-hacking-servicios-red.pdf': 'Hacking de servicios de red',
    'diploma-ingenieria2017.pdf': 'Ingeniería de software (2017)',
    'diploma-intro-startups-blockchain.pdf': 'Introducción a startups y blockchain',
    'diploma-introduccion-devops-22.pdf': 'Introducción a DevOps',
    'diploma-java-avanzado.pdf': 'Java avanzado',
    'diploma-java-basico.pdf': 'Java básico',
    'diploma-java-funcional.pdf': 'Programación funcional con Java',
    'diploma-java-oop.pdf': 'Programación orientada a objetos con Java',
    'diploma-java-persistencia.pdf': 'Persistencia con Java',
    'diploma-java-spring-security.pdf': 'Spring Security con Java',
    'diploma-java-spring.pdf': 'Java con Spring',
    'diploma-kotlin-2021.pdf': 'Kotlin',
    'diploma-metasploit.pdf': 'Metasploit',
    'diploma-mongodb.pdf': 'MongoDB',
    'diploma-oop.pdf': 'Programación orientada a objetos',
    'diploma-patrones-udemy.pdf': 'Patrones de diseño',
    'diploma-php-composer.pdf': 'Composer con PHP',
    'diploma-php-cookies-sesiones.pdf': 'Cookies y sesiones con PHP',
    'diploma-php-poo.pdf': 'Programación orientada a objetos con PHP',
    'diploma-postgresql-19.pdf': 'PostgreSQL',
    'diploma-prompt-engineering-chatgpt.pdf': 'Prompt engineering con ChatGPT',
    'diploma-pruebas-software.pdf': 'Pruebas de software',
    'diploma-python.pdf': 'Programación con Python',
    'diploma-scala.pdf': 'Scala',
    'diploma-solid-udemy.pdf': 'Principios SOLID',
    'diploma-spring-boot.pdf': 'Spring Boot',
    'diploma-terminal-21.pdf': 'Terminal y línea de comandos',
    'diploma-testing-java.pdf': 'Testing con Java',
    'diploma-web-chatgpt.pdf': 'Desarrollo web con ChatGPT',
    'diploma-web-java.pdf': 'Desarrollo web con Java',
    'diploma-web-php.pdf': 'Desarrollo web con PHP',
    'diploma-webflux-udemy.pdf': 'Spring WebFlux',
  };
  const certificateTitle = (file) => certificateTitleOverrides[file] || file
    .replace(/\.pdf$/i, '')
    .replace(/^diplo(?:ma|am)-/i, '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toLocaleUpperCase('es'));
  let activeCertificateFilter = 'all';
  const certificateGrid = document.querySelector('[data-certificate-grid]');
  const certificateSearch = document.querySelector('[data-certificate-search]');
  const certificateEmpty = document.querySelector('[data-certificate-empty]');
  const renderCertificates = (language) => {
    if (!certificateGrid) return;
    const isEnglish = language === 'en';
    const query = certificateSearch?.value.trim().toLocaleLowerCase(language) || '';
    const visibleCertificates = certificates.filter(([file, platform]) => {
      const title = certificateTitle(file);
      const matchesPlatform = activeCertificateFilter === 'all' || activeCertificateFilter === platform;
      const matchesQuery = !query || `${title} ${file} ${platform}`.toLocaleLowerCase(language).includes(query);
      return matchesPlatform && matchesQuery;
    });
    const counts = certificates.reduce((result, [, platform]) => {
      result[platform] += 1;
      result.all += 1;
      return result;
    }, { all: 0, platzi: 0, udemy: 0, other: 0 });
    Object.entries(counts).forEach(([platform, count]) => {
      const countElement = document.querySelector(`[data-certificate-count="${platform}"]`);
      if (countElement) countElement.textContent = count;
    });
    document.querySelectorAll('[data-certificate-filter]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.certificateFilter === activeCertificateFilter));
    });
    const fragment = document.createDocumentFragment();
    visibleCertificates.forEach(([file, platform]) => {
      const title = certificateTitle(file);
      const platformName = platform === 'other'
        ? (isEnglish ? 'Additional training' : 'Formación complementaria')
        : platform === 'platzi' ? 'Platzi' : 'Udemy';
      const card = document.createElement('a');
      card.className = 'certificate-card';
      card.href = `assets/certificados/${encodeURIComponent(file)}`;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.setAttribute('aria-label', `${isEnglish ? 'View certificate' : 'Ver certificado'}: ${title} · ${platformName}`);

      const icon = document.createElement('span');
      icon.className = 'certificate-card-icon';
      icon.setAttribute('aria-hidden', 'true');
      icon.textContent = 'PDF';
      const copy = document.createElement('span');
      copy.className = 'certificate-card-copy';
      const heading = document.createElement('strong');
      heading.textContent = title;
      const provider = document.createElement('span');
      provider.className = `certificate-provider certificate-provider-${platform}`;
      provider.textContent = platformName;
      copy.append(heading, provider);
      const action = document.createElement('span');
      action.className = 'certificate-card-action';
      action.setAttribute('aria-hidden', 'true');
      action.textContent = isEnglish ? 'View PDF ↗' : 'Ver PDF ↗';
      card.append(icon, copy, action);
      fragment.append(card);
    });
    certificateGrid.replaceChildren(fragment);
    const resultCount = document.querySelector('[data-certificate-results]');
    if (resultCount) {
      resultCount.textContent = isEnglish
        ? `Showing ${visibleCertificates.length} of ${certificates.length} certificates`
        : `Mostrando ${visibleCertificates.length} de ${certificates.length} certificados`;
    }
    if (certificateEmpty) certificateEmpty.hidden = visibleCertificates.length > 0;
  };
  const originalText = new WeakMap();
  const normalize = (text) => text.trim().replace(/\s+/g, ' ');
  const setLanguage = (language, remember = false) => {
    const isEnglish = language === 'en';
    document.documentElement.lang = language;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      if (!originalText.has(node)) originalText.set(node, node.nodeValue);
      const original = originalText.get(node);
      const visibleText = normalize(original);
      const translated = isEnglish ? translations[visibleText] : undefined;
      if (translated) {
        const leading = original.match(/^\s*/)[0];
        const trailing = original.match(/\s*$/)[0];
        node.nodeValue = `${leading}${translated}${trailing}`;
      } else {
        node.nodeValue = original;
      }
    }
    renderCertificates(language);
    document.querySelectorAll('[data-product-repo]').forEach((link) => {
      const project = link.dataset.repoName;
      link.setAttribute(
        'aria-label',
        isEnglish ? `Open the ${project} GitHub repository` : `Abrir el repositorio de ${project} en GitHub`,
      );
    });
    certificateSearch?.setAttribute('placeholder', isEnglish ? 'Search by course or technology…' : 'Buscar por curso o tecnología…');
    certificateSearch?.setAttribute('aria-label', isEnglish ? 'Search certificates' : 'Buscar certificados');
    document.querySelector('.certificate-filters')?.setAttribute(
      'aria-label',
      isEnglish ? 'Filter certificates' : 'Filtrar certificados',
    );

    const title = isEnglish
      ? 'Jhonny Miñan | Senior Software Engineer · AI'
      : 'Jhonny Miñan | Ingeniero de Software Senior · IA';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute(
      'content',
      isEnglish
        ? 'Jhonny Miñan — Senior Full Stack Software Engineer focused on Artificial Intelligence. 8+ years building software, with a background in IT support, networking, infrastructure and systems analysis. Master’s in AI (UNIR).'
        : 'Jhonny Miñan — Senior Software Engineer Full Stack orientado a Inteligencia Artificial. 8+ años desarrollando software, con una base previa en soporte, redes, infraestructura y análisis de sistemas. Máster en IA (UNIR).',
    );
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', title);
    document.querySelector('meta[property="og:description"]')?.setAttribute(
      'content',
      isEnglish
        ? 'Professional experience, software engineering, applied AI, automation and the EcuApp vision.'
        : 'Trayectoria profesional, ingeniería de software, IA aplicada, automatización y visión de EcuApp.',
    );
    document.querySelector('.skip-link')?.replaceChildren(
      document.createTextNode(isEnglish ? 'Skip to content' : 'Saltar al contenido'),
    );
    document.querySelector('.nav')?.setAttribute(
      'aria-label',
      isEnglish ? 'Main navigation' : 'Navegación principal',
    );
    document.querySelector('.language-switch')?.setAttribute(
      'aria-label',
      isEnglish ? 'Page language' : 'Idioma de la página',
    );
    document.querySelector('.cv-selector summary')?.setAttribute(
      'aria-label',
      isEnglish ? 'Choose CV language' : 'Seleccionar idioma del currículum',
    );
    document.querySelector('.brand')?.setAttribute(
      'aria-label',
      isEnglish ? 'Home' : 'Inicio',
    );
    document.querySelector('.hero-visual')?.setAttribute(
      'aria-label',
      isEnglish ? 'Profile portrait' : 'Perfil visual',
    );
    document.querySelector('.product-legend')?.setAttribute(
      'aria-label',
      isEnglish ? 'EcuApp product categories' : 'Áreas del ecosistema',
    );
    const projectLabels = {
      es: [
        'Abrir repositorio de Mnemosine',
        'Abrir Cúspide',
        'Abrir Clinical Admin',
        'Abrir Security Image',
        'Abrir repositorio Multimodal Early Fusion',
      ],
      en: [
        'Open the Mnemosine repository',
        'Open Cúspide',
        'Open Clinical Admin',
        'Open Security Image',
        'Open the Multimodal Early Fusion repository',
      ],
    };
    document.querySelectorAll('.project-arrow[aria-label]').forEach((link, index) => {
      link.setAttribute('aria-label', projectLabels[language][index]);
    });
    document.querySelectorAll('.project-thumb').forEach((image, index) => {
      const altTexts = {
        es: [
          'Vista previa conceptual de Mnemosine',
          'Panel de Cúspide con alumnos, matrículas, ingresos y gastos',
          'Agenda de citas de Clinical Admin',
          'Panel de Security Image con carga de imágenes, cuota y biblioteca',
        ],
        en: [
          'Conceptual preview of Mnemosine',
          'Cúspide dashboard with students, enrollment, income and expenses',
          'Clinical Admin appointment schedule',
          'Security Image dashboard with image uploads, quotas and library',
        ],
      };
      if (altTexts[language][index]) image.alt = altTexts[language][index];
    });
    document.querySelectorAll('[data-language-switch]').forEach((button) => {
      button.setAttribute('aria-pressed', String(button.dataset.languageSwitch === language));
    });

    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
      const menuIsOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute(
        'aria-label',
        isEnglish
          ? menuIsOpen ? 'Close navigation' : 'Open navigation'
          : menuIsOpen ? 'Cerrar navegación' : 'Abrir navegación',
      );
    }

    const cvLink = document.querySelector('.contact-cta-row a.button-ghost');
    if (cvLink) {
      const pdfName = `Jhonny-Minan-CV-${language.toUpperCase()}.pdf`;
      cvLink.href = `assets/cv/${pdfName}`;
      cvLink.download = pdfName;
      cvLink.firstChild.nodeValue = isEnglish ? 'Download English CV ' : 'Descargar CV ES ';
    }
    const contactLink = document.querySelector('.contact-cta-row a[href^="mailto:"]');
    if (contactLink) {
      contactLink.href = `mailto:jhonnyminian@gmail.com?subject=${encodeURIComponent(
        isEnglish ? 'Professional inquiry' : 'Contacto profesional',
      )}`;
    }

    if (remember) {
      try {
        localStorage.setItem('preferred-language', language);
      } catch {}
    }
  };
  const languageSwitch = document.querySelector('.language-switch');
  languageSwitch?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-language-switch]');
    if (button) setLanguage(button.dataset.languageSwitch, true);
  });
  document.querySelectorAll('[data-certificate-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      activeCertificateFilter = button.dataset.certificateFilter;
      renderCertificates(document.documentElement.lang);
    });
  });
  certificateSearch?.addEventListener('input', () => renderCertificates(document.documentElement.lang));

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
  skip.className = 'skip-link'; skip.href = '#contenido'; skip.textContent = document.documentElement.lang === 'en' ? 'Skip to content' : 'Saltar al contenido';
  document.body.prepend(skip);
  document.querySelector('main')?.setAttribute('id', 'contenido');
  setLanguage(document.documentElement.lang);

  const style = document.createElement('style');
  style.textContent = `
    .skip-link{position:fixed;left:12px;top:12px;z-index:10000;transform:translateY(-160%);padding:10px 14px;border-radius:10px;background:#69e8c9;color:#06101d;font-weight:800;text-decoration:none}.skip-link:focus{transform:none}
    .language-switch{display:flex;align-items:center;gap:2px;padding:3px;border:1px solid rgba(255,255,255,.12);border-radius:999px}.language-switch button{border:0;border-radius:999px;padding:5px 7px;background:transparent;color:#91a4b5;font:inherit;font-size:9px;font-weight:600;line-height:1;cursor:pointer}.language-switch button[aria-pressed="true"]{background:rgba(105,232,201,.16);color:#69e8c9}.language-switch button:focus-visible{outline:2px solid #69e8c9;outline-offset:2px}
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
    menuToggle.setAttribute('aria-label', document.documentElement.lang === 'en'
      ? open ? 'Close navigation' : 'Open navigation'
      : open ? 'Cerrar navegación' : 'Abrir navegación');
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { menu.classList.remove('open'); menuToggle?.setAttribute('aria-expanded','false'); }));

  if (!reduceMotion && !touch && glow) addEventListener('pointermove', e => { glow.style.left = `${e.clientX}px`; glow.style.top = `${e.clientY}px`; }, { passive:true });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); } }), { threshold:.12 });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    const navLinks = [...(menu?.querySelectorAll('a[href^="#"]') || [])];
    const spy = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }), { rootMargin:'-45% 0px -50% 0px' });
    navLinks.forEach(link => { const section = document.querySelector(link.getAttribute('href')); if (section) spy.observe(section); });
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

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
