# Platform Architecture Model

## 1. Purpose

PAM is the platform-level architecture for the Human Behavior Platform, with Exercise as the wedge and behavior execution as the core reusable capability. It is designed to stay simple enough for MVP implementation while preserving a clean path to Learning, Hydration, Medication, Sleep, and future domains. 

The architecture now treats the product as a **behavior adaptation system**, not a collection of loosely related engines. That is consistent with the BRD’s reusable Goal → Plan → Activity → Daily State → Adaptation lifecycle and the MAOM freeze candidate’s guidance to keep the MVP modular monolith small and executable. 

## 2. Platform vision

Exercise remains the launch wedge because it is frequent, measurable, emotionally salient, and already has visible demand from users who repeatedly fail to stay consistent. The platform must stay behavior-centric because the reusable value is not workout content, but the ability to detect mismatch, estimate capacity, adapt plans, and recover after misses. [pp

The same behavior core should work across domains because the underlying problem is the same: people make commitments, reality changes, execution happens or fails, and the system needs to respond intelligently. A workout plan, a study block, a hydration routine, and a medication regimen all differ in domain semantics, but they all need the same behavior loop. 

## 3. Engine model

PAM reduces the number of first-class engines and moves the rest into models, projections, or services. This is more MVP-appropriate and avoids making analytics-like components sound like independent decision systems. 

### Core engines

- Goal Engine.
- Planning Engine.
- Activity Engine.
- Behavioral Intelligence Engine.
- Capacity Engine.
- Adaptation Engine. 

### Supporting platform capabilities

- Notification Service.
- Event Service.
- Analytics Service.
- Reporting Service.
- Learning Projections. 

This is the key simplification: self-trust, recovery, learning, and intervention are not separate first-class engines in MVP. They belong inside Behavioral Intelligence, Capacity, or Adaptation as models, rules, or decision policies. 

## 4. Why these engines

The Goal Engine exists because every domain begins with intent that must be normalized into a goal. The Planning Engine exists because goals must become executable commitments with cadence, scope, and constraints. The Activity Engine exists because behavior is ultimately executed as concrete actions, not abstract intentions. 

The Behavioral Intelligence Engine is the platform’s classifier and estimator: it interprets history, derives state, and computes models such as self-trust, trust in system, automaticity, and other signals. The Capacity Engine is explicit because the system repeatedly needs to answer whether the user can realistically do this now, and that is a distinct decision axis from planning or adaptation. 

The Adaptation Engine owns the actual plan change decision: shrink, move, simplify, protect, or progress. Recovery is a strategy inside adaptation, not a standalone engine, because in MVP it is just a special case of responding to lapse and low confidence. 

## 5. Canonical entities

PAM should explicitly freeze the platform’s canonical entities before any domain model or ERD is built. These entities are the shared language of the platform, and domain modules map into them rather than inventing parallel structures. 

### Canonical platform entities

- User.
- Goal.
- Plan.
- PlanItem.
- Activity.
- ActivityExecution.
- Observation.
- StateSnapshot.
- CapacitySnapshot.
- Adaptation.
- Intervention.
- Event.
- DomainObject. 

### Entity meaning

- Goal is the intended outcome.
- Plan is the committed structure.
- PlanItem is a scheduled commitment.
- Activity is the canonical executable unit.
- ActivityExecution is what actually happened.
- Observation is any signal that informs models.
- StateSnapshot is the current behavioral state.
- CapacitySnapshot is the current estimate of feasibility.
- Adaptation is the proposed or applied plan change.
- Intervention is the user-facing or system-facing action used to execute adaptation.
- DomainObject is the domain-specific object wrapped around the canonical model. 

This explicit entity set reduces ambiguity before ERD work and helps avoid accidental engine creep. 

## 6. Aggregate ownership

Aggregate ownership should be explicit because it clarifies where invariants live and what each engine is allowed to change. The aggregate owner is the component that is allowed to enforce consistency for that object. 

| Aggregate | Owner | Notes |
|---|---|---|
| Goal | Goal Engine | Owns goal scope and success criteria. |
| Plan | Planning Engine | Owns cadence, structure, and commitment shape. |
| Activity | Activity Engine | Owns scheduling, execution state, reschedule, skip, postpone. |
| StateSnapshot | Behavioral Intelligence Engine | Owns classification and state labeling. |
| CapacitySnapshot | Capacity Engine | Owns feasibility estimation and confidence. |
| Adaptation | Adaptation Engine | Owns plan change proposal and application. |
| Event | Event Service | Owns canonical event creation and routing. |
| DomainObject | Domain Module | Owns domain-specific semantics. |

This is the missing ownership layer that should sit between architecture and ERD. 

## 7. Engine boundaries

### Goal Engine

Purpose: normalize user intent into a concrete behavioral target.  
Responsibilities: goal creation, goal updates, goal scope, success definition.  
Inputs: user intent, domain context, prior behavior.  
Outputs: goal record, goal confidence, goal status.  
Dependencies: domain module, event stream.  
Why generic: every domain starts with a goal. 

### Planning Engine

Purpose: convert goals into executable commitments.  
Responsibilities: plan shape, cadence, load, plan validity, commitment scope.  
Inputs: goal, capacity estimate, domain constraints, historical behavior.  
Outputs: plan, plan items, commitment schedule.  
Dependencies: Goal Engine, Capacity Engine.  
Why generic: planning is the same structural problem in exercise, learning, hydration, and medication. 

### Activity Engine

Purpose: manage the canonical execution unit.  
Responsibilities: create, complete, miss, postpone, reschedule, expire.  
Inputs: plan items, user actions, time windows, external signals.  
Outputs: activity events and activity state changes.  
Dependencies: Planning Engine, Event Service.  
Why generic: only the label changes across domains. 

### Behavioral Intelligence Engine

Purpose: interpret history into behavioral state and derived models.  
Responsibilities: state classification, self-trust estimation, trust inference, automaticity inference, pattern summaries.  
Inputs: activity history, observation stream, adaptation outcomes, micro-check-ins.  
Outputs: StateSnapshot, model scores, confidence, diagnostic flags.  
Dependencies: Event Service, Capacity Engine, Analytics projections.  
Why generic: it reasons about behavior, not exercise. 

### Capacity Engine

Purpose: estimate whether the user can realistically execute the current or proposed plan.  
Responsibilities: compute current capacity, trend capacity, overload risk, recovery need, confidence.  
Inputs: sleep, stress, workload, time pressure, skip reasons, completion patterns, optional calendar/signal inputs.  
Outputs: CapacitySnapshot, capacity bands, overload flags.  
Dependencies: Observation stream, Behavior Intelligence models.  
Why generic: capacity is a cross-domain feasibility concept, not a domain rule. 

### Adaptation Engine

Purpose: decide the smallest useful change to improve adherence.  
Responsibilities: reduce, move, simplify, protect, progress, or hold steady.  
Inputs: StateSnapshot, CapacitySnapshot, plan history, acceptance history, domain constraints.  
Outputs: adaptation proposal, explanation, intervention candidate, updated plan delta.  
Dependencies: Behavioral Intelligence Engine, Capacity Engine, Learning projections.  
Why generic: the same adaptation logic can support every domain. 

## 8. Self-trust and recovery

Self-trust should not be a separate engine in PAM. It is a model produced by Behavioral Intelligence from promises made versus promises kept, plus related completion history. That preserves its importance without overstating its architectural status. 

Recovery should also not be a standalone engine in MVP. It is a named adaptation mode used when lapse, restart intent, or low trust conditions require a lighter re-entry path. This fits the MAOM direction better and prevents engine fragmentation. 

## 9. Shared services

Shared services are reusable capabilities that support the platform but do not decide behavior. They should be implemented as services or modules, not engines. 

- Authentication.
- Analytics.
- Reporting.
- Content Management.
- Media Library.
- Search.
- Feature Flags.
- Notification Service.
- Event Service. 

Boundary rule: if a component changes behavior decisions, it is not a shared service; if it only stores, transports, displays, or measures, it is a service. 

## 10. Domain modules

Domain modules own semantics that would change if the domain changed. They translate domain language into the canonical platform model and constrain generic engines with domain rules. 

### Exercise Module

Responsibilities: workout templates, movement types, equipment needs, progression semantics, rest-day semantics.  
Domain entities: WorkoutTemplate, ExerciseSession, EquipmentNeed, TrainingFocus.  
Rules: intensity, modality, rest, and progression are exercise-specific.  
Integration: emits domain events that map to canonical activity events. 

### Learning Module

Responsibilities: study blocks, topics, revision cycles, exam horizon, attention-aware routines.  
Domain entities: StudyBlock, Topic, RevisionPlan.  
Rules: spaced repetition, cognitive load, exam dates.  
Integration: maps learning intent into canonical goals, plans, and activities. 

### Hydration Module

Responsibilities: fluid targets, intake timing, container semantics, reminders.  
Domain entities: HydrationTarget, IntakeCue, DailyFluidGoal.  
Rules: intake limits, safety, timing around meals and activity.  
Integration: uses the same engines with hydration semantics at the edge. 

### Medication Module

Responsibilities: dose schedules, timing windows, regimen exceptions, escalation rules.  
Domain entities: MedicationOrder, DoseWindow, Regimen.  
Rules: safety-critical timing and exception handling.  
Integration: same core loop, stricter domain constraints. 

### Sleep Module

Responsibilities: bedtime, wake time, wind-down routines, sleep opportunity.  
Domain entities: SleepWindow, BedtimeGoal, WindDownPlan.  
Rules: circadian constraints and bedtime rigidity.  
Integration: same engines, domain-safe adaptation constraints. 

## 11. Event architecture

PAM keeps the event model neutral at the platform layer. Domain-specific events may exist, but they should translate into canonical platform events before reaching generic engines. 

### Canonical platform events

- GoalCreated.
- GoalUpdated.
- PlanCreated.
- PlanUpdated.
- ActivityCompleted.
- ActivityMissed.
- ActivityPostponed.
- ActivityRescheduled.
- StateChanged.
- CapacityChanged.
- AdaptationProposed.
- AdaptationAccepted.
- AdaptationRejected.
- RecoveryStarted.
- RecoveryCompleted. 

### Hierarchy

- Platform events are the canonical language of the engine layer.
- Domain events are wrappers or aliases used inside a module.
- Module events can be richer, but they should map to canonical events for cross-domain behavior logic. 

This keeps the platform reusable and avoids exercise-specific coupling in the core engine layer. 

## 12. Interaction model

The canonical interaction loop is:

Goal Engine  
→ Planning Engine  
→ Activity Engine  
→ Event Service  
→ Behavioral Intelligence Engine  
→ Capacity Engine  
→ Adaptation Engine  
→ Activity Engine. 

Text form:
- The Goal Engine defines what the user is trying to do.
- The Planning Engine turns that into commitments.
- The Activity Engine tracks execution.
- The Event Service records reality.
- Behavioral Intelligence interprets what happened.
- Capacity estimates feasibility.
- Adaptation changes the plan.
- The updated plan returns to the Activity Engine. 

Decision ownership:
- Goal decisions belong to Goal Engine.
- Commitment shape belongs to Planning Engine.
- Execution truth belongs to Activity Engine.
- Behavioral interpretation belongs to Behavioral Intelligence.
- Feasibility belongs to Capacity.
- Plan changes belong to Adaptation. 

## 13. Domain expansion test

The test remains the same, but PAM now applies it more rigorously: can Exercise be replaced by Learning without rewriting the component? If yes, it is generic; if not, it is a domain module. 

Applied to core components:
- Goal Engine: yes, generic.
- Planning Engine: yes, generic.
- Activity Engine: yes, generic.
- Behavioral Intelligence Engine: yes, generic.
- Capacity Engine: yes, generic.
- Adaptation Engine: yes, generic.
- Exercise Module: no, domain module.
- Learning Module: no, domain module.
- Hydration Module: no, domain module.
- Medication Module: no, domain module.
- Sleep Module: no, domain module. 

## 14. MVP simplification

For MVP, build now:
- Exercise Module.
- Goal Engine.
- Planning Engine.
- Activity Engine.
- Behavioral Intelligence Engine.
- Capacity Engine.
- Adaptation Engine.
- Event Service.
- Notification Service.
- Authentication.
- Analytics.
- Feature Flags. 

Build later:
- Content Management beyond templates.
- Search beyond basic retrieval.
- Reporting beyond basic summaries.
- Rich intervention catalog as a separate abstraction. 

Post-PMF:
- Learning Module.
- Hydration Module.
- Medication Module.
- Sleep Module.
- Any new specialized engine variants. 

This version is intentionally smaller than PAM v1, because MVP success depends on shipping a clean behavior loop rather than an expansive architectural taxonomy. 

## 15. Guardrails

1. Generic engines must not contain exercise-specific logic. 
2. Domain modules must not own adaptation policy. 
3. Self-trust is a model, not a standalone engine. 
4. Recovery is a mode of adaptation, not a separate platform core in MVP. 
5. Learning is a behavior-learning capability, not a generic engine name if it creates ambiguity with the Learning domain. 
6. Capacity must be explicit, not inferred only inside planning. 
7. Canonical events must use neutral names. 
8. ActivityCompleted is preferred over WorkoutCompleted in platform logic. 
9. New domains must map to canonical activity and state events before they reach generic engines. 
10. Shared services may not change behavior decisions. 
11. Domain modules may constrain adaptation, but they may not implement adaptation logic. 
12. The modular monolith remains the default until scale or ownership forces a split. 
13. Confidence must be explicit when data is sparse. 
14. Lower-burden signals outrank richer signals by default. 
15. The smallest effective plan change wins. 
16. No new domain may introduce a new engine before reusing the core loop. 
17. State labels must stay small and behaviorally useful. 
18. Engine count should be minimized unless a new component independently owns decisions. 


## Part 13 – Canonical Objects

These are the platform objects that must exist across all behavior domains. They are the shared language of the platform core, while domains provide semantic wrappers and rules around them. 

| Object | Purpose | Ownership | Lifecycle | Relationships | Why it belongs in core | Domain expansion test |
|---|---|---|---|---|---|---|
| Goal | Represent the intended behavior outcome. | Goal Engine. | Created, updated, paused, archived, replaced. | A Goal produces one or more Plans. | Every domain begins with intent that must be normalized. | Yes: learning/hydration/medication can reuse it unchanged.   |
| Plan | Represent the committed behavioral structure. | Planning Engine. | Drafted, active, adjusted, frozen, retired. | A Plan contains Activities and references a Goal. | Planning is the common structure behind all adherence domains. | Yes.   |
| Activity | The canonical executable unit. | Activity Engine. | Scheduled, due, completed, missed, postponed, rescheduled, expired. | An Activity belongs to a Plan and may have one or more Executions. | The platform needs one neutral execution primitive. | Yes.  |
| Execution | The factual record of what happened. | Activity Engine / Event Service. | Created when an activity is attempted or resolved. | An Execution belongs to an Activity and generates Events. | Separates intent from reality, which is central to the loop. | Yes.  |
| Event | Canonical observation of platform reality. | Event Service. | Emitted, stored, consumed, projected. | Events are produced by Goals, Plans, Activities, Adaptations, and Interventions. | All engines need a shared audit trail. | Yes.   |
| State | Current behavioral classification. | Behavioral Intelligence Engine. | Recomputed daily or on trigger; transitions over time. | Derived from Activities, Executions, Capacity, and history. | The platform needs a small reusable state model. | Yes.  |
| Capacity | Feasibility estimate for execution now. | Capacity Engine. | Measured, inferred, updated, decays, trends. | Feeds Planning, State, and Adaptation. | Capacity is distinct from planning and must be explicit. | Yes.   |
| Adaptation | Proposed or applied plan change. | Adaptation Engine. | Proposed, accepted, rejected, applied, reverted. | Changes a Plan based on State and Capacity. | Adaptation is the core differentiator of the platform. | Yes.   |
| Intervention | The user-facing or system-facing mechanism used to execute an adaptation. | Intervention Architecture inside Adaptation. | Generated, delivered, accepted, rejected, completed, measured. | An Intervention can prompt, celebrate, reflect, or recover. | Needed to make adaptation concrete and measurable. | Yes.  |

### Object notes

- Goal, Plan, Activity, Execution, Event, State, Capacity, Adaptation, and Intervention are the canonical platform objects that should appear in the Domain Model and ERD. 
- Domain modules should never replace these objects with domain-specific equivalents in the platform core; they should map their semantics onto them. 
- The exercise domain may have a WorkoutSession, but that is a domain object mapping to Activity/Execution, not a new platform primitive. 

## Part 14 – Intervention Architecture

Intervention should be modeled as a **Value Object plus service behavior**, not as a standalone aggregate or entity. The intervention itself is usually a describable proposal or action descriptor; the real lifecycle and ownership belong to the Adaptation Engine and the event stream. 

### Final recommendation

- Not an Aggregate: intervention does not need independent identity or deep invariants.
- Not a standalone Entity: identity is not the main concern; outcome and context are.
- Yes as a Value Object: it needs type, payload, rationale, target, timing, and expected effect.
- Yes as a service-constrained artifact: the Adaptation Engine creates and evaluates it. 

### Intervention shape

An Intervention should include:
- intervention type.
- target activity or plan scope.
- trigger reason.
- message or action payload.
- expected effect.
- confidence.
- domain applicability.
- delivery channel.
- outcome status. 

### Long-term intervention types

- Reminder.
- Recovery Prompt.
- Micro-Win.
- Celebration.
- Reflection Prompt.
- Identity Reinforcement. 

### Why this design works

This keeps intervention reusable across domains while allowing each module to provide domain-safe copy and constraints. For example, a Reminder in Exercise becomes “do the workout,” while in Medication it becomes “take the dose,” but the platform object and measurement pattern remain the same. 

### Measuring effectiveness

Intervention effectiveness should be measured with the same cross-domain metrics:
- acceptance rate.
- completion rate after intervention.
- delta in 24–72 hour adherence.
- reduction in lapse recurrence.
- recovery speed.
- user trust impact.
- confidence calibration. 

The key rule is that the metric vocabulary stays canonical even when the intervention copy is domain-specific. 

## Part 15 – Capacity Architecture

Capacity must remain a first-class platform capability for the next 5 years because the platform repeatedly needs to answer whether the user can realistically do the plan now, not just whether the plan is theoretically correct. That is already reflected in HAOM V5’s Capability variable, BSAM’s low-friction capacity signals, and MAOM’s overload simplification. 

### Capacity Engine recommendation

Capacity should be a **first-class engine-model boundary**, but not a bloated engine with domain knowledge. In practice, it should own:
- current feasibility estimation.
- trend estimation.
- overload risk.
- recovery need.
- confidence score.
- capacity bands. 

### Why this remains valid for 5 years

- It generalizes across exercise, learning, hydration, sleep, and medication. 
- It supports both passive and low-friction signals. 
- It prevents overplanning and over-adaptation. 
- It gives the platform a stable decision axis when domain semantics differ. 

### Capacity inputs

Capacity should use:
- self-report signal.
- time pressure.
- stress.
- energy.
- workload.
- sleep proxy.
- calendar density.
- skip reasons.
- recent adherence under similar conditions. 

### Capacity outputs

- capacity score.
- capacity band.
- confidence.
- overload flag.
- trend direction.
- mismatch flag against plan load. 

### Capacity rules

- Capacity is about “can the user do this now?”
- Plan is about “what should the user do?”
- Activity is about “what actually happened?”
- Adaptation is about “what should change next?” 

This separation should not blur over time. If Capacity starts absorbing plan logic or behavioral state logic, the architecture will drift. 

## Part 16 – Platform Invariants

These invariants are non-negotiable rules that should guide the Domain Model, ERD, APIs, services, and future platform work. 

### Ownership invariants

1. Goal ownership belongs to the Goal Engine.
2. Plan ownership belongs to the Planning Engine.
3. Activity ownership belongs to the Activity Engine.
4. Execution ownership belongs to the Activity Engine or its execution projection.
5. State ownership belongs to Behavioral Intelligence.
6. Capacity ownership belongs to Capacity.
7. Adaptation ownership belongs to Adaptation.
8. Intervention creation belongs to Adaptation, not to domain modules.
9. Event ownership belongs to the Event Service.
10. Domain modules may constrain behavior but may not own canonical platform objects. 

### Lifecycle invariants

11. A Goal may exist without a Plan, but a Plan must reference a Goal.
12. A Plan may exist without current Activity execution, but Activities must belong to a Plan.
13. An Activity may be scheduled without being executed.
14. Every completed, missed, postponed, or rescheduled action must resolve to an Execution or equivalent event record.
15. State is derived; it is not manually edited as truth.
16. Capacity is derived or estimated; it is not user-facing as raw truth unless surfaced intentionally.
17. Adaptation must always be traceable to a prior state or capacity condition.
18. Recovery is a mode of adaptation, not a separate behavior universe. 

### Event invariants

19. Platform events must use canonical neutral names.
20. Domain events may exist only as mappings or local wrappers.
21. ActivityCompleted is preferred over WorkoutCompleted in platform logic.
22. Event streams must preserve ordering and auditability.
23. Events must be append-only from the perspective of truth records.
24. Every adaptation proposal should emit an event.
25. Every adaptation acceptance or rejection should emit an event.
26. Every state transition should emit an event.
27. Every significant capacity change should emit an event. 

### Adaptation invariants

28. Adaptation must be the smallest effective change first.
29. Adaptation must not exceed the confidence of the data.
30. Low confidence should bias toward lighter action, not stronger action.
31. Adaptation must respect domain constraints at the module boundary.
32. Adaptation must be reversible where possible.
33. Adaptation must explain itself.
34. Adaptation must not depend on exercise-specific logic in the generic engine. 

### Intervention invariants

35. Interventions must be measurable.
36. Interventions must be domain-translatable.
37. Interventions must never require a domain module to change the platform core.
38. Reminder and recovery interventions must be non-shaming by default.
39. Celebration must reinforce behavior without creating pressure.
40. Reflection prompts must not become required questionnaires.
41. Identity reinforcement must remain supportive, not coercive.
42. Interventions must never manipulate trust metrics for their own sake. 

### Modeling invariants

43. Self-trust is a model, not a separate domain object with independent behavioral authority.
44. Capacity is distinct from State.
45. State is distinct from Adaptation.
46. Activity is distinct from Execution.
47. Domain semantics must not leak into generic engine logic.
48. A new domain must reuse the core loop before introducing new platform capability.
49. If a component cannot survive Exercise → Learning replacement, it is not platform core.
50. The platform should remain modular monolith friendly until scale proves otherwise. 

## Part 17 – PAM Freeze Assessment

### What is frozen

Frozen now:
- the canonical core loop: Create Plan → Observe Reality → Detect Mismatch → Adapt Plan → Recover → Learn.
- the canonical objects: Goal, Plan, Activity, Execution, Event, State, Capacity, Adaptation, Intervention.
- the engine boundaries: Goal, Planning, Activity, Behavioral Intelligence, Capacity, Adaptation.
- the domain/module split.
- the canonical event naming approach.
- the exercise wedge as launch domain. 

### What remains flexible

Still flexible:
- exact internal schema of each object.
- exact state labels if the behavior remains equivalent.
- exact intervention catalog copy.
- exact thresholds and confidence cutoffs.
- analytics projections and reporting surfaces.
- domain-specific module internals for future domains. 

### What must never change

Must not change:
- behavior-first core architecture.
- canonical platform vocabulary.
- adaptation ownership.
- capacity as an explicit concept.
- event-neutral core model.
- domain modules do not own adaptation.
- exercise is the wedge, not the platform definition. 

### Risks of changing platform objects later

Changing these objects later would be expensive because it would ripple through:
- domain modeling.
- ERD.
- APIs.
- event streams.
- projections.
- mobile architecture.
- analytics and experiment design. 

The largest long-term risk is renaming or reshaping core objects after implementation begins, because that creates semantic drift between product logic, persistence, and domain language. The second largest risk is letting future domains introduce competing primitives instead of mapping to the canonical core. 

The final recommendation is to freeze PAM at this level and proceed to the Domain Model only after the platform objects and ownership boundaries are treated as fixed.

Agreed — those are the right missing freeze-level pieces. Below is a corrected PAM addendum that freezes ownership, event catalog, and testable invariants so teams do not create duplicate write paths later. 

## Aggregate ownership

This is the frozen ownership matrix you asked for, and it should be treated as the source of truth for aggregates, write paths, and API boundaries. 

| Object | Aggregate Root | Owner | Notes |
|---|---|---|---|
| Goal | Goal | Goal Engine | Goal is the write boundary for goal creation and changes.   |
| Plan | Plan | Planning Engine | Plan owns the committed structure of the behavior.   |
| Activity | Activity | Activity Engine | Activity belongs to a Plan, but is the root for execution-level lifecycle.   |
| Execution | Execution | Activity | Execution is nested under Activity and is not independently written as a top-level behavior object.   |
| State | State | Behavioral Intelligence | State is derived and stored as a projection or snapshot, not manually authored as truth.   |
| Capacity | Capacity | Capacity Engine | Capacity is a first-class derived model with its own owner.   |
| Adaptation | Adaptation | Adaptation Engine | Adaptation is the root of plan-change decisions and their lifecycle.   |
| Intervention | Intervention | Adaptation Engine | Intervention is created and governed by adaptation, with state/context as inputs.   |

### Ownership rules

- One canonical write owner per aggregate. 
- Domain modules may propose changes, but only the aggregate owner may commit them. 
- APIs must align to aggregate boundaries, not to UI screens or ad hoc domain terms. 
- Any future domain must map into these owners or it is not platform-native. 

## Testable invariants

These are no longer just principles; they should become validation rules, DB constraints, and API guards. 

### Core invariants

1. A Plan cannot exist without a Goal. 
2. An Activity cannot exist without a Plan. 
3. An Execution cannot exist without an Activity. 
4. A State cannot be user-edited as canonical truth; it is derived from events and history. 
5. Capacity cannot be user-edited as canonical truth; it is derived or estimated from signals. 
6. Adaptation cannot be created without a current State snapshot. 
7. Intervention cannot be triggered without a valid adaptation context. 
8. Goal cannot directly create an Execution. 
9. Activity completion must resolve through Execution and Event records. 
10. Every user-visible plan change must emit an Adaptation event. 

### Behavioral invariants

11. Every Activity has exactly one owner aggregate. 
12. Every Execution belongs to one and only one Activity. 
13. Every Plan references a single canonical Goal at a time. 
14. A Goal may have zero Plans, but not vice versa. 
15. A Plan may have many Activities. 
16. An Activity may have multiple attempts or executions, but one factual outcome. 
17. A State snapshot must be timestamped. 
18. A Capacity estimate must be timestamped and confidence-scored. 
19. An Intervention must have a trigger context. 
20. An Intervention must have an outcome status. 

### Event invariants

21. All canonical events are append-only. 
22. Event names must be platform-neutral. 
23. Domain-specific event names are only projections or aliases. 
24. Every ActivityScheduled event must reference a Plan and Activity. 
25. Every ActivityStarted event must reference an existing Activity. 
26. Every ActivityCompleted event must reference an Execution. 
27. Every ActivityMissed event must reference the missed Activity instance. 
28. Every StateUpdated event must include prior and current state. 
29. Every CapacityUpdated event must include source signals and confidence. 
30. Every AdaptationGenerated event must include rationale and expected effect. 

### Safety invariants

31. Low-confidence Capacity must bias toward safer plans, not larger ones. 
32. Low-confidence State must bias toward conservative adaptation. 
33. High-friction contexts must not be overridden without explicit user approval. 
34. Recovery flows must be lighter than normal planning flows. 
35. Interventions must be non-shaming by default. 
36. Reminders must not escalate endlessly after non-response. 
37. A rejected adaptation should not silently reappear unchanged. 
38. Trust metrics must never be manipulated directly as a goal. 
39. Domain-specific semantics must not leak into the core event model. 
40. New domains must reuse Goal → Plan → Activity → Execution → Event before adding custom primitives. 

### Lifecycle invariants

41. Draft Plan and active Plan are distinct lifecycle states. 
42. Activity scheduling must precede Activity completion or miss resolution. 
43. An Execution cannot outlive its parent Activity as a logical truth record. 
44. A State update must follow a new relevant event batch or scheduled recomputation. 
45. Capacity may decay or trend, but must never be manually overwritten without trace. 
46. Adaptation may suggest change without applying it. 
47. Applied adaptation must be separately auditable from proposed adaptation. 
48. Intervention delivery must be separately auditable from intervention creation. 

## Canonical events

This is the frozen platform event catalog. All future domains should emit these names or projections of them, not invent parallel truths. 

| Canonical event | Meaning | Primary source |
|---|---|---|
| GoalCreated | A goal was created. | Goal Engine.   |
| GoalUpdated | A goal changed. | Goal Engine.   |
| PlanCreated | A plan was created from a goal. | Planning Engine.   |
| PlanUpdated | A plan changed. | Planning Engine.   |
| PlanActivated | A plan became active. | Planning Engine.   |
| ActivityScheduled | An activity was placed on the plan. | Activity Engine.   |
| ActivityStarted | Execution began. | Activity Engine.   |
| ActivityCompleted | Activity completed successfully. | Activity Engine.   |
| ActivityMissed | Activity was missed or expired. | Activity Engine.   |
| ActivityPostponed | Activity was intentionally deferred. | Activity Engine.   |
| ExecutionRecorded | The factual execution record was stored. | Activity Engine.   |
| StateUpdated | Daily or triggered state changed. | Behavioral Intelligence.   |
| CapacityUpdated | Capacity estimate changed. | Capacity Engine.   |
| AdaptationGenerated | A candidate adaptation was produced. | Adaptation Engine.   |
| AdaptationApplied | A plan change was committed. | Adaptation Engine.   |
| AdaptationRejected | A suggested change was declined. | Adaptation Engine.   |
| InterventionTriggered | A user-facing intervention was issued. | Adaptation Engine.   |
| InterventionAccepted | The intervention was accepted. | Adaptation Engine.   |
| InterventionCompleted | The user acted on the intervention. | Adaptation Engine.   |
| RecoveryStarted | Recovery flow began. | Recovery logic via Adaptation.   |
| RecoveryPlanCreated | A lightweight restart plan was created. | Adaptation/Recovery.   |
| LearningSignalUpdated | A learning projection was refreshed. | Learning Engine.   |

## API guardrails

These rules should shape API design directly. 

- Goal APIs write Goal only.
- Plan APIs write Plan only.
- Activity APIs write Activity and Execution through the Activity aggregate.
- State APIs should be read/update projection APIs only, not freeform write APIs.
- Capacity APIs should be estimator/projection APIs, not manual override APIs.
- Adaptation APIs must require current snapshot IDs or versioned context.
- Intervention APIs must require adaptation references and trigger context. 

## Why this matters

Without these frozen boundaries, the platform will drift into duplicate write paths such as WorkoutCompleted, LessonFinished, or WaterConsumed being treated as first-class truths instead of being mapped into Activity/Execution/Event. That would fragment engines, weaken analytics, and make future domains expensive to add. 

## Freeze assessment

What is now frozen:
- canonical aggregates and owners.
- canonical event catalog.
- testable invariants.
- API boundary direction.
- platform-neutral event vocabulary. 

What remains flexible:
- exact event payload shape.
- exact DB schema.
- exact state labels.
- exact intervention templates.
- exact capacity scoring formula. 

What must never change:
- one aggregate root per write path.
- State and Capacity remain derived.
- Intervention is governed by Adaptation.
- platform core remains domain-neutral. 
