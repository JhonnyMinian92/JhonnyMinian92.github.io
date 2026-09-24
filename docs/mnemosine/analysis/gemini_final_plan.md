# Gemini Final Plan

## Changes

- Confirmación de archivo JSON estático como fuente única de verdad para el contenido profesional.
- Eliminación de tareas relacionadas con configuración de dominios personalizados y registros CNAME.
- Ajuste del flujo de datos: se implementará un adaptador de infraestructura específico para leer el archivo JSON local mediante Fetch API.
- Refinamiento de la Arquitectura Hexagonal: se estructurará como un 'Modular Frontend' donde el Dominio define las entidades (Proyecto, Experiencia), los Casos de Uso gestionan la carga de datos y la UI reacciona a los cambios de estado.

## Tasks

- Configurar el entorno de desarrollo utilizando Vite con JavaScript ES2022 optimizado para sitios estáticos.
- Definir el esquema del archivo 'src/data/profile.json' que contendrá la información de experiencia, habilidades y proyectos.
- Implementar la capa de Dominio: Definir modelos de datos y puertos (interfaces) para el repositorio de datos profesionales.
- Implementar el Adaptador de Infraestructura: Repositorio que utiliza Fetch API para obtener y validar el contenido del JSON estático.
- Desarrollar componentes de UI siguiendo el patrón de composición: Layout, Hero con efectos visuales, Timeline de experiencia y Grid de proyectos.
- Integrar filtros y selectores modernos para la sección de proyectos, permitiendo categorizar por tecnologías o tipo de desarrollo.
- Implementar Skeleton Loading para la transición de carga inicial del JSON.
- Aplicar animaciones y transiciones (CSS/JS) para cumplir con el requisito de 'sitio visualmente atractivo'.
- Configurar GitHub Actions para el despliegue automatizado a la rama 'gh-pages' utilizando la URL por defecto de github.io.

## Tests

- Prueba Unitaria: Validar que el Repositorio de datos procesa correctamente el JSON y maneja errores de formato o archivos ausentes.
- Prueba de Integración: Verificar que los filtros de proyectos actualizan correctamente la vista según los criterios seleccionados.
- Prueba de Performance: Ejecutar auditoría Lighthouse para asegurar un LCP (Largest Contentful Paint) óptimo y fluidez en las animaciones.
- Prueba de Accesibilidad (A11y): Validar que el sitio sea navegable mediante teclado y compatible con lectores de pantalla.
- Prueba Funcional (Golden Path): Confirmar que el despliegue en github.io visualiza toda la información y los enlaces de contacto funcionan.

## Rationale

- Se ha simplificado la infraestructura al confirmarse el uso de JSON estático y dominio por defecto, eliminando complejidad innecesaria de red y DNS.
- Se mantiene el enfoque de Arquitectura Hexagonal para asegurar que si en el futuro el usuario decide cambiar el JSON por una API de Notion o GitHub, la lógica de la UI permanezca intacta.
- Se priorizan tareas de efectos visuales y transiciones para cumplir con la expectativa estética del proyecto.
- Se añade una pregunta sobre el framework UI para evitar asumir 'Vanilla' estricto si el usuario prefiere la ergonomía de una librería de componentes.
