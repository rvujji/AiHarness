Below is a frozen, implementation-ready **Aggregate Catalog v1** for the approved aggregate roots only: Goal, Plan, Activity, Capacity, Adaptation. It is aligned to the frozen domain model and keeps State, Event, Observation, Execution, and Intervention out of aggregate-root status as requested. 

## Aggregate Catalog v1

### 1) Goal Aggregate

**Purpose**  
Owns the user’s intended outcome and anchors the behavior loop. Goal is the top-level intent object and the root of downstream planning. 

**Aggregate Root**  
Goal. 

**Entities**  
- GoalVersion or GoalRevision, if you need explicit versioning.
- GoalNote or GoalTag, only if goal metadata must be modeled as child entities rather than loose fields.  
Keep this minimal in MVP.

**Value Objects**  
- GoalTitle.
- GoalDescription.
- GoalType.
- GoalStatus.
- GoalOwnerRef.
- GoalTimeWindow, if applicable.

**Commands**  
- CreateGoal.
- UpdateGoal.
- ActivateGoal.
- PauseGoal.
- CompleteGoal.
- ArchiveGoal.
- ReopenGoal.

**Domain Events**  
- GoalCreated.
- GoalUpdated.
- GoalActivated.
- GoalPaused.
- GoalCompleted.
- GoalArchived.
- GoalReopened.

**Invariants**  
- Goal must have exactly one owner.
- Goal must belong to exactly one user.
- Goal cannot be active and archived at the same time.
- Goal can only be completed from an active state.
- Archived goals are read-only.
- A paused goal cannot create new active plans unless explicitly reopened.
- Goal identity never changes after creation.
- Goal status transitions must follow the allowed lifecycle.
- Goal updates must preserve historical auditability.
- Only the Goal aggregate may change goal truth.

**State Transitions**  
Drafted → Active → Paused → Active → Completed → Archived.  
Drafted → Active → Archived.  
Drafted → Active → Abandoned/Archived, if abandonment is modeled as a terminal state.

**Cross-Aggregate References**  
- Goal does not own Plan by direct object reference; Plan stores GoalId.
- Goal may reference UserId as the owner boundary.
- Goal may reference policy or template identifiers, but not mutable foreign truth.

**Transaction Boundary**  
One transaction may create or update the Goal and its own embedded value objects. It may not directly create or mutate Plan, Activity, Capacity, or Adaptation records. 

**Concurrency Rules**  
- Use optimistic concurrency with version checking.
- Reject concurrent updates that modify the same goal version.
- Terminal transitions must be version-guarded.
- Reopening requires the latest committed version.

**Ownership Rules**  
- Owned by Goal Engine.
- Writable only by Goal Engine or Goal command handler.
- Readable by Planning, Adaptation, UI, analytics, and projections.

**Audit Requirements**  
- Audit every state transition.
- Retain who changed what and when.
- Preserve previous goal status and important field diffs.
- Never rewrite historical goal lifecycle events.

***

### 2) Plan Aggregate

**Purpose**  
Owns the committed structure that turns a Goal into executable behavior. Plan is the behavior contract between intent and activity. 

**Aggregate Root**  
Plan. 

**Entities**  
- PlanItem or ScheduleItem.
- PlanRule, if plan-level scheduling rules must be explicit.
- PlanCheckpoint, if milestone tracking is needed.

**Value Objects**  
- PlanName.
- PlanCadence.
- PlanStatus.
- PlanScope.
- PlanConstraint.
- PlanScheduleWindow.

**Commands**  
- CreatePlan.
- UpdatePlan.
- AdjustPlan.
- FreezePlan.
- ResumePlan.
- RetirePlan.
- RebasePlan, if a major rewrite is needed.

**Domain Events**  
- PlanCreated.
- PlanUpdated.
- PlanAdjusted.
- PlanFrozen.
- PlanResumed.
- PlanRetired.
- PlanRebased.

**Invariants**  
- Plan must belong to exactly one Goal.
- Plan must have exactly one authoritative GoalId.
- A frozen plan cannot accept ordinary structure edits.
- A retired plan cannot create new Activities.
- A PlanItem must belong to exactly one Plan.
- Plan changes must preserve scheduling consistency.
- Plan cannot directly own State or Capacity truth.
- Plan adjustments must remain traceable to triggering evidence or decision context.
- A plan must not be both frozen and retired.
- Plan structure must remain internally coherent after every command.

**State Transitions**  
Drafted → Active → Frozen → Active → Retired.  
Drafted → Active → Adjusted → Active.  
Drafted → Active → Retired.

**Cross-Aggregate References**  
- GoalId.
- Activity references PlanId, not the other way around for execution truth.
- Adaptation may reference PlanId as the target.

**Transaction Boundary**  
One transaction may mutate the plan and its embedded schedule/items only. Any change that affects Activities materially should be represented as a plan event followed by downstream activity re-evaluation, not as cross-aggregate atomic mutation. 

**Concurrency Rules**  
- Optimistic concurrency on Plan version.
- Reject concurrent edits to plan structure.
- Freeze/unfreeze transitions require the current version.
- Retire overrides all mutable states but must be version-checked.

**Ownership Rules**  
- Owned by Planning Engine.
- Writable only by Planning Engine.
- Readable by Activity, Capacity, Adaptation, UI, analytics, projections.

**Audit Requirements**  
- Track every structure change, freeze, resume, and retirement.
- Store actor, reason, and source command.
- Preserve old schedule definitions and adjustment history.

***

### 3) Activity Aggregate

**Purpose**  
Owns the smallest scheduled unit of behavior and its lifecycle. Activity is where planned behavior becomes a concrete scheduled obligation. 

**Aggregate Root**  
Activity. 

**Entities**  
- Execution.
- ActivityOccurrence, if recurrence expansion is needed.
- ActivityNote, if execution notes must remain attached to the activity boundary.

**Value Objects**  
- ActivityTitle.
- ActivityType.
- ActivitySchedule.
- ActivityStatus.
- ActivityWindow.
- ActivityPriority.
- ActivityTargetRef.

**Commands**  
- ScheduleActivity.
- RescheduleActivity.
- PostponeActivity.
- CancelActivity.
- StartExecution.
- CompleteExecution.
- MissExecution.
- SkipExecution.

**Domain Events**  
- ActivityScheduled.
- ActivityRescheduled.
- ActivityPostponed.
- ActivityCanceled.
- ExecutionStarted.
- ExecutionCompleted.
- ExecutionMissed.
- ExecutionSkipped.

**Invariants**  
- Activity must belong to exactly one Plan.
- Activity must have exactly one PlanId.
- Activity cannot exist without a parent Plan.
- Execution must belong to exactly one Activity.
- An activity can have only one active execution at a time.
- A completed activity cannot later become scheduled again without a new identity.
- A canceled activity cannot be completed.
- A missed activity remains historically immutable.
- Rescheduling must preserve lineage to the original scheduled instance.
- Activity status transitions must be valid and monotonic where required.
- Activity must not be directly written by State or Capacity engines.
- Activity outcome must reflect actual execution truth, not predictions.

**State Transitions**  
Scheduled → Due → Started → Completed.  
Scheduled → Due → Started → Missed.  
Scheduled → Due → Postponed → Scheduled.  
Scheduled → Canceled.  
Scheduled → Expired.  
Started → Skipped, if your domain distinguishes skipped after initiation.

**Cross-Aggregate References**  
- PlanId.
- GoalId only if needed for read convenience, but PlanId should be authoritative.
- Capacity and State may reference Activity outcomes, but Activity should not depend on them for authority.

**Transaction Boundary**  
One transaction may create, reschedule, postpone, cancel, or mark execution outcome for a single Activity and its embedded Execution record. It must not mutate Plan or Capacity in the same transaction. 

**Concurrency Rules**  
- Optimistic concurrency on Activity version.
- Prevent two simultaneous execution starts on the same activity.
- Prevent completion after cancellation.
- Prevent rescheduling after completion without a new activity identity.
- Use idempotency keys for mobile retries on start/complete actions.

**Ownership Rules**  
- Owned by Activity Engine.
- Writable only by Activity Engine.
- Readable by Planning, Capacity, Adaptation, State projections, UI, analytics.

**Audit Requirements**  
- Record every schedule, reschedule, postpone, cancel, start, complete, miss, and skip.
- Preserve timestamps for planned time and actual time.
- Keep original and current schedule values.
- Record actor and source device when relevant.

***

### 4) Capacity Aggregate

**Purpose**  
Owns feasibility estimation, confidence, overload risk, recovery need, and trend direction. Capacity is the decision-support boundary for realistic planning. 

**Aggregate Root**  
Capacity. 

**Entities**  
- CapacitySnapshot, if you store multiple per user or per time slice.
- CapacitySignalSummary, if raw evidence is summarized inside the aggregate.
- CapacityBandHistory, if the aggregate stores its own trend history.

**Value Objects**  
- CapacityScore.
- CapacityBand.
- CapacityConfidence.
- OverloadFlag.
- RecoveryNeed.
- TrendDirection.
- CapacityDimensionSet.

**Commands**  
- MeasureCapacity.
- UpdateCapacity.
- RecalculateCapacity.
- RefreshCapacityTrend.
- MarkOverloadRisk.
- ClearOverloadRisk.
- ReclassifyCapacityBand.

**Domain Events**  
- CapacityMeasured.
- CapacityUpdated.
- CapacityRecalculated.
- CapacityTrendRefreshed.
- OverloadRiskMarked.
- OverloadRiskCleared.
- CapacityBandChanged.

**Invariants**  
- Capacity must be computed from evidence, not arbitrary manual override.
- Capacity must carry confidence.
- Capacity must be time-bounded.
- Capacity must not directly rewrite Plan or State.
- Capacity changes must be explainable from evidence or model inputs.
- A capacity snapshot must not mix incompatible time horizons.
- Overload risk and recovery need cannot both be absent if the model indicates severe strain.
- Capacity must remain a generic cross-domain feasibility model.
- Capacity must not absorb planning semantics.
- Capacity may reference observations and execution outcomes, but those are not owned here.

**State Transitions**  
Measured → Updated → Trended.  
Measured → Recalculated → Updated.  
Updated → OverloadRiskMarked → Updated.  
Updated → OverloadRiskCleared → Updated.

**Cross-Aggregate References**  
- Observation IDs or observation batch references.
- Activity execution outcome references.
- Optional GoalId or PlanId for contextual scoring, not ownership.
- StateSnapshotId may be consumed as context, but not owned.

**Transaction Boundary**  
One transaction may update a capacity snapshot and its supporting values. It may not directly change Plan, Activity, Goal, or State. Capacity updates should emit events for downstream projections and adaptors. 

**Concurrency Rules**  
- Optimistic concurrency on Capacity version or snapshot sequence.
- Prevent overlapping writes for the same user/time window without deduplication.
- Recalculations from the same input set should be idempotent.
- Late-arriving observations should produce a new capacity version, not mutate historical evidence.

**Ownership Rules**  
- Owned by Capacity Engine.
- Writable only by Capacity Engine or capacity estimator pipeline.
- Readable by Planning, Adaptation, UI, projections, analytics.

**Audit Requirements**  
- Keep evidence trace for every meaningful capacity update.
- Store model version or rule version used for estimation.
- Record why a capacity band changed.
- Preserve historical capacity snapshots for trend analysis.

***

### 5) Adaptation Aggregate

**Purpose**  
Owns the auditable decision record for what should change next. Adaptation turns state and capacity evidence into a controlled plan-change decision. 

**Aggregate Root**  
Adaptation. 

**Entities**  
- Intervention, if persisted as a child artifact.
- AdaptationRationale.
- AdaptationTarget.
- AdaptationEvidenceLink.

**Value Objects**  
- AdaptationType.
- AdaptationStatus.
- TriggerContext.
- RationaleSummary.
- TargetScope.
- ConfidenceLevel.
- DecisionPolicyRef.

**Commands**  
- GenerateAdaptation.
- ProposeAdaptation.
- AcceptAdaptation.
- RejectAdaptation.
- ApplyAdaptation.
- RevertAdaptation.
- ExpireAdaptation.

**Domain Events**  
- AdaptationGenerated.
- AdaptationProposed.
- AdaptationAccepted.
- AdaptationRejected.
- AdaptationApplied.
- AdaptationReverted.
- AdaptationExpired.

**Invariants**  
- Adaptation must reference a triggering State snapshot.
- Adaptation should reference the capacity context that supported it.
- Adaptation must have at least one target.
- Adaptation cannot exist without evidence or rule-based rationale.
- Accepted adaptation must be traceable to the original proposal.
- Applied adaptation must be based on an accepted or auto-approved decision.
- A rejected adaptation cannot later be applied without a new decision record.
- Adaptation must not silently mutate Plan without an auditable record.
- Intervention creation must be governed by Adaptation.
- Adaptation cannot own behavior truth; it only changes it through controlled follow-through.

**State Transitions**  
Generated → Proposed → Accepted → Applied.  
Generated → Proposed → Rejected.  
Applied → Reverted.  
Generated → Expired.  
Proposed → Expired.

**Cross-Aggregate References**  
- StateSnapshotId.
- CapacitySnapshotId.
- Target PlanId or ActivityId.
- InterventionId, if persisted separately.
- Possibly GoalId, only as contextual reference.

**Transaction Boundary**  
One transaction may create or advance a single adaptation decision record. Applying an adaptation may enqueue downstream plan/activity changes, but the safest boundary is: record the adaptation atomically, then let the owner aggregates apply structural changes in their own transactions. 

**Concurrency Rules**  
- Optimistic concurrency on adaptation version.
- Prevent double-accept or double-apply.
- Only one active proposal per trigger context unless explicitly versioned.
- Revert requires the applied version to be current and not superseded.

**Ownership Rules**  
- Owned by Adaptation Engine.
- Writable only by Adaptation Engine.
- Readable by Planning, Activity, Capacity, UI, notifications, analytics, projections.

**Audit Requirements**  
- Store trigger evidence, rationale, target, and policy source.
- Keep proposal, acceptance, application, and reversal history.
- Record actor, channel, and automation rule if auto-applied.
- Never lose the source state/capacity reference.

***

## Boundary notes

- **State** remains a projection/read model and should not be treated as a write aggregate.
- **Event** remains append-only and is not a business aggregate.
- **Observation** should stay as ingestion/fact input, feeding projections and capacity/state models.
- **Execution** stays inside Activity as an entity, because the frozen model makes Activity the execution-level lifecycle owner.
- **Intervention** is best treated as a supporting artifact under Adaptation, not a root. 

## Minimal consistency model

Use this rule across all aggregates: **one aggregate, one transaction, one owner engine**. Cross-aggregate coordination must happen through events and follow-up commands, not by direct multi-aggregate mutation inside the same transaction. 

## Implementation readiness

This catalog is sufficient to move into ERD v1 because the mutable boundaries are now explicit, the derived models are excluded from root ownership, and the write responsibilities are isolated for a Laravel modular monolith. 

Below is a PostgreSQL-17-oriented review of Aggregate Catalog v1 for **10 million users** with event-sourced audit history. I’m treating this as a write-path sizing and loading guide for Laravel 12 / Python services, not a reporting-model design. 

## Overall load shape

The dominant write volume will come from Activity and Event history, while Goal, Plan, Capacity, and Adaptation stay comparatively small and infrequently mutated. The safest default is: load a single aggregate root plus its tight child entities in one transaction, and treat event history and projections as separate read paths. 

## Goal

| Dimension | Guidance |
|---|---|
| Expected maximum record count | Roughly 1 to 10 active Goals per user, with archived history accumulating over time; at 10 million users, expect tens of millions of Goal rows over the product life.  |
| Expected growth rate | Slow to moderate; growth tracks onboarding and long-term retention, not daily usage.  |
| Expected write frequency | Low; mostly create, update, status change, archive.  |
| Aggregate loading strategy | Load the full Goal aggregate, including embedded value objects and any small child entities, because it should be small.   |
| Entire aggregate in memory? | Yes.   |
| Potential performance bottlenecks | Hot-row contention if the same goal is edited by multiple clients; unnecessary joins to plans; bloated audit/event history if co-located with current state without partitioning.   |
| Candidate partitioning strategy | Partition audit/event history by created_at month; current Goal state usually does not need partitioning unless per-tenant sharding is introduced later.  |

## Plan

| Dimension | Guidance |
|---|---|
| Expected maximum record count | Usually a few active Plans per Goal; across 10 million users, expect a large but manageable corpus, likely in the tens of millions across time.  |
| Expected growth rate | Moderate; plans are revised less often than activities, but more often than goals.  |
| Expected write frequency | Low to moderate; create, adjust, freeze, retire.  |
| Aggregate loading strategy | Load the full Plan aggregate if the plan structure is modest; if a plan has many schedule items, load only plan headers plus the necessary child items for the command.   |
| Entire aggregate in memory? | Usually yes for MVP-sized plans; no if a single plan can contain many hundreds of child schedule items.   |
| Potential performance bottlenecks | Large plan graphs, expensive revalidation on every adjust, and contention when adaptation rewrites the same plan repeatedly.   |
| Candidate partitioning strategy | Partition audit/event history by month; keep active plan rows unpartitioned unless plan-item cardinality becomes large.  |

## Activity

| Dimension | Guidance |
|---|---|
| Expected maximum record count | Highest by far; this is the main operational table family. With 10 million users, even a conservative average of 1 activity/day/user yields billions of rows over time, and event history multiplies that further.  |
| Expected growth rate | Very high; this is the primary daily-write aggregate.  |
| Expected write frequency | High; schedule, postpone, start, complete, miss, skip are all common.  |
| Aggregate loading strategy | Load only the single Activity aggregate touched by the command, plus its execution entity; do not bulk-load a day’s activities into the aggregate.   |
| Entire aggregate in memory? | Yes for one activity at a time; no for collections of activities.   |
| Potential performance bottlenecks | Heavy index churn, uniqueness checks on scheduled times, hot-row contention on “today’s” activities, and large append-only event volume.  |
| Candidate partitioning strategy | Strong candidate for partitioning by scheduled_date or activity_date month; separate audit/event partitions by append time; use local indexes per partition.  |

## Capacity

| Dimension | Guidance |
|---|---|
| Expected maximum record count | Much smaller than Activity; likely one current snapshot per user plus history, so tens of millions of snapshots over time, not billions.  |
| Expected growth rate | Moderate; grows with observations, executions, and recalculation cadence.  |
| Expected write frequency | Moderate; recalculated on evidence arrival, daily summaries, or threshold changes.  |
| Aggregate loading strategy | Load the latest capacity snapshot plus the minimal history needed for the recalculation command. Do not load all historical snapshots for ordinary reads.   |
| Entire aggregate in memory? | Yes for one user’s latest snapshot and immediate inputs; no for long history.   |
| Potential performance bottlenecks | Recompute storms from repeated observations, cross-source deduplication, and stale updates landing out of order.  |
| Candidate partitioning strategy | Partition historical capacity snapshots by period; keep current snapshot in a hot table or hot partition.  |

## Adaptation

| Dimension | Guidance |
|---|---|
| Expected maximum record count | Smaller than Activity, larger than Goal; driven by decisions and retries, likely tens to hundreds of millions over long retention if every proposed change is kept.  |
| Expected growth rate | Moderate; increases when the system is active in coaching and plan correction.  |
| Expected write frequency | Low to moderate; triggered by state shifts, capacity changes, or repeated misses.  |
| Aggregate loading strategy | Load the full adaptation decision record for a single trigger context; if interventions are large, treat them as child artifacts but still within the same aggregate boundary.   |
| Entire aggregate in memory? | Yes.   |
| Potential performance bottlenecks | Duplicate proposals for the same trigger context, repeated apply/revert churn, and expensive evidence lookups if rationale is not denormalized.  |
| Candidate partitioning strategy | Partition by decision_created_at month; optionally by user_id hash if the table becomes write-hot.  |

## Storage strategy

For PostgreSQL 17, the best default is to keep each aggregate’s current state in its own table family and separate the event-sourced audit stream into append-only partitions by time. Activity and Event are the first places where partitioning pays off, because they will dominate both row count and index maintenance. 

For Laravel 12, the aggregate root repository should load a single root plus owned child entities in one unit of work, with optimistic locking on the root version. For Python services, use the same boundary and avoid any batch-loading pattern that turns a write command into a reporting query. 

## Practical rules

- Load the whole aggregate when the aggregate is naturally small and command validation depends on its full state. 
- Load only the minimum child set needed when the root can contain many scheduled items, especially for Plan and Activity-related reads. 
- Never join across aggregates inside a write transaction just to “verify” another aggregate’s truth; use references and domain events instead. 
- Keep event history append-only and partitioned early, because audit growth will outpace current-state growth. 

## Recommended partitioning priority

1. Activity current and event history.  
2. Event append-only stream.  
3. Capacity historical snapshots.  
4. Adaptation decision history.  
5. Goal and Plan only if their audit history grows faster than expected. 

The main architectural pressure point is Activity, so design that aggregate and its partitions first. Goal and Plan can stay simple and fully in-memory per aggregate, while Capacity and Adaptation should remain compact decision/snapshot records with historical partitioning behind them. 