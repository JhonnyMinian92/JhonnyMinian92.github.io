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

