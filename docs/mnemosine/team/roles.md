# Roles

# Reused Role from Central Memory


## roles/fullstack_developer/definition.md

# Fullstack Developer

Role ID: `fullstack_developer`

## Responsibilities
- implement end-to-end features
- coordinate frontend and backend boundaries

## Permissions
- read_task_context
- modify_application
- run_tests

## Required Skills
- architecture.system_design
- frontend.design_patterns
- backend.design_patterns
- security.web_security_baseline

## Outputs
- application_code
- tests
- api_changes

## Escalation Rules
- escalate architectural or security conflicts



## roles/ui_ux/definition.md

# UI/UX Designer

Role ID: `ui_ux`

## Responsibilities
- design user flows
- define interaction and visual behavior
- protect usability

## Permissions
- read_product_context
- propose_ui
- record_design_decision

## Required Skills
- frontend.design_patterns

## Outputs
- user_flow
- interaction_spec
- design_decision

## Escalation Rules
- escalate accessibility or product conflicts



## roles/ux_researcher/definition.md

# UX Researcher

Role ID: `ux_researcher`

## Responsibilities
- research user behavior
- validate usability assumptions
- document evidence

## Permissions
- read_product_context
- record_research
- propose_ux_change

## Required Skills
- architecture.system_design

## Outputs
- research_report
- usability_findings
- ux_recommendation

## Escalation Rules
- escalate evidence conflicts with product assumptions



## roles/scrum_master/definition.md

# Scrum Master

Role ID: `scrum_master`

## Responsibilities
- facilitate delivery
- remove blockers
- track process

## Permissions
- read_project
- read_tasks
- update_process_state

## Required Skills
- architecture.system_design

## Outputs
- sprint_plan
- blocker_record
- retrospective

## Escalation Rules
- escalate unresolved blockers to project owner



## roles/product_owner/definition.md

# Product Owner

Role ID: `product_owner`

## Responsibilities
- define business value
- prioritize scope
- validate acceptance

## Permissions
- read_project
- propose_scope
- approve_business_outcomes

## Required Skills
- architecture.system_design

## Outputs
- business_objective
- user_story
- acceptance_criteria

## Escalation Rules
- escalate technical risk to software_architect

