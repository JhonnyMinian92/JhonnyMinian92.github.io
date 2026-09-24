# Constraints

Record mandatory technical, business, security, compatibility and operational constraints.

## Gemini proposed changes

- Ajustar el alcance de la arquitectura: Se seleccionó Arquitectura Hexagonal y patrones de backend/mobile, pero el proyecto es estrictamente un frontend SPA para GitHub Pages. Se adaptará la estructura de directorios para simular una separación lógica clara (dominio, adaptadores de UI, servicios) sin añadir complejidad innecesaria de backend.

## Gemini proposed changes

- Confirmación de archivo JSON estático como fuente única de verdad para el contenido profesional.
- Eliminación de tareas relacionadas con configuración de dominios personalizados y registros CNAME.
- Ajuste del flujo de datos: se implementará un adaptador de infraestructura específico para leer el archivo JSON local mediante Fetch API.
- Refinamiento de la Arquitectura Hexagonal: se estructurará como un 'Modular Frontend' donde el Dominio define las entidades (Proyecto, Experiencia), los Casos de Uso gestionan la carga de datos y la UI reacciona a los cambios de estado.

