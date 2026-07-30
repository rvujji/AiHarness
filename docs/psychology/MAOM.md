# MVP Adherence Operating Model (MAOM) – Freeze Candidate

> Purpose: address the final four issues before freezing the MVP operating model.
>
> This is **not** a new MAOM version. It is a narrow revision layer on top of MAOM focused only on:
> 1. Self-Trust calculation
> 2. Static vs Adaptive experiment design
> 3. Human Coach Equivalence principle
> 4. Re-evaluation of the Overloaded state

Core MVP loop remains unchanged:

> **Create Plan → Observe Reality → Detect Mismatch → Adapt Plan → Recover → Learn**

This remains the cleanest summary of the product wedge and preserves long-term extensibility to exercise, learning, medication adherence, sleep, nutrition, rehabilitation, and productivity.

---

## 1. Self-Trust Calculation (MVP)

### 1.1 Problem

In the previous MAOM, Self-Trust was conceptually useful but too abstract for implementation.

### 1.2 MVP definition

For MVP, define **Self-Trust Score** as:

\[
Self\text{-}Trust = \frac{Promises\ Kept}{Promises\ Made}
\]

Where:

- **Promises Made** = number of planned workouts that the user explicitly committed to in the active plan over a rolling window.
- **Promises Kept** = number of those planned workouts completed within the accepted execution window.

### 1.3 Practical implementation rules

Use a rolling **14-day** and **28-day** window.

#### Promise definition
A workout counts as a promise made if:
- it was scheduled in the active plan, and
- it was visible to the user as part of this week’s commitment.

#### Promise kept definition
A workout counts as kept if:
- completed on the planned day, or
- completed within the allowed grace window if the product supports postponement rules.

#### Promise broken definition
A workout counts as broken if:
- skipped, expired, or missed beyond grace window.

### 1.4 Simple scoring bands

- **High Self-Trust:** 0.75–1.00
- **Medium Self-Trust:** 0.40–0.74
- **Low Self-Trust:** below 0.40

These are product heuristics, not scientific truths.

### 1.5 Why this works for MVP

- Engineers can compute it immediately.
- Users intuitively understand it.
- It aligns with the product philosophy: repeated broken commitments degrade confidence in one’s own follow-through.
- It gives the Adaptation Engine a concrete reason to shrink plans.

### 1.6 How Self-Trust should be used

Self-Trust should influence:

- **Plan resizing aggressiveness**  
  Low T_self → prefer smaller restart plans and more micro-wins.

- **Recovery flow intensity**  
  Low T_self → shorter, easier re-entry steps.

- **Progression gating**  
  Do not increase plan difficulty when T_self is still low even if one good week occurs.

### 1.7 Implementation note

For MVP, **Self-Trust is not a psychological questionnaire**. It is a behavioral ratio.

That is good.

---

## 2. Re-evaluate “Overloaded” State

### 2.1 Problem

The prior MAOM included these states:
- On Track
- At Risk
- Recovering
- Restarting
- Overloaded

The question is whether **Overloaded** really needs to be its own state in MVP.

### 2.2 Decision

**Recommendation: remove Overloaded as a standalone state in MVP.**

### 2.3 Reasoning

A separate state should exist only if it changes product behavior meaningfully.

In MVP, “Overloaded” mostly leads to the same actions as **At Risk**:
- reduce load
- shorten workouts
- recovery week
- freeze progression

So while “overload” is a useful **diagnostic condition**, it does not need to be a separate **state**.

### 2.4 Replacement model

Treat overload as a **risk flag within At Risk**, not a separate state.

#### Revised state set
1. **On Track**
2. **At Risk**
3. **Recovering**
4. **Restarting**

#### At Risk subtypes (not user-facing states)
- **At Risk – Mismatch**: schedule/time/context problem
- **At Risk – Low Confidence**: SE down, T_self down
- **At Risk – Overload**: capacity low relative to plan

This keeps the state machine smaller while preserving the same intervention logic.

### 2.5 Updated logic

- If low capacity + repeated strain signals exist, set **At Risk + Overload flag**.
- Adaptation Engine then prefers:
  - reduce workout count
  - reduce workout duration
  - recovery week
  - freeze progression

This is cleaner and more MVP-appropriate than a fifth full state.

---

## 3. Static vs Adaptive Experiment Design

### 3.1 Problem

The previous MAOM stated that the MVP should compare adaptive plans versus static plans, but did not define the experiment clearly enough.

### 3.2 MVP experiment objective

Test whether adaptive planning improves adherence and recovery compared with a static planner.

### 3.3 Experiment structure

#### Group A – Static Plan
User receives:
- onboarding plan
- reminders
- complete / skip / postpone controls
- weekly summary

User does **not** receive:
- automatic plan resizing
- schedule shift recommendations
- recovery restart plans
- micro-win substitutions triggered by misses

This is the baseline planner experience.

#### Group B – Adaptive Plan
User receives everything in Group A, plus:
- Daily State evaluation
- adaptation suggestions
- recovery triggers and restart plans
- micro-win substitution after misses
- schedule shift suggestions based on observed behavior

### 3.4 Success windows

Track at minimum:

#### 14-day adherence
- completed planned workouts / total planned workouts in first 14 days
- Why: early enough to detect plan fit and early adaptation effects

#### 30-day adherence
- same metric over first 30 days
- Why: stronger signal of sustained value

#### Recovery rate
- % of users who complete a workout within 7 days of recovery trigger
- Why: this is central to the product philosophy

#### Retention
- Week 1 retention
- Week 4 retention
- Why: adherence without retention has limited business value

#### Adaptation acceptance rate
- % of suggested adaptations accepted
- Why: proves whether adaptation is usable, not just theoretically useful

### 3.5 Core experiment questions

1. Does Group B show higher 14-day adherence than Group A?
2. Does Group B show higher 30-day adherence than Group A?
3. Does Group B recover faster after misses?
4. Does Group B retain better at week 4?
5. Are accepted adaptations associated with better downstream adherence?

### 3.6 Minimum readout thresholds

The exact thresholds will vary, but the experiment is directionally promising if:

- Adaptive group adherence is **meaningfully higher** than static group adherence
- Recovery rate is materially higher in adaptive group
- Adaptation acceptance is at least moderate
- Week 4 retention is not worse in adaptive group

### 3.7 Failure modes to watch

- Adaptations feel intrusive or confusing, reducing retention
- Users accept adaptations but adherence does not improve
- Static plan performs similarly, implying adaptation is not a true differentiator

---

## 4. Recovery Trigger Timing

### 4.1 Problem

The prior recovery trigger used:
- 3 missed workouts, or
- 7 days inactive

This may be too slow for low-frequency users.

### 4.2 Recommendation

Introduce **soft recovery** earlier.

#### Soft recovery trigger
- **2 consecutive missed planned workouts**

#### Hard recovery trigger
- **3 missed planned workouts** or **7 days inactive**

### 4.3 Why this is better

For users with 2 workouts/week, waiting for 3 misses can mean the system reacts after too much momentum is already lost.

A soft recovery trigger allows the product to respond while the user is still reachable.

### 4.4 MVP behavior

#### After 2 consecutive misses
- light-touch intervention
- message: “Looks like this week got off track. Want to make the next workout easier or move it?”
- options:
  - move workout
  - shorten workout
  - keep plan as is

#### After 3 misses or 7 inactive days
- full recovery flow
- lighter restart plan
- first micro-win within 48 hours

This creates a two-stage recovery system without adding much complexity.

---

## 5. Human Coach Equivalence Principle

### 5.1 Why this matters

The MVP is, in essence, trying to automate what a competent human coach would do after plan-reality mismatch.

That makes **Human Coach Equivalence** a valuable design principle.

### 5.2 Principle

For every important failure or adaptation moment, ask:

> **What would a good human coach do here?**

Then make sure the product behaves similarly, but with product-level simplicity.

### 5.3 Great coach pattern

A strong coach usually follows this loop:

1. Notice the miss or strain
2. Check in without blame
3. Diagnose the likely cause
4. Adjust the plan
5. Re-anchor the user to a next small success
6. Build confidence over time

That is exactly the intended MVP loop.

### 5.4 Product translation

#### Situation: one missed session
Good coach:
- “No problem. Want to do it tomorrow or just shorten it?”

Product should:
- offer reschedule / shorten / skip-and-move-on

#### Situation: repeated misses
Good coach:
- “This plan clearly isn’t fitting. Let’s reduce it and get you moving again.”

Product should:
- trigger recovery flow
- offer smaller restart plan

#### Situation: repeated strain but continued compliance
Good coach:
- “You’re showing up, but this is too much right now. Let’s back off before you burn out.”

Product should:
- flag overload within At Risk
- reduce volume or trigger recovery week

#### Situation: sustained success
Good coach:
- “This is working. Want to keep it steady or progress a little?”

Product should:
- avoid automatic escalation
- offer small progression as an option, not command

### 5.5 Design rule

If a feature causes the product to behave in a way a competent coach would **not** behave, it is probably too complex, too aggressive, or too abstract for MVP.

This principle is especially useful for:
- messaging tone
- recovery triggers
- adaptation size
- when to progress vs when to protect consistency

---

## 6. Freeze Candidate Summary

With these changes, the MAOM becomes simpler and more executable.

### Final freeze-candidate state machine
1. **On Track**
2. **At Risk**
3. **Recovering**
4. **Restarting**

With **At Risk** carrying optional diagnostic flags:
- mismatch
- low confidence
- overload

### Final freeze-candidate key clarifications
- **Self-Trust** is now behaviorally computed as promises kept / promises made.
- **Recovery** triggers earlier through a soft trigger at 2 consecutive misses.
- **Experiment design** now clearly compares static vs adaptive cohorts over 14-day and 30-day adherence, recovery, retention, and adaptation acceptance.
- **Human Coach Equivalence** becomes a product design principle to keep the MVP grounded and usable.

### Founder-level interpretation

The company’s initial wedge is best understood as a:

> **Plan Adaptation System**

not primarily a workout library, habit tracker, or AI coach.

That is strategically strong because the same loop can later extend across multiple adherence domains:
- exercise
- learning
- medication adherence
- sleep
- nutrition
- rehabilitation
- productivity

### Recommendation

If these four items are accepted, this MAOM should be considered close to **freeze-ready** for MVP implementation.
