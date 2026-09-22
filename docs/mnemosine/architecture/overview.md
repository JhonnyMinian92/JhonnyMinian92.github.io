# Architecture overview

Describe the system boundaries, components, dependencies and integration points.

# Reused Architecture from Central Memory


## architectures/hexagonal.md

# Hexagonal Architecture

## Intent
Protect domain and application logic from infrastructure and external interfaces through ports and adapters.

## Applicability
Use when a system has multiple integrations, requires strong testability, or must preserve domain independence.

## Non-applicability
Avoid for disposable prototypes or trivial components where interfaces would add more complexity than value.

## Structure
Define ports for required/provided capabilities and adapters for HTTP, persistence, messaging and other external mechanisms.

## Implementation guidance
Keep domain code unaware of concrete adapters. Select adapters through composition/configuration rather than embedding infrastructure decisions in business logic.

## Validation
Verify dependency direction, replaceability of adapters, isolated domain tests and explicit integration boundaries.

## Security
Treat adapters as trust boundaries; validate input, enforce authorization and avoid leaking infrastructure errors into public contracts.

## Trade-offs
Strong boundaries and testability at the cost of more interfaces and indirection.

## Related
Skill: `architecture.system_design`. Often complements Repository and Adapter patterns.

