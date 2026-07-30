# Domain Model

Status: Authoritative

This document defines the canonical platform objects, ownership direction, relationship rules, and domain invariants for the behavior platform core.

Its purpose is to freeze platform language before database design and implementation so that APIs, persistence, and domain modules do not accidentally introduce exercise-specific or other domain-specific primitives into the core. The platform must remain behavior-first, domain-neutral, reusable across Exercise, Learning, Hydration, Medication, Sleep, and future domains, and aligned with deterministic, replay-safe, auditable behavior.

This document is the authoritative source for:

- Canonical platform object meanings
- Ownership direction between canonical objects
- Relationship semantics between core objects
- Platform-level lifecycle expectations
- Domain invariants that later become ERD constraints, command validation, and service rules
- Domain mapping rules for wedge modules and future modules

This document is not the authority for:

- Command preconditions and failure behavior
- Canonical event payload contracts and versions
- Persistence schema, indexes, and transaction design
- Deterministic decision algorithms
- Acceptance-level Given/When/Then behavior

## Domain philosophy

Canonical objects exist so the platform can reuse the same behavior loop across multiple domains without redesigning the core model. Domain modules translate domain language into canonical platform language; they do not redefine the core model.

Platform concepts are reusable core objects, while domain-specific concepts are labels, constraints, and projections at the edge. A workout session, study block, hydration action, medication dose, or sleep routine should map onto canonical platform objects rather than become new platform primitives.

The canonical platform loop is:

Goal → Plan → Activity → Execution → Observation/Event → State → Capacity → Adaptation → Intervention/Plan change → Activity

## Canonical objects

| Object | Purpose | Description | Owner | Lifecycle | Relationships | Core rule |
|---|---|---|---|---|---|---|
| Goal | Capture desired outcome | The user’s intended result such as consistency, completion, recovery, or progression. | Goal Engine | Drafted → Active → Achieved / Abandoned / Archived | Goal → Plan | A Goal may exist without a Plan. |
| Plan | Turn intent into structure | The committed behavior structure that supports a Goal, including cadence, scope, and commitment shape. | Planning Engine | Drafted → Active → Adjusted → Frozen → Retired | Plan → Activity | A Plan may not exist without a Goal. |
| Activity | Define one scheduled unit of behavior | The canonical executable unit the user is meant to perform. | Activity Engine | Scheduled → Due → Completed / Missed / Postponed / Expired | Activity → Execution | Each Activity belongs to exactly one Plan. |
| Execution | Record the user attempt | The factual user attempt or outcome for an Activity. | Activity Engine | Initiated → Recorded → Resolved | Execution → Event | Execution is a user attempt, not a system decision. |
| Event | Store immutable facts | An append-only canonical fact emitted or accepted by the platform. | Event Service | Accepted → Stored → Projected → Consumed | Event feeds State, Capacity, audit, replay | Events are immutable and append-only. |
| Observation | Capture measured facts | A measured or reported fact such as readiness, stress, time pressure, effort, context, or telemetry. | Observation Service | Captured → Stored → Projected | Observation informs State and Capacity | Observation is evidence, not an Execution. |
| State | Summarize current behavioral condition | A derived snapshot of current behavioral condition used for explanation, recovery, and adaptation. | Behavioral Intelligence Engine | Recomputed → Current → Superseded | Derived from Events, Observations, Executions | State is derived truth, not manually authored truth. |
| Capacity | Estimate present feasibility | A derived or estimated snapshot of whether the user can realistically execute the current or proposed plan now. | Capacity Engine | Measured / Inferred → Current → Updated → Trended | Informs State and Adaptation | Capacity must carry named dimensions and confidence. |
| Adaptation | Decide what should change | A decision record proposing a change, explaining why, and identifying the target and expected effect. | Adaptation Engine | Generated → Proposed → Accepted / Rejected → Applied / Expired | References State, Capacity, Plan scope | Adaptation is a decision record, not the mutation itself. |
| Intervention | Deliver the adaptation | The concrete prompt, reminder, recovery step, celebration, reflection, or other delivery mechanism created from an Adaptation. | Adaptation Engine | Queued / Generated → Delivered → Accepted / Ignored / Completed / Expired | Intervention executes an Adaptation | Intervention is not an independent decision authority. |

## Ownership direction

Ownership direction matters because it defines write boundaries and prevents ambiguous mutation paths. The platform should keep direction strictly downward from intent to action to facts to derived intelligence and decision records.

| From | To | Meaning |
|---|---|---|
| Goal | Plan | Goal owns intent; Plan structures that intent into commitments. |
| Plan | Activity | Plan owns commitment shape and scheduled units. |
| Activity | Execution | Activity owns user-attempt tracking and lifecycle resolution. |
| Execution | Event | Execution emits or anchors factual history about what happened. |
| Observation | State / Capacity | Observations contribute evidence to derived snapshots. |
| Event | State | State is computed from immutable accepted facts. |
| Event | Capacity | Capacity may use event history as feasibility evidence. |
| State | Adaptation | Adaptation uses current behavioral condition as one decision input. |
| Capacity | Adaptation | Adaptation uses present feasibility and confidence as another decision input. |
| Adaptation | Intervention | Intervention is the delivery mechanism for the decision. |
| Adaptation | Plan | Accepted and applied adaptation may result in a traceable Plan update. |

## Aggregate and write-boundary notes

The platform core should not allow every canonical object to become an independent write boundary. The current architecture and implementation guidance treat Goal, Plan, Activity, Capacity, and Adaptation as the principal ownership boundaries, while Execution, Observation, Event, State, and Intervention remain supporting records, projections, or artifacts rather than competing aggregate roots.

This matters because State must remain a projection, Event must remain append-only truth, Observation must remain input evidence, and Intervention must remain subordinate to Adaptation rather than becoming a parallel policy owner. Execution belongs under Activity lifecycle control and should not become a cross-cutting independent authority.

## Exercise mapping

Exercise remains the launch wedge, but it maps onto the canonical model instead of redefining it. That preserves the long-term platform core while allowing exercise-specific semantics at the domain edge.

| Canonical object | Exercise translation |
|---|---|
| Goal | Lose weight, build consistency, improve fitness, restore routine. |
| Plan | Exercise plan, weekly workout structure, recovery plan. |
| Activity | Scheduled workout session or other planned movement unit. |
| Execution | Started workout, completed workout, skipped attempt, partial attempt, expired session outcome. |
| Event | ActivityScheduled, ActivityStarted, ActivityCompleted, ActivityMissed, ActivityPostponed, ActivityRescheduled, plus exercise-domain wrappers where needed. |
| Observation | Readiness check, effort rating, heart rate, time pressure, context tags, capacity slider. |
| State | On Track, At Risk, Recovering, Restarting. |
| Capacity | Current exercise feasibility across time, energy, confidence, schedule flexibility, and environment friction. |
| Adaptation | Reduce load, move timing, simplify plan, protect recovery, progress modestly, hold steady. |
| Intervention | Reminder, recovery prompt, reflection prompt, celebration, micro-win, identity reinforcement. |

## Domain invariants

These invariants should later become database constraints, command validation rules, event and projection rules, and acceptance checks. They are platform-level and must remain domain-neutral.

### Structural invariants

1. Every Plan belongs to exactly one Goal.
2. Every Activity belongs to exactly one Plan.
3. Every Execution belongs to exactly one Activity.
4. A Goal may exist without a Plan, but a Plan may not exist without a Goal.
5. A Plan may have many Activities, but each Activity has one Plan only.
6. A Plan cannot directly create an Execution without an Activity.
7. A Goal cannot directly create an Execution.
8. Domain-specific names are projections or mappings, not new platform primitives.
9. Domain modules may constrain behavior, but they may not replace or own canonical platform objects in the core.

### Fact and history invariants

10. Every Event is immutable after write.
11. Events are append-only.
12. Events are never silently deleted during normal platform operation.
13. Event payloads and semantics must remain platform-neutral in the core.
14. An Event is an observed or emitted fact, not a decision.
15. Historical facts must remain replayable for rebuild and audit.
16. A postponed or rescheduled Activity must preserve prior planned and factual history rather than rewriting it away.
17. Every completed Activity must have at least one factual execution record or completion fact.
18. Every missed Activity must have a factual miss resolution.

### Observation and execution invariants

19. An Observation must be stored as fact input, not as a Plan mutation.
20. An Observation may inform Capacity, State, and learning logic, but it does not itself equal an Execution.
21. An Execution is a user attempt, not a system decision.
22. Execution and Observation must not be merged into one ambiguous record type in the platform core.

### Derived-state invariants

23. State is never manually edited as source-of-truth business reality.
24. State must be derived from accepted facts, including Events, Executions, and relevant Observations.
25. Every state transition must be explainable from prior facts.
26. State should default conservatively when evidence is incomplete.
27. Capacity is never manually edited as source-of-truth business reality.
28. Capacity must be derived or estimated from signals and history.
29. Capacity must expose named dimensions and confidence, not only a single opaque score.
30. Every capacity update must be explainable from its inputs.
31. Capacity should default conservatively when signals are missing or low-confidence.

### Adaptation and intervention invariants

32. Adaptation is a decision record, not the mutation itself.
33. Adaptation must reference the State evidence that triggered it.
34. Adaptation must reference the Capacity evidence that supported it when capacity contributed to the decision.
35. Adaptation should record expected effect and rationale.
36. A rejected Adaptation must not be applied silently.
37. Applied plan change must remain traceable to the originating Adaptation.
38. Adaptation should be smaller and safer when Capacity confidence is low.
39. Recovery behavior is a mode or strategy inside adaptation, not a separate MVP platform core.
40. Intervention is the concrete delivery of an Adaptation.
41. A delivered Intervention must be traceable to exactly one Adaptation.
42. Intervention should not become a standalone policy owner or competing aggregate authority.
43. Every intervention should have triggering context.

### Platform continuity invariants

44. The platform core must support replay, audit, deterministic interpretation, and cross-domain reuse.
45. The system should not require redesign to support Learning, Hydration, Medication, Sleep, or future domains.
46. The platform core must remain smaller than any one domain implementation over time.

## Validation notes

The attached domain model is directionally strong and already gets the most important separations right: Event as immutable fact, Observation as explicit evidence, Execution as user attempt, Capacity as composite feasibility, and Adaptation as decision record rather than the change itself. Those choices align with the architecture freeze, the implementation guardrails, and the behavior-first platform loop.

The main adjustments in this replaceable version are structural rather than conceptual. It removes draft-style inline web links, makes the document repository-ready, sharpens ownership and write-boundary language, clarifies that not every object should become an aggregate root, aligns Intervention with the subordinate role described by the architecture, and adds invariants needed for replay, explainability, and applied-change traceability.