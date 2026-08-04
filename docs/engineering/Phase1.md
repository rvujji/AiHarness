Here is the complete Phase 1 MVP Definition, optimized for lean execution, fast validation, and early revenue, based on your fixed strategic decisions and the attached BRD. 

“We help you keep going without making you feel bad when life gets messy.

## Phase 1 position

Phase 1 should be a **narrow consumer mobile product**: an Exercise Consistency Coach that helps users choose a realistic workout routine, see a clear Today’s Plan, log whether they actually did it, and receive light adherence support when they start slipping. The MVP should validate whether users value adherence intelligence enough to return repeatedly and whether a subset will pay for deeper coaching and adaptation rather than just basic workout tracking. 

The MVP should not launch as a broad wellness platform, a life coach, or a complete habit-and-health operating system. Those directions are architecturally supported, but they would slow learning and increase engineering and positioning risk before the product proves its core behavior loop. 

## MVP goals

### Primary product goal
Help irregular exercisers become more consistent with 2–4 planned workouts per week through a simple, adaptive execution loop: Goal → Plan → Today’s Plan → Log completion → Daily feedback. 

### Primary business goal
Validate that “adherence intelligence” is a compelling enough differentiation to drive repeat weekly use and early willingness to pay. 

### Operational goal
Ship a stable Android/iOS MVP with minimal implementation complexity by reusing the BRD’s shared primitives rather than building multiple standalone feature silos. 

## Assumptions being validated

The MVP should validate these assumptions:

1. Users with failed prior workout consistency attempts will try a product that promises realistic planning and adaptation, not just workout content. 
2. The “Today’s Plan + AI Summary” home concept is clear enough to drive daily use. 
3. Users care more about staying consistent than about advanced workout programming in Phase 1. 
4. A lightweight version of adherence intelligence—score, state, reminders, and small plan adjustments—creates better retention than plain workout logging.
5. A paid tier centered on deeper coaching/adaptation can convert a meaningful subset of users, while basic planning/logging remains free. 

## What must be proven in 90 days

Within the first 90 days after launch, the product should prove:

- Users can reach the core value moment quickly: create a plan and complete their first successful plan day. 
- A meaningful portion of users return in week 2 and week 4 because the product helps them stay on track, not because of novelty alone. 
- Users understand and trust the adherence layer enough to act on its suggestions. 
- Premium interest exists for deeper adaptation, richer AI guidance, or advanced insights. 
- The chosen wedge—exercise consistency—can acquire users more efficiently than a generic wellness message. 

## Must-have features

These are the absolute minimum features required for launch.

### 1. Authentication and account creation
Users need a way to create an account and preserve plans, activity history, and subscription status. Social login is helpful but not required for launch; email + OTP or email + password is sufficient if it reduces complexity. 

### 2. Onboarding and fitness profile
The app must collect just enough information to generate a basic workout plan: goal, fitness level, home/gym preference, available equipment, preferred workout days, and preferred workout time. Without this, the app cannot personalize the initial plan or demonstrate adherence intelligence. 

### 3. Goal creation
Users must define a simple exercise-oriented goal such as “work out 3 times/week” or “build consistency.” This is required because the architecture and user value proposition both start from a goal, and it anchors the product in outcomes rather than logs. 

### 4. Fixed workout template library
The app must include a small curated set of fixed home and gym workout templates for beginner and restarting users. This avoids the complexity of building exercise recommendation logic while still giving users something actionable to execute. 

### 5. Weekly plan setup
Users must be able to choose a template and assign it to days/times in a weekly plan. This is required because the first core promise is not “discover workouts” but “follow a realistic plan.” 

### 6. Today’s Plan home screen
The home screen must show today’s scheduled workout and any minimal support activities, plus a lightweight AI Summary. This is the central execution screen and the most important product surface in the MVP. 

### 7. Workout logging
Users must be able to mark a workout as completed, skipped, partial, or postponed, optionally adding duration and a note. This is the minimum data required to measure adherence and trigger any intelligence at all. 

### 8. Basic adherence engine
The system must compute planned vs. completed counts and a simple Daily Success Score tied primarily to critical workout completion. A fully sophisticated model is unnecessary at launch, but a visible adherence layer is essential to test differentiation. 

### 9. Lightweight Daily State
The app should assign a simple state such as Winning, Stable, Struggling, or Restarting using transparent rules. This is needed because “adherence intelligence” must be visible to the user, not just hidden in the backend. 

### 10. Reminder and notification system
Users need workout reminders, daily plan reminders, and basic fatigue controls such as snooze and caps. Without reminders, you are not really testing whether the product can intervene usefully in real life. 

### 11. Minimal AI Summary / coach prompts
Phase 1 needs a lightweight adherence coach, not a chat assistant. The AI should generate 1–2 concise messages such as encouragement, warning, or a small adjustment suggestion based on recent logging and state. 

### 12. Basic analytics
Users need a simple weekly view showing planned workouts, completed workouts, and current streak/consistency trend. This closes the loop and gives users a reason to return. 

### 13. Subscription plumbing
Even if the premium surface is small at launch, the product should support entitlements and upgrade prompts from day one. This is required to validate willingness to pay within the first 90 days. 

## Should-have features

These add value but are not required for launch.

- Apple/Google sign-in for friction reduction. 
- Basic habit support with one optional companion habit, such as hydration or bedtime routine. 
- Weekly review summary with adherence insights. 
- Calendar view in addition to Today’s Plan list view. 
- Template variants for home, gym, short, and restart modes. 
- Admin tools for template editing and feature flags, if a lightweight internal panel can be built cheaply. 

These are useful, but if any of them delay launch materially, they should be deferred.

## Features to explicitly exclude

These should be deferred because they increase complexity without directly helping validate product-market fit for the wedge.

- Full AI chat coach. 
- Adaptive exercise programming or progression engine. 
- Human Capacity Model in full sophistication; use simple rule-based guards first. 
- Full Plan Adaptation Engine hierarchy; begin with small suggestion rules only. 
- Quit-smoking / alcohol programs. 
- Diet planning, meal logging, macro tracking. 
- Medication/supplement scheduling. 
- Mood/stress logging. 
- Wearable integrations and HealthKit/Health Connect. 
- Social/community features, coach marketplace, or professional coach roles. 
- Offline-first sync sophistication beyond basic retry handling. 

If a feature does not improve acquisition, activation, adherence validation, or early monetization learning, it should not be in Phase 1. 

## User journey

### First-time user flow
1. User installs app.
2. User creates account.
3. User selects a goal: build workout consistency, lose weight through consistency, or restart exercise routine.
4. User chooses home or gym, equipment level, preferred days, and workout duration.
5. App recommends a fixed weekly plan from templates.
6. User confirms the plan.
7. User lands on Today’s Plan with the first scheduled workout and a short AI Summary. 

### First Successful Plan Day flow
1. User receives a reminder for today’s planned workout.
2. User opens Today’s Plan.
3. User completes the workout and logs it as done.
4. App updates the score/state and shows a reinforcing message such as “You completed today’s critical activity.” 
5. User sees progress toward weekly consistency.

This is the activation loop.

### First week experience
- Day 0: onboarding + plan setup.
- Days 1–3: reminders, workout logging, first successful plan day target.
- Days 4–7: weekly adherence feedback, one small suggestion if the user skips or postpones repeatedly. 
- End of week: summary of planned vs. completed workouts and a suggested next-week adjustment.

The first week should prove that the app is a living execution system, not a static plan repository.

## Screen inventory

| Screen | Purpose | Priority |
|---|---|---|
| Splash / Launch | App boot and session check | P2 |
| Sign up / Log in | Create account, authenticate | P0 |
| Welcome / Value prop | Set expectation: exercise consistency coach | P1 |
| Onboarding: goal selection | Capture primary exercise goal | P0 |
| Onboarding: fitness profile | Home/gym, equipment, level, duration | P0 |
| Onboarding: schedule preferences | Preferred days and times | P0 |
| Notification consent | Enable reminders | P0 |
| Plan recommendation | Show fixed weekly workout suggestion | P0 |
| Plan confirmation / edit | Accept or lightly edit days/times | P0 |
| Home: Today’s Plan | Main execution screen | P0 |
| Workout detail | Show workout template steps/details | P0 |
| Log workout result | Completed / partial / skipped / postponed | P0 |
| Weekly plan view | Show all scheduled workouts this week | P0 |
| Progress / insights | Adherence, streak, score trend | P1 |
| AI insights detail | Explain why a suggestion/state was shown | P1 |
| Premium paywall | Explain premium value | P0 |
| Profile / settings | Preferences, reminder settings, logout | P0 |
| Notification settings | Category opt-in, frequency, snooze | P1 |
| Help / disclaimer | Safety, non-medical messaging | P1 |

## User stories by epic

### Epic 1: Account and onboarding

**Story 1.1**  
As a new user, I want to create an account so my plan and progress are saved.  
Acceptance criteria:
- User can sign up with the supported method.
- User can log in and log out.
- Returning user session is restored.
Dependencies: authentication backend.

**Story 1.2**  
As a new user, I want to tell the app my fitness situation so it can create a realistic plan.  
Acceptance criteria:
- User can select goal, fitness level, workout environment, equipment, preferred days, and preferred time.
- Required fields are validated.
- Data is saved to user profile.
Dependencies: profile model, onboarding UI.

### Epic 2: Plan creation

**Story 2.1**  
As a user, I want the app to suggest a weekly workout plan so I can start without designing one myself.  
Acceptance criteria:
- System chooses a fixed template based on onboarding inputs.
- User sees workout names, days, and durations.
- User can accept the plan.
Dependencies: workout templates, recommendation rules.

**Story 2.2**  
As a user, I want to edit workout days/times before confirming the plan.  
Acceptance criteria:
- User can move planned workouts to another day/time in the same week.
- Invalid schedules are blocked or warned.
- Updated plan is saved.
Dependencies: schedule model, plan UI.

### Epic 3: Today’s Plan and execution

**Story 3.1**  
As a user, I want to see today’s scheduled workout immediately when I open the app.  
Acceptance criteria:
- Home screen shows today’s critical activity.
- If no workout is scheduled, it shows the next planned workout.
- Screen loads within acceptable mobile latency.
Dependencies: activity engine, home UI.

**Story 3.2**  
As a user, I want to log whether I completed today’s workout so the app can track my consistency.  
Acceptance criteria:
- User can mark workout completed, skipped, partial, or postponed.
- Optional note and duration can be entered.
- Log updates the activity record and analytics event stream.
Dependencies: activity log model, event logging.

### Epic 4: Adherence intelligence

**Story 4.1**  
As a user, I want to know how I’m doing today so I can stay motivated and adjust.  
Acceptance criteria:
- App computes a Daily Success Score using transparent rule-based logic.
- App shows a simple Daily State.
- Explanation text is available in plain language.
Dependencies: score calculation service, state rules.

**Story 4.2**  
As a user who misses workouts, I want the app to give me a small corrective suggestion so I can recover instead of quitting.  
Acceptance criteria:
- If repeated skip/postpone behavior is detected, app shows one suggestion.
- Suggestion is limited to low-risk actions such as reminder change or smaller session.
- User can dismiss or accept.
Dependencies: rule engine, AI/prompt layer or templated logic.

### Epic 5: Notifications

**Story 5.1**  
As a user, I want workout reminders so I remember to do my planned session.  
Acceptance criteria:
- Reminder is sent before scheduled workout time.
- Reminder is not sent if activity is already completed.
- User can snooze or disable reminders.
Dependencies: push notification service, schedule engine.

### Epic 6: Progress and monetization

**Story 6.1**  
As a user, I want to see weekly consistency so I know whether the app is helping me.  
Acceptance criteria:
- Weekly screen shows planned vs. completed workouts.
- Current streak or consistency summary is visible.
- Data reflects logged actions accurately.
Dependencies: analytics aggregation.

**Story 6.2**  
As a premium prospect, I want to understand what extra value paid features provide.  
Acceptance criteria:
- Paywall explains premium features clearly.
- User can start subscription purchase flow.
- Entitlements unlock immediately after purchase.
Dependencies: billing integration, entitlement service.

## Metrics instrumentation

### Activation metric
**First Successful Plan Day**: percentage of new users who, within 3 days of signup, create a plan and complete all critical activities scheduled for one day. 

Instrument:
- signup_completed
- onboarding_completed
- plan_created
- first_plan_day_viewed
- critical_activity_completed
- first_successful_plan_day_achieved

### Retention metric
**Weekly Active Adherers**: users active on at least 3 days in a week and completing at least 2 planned workouts that week. 
This is simpler than a score-threshold formula and closer to observable user behavior in the MVP.

### Engagement metrics
- D1, D7, D30 retention. 
- Workouts planned per user.
- Workouts completed per user.
- Skip rate.
- Postpone rate.
- Reminder open rate.
- Today’s Plan screen weekly frequency.
- AI suggestion view rate and accept rate.

### Monetization metrics
- Paywall view rate.
- Trial start rate, if trial exists.
- Free-to-paid conversion.
- Week-4 premium retention.
- Revenue per active user.
- Premium feature usage frequency. 

## Monetization plan

### What remains free forever
To preserve growth and deliver real value, the following should stay free:
- Account and onboarding.
- Goal setup.
- Fixed workout templates.
- Basic weekly planning.
- Today’s Plan.
- Workout logging.
- Basic reminders.
- Basic weekly adherence view. 

If these are locked, users will never experience the wedge.

### What should be premium
Premium should monetize the **intelligence**, not the basics:
- Advanced adaptation suggestions.
- More frequent / richer AI coaching.
- Deeper insights and pattern analysis.
- More plan variants and specialized templates.
- Multi-week trend analysis.
- “Recovery / restart mode” recommendations. 

This aligns with your differentiation while keeping the funnel broad.

## Technical implementation order

### Fastest path to launch

1. **Data model and backend primitives**  
Implement User, Goal, Plan, Activity, ActivityLog, Reminder, Subscription, and SystemEvent first because everything depends on them. 

2. **Authentication + onboarding**  
Build sign-up, minimal onboarding, and profile capture.

3. **Workout templates + plan generation**  
Create a simple rule-based engine that maps onboarding inputs to a fixed weekly workout plan.

4. **Today’s Plan + weekly plan UI**  
Ship the main execution surfaces early so internal dogfooding is possible.

5. **Workout logging**  
Completed / skipped / partial / postponed with event capture.

6. **Basic reminder engine**  
Only workout reminders at first; no complex multi-domain nudges.

7. **Basic adherence layer**  
Daily Success Score, simple Daily State, and weekly consistency aggregation.

8. **Lightweight AI Summary**  
Start with deterministic or templated message generation from state + events before introducing complex LLM behavior.

9. **Paywall + billing**  
Add subscription entitlements and one clear premium pitch.

10. **Insights screen + instrumentation QA**  
Verify all activation, retention, and conversion events before public launch.

### Why this sequence
This order minimizes engineering risk, keeps the architecture aligned with the BRD, and gets the product to the first meaningful user loop as fast as possible. It also avoids building advanced AI and multi-domain complexity before the core exercise adherence promise is validated. 

## Aggressive feature challenge

Features that sound attractive but should be removed from Phase 1 unless proven essential:

- Hydration tracking as a first-class workflow.
- Sleep tracking as a first-class workflow.
- Calendar month view.
- Multiple goals in onboarding.
- Free-form AI chat.
- Detailed workout builder.
- Social sharing.
- Wearable sync.
- Admin analytics beyond basic event dashboards.
- Deep customization of motivation style.

These can all wait. For Phase 1, the product only needs to answer one question:  
**Will users come back and pay because this app helps them stay consistent with workouts better than a normal fitness tracker?** 

If you want, I can turn this next into a **developer-ready backlog** with:
- epics,
- story IDs,
- priorities,
- acceptance criteria,
- and suggested sprint breakdown.