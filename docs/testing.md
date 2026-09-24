# Test Strategy

- Define test requirements during Gemini analysis.

# Reused Testing from Central Memory


## testing/test_pyramid.md

# Test Pyramid

## Intent
Balance fast feedback and broad confidence by using many focused tests, fewer integration tests and a smaller set of end-to-end tests.

## Applicability
Use as a planning heuristic for automated verification of software where different test levels provide different cost, speed and isolation characteristics.

## Non-applicability
Do not treat the pyramid as a fixed percentage rule. Systems dominated by integration boundaries, distributed behavior or user journeys may require a different distribution based on risk.

## Structure / responsibilities
- **Unit tests:** verify small units in isolation.
- **Integration tests:** verify real interactions between components or infrastructure boundaries.
- **End-to-end tests:** verify critical user-visible workflows across the system.
- **Test strategy:** maps risk and requirements to the appropriate level.
- **Quality gate:** prevents release when required critical behavior is unverified.

## Implementation guidance
1. Identify critical business and security risks.
2. Cover deterministic business logic with fast unit tests.
3. Use integration tests for persistence, APIs, queues and important boundaries.
4. Reserve end-to-end tests for critical workflows that require system-level confidence.
5. Add regression tests for defects at the lowest level that reproduces the failure reliably.
6. Keep tests deterministic and independent.
7. Measure useful coverage and mutation/risk signals rather than chasing a percentage alone.

## Validation criteria
- Critical requirements map to explicit tests.
- Unit tests remain fast and isolated.
- Integration tests exercise important real boundaries.
- Critical user journeys have appropriate end-to-end coverage.
- Defects gain durable regression tests.

## Security considerations
Security-sensitive behavior must be tested at the boundary where controls actually operate. Include authentication, authorization, validation, injection resistance, sensitive-data handling and security regression tests according to risk.

## Trade-offs
More unit tests usually improve speed and diagnosis, while integration and end-to-end tests provide stronger boundary confidence at higher cost and fragility. The optimal distribution follows system risk rather than a universal ratio.

## Related skills and patterns
- `testing.test_strategy`
- `testing.unit_testing`
- `testing.integration_testing`
- `testing.e2e_testing`
- `testing.quality_gate`
- `testing.contract_testing`

## Example decision signals
- **Pure deterministic logic:** prioritize unit tests.
- **Database transaction behavior:** add integration coverage.
- **Critical login journey:** add end-to-end coverage.
- **API provider/consumer boundary:** add contract tests.

## Tests required by Gemini

- Verificar el renderizado correcto de todos los componentes principales mediante pruebas unitarias y de integración del DOM.
- Comprobar el funcionamiento del skeleton loading y los estados de carga o vacíos.
- Validar la correctitud de los enlaces y la accesibilidad básica del sitio web.

## Tests required by Gemini

- Prueba Unitaria: Validar que el Repositorio de datos procesa correctamente el JSON y maneja errores de formato o archivos ausentes.
- Prueba de Integración: Verificar que los filtros de proyectos actualizan correctamente la vista según los criterios seleccionados.
- Prueba de Performance: Ejecutar auditoría Lighthouse para asegurar un LCP (Largest Contentful Paint) óptimo y fluidez en las animaciones.
- Prueba de Accesibilidad (A11y): Validar que el sitio sea navegable mediante teclado y compatible con lectores de pantalla.
- Prueba Funcional (Golden Path): Confirmar que el despliegue en github.io visualiza toda la información y los enlaces de contacto funcionan.

## Tests required by Gemini

- Prueba Unitaria: Verificar la correcta carga y validación del archivo JSON por el adaptador de repositorio.
- Prueba de Integración: Comprobar el funcionamiento de los filtros y selectores de proyectos en la interfaz.
- Prueba de Accesibilidad y Performance: Validar Lighthouse scores y navegación por teclado.

