# Gemini Final Plan

## Changes

- Confirmación del uso de JavaScript Vanilla con Vite sin frameworks adicionales.
- Eliminación de la pregunta sobre bibliotecas de animación tras la respuesta del usuario.
- Consolidación de las tareas orientadas a la estructura hexagonal simplificada en frontend y carga de datos estáticos vía JSON.

## Tasks

- Configurar el proyecto con Vite y JavaScript ES2022 para GitHub Pages.
- Crear el archivo de datos estáticos en src/data/profile.json.
- Implementar el dominio, las interfaces de puertos y el adaptador de repositorio utilizando Fetch API.
- Desarrollar componentes de UI reutilizables aplicando el patrón de composición y Skeleton Loading.
- Implementar filtros modernos de proyectos y transiciones visuales.
- Configurar el flujo de GitHub Actions para despliegue automático en la rama gh-pages.

## Tests

- Prueba Unitaria: Verificar la correcta carga y validación del archivo JSON por el adaptador de repositorio.
- Prueba de Integración: Comprobar el funcionamiento de los filtros y selectores de proyectos en la interfaz.
- Prueba de Accesibilidad y Performance: Validar Lighthouse scores y navegación por teclado.

## Rationale

- Todas las preguntas necesarias han sido respondidas satisfactoriamente por el usuario, eliminando ambigüedades sobre el framework y la librería de animaciones.
- Se han refinado las tareas y pruebas para reflejar un flujo de desarrollo totalmente acotado a un sitio estático basado en JSON sin dependencias externas complejas.
