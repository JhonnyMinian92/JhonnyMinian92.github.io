# Gemini Initial Plan

## Changes

- Ajustar el alcance de la arquitectura: Se seleccionó Arquitectura Hexagonal y patrones de backend/mobile, pero el proyecto es estrictamente un frontend SPA para GitHub Pages. Se adaptará la estructura de directorios para simular una separación lógica clara (dominio, adaptadores de UI, servicios) sin añadir complejidad innecesaria de backend.

## Tasks

- Inicializar la estructura del proyecto en JavaScript ES2022 utilizando un empaquetador ligero o vainilla optimizada para GitHub Pages.
- Implementar la capa de componentes UI utilizando composición de componentes y patrones de diseño modernos (skeleton loading, filtros y selectores si aplica).
- Crear los módulos de datos/repositorio simulados para poblar la información profesional (experiencia, proyectos, conocimientos y contacto) manteniendo desacoplada la lógica de presentación.
- Configurar el flujo de despliegue automatizado hacia GitHub Pages.

## Tests

- Verificar el renderizado correcto de todos los componentes principales mediante pruebas unitarias y de integración del DOM.
- Comprobar el funcionamiento del skeleton loading y los estados de carga o vacíos.
- Validar la correctitud de los enlaces y la accesibilidad básica del sitio web.

## Rationale

- El proyecto se define como un sitio web estático para GitHub Pages de tipo frontend, pero se seleccionaron elementos orientados a backend (arquitectura hexagonal estricta, patrones de repositorio de backend y flujos de móvil). Se ajusta la expectativa para aplicar los principios de separación de responsabilidades y modularidad de forma adaptada al navegador.
