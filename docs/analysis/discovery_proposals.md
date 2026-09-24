# Discovery Proposals (Mnemosine)

Necesidades detectadas automáticamente a partir del contexto, la lógica de negocio, las funcionalidades y los ambientes del proyecto. Ninguna se aplica a la memoria del proyecto sin una decisión explícita del usuario (docs/PROJECT_CREATION_FLOW.md sección 31.2).

## Estrategia mínima de pruebas

- Estado: ACCEPTED
- Motivo: Todo proyecto que llega a producción necesita una estrategia mínima de pruebas y no se seleccionó ninguna referencia de testing en Central Memory.
- Señal detectada: sin selección previa en Central Memory

## Preparación para producción

- Estado: ACCEPTED
- Motivo: El proyecto incluye el ambiente de producción entre sus ambientes seleccionados, lo que implica requisitos no funcionales de rendimiento y disponibilidad.
- Señal detectada: ambiente "production" seleccionado
