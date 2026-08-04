# Behavior Signal Acquisition Model (BSAM)

> Goal: estimate adherence-related state variables with **minimal user effort**, while keeping the system useful for HAOM V5 engines (Daily State, Adaptation, Recovery, Learning).
>
> Constraints:
> - Variables are fixed: Capability, Self-Efficacy, Identity, Automaticity, Context, Emotion, Self-Trust, System Trust.
> - Prefer **passive and low-friction signals**; collect richer data only when clearly justified.
> - Prioritize **retention and usability** over theoretical completeness.

---

## 1. Principles

1. **Effort kills adherence data.** Users stop completing check-ins, abandon habit trackers, ignore notifications, and drop out of onboarding when burden is high, feedback is low, or questions feel irrelevant.
2. **Perceived value must be immediate.** Every extra tap or question must clearly improve the product experience (better plan, better feedback, fewer annoyances) within days, not months.
3. **Progressive profiling, not one-shot forms.** Collect the minimum data needed to get started; earn the right to ask for more by delivering value first.
4. **Default to inference; confirm only when needed.** Use behavior and passive patterns to estimate variables, then occasionally validate with short, well-timed micro-check-ins.
5. **Respect privacy and autonomy.** Be conservative with sensitive data, explain why it is collected, and always offer control.

---

## 2. Variable-by-Variable Signal Design

Each variable has four measurement modes:
- **Ideal:** High-quality measurement under lab-like or cooperative conditions.
- **Low-friction:** Small explicit interactions that fit into normal app usage.
- **Passive:** No user action required.
- **Inferred:** Model-based estimation from other signals.

Each signal is scored (MVP heuristic):
- **User Effort (UE):** 1–10, lower is better.
- **Predictive Value (PV):** 1–10, higher means stronger link to adherence outcomes.
- **Reliability (R):** 1–10, higher means more stable/consistent.
- **MVP Suitability:** Yes/No for Phase 1.

### 2.1 Capability (K)

**Ideal measurement**
- Structured daily survey about sleep, stress, workload, emotions, and perceived capacity.
- UE: 8, PV: 9, R: 7, MVP: No (too heavy for daily use).

**Low-friction measurement**
- **1–5 daily capacity slider** (e.g., “How capable do you feel for movement today?”) shown only on some days or when user opens the app.
  - Frequency: 2–3× per week max.
  - UE: 4, PV: 8, R: 7, MVP: Yes.

**Passive measurement**
- Time-of-day, day-of-week, calendar density (busy vs free slots), last sleep duration (if integrated later), recent app usage streak.
  - Frequency: continuous.
  - UE: 1, PV: 6, R: 8, MVP: Yes.

**Inferred measurement**
- K_low inferred when many “too tired / too busy” skip reasons appear, or when adherence drops during known high-stress periods (calendar blocks, late nights) while other variables seem stable.
  - UE: 1, PV: 7, R: 6, MVP: Yes.

**Accuracy tradeoffs & privacy**
- Ideal surveys are accurate but unsustainable; low-friction + passive + inference should dominate.
- Calendar integration and sleep data are privacy-sensitive: must be opt-in, with clear benefit messaging.

### 2.2 Self-Efficacy (SE)

**Ideal measurement**
- Short domain-specific efficacy scales (e.g., 5–8 items about confidence in exercising under different obstacles).
  - UE: 7, PV: 9, R: 8, MVP: No (save for research waves, not daily product).

**Low-friction measurement**
- Single-item SE rating when user activates or edits a plan: “How confident are you that you can follow this plan this week?” (0–10).
  - Trigger: plan creation/major change, or once every few weeks.
  - UE: 3, PV: 8, R: 7, MVP: Yes.

**Passive measurement**
- None direct; SE must be inferred from behavior, not passively sensed.

**Inferred measurement**
- SE implied by success ratio vs ambition: if user repeatedly completes planned sessions at chosen intensity, assume SE is moderate–high; repeated failure implies low or miscalibrated SE.
  - UE: 1, PV: 7, R: 7, MVP: Yes.

**Accuracy tradeoffs & privacy**
- SE self-reports may be biased (over/under-confidence); models should treat them as **prior beliefs** and update based on outcomes.

### 2.3 Identity (Id)

**Ideal measurement**
- Multi-item identity scales comparing “exercise is central to who I am” vs “just something I sometimes do.”
  - UE: 7, PV: 8, R: 8, MVP: No.

**Low-friction measurement**
- Occasional endorsement of identity statements: “This feels like the kind of person I want to be” (1–5) after several weeks of use.
  - Frequency: 1× after 4–6 weeks; at most quarterly.
  - UE: 2–3, PV: 7, R: 7, MVP: Yes (but low frequency).

**Passive measurement**
- Long-term adherence pattern (months), continued use after achieving initial goals, use of identity-laden language in optional notes (“I’m a runner now”).
  - UE: 1, PV: 7, R: 8, MVP: Yes (adherence history only).

**Inferred measurement**
- Id_established assumed if: 3+ months of consistent adherence at moderate load + user remains active without external prompts.
- Id_rigid inferred if: user distressed when plan form changes, even if substitute behaviors are offered.
  - UE: 1, PV: 7, R: 6, MVP: Yes.

**Accuracy tradeoffs & privacy**
- High-stakes identity questions can feel uncomfortable; keep them rare and framed positively.

### 2.4 Automaticity (A)

**Ideal measurement**
- Detailed habit automaticity scales for each behavior.
  - UE: 7, PV: 8, R: 8, MVP: No.

**Low-friction measurement**
- Occasional 1-item prompt: “Today’s session felt almost automatic (1–5).”
  - Frequency: at most 1× every 2 weeks per user.
  - UE: 3, PV: 7, R: 6, MVP: Nice-to-have.

**Passive measurement**
- Regularity of execution vs plan: proportion of sessions done within a consistent time window and context (e.g., same hour, same place) with minimal reminders.
  - UE: 1, PV: 8, R: 8, MVP: Yes.

**Inferred measurement**
- A_high inferred when: high completion rate, low notification reliance, stable timing and context over many repetitions.
  - UE: 1, PV: 8, R: 7, MVP: Yes.

**Accuracy tradeoffs & privacy**
- Automaticity is well-approximated by behavior patterns; self-report is secondary.

### 2.5 Context (X)

**Ideal measurement**
- Rich context tagging (location, social company, environment factors, barriers) for every session.
  - UE: 9, PV: 9, R: 8, MVP: No.

**Low-friction measurement**
- Simple context selection at plan level: “Where will you usually do this?” (home/gym/outside) and “Alone or with others?”
  - Collected on plan creation or edit.
  - UE: 2, PV: 7, R: 8, MVP: Yes.
- Optional reason tags when skipping: “too tired / too busy / place unavailable / social conflict / other.”
  - UE: 3, PV: 8, R: 7, MVP: Yes.

**Passive measurement**
- Time-of-day, day-of-week, rough location (with permission), and calendar density.
  - UE: 1, PV: 7, R: 8, MVP: Yes, with opt-in for location/calendar.

**Inferred measurement**
- Good vs bad slots from completion rates.  
- Friction type from aggregated skip reasons.
  - UE: 1, PV: 8, R: 7, MVP: Yes.

**Accuracy tradeoffs & privacy**
- Location and calendar data must be strictly opt-in and clearly explained; consider operating without them initially.

### 2.6 Emotion (Em)

**Ideal measurement**
- Rich mood and emotion inventories pre/post every session.
  - UE: 9, PV: 8, R: 7, MVP: No.

**Low-friction measurement**
- Very occasional valence-only quick check: “Before we start, how do you feel about this?” with 3 faces (negative/neutral/positive).
  - Frequency: at most 1× per week.
  - UE: 3, PV: 7, R: 6, MVP: Maybe (later waves).
- After-selected sessions: 1-tap “I feel proud / okay / frustrated.”
  - UE: 2–3, PV: 7, R: 6, MVP: Yes if implemented sparingly.

**Passive measurement**
- Emoji/word choices in optional reflections (later), timing of app opens relative to planned sessions (anticipatory anxiety vs eagerness), though inferential.

**Inferred measurement**
- Em_dread inferred from repeated last-minute skips of same activity + complaints.
- Em_pride inferred from steady execution and voluntary reflection usage.

**Accuracy tradeoffs & privacy**
- Emotions are sensitive; keep questions rare and optional; emphasize that answers improve personalization.

### 2.7 Self-Trust (T_self)

**Ideal measurement**
- Dedicated self-trust scales (multiple items about following through on commitments).
  - UE: 7, PV: 8, R: 7, MVP: No.

**Low-friction measurement**
- Occasional check: “Right now, how much do you trust yourself to follow through on this kind of plan?” (0–10).
  - Frequency: 1× at onboarding, 1× after a recovery flow, 1× every few months.
  - UE: 3, PV: 8, R: 6, MVP: Yes.

**Passive measurement**
- Long-term ratio of committed to completed behaviors.
  - UE: 1, PV: 8, R: 8, MVP: Yes.

**Inferred measurement**
- T_self_low inferred from chronic over-planning with low completion + negative self-talk in surveys.

**Accuracy tradeoffs & privacy**
- Framing must avoid shame; emphasize “everyone can rebuild self-trust” when asking.

### 2.8 System Trust (T_sys)

**Ideal measurement**
- Detailed trust-in-system scales; user interviews.

**Low-friction measurement**
- Tiny post-intervention question: “Was this suggestion helpful?” yes/no.
  - Frequency: after selected adaptations only.
  - UE: 2, PV: 7, R: 7, MVP: Yes.
- Occasional sentiment slider: “I feel this app is on my side” (1–5).
  - UE: 3, PV: 7, R: 6, MVP: Yes but rare.

**Passive measurement**
- Acceptance rate of suggestions, continued usage after changes, avoiding disabling features.
  - UE: 1, PV: 8, R: 8, MVP: Yes.

**Inferred measurement**
- T_sys_low inferred when user repeatedly rejects suggestions, disables notifications, or stops using adaptation-related features shortly after they are enabled.

**Accuracy tradeoffs & privacy**
- Trust data is sensitive but less personal; main concern is to avoid manipulative use of trust metrics.

---

## 3. Signal Tier Hierarchy

### Tier 1: Completely Passive Signals

- Activity completions, skips, postpones.
- Timing (timestamp) and day-of-week.
- Notification opens, dismissals, and ignores.
- App opens and session length.
- Plan structure (sessions/week, type, intensity proxy).
- Future: wearable step counts, heart rate, sleep duration (opt-in), calendar density, coarse location.

**Use:** Always-on; backbone of Learning Engine and high-level variable inference.

### Tier 2: One-Tap Interactions

- Skip reason buttons.
- “Helpful / not helpful” on suggestions.
- One-tap emotion tags (proud / okay / frustrated) after some sessions.
- Micro-commitment or choice selection (“stay same plan” vs “lighten it a bit”).

**Use:** Piggyback on existing flows (when user is already in app); never block primary action.

### Tier 3: Occasional Micro-Check-Ins

- Single sliders for SE (“how confident this week?”), capacity (“how capable today?”), or self-trust (“how much do you trust yourself right now?”).
- Identity or trust endorsement statements (rare).

**Use:** Trigger sparingly (e.g., at plan creation, after recovery, or every few months), ideally when user is already reflecting.

### Tier 4: Explicit Questionnaires

- Multi-item scales for research; not routine product.
- Only used in opt-in research mode or for a small subset of users.

**Use:** Outside MVP; behind explicit consent; separate from main experience.

The system should **default to Tier 1 and Tier 2**, occasionally use Tier 3 when value is clear, and almost never use Tier 4 in the core product.

---

## 4. Why Users Drop Out (Research Lens → Design Constraints)

Key reasons users stop engaging with tracking and check-ins:

1. **Too many prompts, too often.** Daily questionnaires quickly feel like homework.
2. **No visible payoff.** Users don’t see how their answers change anything.
3. **Redundant questions.** Asking the same thing repeatedly with no adaptation causes fatigue.
4. **Negative emotional tone.** Questions that highlight failure or shame drive avoidance.
5. **Complex or long onboarding.** Large forms before any value is shown lead to early abandonment.
6. **Notification fatigue.** Frequent or poorly timed notifications get ignored or disabled.

BSAM embeds these as constraints: minimal prompts, clear payoffs, progressive profiling, and emotionally safe language.

---

## 5. Minimum Viable Behavioral Dataset

**Objective:** Smallest practical signal set that supports Daily State, Adaptation, Recovery, and Learning engines without overwhelming users.

### 5.1 Absolutely required (MVP)

From **Tier 1 (passive)**:
- Activity events: scheduled, completed, skipped, postponed.
- Timestamps + planned vs actual time.
- Plan structure: sessions/week, type, approximate load.

From **Tier 2 (one-tap)**:
- Skip reasons (few options).
- Suggestion acceptance/rejection.

From **Tier 3 (micro-check-ins)** – minimal set:
- SE at plan creation: “How confident are you in this plan this week?”
- Occasional capacity slider (1–5) 1–2×/week.

These alone enable:
- Daily State (winning vs struggling vs recovering vs burnout risk).  
- Basic Adaptation (lightening or strengthening plans based on adherence, SE, K, Debt).  
- Recovery detection (miss sequences + plan context).  
- Learning (slot effectiveness, load sensitivity, suggestion performance).

### 5.2 Optional but valuable

- One-tap emotions after some sessions.  
- Self-trust quick check after notable lapses or recoveries.  
- Simple context selection at plan creation (home/gym/outside; alone/with others).  
- Occasional identity endorsement after months of use.

### 5.3 Signals to avoid in core MVP

- Long, multi-page onboarding questionnaires.  
- Detailed daily mood and affect surveys.  
- Continuous location tracking or full calendar ingestion at launch (add later with strong value story).  
- Free-text journals as a required step (keep optional and value-driven).

---

## 6. Progressive Profiling Strategy

### Day 0 (onboarding)

**Goal:** Get user to a usable plan in <2–3 minutes while capturing the bare minimum.

Collect:
- Basic profile (age band, sex if needed for safety, rough training level via 1–2 questions).
- High-level goal selection (e.g., “exercise consistency 3×/week”, “more movement, no intensity focus”).
- Preferred rough schedule (days/week; morning/any/evening preference).  
- **SE-on-plan**: “How confident are you that you can follow this plan this week?”

Skip:
- Identity questions, emotions, detailed context, self-trust, long history.

### Week 1

**Goal:** Confirm plan viability and get early adherence data.

Collect (light touch):
- Skip reasons (one-tap) when sessions are missed.
- Occasional capacity slider (1–5) 1–2×.

Optional:
- 1–2 one-tap post-session emotions.

### Week 4

**Goal:** Decide whether to adapt plan; start light identity/SE checks.

Collect:
- Updated SE for current plan (0–10).  
- One self-trust check if patterns suggest chronic misses.  
- Optional short identity endorsement (“This is starting to feel like who I am” 1–5).

### Month 3

**Goal:** Detect deeper adherence patterns and identity, evaluate long-term trajectory.

Collect:
- Short check-in: satisfaction with progress, sense of identity alignment, trust in system.
- Optional opt-in for richer research surveys for interested users.

Throughout, use **Learning Engine outputs** to decide who to ask and when (e.g., don’t ask SE questions from users who rarely use the app).

---

## 7. Confidence Model

Each variable estimate should have an associated **confidence score** (0–1 or 0–100), based on:

- Amount of data (number of relevant events or responses).
- Recency of data.
- Consistency of patterns.

### Behavior when confidence is low

- **Be conservative.** Avoid big plan changes based solely on low-confidence inferences.
- **Ask micro-questions only when necessary.** For example, if SE confidence is low and user is struggling, ask a 1-item SE question rather than many items.
- **Show uncertainty, not false certainty.** When explaining suggestions, use language like “It seems like…” rather than “We know that…”.

Confidence is a key guardrail against overfitting on noisy or sparse data.

---

## 8. Missing Data Strategy

Missing data is expected: users will skip check-ins, ignore surveys, and sometimes become inactive.

### 8.1 When check-ins are skipped

- Do **not** punish or nag. Simply fall back to behavioral signals (Tier 1) and only retry later if value is clear.
- Use fewer, better-timed prompts rather than increasing frequency.

### 8.2 When surveys are ignored

- Treat it as a preference: the user is signaling that this type of question is not valuable or too costly right now.
- Mark their “survey tolerance” low and adapt: fewer prompts, rely more on inference.

### 8.3 When user becomes inactive

- Use Recovery Engine: detect lapse and send **one or two well-crafted prompts** offering an easy re-entry, not a barrage.
- If no response, stop prompting; wait for user-initiated re-entry, then run a gentle recovery flow.

### 8.4 Default behaviors under uncertainty

- If variable estimates are missing or low-confidence, the system should **default to safer, lighter plans** rather than aggressive loads.

---

## 9. Signal Acquisition Architecture (High-Level)

### Inputs (event stream)

- **Activity events:** created, completed, skipped, postponed; with timestamps and plan IDs.
- **Interaction events:** app opens, screen views, notification delivered/opened/dismissed, suggestion accepted/rejected.
- **Micro-check-ins:** SE ratings, capacity sliders, self-trust quick checks, 1-tap emotions.
- **Context tags:** plan-level context (home/gym/outside; alone/with others), skip reasons.
- **Future external signals:** wearable data (steps, sleep), calendar busy/free flags.

### Processing

- **Aggregation layer:** transforms raw events into per-user, per-plan features (completion rates, slot effectiveness, streaks, load vs success, recent K/Em patterns).
- **Estimator layer:** computes variable estimates (K, SE, Id, A, X, Em, T_self, T_sys) + confidence scores based on HAOM V5 operationalization.
- **State layer:** Daily State Engine consumes estimates + adherence metrics → assigns state labels.
- **Decision layer:** Adaptation, Recovery, and Learning engines use state and variables to generate suggestions and plan updates.

### Outputs

- Per-user state vector: {K, SE, Id, A, X, Em, T_self, T_sys} with confidence.
- Daily State label and transitions.
- Adaptation suggestions (including expected impact and confidence).
- Recovery flow triggers.
- Learning Engine reports (e.g., best slots, effective plan ranges, effective interventions).

---

## 10. MVP Recommendation – Smallest Practical Signal Set

To support Daily State, Adaptation, Recovery, and Learning **without overwhelming users**, start with:

**Tier 1 (always-on):**
- Activities: scheduled, completed, skipped, postponed (+ timestamps).
- Plan structure and load (sessions/week, estimates of intensity or minutes).
- Notifications: sent, opened, dismissed.
- App opens and rough session durations.

**Tier 2 (one-tap):**
- Skip reasons (2–4 options, optional prompt post-skip).
- Suggestion acceptance/rejection (simple yes/no on adaptations).

**Tier 3 (micro-check-ins):**
- SE at plan creation or major edit (0–10 scale, one item).
- Capacity slider (1–5) once or twice per week.

Everything else (emotions, self-trust sliders, identity prompts, context detail, wearables, calendar) should be **optional, sparsely used, or added later** based on clear evidence that benefits outweigh burden.

This MVP dataset is sufficient to:

- Infer **Daily State** from adherence trends, K proxies (capacity slider + skip reasons), and Behavioral Debt (completions under low K).
- Run core **Adaptation** rules (load adjustments, slot moves) based on adherence, K, and SE.
- Drive **Recovery** flows using missed sequences and basic diagnostics.
- Power **Learning** for time slots, load levels, and intervention success, enabling tangible improvements without asking users to become full-time self-trackers.

The long-term competitive advantage will come from how intelligently and respectfully the system uses these small signals to adapt plans and experiences, not from collecting every conceivable data point.
