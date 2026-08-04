# Human Adherence Operating Model – V5 (Operational Spec)

> Goal: Turn HAOM V4 into something an engineer and product team can implement.
>
> Constraints:
> - **No new variables, theories, or psychology concepts.**
> - Assume HAOM V4’s variable set is ~90% correct.
> - Focus on: detection, signals, interventions, and success metrics for each variable, plus concrete engine behaviors.

Core state variables:
- Capability (K)
- Self-Efficacy (SE)
- Identity (Id)
- Automaticity (A, incl. Behavioral Momentum)
- Context (X)
- Emotion (Em)
- Self-Trust (T_self)
- System Trust (T_sys)

Engines to operationalize:
- Daily State Engine
- Adaptation Engine
- Recovery Engine
- Learning Engine

---

## 1. Variable Operationalization Tables

Each table is "MVP-first" – simple enough to implement now, extensible later.

### 1.1 Capability (K)

| Aspect | Spec |
|---|---|
| **Definition** | Available physical, mental, emotional, and time resources **today** for a behavior. |
| **Detection** | Combination of self-report + simple context data. |
| **Signals (raw inputs)** | 1) Daily/weekly check-in scales (1–5): *energy*, *stress*, *time pressure*.<br>2) Optional: sleep duration (user-entered), workday length (calendar), count of competing obligations blocks per day.<br>3) Behavior signals: frequency of “too tired”, “too busy”, “overwhelmed” as skip reasons. |
| **Derived signal examples** | - **K_low** if: energy ≤2 OR (stress ≥4 AND time pressure ≥4) on a 1–5 scale.<br>- **K_trend_down** if K_low flags ≥3 days in last 7.<br>- **Plan_vs_K_mismatch** if planned weekly load (minutes or sessions) is above historical successful level when K was similar. |
| **Interventions (what the system does)** | - During planning: cap weekly volume based on historical K (e.g., don’t schedule 5 intense sessions if user only managed 2 under similar K).<br>- On K_low days: propose **scaled-down alternatives** (shorter, lighter sessions; “bare minimum” version).<br>- If K_trend_down + high load: trigger **Adaptation rule** to lighten plan and suggest recovery actions (sleep, breaks) rather than pushing volume. |
| **Success metrics (how validated)** | - **Short-term:** % of sessions completed on K_low days *after* introducing scaling vs before; reduction in high-debt executions (see V4).<br>- **Medium-term:** improved average adherence at similar or slightly lower total load; fewer transitions into Burnout Risk state.<br>- **Qualitative:** user feedback to prompts like “Does this plan feel doable this week?” correlates with later adherence. |

### 1.2 Self-Efficacy (SE)

| Aspect | Spec |
|---|---|
| **Definition** | Person’s belief that they can execute the planned behavior under current circumstances. |
| **Detection** | Brief self-report + indirect signals from history. |
| **Signals (raw inputs)** | 1) Single-item SE rating per key behavior: “How confident are you that you can complete this plan this week?” (0–10).<br>2) Mastery history: count of recent successful completions; ratio of success to attempts in last N days.<br>3) Drop in SE after failures: SE_today ≪ SE_at_plan_creation. |
| **Derived signal examples** | - **SE_low** if SE ≤4/10.<br>- **SE_falling** if SE dropped ≥2 points over 2 weeks.<br>- **SE_high** if SE ≥7/10 and success ratio ≥70% over last 2–4 weeks. |
| **Interventions** | - If SE_low or SE_falling:  
  - Reduce immediate difficulty (smaller tasks, simpler goals).  
  - Insert **“guaranteed win”** micro-actions (e.g., 5-minute walk vs full workout).  
  - Highlight past wins (“Last week you still completed 2 sessions despite…”) to counter pessimism.  
- If SE_high and success stable: allow gentle progression; ask user to choose whether to progress (autonomy). |
| **Success metrics** | - **SE trajectory**: average SE in cohort vs baseline; should trend up over first 4–8 weeks among retained users.<br>- **SE–adherence coupling**: correlation between SE and subsequent adherence; after interventions, want to see SE better calibrated (not overly optimistic or pessimistic) and positive correlation. |

### 1.3 Identity (Id)

| Aspect | Spec |
|---|---|
| **Definition** | The extent to which the behavior matches “who I am” and “who people like me are.” |
| **Detection** | Onboarding questions + language patterns + behavior history. |
| **Signals** | 1) Self-label endorsement: “Which statements feel true?” (e.g., “I’m someone who keeps commitments to myself”; “I’m a runner”; rated 1–5).<br>2) Repeated behavior over months aligned with a role (e.g., 3 months of regular training → “trainee” identity).<br>3) Text fragments in survey/feedback: “This is just what I do now”, “not my kind of thing”, etc. (text-mined later). |
| **Derived signal examples** | - **Id_nascent**: low explicit endorsement but growing behavior evidence.<br>- **Id_established**: explicit endorsement plus ≥12 weeks consistent adherence at moderate load.<br>- **Id_rigid**: narrow identity signs (“if I can’t run, I have nothing”) + distress when constrained. |
| **Interventions** | - For Id_nascent:  
  - Reflect emerging identity back: “You’ve showed up 8 of the last 10 planned days — this is what someone who follows through looks like.”  
  - Use values-aligned framing (“you’re someone who takes care of your future self”).  
- For Id_established:  
  - Introduce more flexible identity statements to avoid brittleness (“even when injured, you’ll find ways to live your active identity”).  
- For Id_rigid:  
  - Suggest identity-safe substitutions (e.g., walking or rehab instead of running). |
| **Success metrics** | - Increase in identity endorsement scores among consistent users over months.<br>- Lower dropout after contextual disruptions (injury, travel) in Id_established vs Id_weak cohorts. |

### 1.4 Automaticity (A, including Behavioral Momentum)

| Aspect | Spec |
|---|---|
| **Definition** | How reflexive the behavior is in response to a cue + current short-term behavioral momentum. |
| **Detection** | Execution patterns relative to cues (time, place, preceding action) + periodic self-report. |
| **Signals** | 1) Execution regularity: % of sessions occurring within fixed time windows (e.g., ±1h of planned time).<br>2) Repetition count in same context (e.g., “6:30–7am at home floor sessions” repeated 20 times).<br>3) Brief automaticity item occasionally: “I did this almost without thinking” (1–5). |
| **Derived signal examples** | - **A_low**: behavior timing highly variable; few repeats in same context; low automaticity ratings.<br>- **A_mid**: some regularity; 10–20 similar executions; medium ratings.<br>- **A_high**: high regularity; ≥30 similar executions; high ratings. |
| **Interventions** | - A_low:  
  - Encourage picking a **single default time & place**; discourage constant rescheduling.  
  - Use explicit cues (“after brushing teeth, I do X”), but keep behavior small.  
- A_mid:  
  - Protect context (avoid changing schedule unnecessarily).  
- A_high:  
  - Change only when context breaks; otherwise treat as a protected asset. |
| **Success metrics** | - Increased proportion of sessions within chosen time window.<br>- Fewer notifications needed to trigger the behavior as A rises.<br>- Persistence of behavior through moderate life stress when A_high. |

### 1.5 Context (X)

| Aspect | Spec |
|---|---|
| **Definition** | The physical and social environment’s supportiveness/friction for the behavior. |
| **Detection** | Explicit tags + patterns in success/failure by context. |
| **Signals** | 1) User-selected context tags per plan: home / gym / office / outdoors; alone vs with others.<br>2) Skip reasons tied to context: “gym too far”, “no equipment”, “kids at home”, “social event”.<br>3) Day-of-week & time-of-day success rates. |
| **Derived signal examples** | - **X_good_slot**: time/context combinations with ≥70% completion over N attempts.<br>- **X_bad_slot**: combinations with ≤30% completion over N attempts.<br>- **X_friction_type**: common friction category per user (travel, equipment, social). |
| **Interventions** | - Schedule new plans primarily into **X_good_slots** and avoid X_bad_slots.<br>- If gym travel friction is high: propose **home-based alternatives** or fewer gym days.<br>- If evenings consistently fail: suggest mornings (with Learning Engine evidence). |
| **Success metrics** | - Increased share of activities scheduled in X_good_slots over time.<br>- Improved overall adherence after context reshaping vs prior baseline. |

### 1.6 Emotion (Em)

| Aspect | Spec |
|---|---|
| **Definition** | Emotional state related to the behavior and current context (valence + arousal + appraisal). |
| **Detection** | Lightweight self-report + inference from language/behavior. |
| **Signals** | 1) Occasional mood check-ins pre/post activity: “How do you feel about doing this?” (sad–happy), “How energized do you feel?”<br>2) Lapse reason options: “felt anxious”, “felt ashamed”, “felt bored”.<br>3) Text snippets in free-form feedback: “dreading this”, “excited”, “proud”, “embarrassed”. |
| **Derived signal examples** | - **Em_negative_association**: repeated negative valence before behavior; negative words in descriptions.<br>- **Em_pride**: positive valence after execution, especially when tied to self-judgment (“proud of myself”).<br>- **Em_fear/shame**: strong negative affect linked to app or behavior.
| **Interventions** | - If Em_negative_association:  
  - Shrink behavior to something more tolerable; try to redesign experience.  
  - Reframe goal: trade “punishing” framing for self-care framing.  
- If Em_fear/shame:  
  - Ensure all messaging around lapses is **non-shaming** and normalizing.  
- If Em_pride:  
  - Reflect it back to build SE and T_self (“you did that even when tired”). |
| **Success metrics** | - Shift in average Em rating before/after activities (less dread, more neutral/positive).<br>- Fewer lapses explicitly attributed to emotion over time. |

### 1.7 Self-Trust (T_self)

| Aspect | Spec |
|---|---|
| **Definition** | Belief that “when I commit to something, I typically follow through.” |
| **Detection** | Commitment vs completion ratios + explicit questions. |
| **Signals** | 1) Ratio of committed activities (planned) to completed ones over longer windows (e.g., 8–12 weeks).<br>2) Frequency of plan reboots after failures (indicates attempts to restore trust or patterns of over-promising).<br>3) Direct question: “On a scale 0–10, how much do you trust yourself to follow through on plans like this right now?” |
| **Derived signal examples** | - **T_self_low**: self-rated ≤4/10 or long-term completion ratio <30%.<br>- **T_self_recovering**: ratio improving after plan downsizing and wins. |
| **Interventions** | - For T_self_low:  
  - Dramatically **reduce commitments** to near-guaranteed actions.  
  - Explicitly frame small wins as “proof that your self-trust is rebuildable.”  
  - Avoid proposing ambitious plans until T_self improves. |
| **Success metrics** | - Improvement in completion/commitment ratio.<br>- Upward trend in self-rated T_self. |

### 1.8 System Trust (T_sys)

| Aspect | Spec |
|---|---|
| **Definition** | Belief that “this system is competent, honest, and on my side.” |
| **Detection** | Behavioural responses to recommendations + feedback. |
| **Signals** | 1) Acceptance rate of adaptation suggestions (user chooses “Apply” vs “Ignore”).<br>2) NPS-style or single-item survey: “The app has my back / understands me” (agree–disagree).<br>3) Support tickets or feedback that indicate distrust (“stop changing my plan”, “I don’t understand why it did this”). |
| **Derived signal examples** | - **T_sys_low**: low acceptance rates (<20%) + negative trust feedback.<br>- **T_sys_high**: high acceptance (>60%) + positive feedback. |
| **Interventions** | - For T_sys_low:  
  - Use **more explanation**: show data and rationale behind suggestions.  
  - Reduce frequency and size of unaccepted suggestions.  
  - Ask permission before big changes and honor user choices. |
| **Success metrics** | - Rising acceptance rate for suggestions.<br>- Improved trust survey scores.<br>- Lower churn after major plan changes. |

---

## 2. Daily State Engine (Operational)

Daily State Engine maps recent behavior + variables into a small set of states used by other engines.

### 2.1 Inputs

- Adherence metrics: completion %, missed/late activities, streaks, Behavioral Debt events.  
- Key variables: K, SE, A (incl. BM), Em, T_self.  
- Time windows: last 7 days, last 28 days.

### 2.2 States and inference rules (MVP rules, not final)

**1. Winning**
- Criteria (all approx.):  
  - Completion ≥80% over last 14 days.  
  - Behavioral Debt low (few or no sessions executed under K_low).  
  - Em generally neutral/positive after activities.  
  - No signs of K_trend_down.  
- Interpretation: Plan size and difficulty are well-calibrated; system can consider gentle progression.

**2. Stable**
- Criteria:  
  - Completion 60–80% over last 14 days.  
  - Debt low–medium.  
  - Occasional misses but user remains engaged.  
- Interpretation: Plan is generally fine; interventions should be light and collaborative.

**3. Struggling**
- Criteria:  
  - Completion 30–60% over last 14 days.  
  - Increasing K_low flags OR Em_negative_association OR repeated “too tired / too busy” reasons.  
- Interpretation: Plan and context are misaligned; user is still reachable.

**4. Recovering**
- Criteria:  
  - Recently restarted after lapse (e.g., 7+ days with 0% completion followed by 1+ completions).  
  - Plan has been deliberately lightened.  
- Interpretation: Fragile; aim is to rebuild SE, T_self, BM.

**5. Burnout Risk**
- Criteria:  
  - High load + K_trend_down + Em frequently negative.  
  - Debt events frequent (many completions under K_low).  
  - Completion may still be high short-term.  
- Interpretation: System must prevent crash by scaling back and emphasizing recovery.

**6. Restarting**
- Criteria:  
  - Multiple missed activities (e.g., 3–7 consecutive misses) with no completions, but user opens app or expresses desire to try again.  
- Interpretation: Transition moment; need extremely low-friction re-entry.

The engine runs daily, assigns state, and logs transitions (e.g., Stable → Struggling, Struggling → Recovering).

---

## 3. Adaptation Engine (Rules)

Adaptation Engine takes state + variables and proposes **concrete plan changes**.

### 3.1 Example core rules

#### Rule A1 – Overload / low SE (your example)

**If:**
- State ∈ {Struggling, Burnout Risk}.  
- SE_low or SE_falling.  
- T_self_low or dropping.  
- Behavioral Debt high (many completions under K_low).

**Then propose:**
- Reduce weekly workload (sessions or total minutes) by ~30–40%.  
- Insert 1–2 **guaranteed-win** micro-sessions per week (e.g., 5–10 minutes) designed to be completed even on K_low days.  
- Add explicit coaching message explaining rationale: “We’re shrinking the plan so you can rebuild confidence and trust in yourself.”

**Success metric:** adherence in next 2 weeks improves and SE/T_self stabilize or rise; state moves to Stable/Winning.

#### Rule A2 – Underload (boredom risk)

**If:**
- State = Winning for ≥4 weeks.  
- Completion ≥90%; K high, Debt ~0.  
- User indicates “too easy”.

**Then propose:**
- Increase intensity/duration modestly (e.g., +10–15% load).  
- Offer choice between “stay steady” vs “small challenge”.

#### Rule A3 – Context mismatch

**If:**
- X_bad_slot identified (e.g., evenings with 20% completion) and X_good_slot available (e.g., mornings with 70% completion).  

**Then propose:**
- Move recurring sessions from X_bad_slot to X_good_slot.  
- Explain using Learning Engine stats: “When you schedule mornings, you complete ~72% vs 21% in evenings.”

#### Rule A4 – Emotional burden

**If:**
- Em_negative_association persistent (dread before sessions, negative mood after).  

**Then propose:**
- Shorten or lighten exercises, or change modality (e.g., from intense intervals to walks).  
- Frame as “finding a form of movement that feels sustainable.”

#### Rule A5 – Identity brittleness

**If:**
- Id_established but Id_rigid signals; context now blocks primary behavior (e.g., injury blocks running).  

**Then propose:**
- Identity-safe substitute behaviors (e.g., rehab, walking) with explicit identity framing: “Even while injured, your ‘active person’ identity continues via X.”

Adaptation proposals always pass through **Intervention Acceptance logic** (using T_sys and Id fit) before being shown.

---

## 4. Recovery Engine

Recovery Engine owns **what happens after a lapse**.

### 4.1 Lapse detection (MVP)

- **Soft trigger:** ≥3 planned activities in a row missed within 10 days.  
- **Hard trigger:** 7+ days with 0 completions.

### 4.2 Recovery Flow (example)

**Step R1 – Gentle detection message**
- Non-shaming notification: “It looks like the last few sessions didn’t happen. That’s normal. Want to get back on track in a lighter way?”

**Step R2 – Diagnose via quick question**
- Present 2–3 tap options: “Mostly: too busy / too tired / lost motivation / life events / other.”
- This informs K, Em, X assumptions.

**Step R3 – Auto-resize plan**
- Default: propose **Restart Plan** for 1–2 weeks:  
  - 1–3 extremely easy sessions/week.  
  - No progression logic during this phase.

**Step R4 – Micro-commitment**
- Ask user to pick **one tiny action** in the next 48 hours (e.g., 5-minute walk, 5 minutes of stretching).  
- This is aimed at BM, SE, and T_self.

**Step R5 – Reflect and re-anchor**
- After first successful recovery action:  
  - Short message: “You came back after a tough week — that’s exactly what builds long-term change.”  
  - Optionally ask: “Do you want to stay with this light plan for another week or add a bit more?” (autonomy).

### 4.3 Recovery metrics

- **Time-to-restart:** average days from lapse trigger to first completed recovery action.  
- **Post-restart adherence:** completion % in 2 weeks post-recovery vs pre-lapse baseline.  
- **SE and T_self slope:** do they stabilize or continue to drop after recovery flows.

---

## 5. Learning Engine (Behavior Learning)

Learning Engine turns history into **simple, actionable preferences** that other engines can use.

### 5.1 Inputs

- Activity logs: planned vs completed; timestamps; context tags.  
- Variable estimates over time: K, SE, A, X, Em, T_self.  
- Intervention logs: which adaptations were shown and accepted, and what happened afterward.

### 5.2 Core learning tasks (MVP)

1. **Slot effectiveness**
   - For each user, compute completion rates by time-of-day (e.g., morning/afternoon/evening) and by day-of-week.  
   - E.g., morning workouts: 72% completion; evening: 21%.  
   - Flag **good slots** and **bad slots** for Context (X) and Adaptation Engine.

2. **Plan size effectiveness**
   - For different weekly load levels (e.g., 1–2, 3–4, 5+ sessions), compute adherence and Behavioral Debt.  
   - Identify **sweet spot** where adherence is highest and debt is low.

3. **Intervention effectiveness**
   - For each intervention type (e.g., workload reduction, timing change, recovery flow), track:  
     - Accept/ignore rate.  
     - Adherence delta in following 2–4 weeks.  
   - Build a simple table: “For users like X in state Y, intervention Z tends to help/hurt.”

4. **Emotion–behavior links** (later)
   - Correlate Em ratings with future adherence — e.g., behaviors that consistently produce Em_pride vs Em_dread — and feed back into Adaptation (choose modalities that produce better Em for the same K).

### 5.3 Example recommendation (your example)

Learning Engine output:

- Morning workouts: 72% completion (20/28).  
- Evening workouts: 21% completion (4/19).

Adaptation Engine uses this to propose:

> “You complete ~3 out of 4 sessions in the morning, but less than 1 out of 4 in the evening. Want to move your plan to mornings and keep evenings free?”

The engineer can implement this as:

- A daily/weekly job that recomputes per-user slot stats.  
- A rule that triggers a suggestion when certain thresholds and gaps are met (e.g., ≥20 attempts with ≥40% absolute difference in completion).  
- A UI surface where the user can accept/decline the change.

---

## 6. Engineer Readiness Check

An engineer reading V5 should be able to:

- Implement **per-variable estimators** based on the specified signals and thresholds.
- Build a **Daily State Engine** as a pure function from (recent adherence, K, SE, A, Em, T_self, Debt) → state label.
- Implement **Adaptation rules** as conditionals with clear triggers and outputs (plan deltas, messaging).
- Implement a **Recovery Engine** that detects lapses and initiates the recovery flow.
- Implement a **Learning Engine** that computes slot effectiveness and simple preference models, then surfaces them as suggestions to the Adaptation Engine.

No new psychological concepts are introduced; everything derives from HAOM V4’s variables and structure. The next step is writing actual pseudo-code or APIs around these specs, which should now be straightforward.
