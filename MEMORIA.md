# Perfil Web de Jhonny Mi&ntilde;an

Memoria t&eacute;cnica del redise&ntilde;o del perfil profesional. Este documento resume qu&eacute; se cambi&oacute;, por qu&eacute; se hizo y qu&eacute; debe respetar una IA o desarrollador al continuar el proyecto.

## Objetivo

Convertir una p&aacute;gina est&aacute;tica sencilla en un perfil laboral moderno, responsive y profesional para Jhonny Mi&ntilde;an Gir&oacute;n: desarrollador Full Stack con m&aacute;s de 8 a&ntilde;os de trayectoria y Maestr&iacute;a certificada en Inteligencia Artificial.

## Archivos modificados

- `index.html`: se reorganizo la estructura semantica completa.
- `index.css`: se reemplazo el CSS duplicado por un sistema visual consistente y responsive.
- `index.js`: se elimino el bloqueo de navegador y se agregaron interacciones utiles.
- `README.md`: se creo esta memoria de cambios y criterios.

## Archivo que no debe modificarse

- `properties.css`: se mantiene intacto. Sigue siendo la fuente de variables, im&aacute;genes, iconos, colores y textos heredados. El redise&ntilde;o reutiliza esas variables para foto de perfil, redes sociales, tecnolog&iacute;as y colores base.

## Mejoras en `index.html`

- Se pas&oacute; de una estructura b&aacute;sica con secciones vac&iacute;as a una p&aacute;gina de perfil completa.
- Se agrego un `header` sticky con navegacion interna: Perfil, Especialidades, Experiencia, Proyectos y Contacto.
- Se incorpor&oacute; un hero profesional con nombre, posicionamiento, trayectoria, Maestr&iacute;a en IA, CTA de correo, CTA de WhatsApp y m&eacute;tricas.
- Se agregaron secciones reales:
  - Sobre el perfil.
  - Especialidades con tabs.
  - Experiencia tipo timeline.
  - Formaci&oacute;n acad&eacute;mica.
  - Proyectos destacados.
  - Planes de suscripci&oacute;n.
  - Contacto.
- Se mejoraron textos visibles para reflejar seniority, trayectoria y orientaci&oacute;n profesional.
- Se mantuvieron enlaces existentes a LinkedIn, YouTube, Platzi, GitHub, Gmail y WhatsApp.
- Se usaron entidades HTML para acentos y caracteres especiales, reduciendo riesgos de problemas de codificaci&oacute;n.

## Mejoras en `index.css`

- Se elimino la mezcla de estilos antiguos, duplicados y clases sin uso.
- Se cre&oacute; un dise&ntilde;o dark profesional con acentos dorados y verdes, aprovechando `--colorfondo`, `--colorbtn` y assets de `properties.css`.
- Se aplicaron layouts responsive con CSS Grid y Flexbox.
- Se ajustaron tama&ntilde;os de texto para evitar una apariencia exagerada o infantil.
- Se agregaron estados `hover`, `focus-visible` y animaciones con `transform` y `opacity`, que son m&aacute;s eficientes para navegador y m&oacute;vil.
- Se agrego soporte para `prefers-reduced-motion`.
- Se mejor&oacute; la navegaci&oacute;n m&oacute;vil con men&uacute; colapsable.
- Se corrigio la experiencia de lectura quitando restricciones de seleccion de texto.
- Se mantuvieron dimensiones estables para tarjetas, botones, iconos, planes y grillas, evitando saltos visuales.

## Mejoras en `index.js`

- Se elimino el bloqueo de F12, F5, copiar, pegar, zoom, click derecho y herramientas del navegador.
- Motivo: bloquear acciones basicas perjudica accesibilidad, QA, usuarios moviles, navegadores modernos y confianza profesional.
- Se agrego scroll suave para enlaces internos.
- Se agreg&oacute; men&uacute; m&oacute;vil accesible con `aria-expanded` y cierre con Escape.
- Se agrego observador de secciones para resaltar el enlace activo del menu.
- Se agregaron animaciones reveal al hacer scroll.
- Se agregaron tabs accesibles con soporte de teclado.
- Se agrego contador animado para la metrica de experiencia.
- Se agrego efecto ripple sutil en botones y enlaces interactivos.
- Se respeta `prefers-reduced-motion` para usuarios que prefieren menos animacion.

## Criterios UX aplicados

- Perfil profesional antes que plantilla generica.
- Primera vista enfocada en identidad, valor y contacto.
- Tarjetas sobrias, no infantiles.
- Botones claros y con tama&ntilde;o moderado.
- Animaciones ligeras, utiles y no invasivas.
- Experiencia mobile-first: menu colapsable, grillas de una columna y CTAs faciles de tocar.
- Accesibilidad basica: roles en tabs, labels en iconos, focus visible y navegacion con teclado.

## Criterios QA

Validar antes de aprobar:

- `properties.css` no debe tener cambios.
- La p&aacute;gina debe abrir sin errores de consola.
- El men&uacute; m&oacute;vil debe abrir, cerrar y navegar a secciones.
- Los tabs deben cambiar contenido con click y flechas izquierda/derecha.
- Los enlaces externos deben mantener `target="_blank"` y `rel="noopener noreferrer"`.
- Los textos no deben desbordar tarjetas ni botones en m&oacute;vil.
- En escritorio, las grillas deben verse equilibradas.
- Con `prefers-reduced-motion`, la p&aacute;gina debe seguir usable sin animaciones fuertes.

## Capa de efectos "dev-fx" (2026-09-17)

Se agrego una capa adicional de animaciones tematicas de desarrollo de software, en un archivo nuevo `dev-fx.css` (enlazado al final del `<head>`, despues de `site-fixes.css`) mas pequenos agregados en `index.js` e `index.html`:

- Pantalla de "boot" tipo terminal al cargar (una vez por sesion via `sessionStorage`, se oculta sola).
- Linea de "typewriter" con roles rotativos debajo del `<h1>` del hero (`.role-line`), decorativa (`aria-hidden`), el contenido real ya esta en el `h1` y el parrafo.
- Efecto "decode" (scramble) en los numeros de `.section-label` al entrar en viewport.
- Ripple en botones, `nav-cta`, `social-contact` y `text-link` al hacer click/tap.
- Timeline: la linea vertical se dibuja progresivamente y los puntos aparecen en cascada al hacer scroll.
- Miniaturas de proyectos: revelado tipo "wipe" (clip-path) al entrar en viewport.
- Glitch sutil de color en el `em` del `h1` al pasar el mouse.

Todo respeta `prefers-reduced-motion` (se desactiva o se muestra el estado final sin animacion) y no bloquea contenido: si JS falla, el boot screen no se remueve solo via CSS-fallback en el `<script>` inline sin-sessionStorage no se pierde nada critico (el contenido real de la pagina no depende de estos efectos).

## Auditoria y checklist de mejoras (2026-09-17)

Auditoria posterior a la capa dev-fx encontro y corrigio un bug real preexistente: las tarjetas de stack 04/AI, 05/INFRA y 06/NEGOCIO mostraban su icono duplicado (un caracter suelto en el HTML del `.stack-icon` superpuesto al icono real inyectado por `site-fixes.css`). Se vacio el contenido de esos tres `div.stack-icon` en `index.html`.

Tambien se implemento el checklist de mejoras visuales/efectos/responsive/UX pedido por el usuario:

- **Proyectos con link real**: las 3 tarjetas de `#proyectos` pasaron de `<article>` sin destino a `<a target="_blank">`. Cuspide → operacionadmin.com, Clinical Admin → clinical-admin.xo.je, y la tercera se renombro a **Mnemosine** (memoria central determinista para proyectos de agentes de IA) enlazando a github.com/EcuApp/mnemosine (sin captura porque aun no tiene sitio publicado). Cada tarjeta indica si es "Sitio en vivo" o "Repositorio".
- **WhatsApp en contacto**: se agrego `.social-contact.whatsapp` enlazando a `https://wa.me/jhonnyminan92` (usuario, no numero, por pedido explicito del usuario — verificar que ese short-link este reclamado en WhatsApp Business si no resuelve).
- **Nav activo por seccion** via `IntersectionObserver` (subrayado animado en el link de la seccion visible).
- **Boton flotante "volver arriba"** creado por JS, aparece pasado 1 viewport de scroll.
- **Boot screen saltable**: click o tecla lo cierra al instante (antes solo terminaba solo).
- **Canvas de red pausado** cuando el scroll supera ~1.2 viewports (ahorro de CPU en scroll largo).
- **Skeleton/shimmer** en miniaturas de proyecto hasta que la imagen realmente cargo, combinado con el wipe existente.
- **Icono de IA (stack card 04)** con doble sparkle (cian + violeta) para igualar peso visual a los logos reales de las demas tarjetas.
- **Stat "+8 años de trayectoria"** agregado al hero (dato ya usado en este documento).
- **Mobile nav**: opacidad subida a ~99.5% + blur reducido porque el texto del hero se transparentaba (ghosting) detras del panel abierto.
- Ajustes responsive: tablet (701-900px) con tarjetas de stack mas compactas, mobile con menos espacio reservado en `.stack-card`, y hero comprimido en landscape de poca altura (`max-height:520px`).
- Feedback táctil (`:active`) en tarjetas `.tilt` y botones para dispositivos sin hover.
- Se decidio omitir el boton de descarga de CV (el usuario no tiene PDF listo aun).

Todo lo anterior se probo con Chrome DevTools (desktop, tablet 820px, mobile 390px portrait/landscape) sin errores de consola ni 404s, y respeta `prefers-reduced-motion`.

## Guia para futuras IAs

- No volver a bloquear copiar, pegar, zoom, click derecho o herramientas del navegador.
- No modificar `properties.css` salvo que el usuario lo pida explicitamente.
- Si se actualiza contenido profesional, hacerlo en `index.html` o pedir permiso para migrar textos heredados de `properties.css`.
- Mantener un tono visual ejecutivo: sobrio, moderno, tecnico y confiable.
- Priorizar rendimiento, accesibilidad y responsive antes que efectos decorativos.
- Si se agregan nuevas secciones, conectarlas a la navegacion y verificar mobile.
