# Behavioral Wellness Platform – Business Requirements Document (Final Draft v3)

## 1. Overview

This document defines the business requirements for a mobile-first behavioral wellness platform that combines fitness, habit-building, quit-habit support, diet guidance, life scheduling, and AI coaching into a unified experience for individual users, with future expansion to professional coaches. The platform will be delivered as Android and iOS applications and is designed as a modular, extensible system rather than a collection of isolated features.

Primary users are individuals (irregular and regular exercisers) who want to exercise at home or at the gym, improve daily habits, reduce harmful behaviors such as smoking or alcohol overuse, and organize non-work life routines. A later product phase may introduce professional coaches as a separate role, but Phase 1 explicitly targets individual consumers only.

The product will follow a freemium model with a generous free tier that covers core wellness value, while a premium tier monetizes advanced intelligence, analytics, and depth of personalization. The system handles health-related data but is positioned as a wellness and self-improvement app, not a medical diagnostic or treatment tool, and must comply with platform guidance for health apps including data privacy, safety, and clear non‑medical positioning.

### 1.1 Primary UX concept (home screen)

The primary home screen shall be **Today’s Plan with AI Summary**:

- The top section shows **Today’s Plan** – the user’s scheduled Activities for the current day across workouts, habits, hydration, meals, sleep, quit actions, and key tasks.
- A secondary section shows a concise **AI Summary**, highlighting important insights, risks (e.g., streak at risk), and one or two suggested adjustments.

This aligns with the core architecture that revolves around Activities and adherence and ensures the entire product supports execution of today’s plan while keeping AI coaching highly visible but not overwhelming.

## 2. Product vision and goals

The vision is to create a **personal wellness operating system** that users rely on daily to plan, execute, and adapt their non-work life routines, including exercise, habits, diet, sleep, hydration, medications/supplements, and quit-habit journeys. Rather than focusing on content volume, the product focuses on adherence and behavior change through personalized plans, reminders, feedback, and an AI life coach that uses behavioral data to help users adjust routines.

Key business goals:

- Help irregular and regular users become more consistent with exercise and wellness routines.
- Improve adherence to planned routines across domains (workouts, habits, diet, sleep, quit habits).
- Build a daily-use companion that becomes the default hub for wellness-related tasks.
- Grow a large free user base and convert high-intent segments into paying users.
- Establish a modular platform that supports new wellness domains (e.g., coaching, advanced analytics) without major rework.

Success will be measured primarily through behavioral metrics such as workout completion rates, habit adherence, quit-habit streak stability, and routine consistency over time, supplemented by retention and monetization KPIs.

## 3. Users and roles

### 3.1 Primary roles

- **Individual user (Phase 1–4)**: Consumer seeking help with exercise, habits, diet, sleep, hydration, medications/supplements, stress/mood, and quitting harmful habits.
- **Administrator (internal)**: Internal staff responsible for managing templates, AI safety rules, premium configurations, and operational analytics.

### 3.2 Future roles (post–Phase 4)

- **Professional coach**: Wellness or fitness professional who can view client data, assign programs, and communicate through the platform. Coach workflows are explicitly out of scope for Phase 1–3 and scoped into Phase 4+.

## 4. Core platform architecture

### 4.1 Architecture principles

- The platform shall be designed around a **unified behavioral wellness model** rather than independent feature silos, to support multiple domains (exercise, habits, diet, sleep, quit habits, etc.) on shared primitives.
- The system shall treat workouts, habits, hydration, sleep, medications/supplements, meals, and other routines as specialized forms of **scheduled activities**.
- The architecture shall prioritize **extensibility** so future domains can reuse scheduling, reminders, tracking, analytics, personalization, and AI coaching components without major redesign.
- The platform shall maintain a clear separation between:
  - User **goals** (what the user wants to achieve).
  - Planned **plans and activities** (what the system proposes).
  - Activity **execution** (what was actually done).
  - Activity **outcomes** and metrics.
  - **States** that summarize how the user is doing.
  - **AI guidance and adaptations** (interpretation, coaching, structural changes).

### 4.2 Universal Activity Engine

#### Purpose

The system shall provide a **Universal Activity Engine** that acts as the foundational layer for all scheduled wellness actions.

Examples of activities:

- Workouts.
- Habit executions.
- Hydration reminders.
- Sleep routines.
- Meal events.
- Medication or supplement reminders.
- Mood or stress check-ins.
- Future wellness activities.

#### Functional requirements

The Universal Activity Engine shall support:

- Activity creation (with type, metadata, and links to Goals and Plans).
- Activity scheduling (one-time, recurring, or program-based).
- Recurrence rules (daily, weekly, specific weekdays, habit frequency, etc.).
- Reminder generation for upcoming activities.
- Completion logging (including completion time and qualitative notes where applicable).
- Skip logging (including reasons where provided).
- Postponement logging and rescheduling.
- Streak calculations for streakable activity types.
- Adherence calculations (planned vs. completed).

Specialized modules (Exercise Management, Habit Tracking, Diet Scheduling, Quit Programs, etc.) shall extend the Universal Activity Engine with domain-specific logic while delegating generic mechanics (schedule, reminders, logging, adherence) to the shared engine.

All activity types must participate in:

- Calendar views.
- Daily and weekly Plans.
- Notification scheduling.
- Analytics and reporting.
- AI recommendations and coaching context.

…without duplicate implementations of these concerns across modules.

### 4.3 Behavioral Intelligence Layer

#### Purpose

The platform shall include a **Behavioral Intelligence Layer** that identifies patterns affecting adherence and long-term behavior change rather than only recording completions.

#### Functional requirements

The Behavioral Intelligence Layer shall track:

- Completion patterns across activity types and time.
- Missed activity patterns (e.g., repeated misses at particular times or days).
- Time-of-day success rates (morning vs. evening adherence).
- Streak interruptions and recovery behavior.
- Repeated postponements and procrastination patterns.
- Schedule conflicts (overlapping or unrealistic plans).
- Habit friction indicators (e.g., frequent skips with common reasons).
- User-reported obstacles from qualitative inputs.

The system shall classify behavioral situations such as:

- **Consistent**.
- **Restarting** (after a long gap).
- **Overcommitted** (too many activities vs. capacity).
- **Irregular**.
- **Highly motivated**.
- **Lapse-prone**.
- **Burnout risk**.

These classifications shall be used by:

- The AI Coach.
- The Personalization Engine.
- The Notification Engine.
- The Plan Adaptation Engine.

The system shall continuously optimize Plans for **practical adherence** over theoretical perfection, e.g., by suggesting shorter sessions, fewer habits, more realistic times, or gradual ramp-up when the user struggles.

#### Behavioral Techniques Model
The platform shall maintain a catalog of behavior-change techniques (BCTs) that can be applied to Activities, Plans, and Habits. Examples include:
Habit stacking (attach new behavior to an existing routine).
Implementation intentions (“If situation X, then I will do Y”).
Temptation bundling (pairing a difficult task with a rewarding one).
Environmental cues (placing cues or removing frictions in the environment).
Accountability mechanisms (check‑ins, self-reports).
Commitment contracts (user agreements with self-imposed consequences or rewards)

Each intervention chosen by the Plan Adaptation Engine or AI Coach should, where possible, map to one or more BCTs in this catalog. The System Event log shall record which techniques were applied so effectiveness can be analyzed over time.
Then connect it to your engines:
AI Coach: Chooses suggestions not just arbitrarily, but as specific BCTs (e.g., propose an implementation intention instead of generic “try harder”).
Plan Adaptation Engine: When simplifying habits or changing schedules, selects a technique type (e.g., habit stacking + environmental cue).
Behavioral Intelligence & Analytics: Over time, you can measure which techniques improve adherence for which user patterns.

### 4.4 AI Coach architecture

#### AI coach context model

The AI Coach shall use multiple categories of context when generating responses:

- User Goals.
- Active Plans and their progress.
- Recent workouts and Activity logs.
- Habit completion and streak history.
- Sleep consistency and timing.
- Hydration and meal adherence.
- Quit-habit progress, lapses, and craving data.
- Daily State classification.
- Behavioral classifications from the Behavioral Intelligence Layer.
- Recent AI interactions and user feedback.

The AI Coach shall prioritize **actionable guidance** (next steps, specific adjustments, small experiments) over generic motivational content.

#### AI memory

The AI Coach shall maintain a lightweight, structured memory per user containing:

- Active Goals and target timelines.
- Key Plans in progress.
- Recently failed Activities and patterns of failure.
- Recent successes and streaks.
- Current Daily State and behavioral classification (e.g., Restarting, Overcommitted).
- User preferences (tone, reminders, timing constraints).
- Motivation style (e.g., gentle encouragement vs. direct coaching) inferred from interactions.

The memory model shall support continuity across coaching interactions while remaining auditable and resettable as needed.

#### AI safety and decision rights

The AI Coach shall **never**:

- Provide medical diagnosis or claim to treat medical conditions.
- Replace professional treatment or claim equivalence to clinicians.
- Encourage unsafe exercise behavior or activity beyond reasonable guidelines.
- Encourage substance use, self-harm, or risky challenges.
- Present itself as crisis counseling or emergency support.

When high-risk language is detected (e.g., self-harm ideation, severe distress, dangerous substance use), the AI must:

- Stop coaching on that topic.
- Display clear guidance to seek immediate professional or emergency assistance, tailored to the user’s region where feasible.
- Log the event in an internal safety log for policy review (without exposing sensitive content beyond what is legally permitted).

The system shall differentiate **suggestions**, **auto-drafts**, and **auto-actions**:

- Suggestions: AI proposes changes; user explicitly confirms.
- Auto-drafts: AI prepares but does not apply changes until user reviews.
- Auto-actions: AI may make small, low-risk adjustments (e.g., shifting a reminder by 15 minutes based on explicit preferences) under clear, revocable user consent.

By default, plan changes shall be suggestions or auto-drafts; auto-actions require explicit, revocable user opt-in.

### 4.5 Personalization Engine

#### Purpose

The **Personalization Engine** is a platform service responsible for converting data about the user (Goals, behavior, preferences) into concrete configuration decisions: which Activities and Plans to propose, how often, when to remind, and how the AI should communicate.

#### Inputs

- Goals and target timelines.
- Plans and their current progress.
- Activity logs (completions, skips, postponements).
- Adherence metrics and streaks.
- Behavioral classifications from the Behavioral Intelligence Layer.
- Daily State and Human Capacity estimates.
- User preferences (schedule, content, tone).
- Environmental constraints where available (e.g., weekday/weekend patterns).

#### Outputs

- Workout recommendations (which program or session to propose).
- Habit recommendations (which habits to suggest, which to pause or simplify).
- Reminder timing (preferred windows, intensity, and spacing).
- AI tone and coaching style (e.g., softer vs. more direct messaging).
- Schedule adjustments (e.g., shifting morning habits to evening when appropriate).

The Personalization Engine shall not directly update user data without consent; it proposes changes via Plans, suggestions, and configuration options for users to accept.

### 4.6 Daily State Model

#### Purpose

The **Daily State Model** defines how the system summarizes a user’s current behavioral condition for a given day from underlying metrics like completion, adherence, streaks, Plan execution, recovery indicators, and historical trends. This Daily State is the primary input for AI Coach, Personalization Engine, Notification Engine, and Plan Adaptation Engine decisions.

#### Inputs

- Today’s planned vs. completed Activities (critical vs. optional).
- Adherence relative to recent baseline (e.g., last 7–14 days).
- Movement of streaks (maintained, improved, broken).
- Recovery signals (sleep consistency, rest days, mood/stress, overtraining signals where available).
- Recent Plan changes (increased/decreased load).
- Behavioral classifications (Consistent, Overcommitted, etc.).

#### States

The system shall classify the user into one Daily State per day, using configurable rules and thresholds:

- **Winning**: High adherence to critical Activities, streaks maintained or improved, no strong overload indicators.
- **Stable**: Reasonable adherence with minor misses, streaks mostly maintained, neutral recovery indicators.
- **Recovering**: Previously low adherence but recent days show improvement, rest/recovery actions being followed.
- **Struggling**: Repeated misses of critical Activities, streaks frequently broken, Plans often not executed.
- **Burnout Risk**: High execution volume combined with signs of fatigue or negative mood (e.g., repeated completion but dropping mood, poor sleep) or frequent comments about exhaustion.
- **Restarting**: Returning after a significant gap in usage or execution; adherence data is sparse but intent is renewed.

The rules for assigning states shall be transparent and tunable and may use weighted scores from adherence, recovery, and load metrics.

#### Consumers of Daily State

- **AI Coach**: Uses Daily State to choose focus, tone, and scope of suggestions (e.g., in Burnout Risk the coach emphasizes recovery and simplification; in Winning it emphasizes progression and celebration).
- **Personalization Engine**: Uses Daily State as a key feature when generating or adjusting recommendations, especially for scaling difficulty up (Winning/Stable) or down (Struggling/Burnout Risk/Restarting).
- **Notification Engine**: Modulates frequency and urgency of notifications based on state (e.g., fewer nudges in Burnout Risk, targeted encouragement in Recovering, celebration messages in Winning).
- **Plan Adaptation Engine**: Uses state transitions (e.g., Stable → Struggling, Stable → Burnout Risk) as triggers to modify Plans.

#### Daily Success Score
The system shall compute a Daily Success Score in the range 0–100 for each user-day. The score is a weighted composite of:
Critical activity completion (completion rate of “must‑do” activities vs. optional ones).
Overall adherence (percentage of planned Activities completed, weighted by importance).
Recovery adherence (whether planned rest/sleep/recovery actions were followed).
Capacity usage
(how much of estimated Human Capacity was used without exceeding safe thresholds).The weights and thresholds shall be configurable and tuned over time.

#### Daily State from score
Daily State shall be derived from the Daily Success Score and key risk flags:
Winning: score ≥ X and no burnout flags.
Stable: score in Y, X with no strong negative indicator
Recovering: score improving vs recent average and recovery actions followed.
Struggling: score below Y and repeated misses of critical Activities.
Burnout Risk: score may be high, but overload and fatigue flags active.
Restarting: special state when user returns after a long gap; initial scores are de‑emphasized.
Thresholds and conditions shall be configurable.

### 4.7 Human Capacity Model

#### Purpose

The **Human Capacity Model** estimates how much structured behavior change a user can realistically sustain across physical, mental, schedule, and habit dimensions. Plans generated by the system shall be constrained by this estimated capacity rather than by purely theoretical goals.

#### Capacity dimensions

- **Physical capacity**: Ability to perform physical Activities (e.g., workouts, walking) without excessive fatigue or injury risk.
- **Mental capacity**: Cognitive and emotional bandwidth for planning, focus-demanding tasks, and complexity of routines.
- **Schedule capacity**: Actual time windows available within the user’s calendar, including work, family, commute, and sleep.
- **Habit capacity**: Number and difficulty of habits the user can realistically adopt and maintain simultaneously.

#### Inputs

- Historical adherence and drop-off patterns.
- Current and recent Activity load (frequency, intensity, duration).
- Recovery indicators (sleep patterns, rest days, mood/stress signals).
- Schedule availability and conflict density.
- Behavioral classifications (Overcommitted, Burnout Risk, etc.).

#### Outputs and constraints

- Estimated safe ranges for:
  - Weekly workout sessions and intensity.
  - Number of active habits.
  - Maximum daily structured Activity duration.
- Capacity-aware guardrails for Plan creation and adaptation (e.g., do not add more than one new demanding habit when Habit capacity is low).

The objective is to **maximize sustainable adherence**, not maximize planned Activity volume. When Goals suggest aggressive Plans that exceed estimated capacity, the system shall propose phased or scaled-down alternatives instead of blindly scheduling everything.

### 4.8 Plan Adaptation Engine

#### Purpose

The **Plan Adaptation Engine** is responsible for modifying Plans when adherence falls below thresholds, Daily State changes negatively, or capacity estimates shift. Its objective is to keep users in execution mode rather than abandonment mode.

#### Triggers

- Adherence dropping below defined thresholds for a Plan or domain.
- Daily State transitions such as Stable → Struggling, Stable → Burnout Risk, or Winning → Struggling.
- Human Capacity estimates decreasing (e.g., due to schedule compression or burnout indicators).
- Repeated postponement or skip patterns on specific Activities.

#### Adaptation strategies

When triggered, the engine may:

- **Reduce complexity**: Simplify Plans by reducing the number of concurrent habits or steps.
- **Adjust timing**: Move Activities to time windows where adherence has historically been higher.
- **Reduce Activity volume**: Shorten workouts, lower frequency, or make Activities less demanding.
- **Simplify habits**: Break habits into smaller, easier-to-complete versions.
- **Increase recovery periods**: Add rest days or insert recovery-focused Activities (e.g., stretching, light walks, earlier sleep).
- **Progressively reintroduce**: Once adherence and Daily State improve, gradually reintroduce removed Activities or increase difficulty.

#### Governance

- Adaptation rules shall be configurable and auditable.
- Significant adaptations (e.g., halving a Plan’s intensity) should be surfaced to the user with clear rationale and the option to accept or modify.
- Minor micro-adjustments (e.g., shifting a reminder by 15 minutes) may be handled as opt-in auto-actions according to the Decision Rights model.

#### Intervention Ladder
The Plan Adaptation Engine shall apply changes in a controlled hierarchy to avoid unnecessary disruption:
Reminder-level interventions – Adjust reminder timing, tone, and frequency.
Schedule-level interventions – Shift Activities to historically successful time windows.
Habit-level simplification – Make Habits smaller or break them into easier steps.
Plan-level reduction – Reduce total volume or frequency of Activities in the Plan.
Recovery mode – Temporarily prioritize recovery-focused Activities and rest.
Restart mode – When returning from long gaps, re-launch with a simplified, re‑onboarding Plan.
The engine shall attempt lower-level interventions first and only escalate to higher levels when:
Lower levels have been applied and adherence remains below thresholds, or
Human Capacity and Daily State indicate risk of burnout or abandonment.
Tie back to Decision Rights:
Significant interventions at levels 4–6 must be surfaced to the user with explanation and a clear accept/modify choice.

### 4.9 Architectural extensibility principle

All wellness domains (exercise, quit habits, diet, sleep, etc.) shall be implemented as extensions of the shared **Goal → Plan → Activity → State → Adaptation** model. Future behavior-change domains such as education, productivity, coaching, rehabilitation, or learning shall be supportable without redesigning the core architecture, by mapping their primitives onto the same lifecycle and engines.

## 5. Domain model

### 5.1 Core entities

The platform shall maintain the following foundational entities, mapped to a shared domain model:

- **User**: Profile, demographics (where collected), preferences, notification settings, permissions, and account information.
- **Goal**: Long-term objectives and outcomes (e.g., "run 5 km", "quit smoking", "sleep by 11 pm", "lose 5 kg").
- **Plan**: A structured sequence of Activities created manually or generated by the system to achieve one or more Goals.
- **Activity**: A scheduled action within the wellness ecosystem; parameterized by type and linked to Goals and Plans.
- **Schedule**: Recurrence and timing information for Activities and Plans.
- **Activity Log**: Completion, skip, postponement, qualitative notes, perceived difficulty, and outcomes associated with executed or missed Activities.
- **Habit**: A positive behavior pattern with frequency and conditions; typically represented as recurring Activities.
- **Quit Program**: A reduction or elimination Plan for harmful habits such as smoking or alcohol use, including milestones and strategies.
- **Workout**: Structured exercise sessions and programs; semantically specialized Activities or templates that spawn Activities.
- **Meal Event**: Meal scheduling, meal logging, and diet-related events.
- **Health Metric**: Tracked indicators such as sleep duration, steps, weight, body measurements, mood scores, and hydration.
- **Reminder**: Notifications and prompts tied to Activities, Plans, or Health Metrics.
- **AI Interaction**: Coaching conversations and AI-generated guidance events.
- **Subscription**: Premium access, Plan type, entitlements, billing status.
- **Integration**: External connection configuration for Apple Health, Health Connect, and other fitness/wellness data sources.
- **System Event**: Immutable records of important system actions (e.g., Plan generated, Plan modified, AI recommendation accepted, Activity completed, Reminder sent) for analytics, debugging, and compliance.

### 5.2 Entity relationships

- A User **has many** Goals, Plans, Habits, Quit Programs, Subscriptions, and AI Interactions.
- A Goal **has many** Plans; a Plan **belongs to** one User and may be associated with one or more Goals.
- A Plan **has many** Activities; Activities **belong to** one Plan (optional for ad-hoc actions) and one User.
- A Schedule **defines** the recurrence and timing rules for one Plan or one or more Activities.
- An Activity Log **belongs to** one Activity and one User and records execution status and outcomes.
- A Habit **generates** recurring Activities, each with its own Activity Log entries.
- A Quit Program **generates** Activities and may also rely on Health Metrics and Mood logs to monitor progress.
- A Workout is either a single Activity or a template that spawns multiple Activities across a Plan.
- A Meal Event is an Activity subtype linked to diet-related logging and Health Metrics.
- A Health Metric is updated from Activity Logs, direct entries, or external Integrations.
- A Reminder is associated with Activities, Plans, Schedules, or Health Metrics and triggers notifications.
- An AI Interaction references User, Goals, Plans, Activity patterns, Daily State, and behavioral classifications but does not overwrite Activity Logs directly.
- An Integration is associated with one User and one or more Health Metric data streams.
- A System Event records significant changes or actions and references the relevant User, Plan, Activity, AI Interaction, or Integration.

All new modules must map onto these entities or their extensible subtypes instead of introducing isolated data structures.

## 6. Functional requirements by domain

### 6.1 Onboarding and profile

The system shall allow account creation via email, phone OTP, Apple, or Google sign-in, plus an optional low-identity mode where permitted. Onboarding shall gather basic profile data, Goals, fitness level, exercise location (home/gym), available equipment, preferred workout times, diet preferences, sleep routine, habit interests, quit Goals, and notification consent.

The system shall create an initial profile and personalization seed including behavior style (e.g., structured vs. flexible) and initial motivation style, with user ability to adjust later. The app shall present clear wellness-focused disclaimers, stating it is not a medical device or diagnostic tool, does not provide treatment, and is not for emergency use.

### 6.2 Exercise management

The system shall provide exercise programs for home and gym across beginner, irregular, and regular exercisers.

**Phase 1 scope (narrowed):**

- Fixed workout templates (simple, predefined routines for home and gym).
- Weekly scheduling of selected templates (User chooses days; system schedules Activities).
- Workout completion tracking (completed / skipped / partial) and basic logging (duration, optional notes).
- No progression engine, no adaptive programs, no recovery logic, and no exercise recommendation AI in Phase 1; those belong in later phases.

**Later phases:**

- Progressive overload and advanced progression rules (Phase 2+).
- Adaptive recommendations based on performance and recovery (Phase 2+).

### 6.3 Health scheduling

The system shall provide a unified scheduling layer that coordinates:

- Workouts.
- Sleep routines.
- Hydration reminders.
- Meals.
- Medications and supplements.
- Personal wellness tasks.

Users shall create daily and weekly Plans, view their schedule in list and calendar formats, and adjust time windows and priorities. The system shall detect potential schedule overload or conflicts and propose simplifications or rescheduling.

### 6.4 Habit creation

Users shall be able to create positive Habits with:

- Frequency (e.g., daily, 3x per week).
- Target time windows.
- Reminders.
- Streak tracking.
- Completion logging and notes.

The system shall provide Habit templates (e.g., walking, stretching, journaling, reading, meditation) and allow custom Habits. Habit adherence trends and streaks shall be visible in simple charts and timelines.

### 6.5 Quit-habit management

Users shall be able to define Quit Programs for smoking, alcohol, or similar habits, specifying quit date or reduction Plan, triggers, coping strategies, and emergency actions. The system shall:

- Support both gradual reduction and full-stop strategies.
- Track cravings, lapses, money saved, and health milestones.
- Provide supportive, non-judgmental prompts and reflections.

The app shall explicitly avoid any encouragement of smoking, vaping, illegal drugs, or harmful alcohol use.

### 6.6 Diet and meal guidance

The system shall support:

- Meal scheduling.
- Meal logging (simple mode in early phases, more detailed later).
- Hydration tracking.
- Basic diet preferences (veg, non-veg, allergies, etc.).

In later phases, it shall offer personalized meal Plans and macro guidance as wellness advice, not medical nutrition therapy. The system shall help users maintain regular eating patterns and adequate hydration, and adjust suggestions when adherence is low.

### 6.7 AI life coach

The AI life coach shall:

- Help users plan their day and week across exercise, Habits, diet, sleep, and Quit Programs.
- Suggest adjustments when users repeatedly fail to follow Plans.
- Break big Goals into smaller routines.
- Encourage healthy behavior and discourage harmful habits through personalized messages.

The coach shall have a full conversation interface in later phases and a lighter messaging interface in Phase 1. All AI outputs must follow safety constraints described earlier.

### 6.8 Health and wellness tracking

The system shall allow tracking of:

- Workouts.
- Sleep duration and schedule.
- Water intake.
- Meals.
- Medications and supplements.
- Mood and stress.
- Weight and body measurements.
- Steps and activity levels.

Basic trend views must be available in the free tier, with advanced cross-domain analytics reserved for premium tiers in later phases.

### 6.9 Notifications and nudges

The system shall provide configurable notification categories:

- Activity reminders.
- Daily summary.
- Nudge prompts (e.g., "you are close to breaking a streak").
- Recovery and rest prompts.
- Quit-habit support messages.

Users shall be able to opt in or out of each category and adjust frequency.

**Notification fatigue controls:**

- The system shall implement **frequency caps** per channel (e.g., max N proactive nudges per day) to avoid over-notification.
- The system shall **suppress redundant reminders** when the user has already completed the relevant Activity or has recently received similar prompts.
- The system shall use Behavioral Intelligence, Daily State, and Personalization inputs to **learn preferred engagement windows** and avoid sending nudges during consistently ignored times.
- The system shall provide an easy way for users to temporarily **snooze** nudges.

Nudge content shall be personalized from behavior patterns and preferences and shall avoid shaming language.

### 6.10 Admin console and operations

The admin console shall allow internal staff to:

- Manage workout, Habit, and diet templates.
- Configure AI prompt policies and safe message templates.
- Control feature flags and rollout toggles.
- Define premium Plan tiers and entitlements.
- View aggregate analytics (activation, retention, conversion) with privacy safeguards.
- Access high-level System Event dashboards for debugging and compliance (without exposing sensitive content beyond what policies allow).

Admins shall be able to disable problematic AI templates or behaviors quickly based on safety logs.

## 7. Analytics and insights requirements

### 7.1 User-facing analytics

The system shall provide users with clear, motivational analytics including:

- **Activity adherence percentage** (completed vs. planned Activities per period).
- **Habit adherence percentage** per Habit and overall.
- **Streaks** (current and longest) for key Habits, workouts, and Quit Programs.
- **Recovery trends** (e.g., rest days, sleep consistency) as simple visualizations.
- **Goal progress** indicators for each Goal and associated Plans.
- An optional **weekly wellness score** that summarizes adherence, consistency, and balance across domains, avoiding clinical framing.

### 7.2 Admin and business analytics

The system shall provide admin-level analytics for:

- Activation (onboarding completion, first Plan created).
- Retention (D1, D7, D30, and monthly active users).
- Churn (inactive segments, uninstall estimates where possible).
- AI engagement (coach usage, prompt response rates).
- Premium funnel (trial starts where applicable, conversion, renewal, churn).

Analytics shall be built on top of the System Event stream so product teams can derive new metrics without altering transactional data.

## 8. Free vs premium model

### 8.1 Pricing model

The product will follow a freemium model with a generous free tier and a subscription-based premium tier; premium may be monthly or annual. On iOS, all digital feature unlocks and subscriptions must comply with Apple’s in-app purchase policies.

### 8.2 Feature allocation

| Area | Free tier | Premium tier |
|---|---|---|
| Account & onboarding | Full onboarding, profile, Goals. | Advanced tuning of Goals and coach preferences. |
| Exercise | Basic planning and logging, fixed templates. | Adaptive programs, advanced progression, specialized Plans. |
| Habits | Unlimited simple Habits, streaks, basic charts. | Habit insights, predictive suggestions, advanced analytics. |
| Quit programs | Basic tracking, cravings, and streaks. | Adaptive Plans, deeper analytics, advanced support flows. |
| Diet | Basic meal and hydration logging. | Personalized meal Plans, macro guidance, adaptive diet coaching. |
| AI coach | Limited daily prompts and summary check-ins. | Full conversational access, deeper personalization, continuous Plan adaptation. |
| Analytics | Daily/weekly trends and summaries. | Cross-domain insights, long-term patterns, predictive adherence scoring. |
| Integrations | Basic Apple Health / Health Connect sync where available. | Enhanced integration insights and advanced sync-driven features. |

## 9. Non-functional requirements

### 9.1 Performance and reliability

- Apps must be responsive on mid-range Android devices and recent iPhones.
- Core actions (logging, viewing Plans) should respond with low latency typical for modern mobile apps.
- Offline-first behavior should allow viewing Plans and recording logs for later sync.

### 9.2 Security and privacy

- All communications shall be encrypted in transit.
- Sensitive data such as health metrics shall be stored and processed according to platform guidelines and local regulations where applicable.
- Users must be able to export and delete their data according to privacy policy.
- Apple Health and Health Connect permissions must be granular and revocable.

### 9.3 Compliance boundaries

- The app shall not present itself as a medical device or diagnostic tool.
- The app shall not offer medical diagnosis, treatment recommendations, or emergency guidance beyond directing users to professional help.
- Health data shall not be used for sensitive ad targeting on iOS platforms in line with Apple’s privacy expectations.

## 10. Integrations

### 10.1 Apple Health / HealthKit

- The app shall integrate with Apple Health / HealthKit where relevant, using Apple’s health app guidelines and human interface guidance for transparency and consent.
- Supported data types may include steps, workouts, sleep, heart rate summaries, and body measurements, subject to scope.
- The app shall display clear explanations of why data is requested and how it is used.

### 10.2 Health Connect and Google Fit

- On Android, the app shall support Health Connect as the hub layer for fitness and health data, connecting to Google Fit and other apps via Health Connect’s permission system.
- Users can manage which data types are shared and revoke access at any time.

The app should remain fully usable without these integrations, relying on manual logging for users who decline permissions.

## 11. MVP roadmap (updated)

### Phase 1 – Platform foundation and basic exercise

Phase 1 shall include:

- Authentication and user accounts.
- User onboarding and profile.
- Initial Goal and Plan creation.
- Universal Activity Engine (core scheduling, logging, adherence).
- Health scheduling foundation (basic calendar and Today’s Plan view).
- **Basic exercise planning and logging** with fixed templates and simple weekly scheduling.
- Basic Habit tracking (positive Habits with reminders and streaks).
- Hydration tracking.
- Sleep tracking.
- Reminder and Notification engine with fatigue controls.
- Basic user-facing analytics (adherence, simple streaks, Goal progress).
- Lightweight AI coach (limited prompts and summaries).
- Personalization foundation (initial Personalization Engine hooks).
- Admin console (templates, flags, basic analytics).
- System Event logging for major actions.

Objective: validate activation, early retention, and basic adherence loops.

### Phase 2 – Engagement depth

Phase 2 shall include:

- Extended exercise planning and progression (home and gym programs, difficulty progression).
- Workout logging enhancements (more detail, routine tracking).
- Calendar enhancements (better views, conflict detection).
- Quit-habit management (Programs, craving check-ins, milestone tracking).
- Mood and stress tracking.
- Advanced analytics (deeper adherence insights, better visualizations).
- Stronger Behavioral Intelligence Layer usage (Daily State, Human Capacity, Plan Adaptation).

Objective: increase engagement depth and perceived daily value.

### Phase 3 – Wellness coverage and integrations

Phase 3 shall include:

- Diet planning (meal Plans, schedules).
- Meal logging and guidance capabilities.
- Medication and supplement scheduling and tracking.
- Apple Health integration.
- Health Connect integration.
- Advanced personalization (richer Personalization Engine and Behavioral Intelligence integration).
- Enhanced AI coaching (more context and adaptation).

Objective: expand coverage across key wellness domains and increase personalization quality.

### Phase 4 – Complete operating system and ecosystem

Phase 4 shall include:

- Full AI life coach with rich conversational capabilities.
- Adaptive daily planning across all domains.
- Predictive adherence scoring and forecasting.
- Advanced behavior modeling.
- Premium intelligence features (advanced analytics, coaching depth).
- Professional coach ecosystem (coach role, client management, coach tools).

Objective: evolve into a comprehensive personal wellness operating system and create a coach ecosystem on top of the platform.

## 12. Assumptions, risks, and acceptance

Key assumptions:

- Users are willing to use a single app for one core problem initially (e.g., routines or workouts), and later adopt more domains once trust is established.
- A generous free tier will fuel organic growth while a smaller premium base will pay for advanced features.
- AI coaching, when safe and transparent, will increase adherence and engagement.

Major risks:

- Scope creep if new domains are added before the platform and first domains stabilize.
- AI safety issues in health-adjacent contexts if safeguards and escalation paths are weak.
- Integration complexity with Apple Health and Health Connect if requirements change.

Acceptance criteria for each phase should be defined at feature level (e.g., onboarding completion rate targets, minimum viable analytics views, minimum AI safety checks) before development starts and used as the basis for go/no-go decisions.

---
Act as a startup product strategist, product manager, and solution architect.

Assume the following decisions are final:

* Phase 1 wedge = Exercise Consistency Coach
* Core differentiation = Adherence Intelligence
* Long-term vision = Human Behavior Platform
* Internal architecture = Goal → Plan → Activity → Daily State → Adaptation
* Fitness is the initial distribution channel, not the long-term identity