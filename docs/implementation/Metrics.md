Below is a practical metrics framework for the Exercise Consistency Coach. It is optimized to validate the adaptive-adherence thesis, not to maximize engagement. 
## Part 1: Measurement philosophy

**Success means users complete planned workouts more consistently, recover faster after misses, and keep returning because the plan fits their real life.** It does not mean more app opens, more chat messages, or more notifications sent. 

**Why engagement metrics can mislead:** a user can open the app daily, read summaries, and still not exercise. High usage can hide weak behavior change, so engagement is only useful when it predicts adherence or retention. 

**Why behavior outcomes matter most:** the product thesis is that adaptive plans improve adherence more than static plans, so the clearest proof is completed workouts, recovery after misses, and sustained routine stability. 

**Principles:** measure outcomes over activity, measure adherence over app usage, and measure recovery over streaks. 

## Part 2: North Star

**Select:** **Weekly Completed Planned Workouts per Active User**. This is the best single North Star because it captures planning, execution, and repeat use in one number, and it is explicitly aligned with the product wedge. 

**Why not the others:**  
- **Workout Adherence Rate** is important, but it is a ratio and can miss scale of behavior. 
- **Weekly Active Users** rewards empty engagement. 
- **Workout Completion Count** ignores whether the workout was planned or meaningful. 
- **Recovery Rate** is vital, but it is a diagnostic metric, not the main success measure. 

**Formula:**  
\[
\text{North Star} = \frac{\text{Completed Planned Workouts in Week}}{\text{Active Users in Week}}
\]  
An **active user** is a user with at least one planned workout, completion, skip, or adaptation event in the week. 

**Collection method:** event stream from plan creation, scheduled workout, completion, skip, postpone, and recovery events. 

**Reporting frequency:** weekly, with daily internal monitoring for operational review. 

## Part 3: Activation

**MVP activation definition:** a user is activated when they create a plan and complete their first planned workout within 72 hours. 

**Leading indicators:** onboarding completion, plan creation, reminder opt-in, plan approval, first Todays Plan open, and first completion logging. 

**Target benchmarks:**  
- Onboarding completion: 70–85% for engaged installers.  
- Plan creation: 60–75% of onboarded users.  
- First workout completed within 72 hours: 25–40% pre-PMF, higher after iteration. 
- Two planned workouts completed in week one: strong signal of activation quality. 

## Part 4: Adherence

**Workout Adherence Rate:**  
\[
\frac{\text{Completed Planned Workouts}}{\text{Planned Workouts}}
\]  
This is the cleanest measure of whether users do what they intended. 

**Weekly Adherence Rate:**  
\[
\frac{\text{Completed Planned Workouts in Week}}{\text{Planned Workouts in Week}}
\]  
Use this to track short-cycle plan fit and to compare adaptive vs static cohorts. 

**Plan Completion Rate:**  
\[
\frac{\text{Users who completed all planned workouts in a period}}{\text{Users with a plan in that period}}
\]  
This is stricter than adherence and useful for cohort quality, but it can be too harsh as the only measure. 

**Behavioral Debt:** count of planned workouts completed under low-capacity or overload conditions, plus repeated misses that indicate the plan is asking too much. 
Interpretation: rising debt means the plan is technically being followed short-term but is becoming unsustainable. 

## Part 5: Recovery

**Recovery is strategically important because most users do not fail from one missed workout; they fail from the miss turning into abandonment.** The recovery system is the product’s main defense against churn. 

**Recovery Rate:**  
\[
\frac{\text{Users who complete a workout within 7 days of a recovery trigger}}{\text{Users who receive a recovery trigger}}
\]  
This matches the freeze-candidate model. 

**Time To Recovery:** days from lapse trigger to first completed recovery action. Lower is better. 

**Recovery Success Rate:**  
\[
\frac{\text{Users who return to at least 1 completed workout and stay active for 2 weeks}}{\text{Users who trigger recovery}}
\]  
This is better than a one-off restart because it measures whether the comeback sticks. 

**Restart Success Rate:** same logic, but for users returning after a longer gap. 

## Part 6: Adaptation

**Adaptation Acceptance Rate:**  
\[
\frac{\text{Accepted adaptations}}{\text{Adaptations shown}}
\]  
This tells us whether users trust and tolerate the system’s recommendations. 

**Adaptation Success Rate:**  
\[
\frac{\text{Accepted adaptations that improve downstream adherence}}{\text{Accepted adaptations}}
\]  
An accepted adaptation is only valuable if behavior improves afterward. 

**Adaptation Frequency:** number of adaptations shown per user per week. Too low means the system is passive; too high means it is noisy. 

**Adaptation Effectiveness:** change in adherence, recovery rate, or plan stability after adaptation versus before adaptation or versus control. 

## Part 7: Retention

**Week 1 Retention:** users active in week 1 after signup. 

**Week 4 Retention:** users active in week 4 after signup. 

**Week 8 Retention:** users active in week 8 after signup. 

**Target ranges for MVP:**  
- Week 1 retention: 35–50% of activated users.  
- Week 4 retention: 15–20% of activated users.  
- Week 8 retention: 10–15% of activated users. 

These are directional targets consistent with the product’s pre-PMF and early-PMF framing. 

## Part 8: Self-Trust

**Self-Trust = Promises Kept / Promises Made.** Promises Made are planned workouts explicitly committed to in the active plan; Promises Kept are those completed in the accepted execution window. 

**Formula:**  
\[
\text{Self-Trust} = \frac{\text{Promises Kept}}{\text{Promises Made}}
\]  
Use a rolling 14-day and 28-day window. 

**Ranges:**  
- High: 0.75–1.00  
- Medium: 0.40–0.74  
- Low: below 0.40 

**Interpretation:** low self-trust means the user should get a smaller, safer plan and a gentler recovery flow. 

**Tracking strategy:** compute internally from logged plan commitments and completions; optionally show it to users only if it helps them understand their progress. 

**KPI status:** it should be treated primarily as an **internal model KPI**, not a primary product KPI, because it guides adaptation logic more than business outcomes directly. 

## Part 9: Business metrics

**MVP business metrics:** free-to-paid conversion, trial conversion, CAC, and early churn. These matter, but only after activation and retention prove the core value loop. 

**Post-PMF business metrics:** LTV, payback period, subscriber retention, and channel-level LTVCAC. 

**Definitions:**  
- **Free-to-paid conversion:** paying users divided by activated free users. 
- **Trial conversion:** trial users who become paid divided by trial starts. 
- **Churn:** users or subscribers lost in a period divided by users or subscribers at the start. 
- **CAC:** acquisition spend divided by acquired paying or activated users, depending on stage. 
- **LTV:** expected revenue per payer over lifetime, net of serving costs. 

## Part 10: Metric hierarchy

**North Star:** Weekly Completed Planned Workouts per Active User. 

**Product metrics:** activation rate, adaptation acceptance rate, recovery rate, retention, and self-trust trend. 

**Behavior metrics:** workout adherence, plan completion, behavioral debt, time to recovery, restart success. 

**Business metrics:** free-to-paid conversion, churn, CAC, LTV, LTVCAC. 

Each layer supports the core hypothesis: adaptive plans improve adherence more than static plans, and adherence creates retention and monetization. 

## Part 11: Anti-metrics

Do **not** let these drive decisions: notification opens, app opens, screen views, and chat usage. They are secondary because they can rise even when adherence does not improve. 

Use them only as diagnostic signals, such as identifying a broken notification flow or low-clarity screen, not as success measures. 

## Part 12: Founder dashboard

If the founder can only see 10 numbers each week, they should be these, in this order:

1. Weekly Completed Planned Workouts per Active User. 
2. Workout Adherence Rate. 
3. Recovery Rate within 7 days. 
4. Time To Recovery. 
5. Adaptation Acceptance Rate. 
6. Adaptation Success Rate. 
7. Week 4 Retention. 
8. Week 1 Activation Rate. 
9. Self-Trust median. 
10. Free-to-paid conversion among activated users. 
