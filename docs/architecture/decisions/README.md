# Architecture decisions

ADR files are the SSOT for architectural decisions.

# Reused Design_Pattern from Central Memory


## patterns/backend/repository.md

# Repository

## Intent
Encapsulate persistence access behind a stable application/domain-facing contract.

## Applicability
Use when persistence must be isolated, multiple storage implementations exist, or tests benefit from substituting storage behavior.

## Non-applicability
Avoid creating a repository abstraction that only mirrors a single CRUD API with no meaningful boundary.

## Structure
Define a focused interface around domain operations and implement it in infrastructure. Keep query/storage details outside business logic.

## Implementation guidance
Return domain-oriented results, centralize persistence rules, and make transaction boundaries explicit. Do not expose database-specific models unnecessarily.

## Validation
Verify persistence concerns are isolated, behavior is testable without the database, and the interface expresses real use cases.

## Security
Enforce authorization before protected operations, parameterize queries, validate identifiers and avoid exposing raw persistence errors.

## Trade-offs
Improves testability and storage isolation, but can become unnecessary indirection.

## Related
Skill: `backend.design_patterns`. Commonly paired with Hexagonal Architecture and Explicit Transaction Boundary.



## patterns/frontend/component-composition.md

# Component Composition

## Intent
Build UI behavior from small composable units with explicit boundaries instead of inheritance-heavy structures.

## Applicability
Use when UI behavior, presentation, or interaction is shared across screens and can be expressed through composition.

## Non-applicability
Avoid when abstraction would obscure a small, local component or when shared behavior is not actually stable.

## Structure / responsibilities
- Small components own one coherent responsibility.
- Parent components compose children through explicit inputs and outputs.
- Shared behavior lives in reusable components or utilities with stable contracts.

## Implementation guidance
Keep component APIs narrow. Prefer composition and explicit data flow. Avoid creating generic abstractions before two or more real use cases justify them.

## Validation criteria
- Components can be reused without hidden global state.
- Data and events have explicit boundaries.
- Tests cover important composed behavior.

## Security considerations
Do not trust UI validation as the security boundary. Validate and authorize sensitive operations at the server/API boundary and encode untrusted output appropriately.

## Trade-offs
Composition improves reuse and isolation, but excessive decomposition can increase indirection and cognitive load.

## Related skills and patterns
- `frontend.design_patterns`
- Container and Presentational

## Example decision signals
Choose when several screens need the same behavior and the shared contract is stable enough to justify composition.

