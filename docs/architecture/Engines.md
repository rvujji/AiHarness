## Revised position

The earlier engine set was directionally right, but for implementation the better shape is **5 real modules inside a modular monolith**, not 8 separately expressed bounded contexts or services. This aligns better with the BRD’s Phase 1 scope, which emphasizes authentication, onboarding, initial Goal and Plan creation, the Universal Activity Engine, reminders, basic analytics, lightweight AI, and system event logging rather than a large distributed architecture. 

The most important correction is to elevate **Behavioral Intelligence** into its own first-class module because the BRD explicitly defines it as a separate layer responsible for adherence patterns, lapse-prone users, burnout risk, overcommitment, restarting behavior, friction detection, and optimization of plans for practical adherence. 

## MVP module set

For implementation, the recommended MVP architecture is:

1. **User Engine**
2. **Planning Engine**
3. **Execution Engine**
4. **Behavioral Intelligence Engine**
5. **Platform Engine**
6. **Coaching Engine** as a separate module if AI is shipping in MVP, which the BRD says it is through lightweight prompts and summaries. 

That means the practical answer is really **5 core product modules plus Coaching**, or **6 modules total** if AI is in the first release as specified in Phase 1. If the team wants the strictest possible cut, Coaching can be treated as a thin layer over Behavioral Intelligence plus Platform AI integrations, but because the BRD explicitly includes a lightweight AI coach in Phase 1, it is cleaner to keep Coaching visible as its own module. 

## Recommended structure

### 1. User Engine

**Purpose:** Own identity, profile, preferences, onboarding state, and consent, providing the user context required by every other module. 

**Responsibilities**
- Authentication and account lifecycle. 
- User profile and onboarding data capture. 
- Preference management, including timing, tone, and reminders. 
- Consent and policy acknowledgment handling. 

**Inputs**
- Sign-up/sign-in requests.
- Onboarding answers.
- Preference updates.
- Consent changes.

**Outputs**
- User profile.
- Onboarding state.
- Preferences.
- Consent state.

**Core entities**
- User
- UserProfile
- UserPreference
- ConsentRecord
- NotificationPreference

**APIs/interfaces**
- `POST /auth/signup`
- `POST /auth/login`
- `GET /me`
- `PUT /me/profile`
- `PUT /me/preferences`
- `PUT /me/consents`

**Events produced**
- `user.created`
- `user.onboarding_completed`
- `user.preferences_updated`
- `user.consent_updated`

**Events consumed**
- `admin.policy_updated`

**Dependencies**
- Platform Engine

**MVP scope**
- Full Phase 1 identity, onboarding, and profile needs. 

**Future extensibility**
- Coach/client roles.
- Health-data permissions.
- Region-specific policy handling.

***

### 2. Planning Engine

**Purpose:** Own the full planning hierarchy of Goal → Plan → Activity, because in MVP these concepts belong together operationally and should not yet be split into separate bounded contexts. 

**Responsibilities**
- Goal creation and management. 
- Plan creation and versioning. 
- Activity creation, scheduling, recurrence, and linkage to plans and goals. 
- Template-based plan generation for workouts, habits, hydration, sleep, and future domains. 

**Inputs**
- User goals.
- Selected templates.
- Time preferences.
- Manual plan edits.
- Future adaptation proposals.

**Outputs**
- Goals.
- Plans.
- Activities.
- Today/weekly planned schedules.

**Core entities**
- Goal
- Plan
- Activity
- Schedule
- PlanTemplate
- ActivityType

**APIs/interfaces**
- `POST /goals`
- `GET /goals`
- `POST /plans`
- `PUT /plans/{id}`
- `POST /plans/{id}/activities`
- `GET /plans/{id}`
- `GET /activities?date=YYYY-MM-DD`

**Events produced**
- `goal.created`
- `plan.created`
- `plan.updated`
- `activity.created`
- `activity.scheduled`

**Events consumed**
- `user.onboarding_completed`
- `behavior.adaptation_suggested`
- `coach.plan_change_requested`

**Dependencies**
- User Engine
- Platform Engine

**MVP scope**
- Initial Goal and Plan creation.
- Fixed workout templates.
- Simple weekly scheduling.
- Basic recurring activities for habits, hydration, and sleep. 

**Future extensibility**
- Nutrition, learning, productivity, coaching programs, rehab plans.
- Multi-goal planning and cross-domain planning.

***

### 3. Execution Engine

**Purpose:** Own what actually happened after a plan was created, including activity completion, skips, postponements, adherence, streaks, and the derived daily execution summary. 

**Responsibilities**
- Completion, skip, postpone, and reschedule handling. 
- Activity log capture. 
- Adherence and streak calculations. 
- Daily execution aggregates and plan-progress rollups. 
- Initial Daily State derivation in MVP, because Daily State is an aggregate of execution and available recovery signals. 

**Inputs**
- Activity actions from users.
- Planned activities from Planning.
- Optional notes, perceived effort, and basic sleep/hydration/manual recovery signals. 

**Outputs**
- Activity logs.
- Adherence metrics.
- Streaks.
- Goal/plan execution summaries.
- Daily State snapshot for the day.

**Core entities**
- ActivityLog
- ExecutionStatus
- AdherenceMetric
- Streak
- DailyState
- DailySuccessScore

**APIs/interfaces**
- `POST /activities/{id}/complete`
- `POST /activities/{id}/skip`
- `POST /activities/{id}/postpone`
- `POST /activities/{id}/reschedule`
- `GET /execution/today`
- `GET /metrics/adherence`
- `GET /metrics/streaks`
- `GET /daily-state`

**Events produced**
- `activity.completed`
- `activity.skipped`
- `activity.postponed`
- `activity.rescheduled`
- `execution.adherence_updated`
- `execution.streak_updated`
- `execution.daily_state_updated`

**Events consumed**
- `activity.scheduled`
- `plan.updated`

**Dependencies**
- Planning Engine
- Platform Engine

**MVP scope**
- Workout completion tracking.
- Basic habit tracking.
- Hydration and sleep execution tracking.
- Simple adherence, streaks, and daily state computation. 

**Future extensibility**
- Richer outcome metrics.
- Partial completion quality scores.
- Cross-domain recovery metrics.
- Separation of Daily State into its own module later, if justified.

***

### 4. Behavioral Intelligence Engine

**Purpose:** Produce durable, reusable behavioral facts and pattern classifications from execution history, instead of mixing those responsibilities into AI prompting logic. 

**Responsibilities**
- Detect adherence patterns across time. 
- Classify behavioral states such as Consistent, Restarting, Overcommitted, Irregular, Lapse-prone, Highly Motivated, and Burnout Risk. 
- Identify friction patterns such as repeated misses by day/time, repeated postponements, skip reasons, and conflict density. 
- Generate adaptation candidates focused on practical adherence. 
- Map interventions to behavior-change techniques over time, as the BRD anticipates. 

**Inputs**
- Activity logs.
- Adherence trends.
- Daily State history.
- User preferences.
- Qualitative notes and obstacles where available.
- Plan structure and schedule density.

**Outputs**
- Behavioral classifications.
- Pattern facts.
- Risk flags.
- Adaptation suggestions.
- Notification timing hints.
- Coaching facts for AI context.

**Core entities**
- BehavioralPattern
- BehavioralClassification
- RiskFlag
- AdaptationSuggestion
- FrictionSignal
- TechniqueTag

**APIs/interfaces**
- `GET /behavior/profile`
- `GET /behavior/patterns`
- `POST /behavior/recompute`
- `GET /behavior/adaptations`

**Events produced**
- `behavior.pattern_detected`
- `behavior.classification_updated`
- `behavior.risk_flagged`
- `behavior.adaptation_suggested`

**Events consumed**
- `activity.completed`
- `activity.skipped`
- `activity.postponed`
- `execution.daily_state_updated`
- `plan.updated`

**Dependencies**
- Execution Engine
- Planning Engine
- Platform Engine

**MVP scope**
- Rules-based detection only.
- Simple pattern outputs such as missed workout windows, lapse risk, restarting, overcommitment, and streak risk. 

**Future extensibility**
- Human Capacity model.
- Predictive adherence scoring.
- Intervention effectiveness learning.
- Cross-domain behavior optimization.

This is the key architectural addition because the BRD clearly distinguishes behavioral pattern detection from AI response generation, and it intends Behavioral Intelligence to feed the AI Coach, Notification Engine, Personalization Engine, and Plan Adaptation Engine rather than be replaced by them. 

***

### 5. Coaching Engine

**Purpose:** Turn structured facts from Planning, Execution, and Behavioral Intelligence into safe, actionable coaching outputs without embedding business truth inside the LLM. 

**Responsibilities**
- AI context assembly. 
- AI prompt orchestration for summaries and prompts. 
- Suggestion generation based on behavioral facts and Daily State. 
- Safety enforcement and escalation handling. 
- Presentation of Today’s AI Summary, which the BRD makes central to the home screen. 

**Inputs**
- Goals.
- Active plans.
- Today’s planned activities.
- Adherence and streak metrics.
- Daily State.
- Behavioral classifications.
- Preferences and prior AI interactions. 

**Outputs**
- AI Summary.
- Coaching prompts.
- Suggested plan changes.
- Safe escalation responses.

**Core entities**
- AIInteraction
- CoachContext
- CoachSuggestion
- SafetyDecision
- SummaryCard

**APIs/interfaces**
- `POST /coach/summary`
- `POST /coach/message`
- `POST /coach/suggestion`
- `POST /coach/feedback`

**Events produced**
- `coach.summary_generated`
- `coach.suggestion_generated`
- `coach.feedback_received`
- `coach.safety_escalation_triggered`

**Events consumed**
- `execution.daily_state_updated`
- `behavior.classification_updated`
- `behavior.pattern_detected`
- `user.preferences_updated`

**Dependencies**
- User Engine
- Planning Engine
- Execution Engine
- Behavioral Intelligence Engine
- Platform Engine

**MVP scope**
- Lightweight prompts and summary cards only, as stated in Phase 1. 

**Future extensibility**
- Full conversational AI coach.
- Plan auto-drafts.
- Behavior-change technique selection.
- Coach handoff workflows.

***

### 6. Platform Engine

**Purpose:** Provide the shared operational infrastructure needed by all modules: notifications, event storage, analytics, admin config, and system-level controls. 

**Responsibilities**
- Notification scheduling and delivery rules. 
- Frequency caps, suppression, and snoozing. 
- System Event logging. 
- User-facing and admin-facing analytics pipelines. 
- Admin template/config/flag management. 

**Inputs**
- Internal domain events.
- Admin updates.
- Notification requests.
- Delivery receipts.

**Outputs**
- Notifications.
- Event log.
- Analytics views.
- Config snapshots.

**Core entities**
- Reminder
- NotificationPolicy
- SystemEvent
- AnalyticsView
- FeatureFlag
- TemplateConfig
- PromptPolicy

**APIs/interfaces**
- `POST /notifications/schedule`
- `POST /notifications/snooze`
- `POST /events`
- `GET /analytics/me`
- `GET /admin/analytics`
- `PUT /admin/config/*`

**Events produced**
- `notification.sent`
- `notification.suppressed`
- `notification.snoozed`
- `admin.config_updated`

**Events consumed**
- `activity.scheduled`
- `activity.completed`
- `execution.daily_state_updated`
- `behavior.risk_flagged`
- `coach.suggestion_generated`

**Dependencies**
- Cross-cutting infrastructure only.

**MVP scope**
- Reminder engine with fatigue controls.
- Basic analytics.
- Admin console needs called out in Phase 1.
- System Event logging for major actions. 

**Future extensibility**
- Experimentation.
- Subscription entitlements.
- External integrations.
- Data exports and compliance tooling.

## What changed from the previous version

The modified architecture makes four major changes. 

- **Goal/Plan and Activity were merged** into a single Planning Engine, because the BRD’s MVP is still operating at a single planning lifecycle and does not yet justify splitting activity scheduling into its own bounded context. 
- **Tracking/Adherence and Daily State were merged** into Execution Engine for MVP, because Daily State is derived from execution outcomes plus available recovery signals rather than requiring an independent service at this stage. 
- **Behavioral Intelligence was promoted** to a first-class module, because the BRD explicitly defines it as a reusable pattern-detection and classification layer consumed by AI, notifications, personalization, and adaptation. 
- **Notification, analytics, admin config, and eventing were collapsed** into Platform Engine, because these are cross-cutting operational concerns and do not need separate services in an MVP modular monolith. 

## Architecture style

The recommended implementation style is a **modular monolith**, not microservices. The BRD’s MVP is early-phase, and the product risk is behavior/adherence validation rather than service-scale distribution, so a single Laravel backend, single PostgreSQL database, single deployment, and internal domain events is the right trade-off for speed, correctness, and future refactoring optionality. 

A practical structure would look like this: 

```text
app/
 ├── users/
 ├── planning/
 ├── execution/
 ├── behavior/
 ├── coaching/
 └── platform/
```

This still preserves future separability because the module boundaries are explicit, events are internalized, and the domain model remains aligned to the BRD’s extensibility principle that all future domains map to Goal → Plan → Activity → State → Adaptation. 

## Final recommendation

The version to carry forward into implementation is:

- **User Engine**
- **Planning Engine**
- **Execution Engine**
- **Behavioral Intelligence Engine**
- **Coaching Engine**
- **Platform Engine** 

If an even tighter MVP cut is required, Coaching can be implemented as a thin application layer over Behavioral Intelligence plus Platform AI utilities, but Behavioral Intelligence should **not** be collapsed into Coaching because the BRD treats behavioral facts and AI responses as distinct concerns. 

This revised module set is smaller, more shippable, and more faithful to the BRD’s real differentiation: not generic wellness content, but **Adherence Intelligence** built first around Exercise Consistency Coach and later expanded into a broader Human Behavior Platform. 
