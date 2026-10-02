# Perfil Web de Jhonny Miñan

Memoria técnica vigente del perfil profesional. Este documento debe servir como referencia para futuras modificaciones de la web.

## Objetivo

La web debe comunicar una trayectoria de más de 16 años de práctica profesional, una progresión hasta Senior Full Stack, formación avanzada en Inteligencia Artificial y una visión de producto alrededor de EcuApp y su ecosistema de proyectos.

La página debe sentirse como un perfil profesional de ingeniería, no como una plantilla genérica de portafolio.

## Arquitectura actual

- `index.html`: estructura semántica y contenido profesional.
- `portfolio.css`: única hoja visual principal. Contiene layout, componentes, desktop, tablet, mobile, responsive, accesibilidad visual y efectos.
- `properties.css`: fuente heredada de variables/assets; se mantiene sin cambios.
- `index.js`: navegación móvil, estado activo, reveal, progreso, interacción de tarjetas y efectos no críticos.

Las antiguas hojas `index.css`, `site-fixes.css`, `responsive.css`, `premium-effects.css`, `hero-effects.css`, `executive-refresh.css` y `stability-qa.css` fueron eliminadas para evitar conflictos de cascada.

## Narrativa profesional

La página debe comunicar la evolución:

**2010 → desarrollo independiente → sistemas y soporte → infraestructura → análisis → emprendimiento → desarrollo profesional → Senior Full Stack → IA aplicada y agentes.**

La superposición de etapas laborales debe conservarse porque refleja empleos, trabajo independiente, emprendimiento y formación coexistentes.

## Secciones

1. Hero / posicionamiento.
2. Resumen ejecutivo de trayectoria.
3. Perfil profesional.
4. Expertise técnico.
5. Trayectoria laboral.
6. EcuApp y ecosistema.
7. Proyectos y evidencia.
8. Formación.
9. Contacto.

## EcuApp

EcuApp representa la startup que Jhonny quiere construir: una base empresarial para crear productos de software flexibles y personalizados, combinando ingeniería, IA, agentes, memoria, automatización y producto.

La web no debe presentar EcuApp como una empresa ya consolidada si todavía está en construcción.

## Ecosistema

Los proyectos del ecosistema deben mostrar siempre dos niveles:

- Estado actual: concepto, análisis, arquitectura, V1, pruebas, etc.
- Dirección del proyecto: objetivo y alcance conceptual.

No usar descripciones vacías como “workstream personal”, “en análisis” o “en definición” sin explicar qué problema intenta resolver el proyecto.

### Mnemosine / Mnemonise

Es la pieza central de memoria y contexto para proyectos y agentes. Debe comunicar contexto, conocimiento, reglas, tareas, requerimientos, memoria reutilizable, skills y continuidad del trabajo entre agentes/proyectos.

### Hefesto, Atena, Mercurio, Heimdall, Panacea y Tyr

Mientras estos proyectos continúen en definición, la web debe presentar sus objetivos como **dirección conceptual** y no como funcionalidades ya implementadas.

Direcciones conceptuales actualmente usadas en la web:
- Hefesto: capacidad sistemática de ingeniería y construcción de software asistida por IA.
- Atena: análisis, conocimiento y razonamiento para apoyar decisiones y planificación.
- Mercurio: comunicación e integración entre sistemas, servicios, agentes y canales.
- Heimdall: seguridad, supervisión, observabilidad y control.
- Panacea: componentes y servicios transversales reutilizables.
- Tyr: reglas, memoria de proyecto, instrucciones y contexto operativo para agentes.

Estas direcciones no deben presentarse como producto terminado sin evidencia en el repositorio correspondiente.

## Diseño

La versión vigente prioriza:

- escritorio grande primero, sin romper tablet/mobile;
- max-width central de 1320px para pantallas amplias;
- hero en dos columnas con proporciones controladas;
- grillas de 3/2/1 columnas según breakpoint;
- tipografía editorial sobria;
- tarjetas con jerarquía de información;
- animaciones discretas;
- contenido visible aun si JavaScript falla;
- `prefers-reduced-motion`;
- ausencia de scroll horizontal.

## Reglas para futuras IAs

- No volver a crear múltiples capas CSS que peleen entre sí.
- Antes de modificar el diseño, revisar `portfolio.css` completo.
- No modificar `properties.css` salvo petición explícita.
- No afirmar que un proyecto está terminado cuando solo está en análisis.
- Cada proyecto debe explicar problema/objetivo y alcance conceptual.
- Mantener la trayectoria profesional completa.
- Los PDF no se modifican hasta que Jhonny apruebe explícitamente la versión web.
- Validar desktop grande antes de cerrar cualquier rediseño.
- Después validar 1024px, 768px y 390px.
