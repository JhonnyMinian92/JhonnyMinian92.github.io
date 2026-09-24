# QA Checklist

# Reused Qa from Central Memory


## qa/functional_testing_checklist.md

# Functional testing checklist

- Golden path covered end to end.
- Known edge cases covered (empty, boundary, invalid input).
- Error states show a usable message and do not crash the flow.



## qa/release_readiness_checklist.md

# Release readiness checklist

- All required questions answered and no blocking pending items.
- Migrations applied and reversible.
- Rollback plan documented.



## qa/performance_checklist.md

# Performance checklist

- Presupuesto de rendimiento definido (tiempo de respuesta, tamaño de bundle, uso de memoria) antes de liberar.
- Pruebas de carga sobre los endpoints críticos, no solo pruebas funcionales.
- Cuellos de botella identificados con perfilado, no adivinados.
- Consultas N+1 y payloads no paginados revisados antes de producción.

