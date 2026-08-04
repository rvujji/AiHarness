# Behavioral Influence Model (BIM)

> Purpose: define how the product should **influence behavior, communicate with users, and shape psychology over time** so that adherence improves in a durable, human-centered way. This is not a motivation layer, not a quote engine, and not a gamification system. It is the implementation-oriented psychological layer for a consumer product built on HAOM V5, BSAM V1, and MAOM V2.

---

## Part 1 – Influence Philosophy

### 1.1 What the system should optimize psychologically

The system should optimize for five outcomes:

1. **Repeated small successes** that build self-efficacy.
2. **Repair after failure** so misses do not become abandonment.
3. **Preserved autonomy** so users feel they are choosing, not being controlled.
4. **Rebuilt self-trust** through right-sized commitments that are actually kept.
5. **Long-term identity shift** from “I should exercise” to “this is something I do.”

### 1.2 What the system should never do

The system should never optimize for guilt, fear, streak obsession, emotional dependency on the app, or short-term compliance that undermines long-term adherence. It should also never push intensity when consistency is fragile, because fragile success damages self-efficacy and self-trust more than it helps fitness.

### 1.3 Human Coach Equivalence principle

The product should behave like a competent, non-judgmental coach: notice misses early, check in without blame, identify the likely cause, reduce difficulty when needed, and quickly create the next achievable success. If a product behavior would feel manipulative, shaming, or overly rigid from a human coach, it should not ship.

### 1.4 Recovery-first philosophy

The product should assume that misses are normal and design for return, not perfection. Psychologically, this means protecting users from all-or-nothing collapse after lapses and making re-entry smaller, faster, and emotionally safer than “starting over.”

### 1.5 Autonomy-first philosophy

The product should guide, not command. Recommendations should be clear and opinionated, but users should retain choice over whether to accept, postpone, or modify them because perceived control improves internalization and long-term adherence.

### 1.6 How the product should feel

The product should feel:
- **Supportive**
- **Collaborative**
- **Adaptive**
- **Competent**
- **Calm**
- **Non-judgmental**

It should never feel:
- Controlling
- Guilt-inducing
- Parental
- Manipulative
- Overexcited
- Disappointed in the user

---

## Part 2 – Self-Efficacy Model

Self-efficacy is one of the strongest predictors of exercise adherence and is also an outcome of exercise participation itself. For product design, it should be treated as a variable the system deliberately builds through experience, not just measures.

### 2.1 How self-efficacy is built

Research and Bandura’s framework suggest four major sources: **mastery experiences, vicarious experience, social persuasion, and interpretation of physiological/emotional states**. For this product, mastery is the highest-leverage mechanism because successful execution of realistic plans is both the cleanest signal and the least reliant on external content or community.

### 2.2 How self-efficacy is destroyed

Self-efficacy falls when users repeatedly fail at self-set or system-set commitments, when plans are obviously unrealistic, when the product escalates too quickly, or when lapses are framed as proof of weakness rather than plan mismatch. It also drops when bodily fatigue or stress are interpreted as “I can’t do this” rather than “today needs a lighter version.”

### 2.3 Self-efficacy triggers, signals, interventions

| Element | Product interpretation |
|---|---|
| Triggers that build SE | Completing planned workouts, completing shortened workouts after a miss, successful recovery after lapse, visible evidence of “I can do hard things in small doses.” |
| Triggers that reduce SE | Consecutive misses, over-ambitious plans, repeated restarts, difficulty spikes, failure after accepting an adaptation. |
| Signals | Confidence prompt, completion ratio, recovery completions, repeated skip reasons like “too hard” or “couldn’t do it.” |
| Interventions | Reduce plan difficulty, create micro-wins, reflect recent wins, explicitly normalize scaled success, avoid escalating too soon. |

### 2.4 Messaging examples

Helpful:
- “Let’s make this week easier so you can build momentum again.”
- “A 10-minute session still counts as following through.”
- “You came back after a hard week. That is progress.”

Harmful:
- “You can do anything if you try harder.”
- “Don’t break the streak.”
- “No excuses.”

### 2.5 Self-Efficacy Building Framework

1. **Start below ego level**: initial plans should feel slightly easy, not inspiringly ambitious.
2. **Protect early wins**: after misses, default to smaller actions rather than redoubling effort.
3. **Reflect success specifically**: name what the user did, not vague praise (“You completed 2 workouts during a busy week”).
4. **Interpret fatigue safely**: suggest reduced versions rather than binary success/failure.
5. **Only progress after stability**: progression should follow repeated success, not optimism alone.

**Product behavior change:** The system should prefer smaller achievable plans, downshift quickly after friction, and phrase success as evidence of capability.

---

## Part 3 – Self-Trust Model

Self-trust is not the same as self-efficacy. Self-efficacy is “I believe I can do this”; self-trust is “I believe I follow through on what I commit to.” In product terms, self-trust is damaged by broken promises, especially repeated self-broken promises.

### 3.1 What creates self-trust

Self-trust grows when users repeatedly make commitments they can realistically keep, see themselves honoring those commitments, and experience the app as a tool that helps them make more honest commitments. In practical terms, this means commitments must be **small, clear, time-bound, and survivable under normal life variability**.

### 3.2 What destroys self-trust

Self-trust falls when users repeatedly overcommit, repeatedly “restart,” or are nudged into plans that look aspirational but are not behaviorally sustainable. Each broken promise does more damage when the product frames the failure morally or emotionally rather than structurally.

### 3.3 How commitments should be designed

Good commitments for MVP are:
- Small enough to survive imperfect weeks
- Binary enough to evaluate clearly
- Frequent enough to produce evidence quickly
- Flexible enough to allow recovery versions

Bad commitments are:
- Vague (“move more”) 
- Heroic (“6 workouts every week starting now”) 
- Identity-threatening (“real athletes never skip”) 
- Structured so one miss invalidates the whole effort

### 3.4 How commitments should be repaired

When self-trust is damaged, the product should reduce the promise size immediately, create a fast next commitment, and explicitly treat the new small promise as a meaningful success opportunity rather than a consolation prize.

### 3.5 Self-Trust Recovery Framework

1. Detect repeated broken promises.  
2. Reduce future commitments.  
3. Give one fast, easy next promise.  
4. Reinforce completion as reliability, not intensity.  
5. Only expand commitments after several kept promises in a row.

Helpful message:
- “Let’s make the next promise easier to keep.”

Harmful message:
- “You just need to recommit harder this time.”

**Product behavior change:** The adaptation engine should shrink commitment size when follow-through falls, and success summaries should emphasize promise-keeping, not only volume.

---

## Part 4 – Identity Formation Model

Identity-based change is durable because behavior becomes part of self-concept rather than a recurring willpower project. In product terms, identity should not be forced through slogans; it should emerge from repeated evidence and reflective language.

### 4.1 Transition pathway

The psychological shift is typically:
1. “I should exercise.”
2. “I am trying to exercise consistently.”
3. “I can be someone who follows through.”
4. “I am someone who exercises.”
5. “I am someone who returns, even after disruption.”

### 4.2 Identity Progression Framework

| Stage | User belief | Evidence required | Product intervention |
|---|---|---|---|
| Stage 1: External intention | “I should do this.” | None yet | Keep language practical, avoid identity claims |
| Stage 2: Active attempt | “I’m trying.” | 1–2 weeks of real attempts | Reflect effort and honest participation |
| Stage 3: Reliable actor | “I can follow through sometimes.” | Multiple kept commitments and at least one recovery after a miss | Highlight reliability and comeback behavior |
| Stage 4: Identity adoption | “This is something I do.” | Several weeks of stable consistency | Use identity-supportive summaries sparingly |
| Stage 5: Resilient identity | “Even when I slip, I come back.” | Successful recovery cycles | Emphasize return, not perfection |

### 4.3 Evidence required to move stages

Identity should advance only when behavior supports it. The product should not say “You are a committed exerciser now” after two workouts; it should wait until the user has demonstrated repeated follow-through or recovery behavior.

### 4.4 Product implications

- Identity language should be **earned, not given**.  
- Recovery behavior is identity-forming, not just maintenance behavior.  
- The strongest identity for this product may be: **“I’m someone who comes back.”**

**Product behavior change:** Use identity-supportive language only after evidence, and orient identity around return and consistency rather than intensity.

---

## Part 5 – Recovery Psychology

### 5.1 What happens psychologically after a missed workout

A single miss often triggers self-criticism, rationalization, or minimization, but it does not need to cause collapse if the next action remains simple and emotionally safe. The danger is not the miss itself; it is the meaning the user attaches to it.

### 5.2 After a missed week or repeated failure

Repeated failure increases shame, weakens self-efficacy, and promotes all-or-nothing thinking (“I blew it, so I might as well stop”). In digital products, this often combines with avoidance: people stop opening the app because the app becomes a mirror of failure.

### 5.3 Recovery Framework

1. **Normalize the lapse** – “This happens.”  
2. **Remove moral tone** – the plan did not fit; the user did not fail as a person.  
3. **Shrink the re-entry step** – make the next action smaller than the pre-lapse action.  
4. **Preserve continuity** – frame the comeback as continuation, not starting from zero.  
5. **Rebuild quickly** – first recovery win should happen within 24–72 hours if possible.

### 5.4 Helpful vs harmful messages

Helpful:
- “Looks like this plan stopped fitting your week. Let’s make the next step easier.”
- “You don’t need a perfect reset. You just need one doable next session.”
- “Coming back counts.”

Harmful:
- “You were doing so well.”
- “Start over from day 1.”
- “Stay disciplined.”
- “Don’t quit now.”

**Product behavior change:** Recovery flows should use neutral, practical language and avoid all reset metaphors that imply total loss of progress.

---

## Part 6 – Momentum Psychology

Behavioral momentum matters because recent success makes the next action easier, while recent failure increases hesitation and friction. For product design, momentum is not a score to display; it is something to protect operationally.

### 6.1 Momentum Framework

#### How momentum is built
- Repeated completion in the same slots
- Small wins close together in time
- Fast recovery after small lapses
- Plans that remain stable long enough to feel normal

#### How momentum is lost
- Gaps between completions
- Misses without recovery support
- Overly aggressive progression
- Repeated reminders of failure

#### How momentum should be protected
- Avoid large difficulty jumps after one good week.
- Detect and respond after 1–2 misses, not only after collapse.
- Prefer keeping behavior alive at smaller dose rather than preserving original plan size.

#### How momentum should be restarted
- Use a micro-win within 48 hours.
- Make the action concrete, specific, and low-friction.
- Reinforce “you’re moving again” rather than “you’re back on track” if the comeback is still fragile.

**Product behavior change:** The adaptation engine should prefer continuity-preserving changes over hard resets, and notifications after misses should aim at the next tiny action rather than renewed ambition.

---

## Part 7 – Autonomy Model

Self-Determination Theory shows that autonomy support is associated with more self-determined motivation and better exercise adherence. Products often damage autonomy by disguising commands as coaching.

### 7.1 How systems accidentally reduce autonomy

- Presenting only one “correct” option
- Auto-changing plans without explanation
- Over-notifying
- Framing compliance as moral virtue
- Using pressure language (“you need to”, “don’t break this”) 
- Punishing missed actions with red screens or resets

### 7.2 Autonomy Preservation Framework

#### When should the system recommend?
- When data clearly indicates a better plan fit (e.g., evening workouts repeatedly fail, mornings work).
- When current plan is clearly too hard.

#### When should the system ask?
- When more than one reasonable adaptation exists.  
- When the user’s preference matters more than prediction certainty.  
- After misses, because user context may have changed in ways the system cannot infer.

#### When should the user decide?
- Whether to accept a plan change.  
- Whether to keep stable or progress after success.  
- Whether to recover through shorter duration, fewer days, or schedule shift when multiple options are viable.

### 7.3 Design rule

The product should **recommend with rationale, then let the user choose whenever the cost of being wrong is meaningful**.

**Product behavior change:** Every adaptation surface should include a rationale and at least one user-controlled path, especially in recovery or progression moments.

---

## Part 8 – Trust Model

### 8.1 Self Trust

#### How self-trust is earned
- Repeatedly keeping realistic commitments
- Recovering after lapses
- Seeing clear evidence that smaller promises still count

#### How self-trust is lost
- Chronic overcommitting
- Repeated broken promises
- Product experiences that imply “you failed again”

#### How self-trust is repaired
- Smaller promises
- Faster wins
- Explicit framing around reliability, not intensity

### 8.2 System Trust

#### How system trust is earned
- Good recommendations that make life easier
- Clear explanations of why a change is suggested
- Calm, respectful tone
- Predictable behavior after misses

#### How system trust is lost
- Unexplained or incorrect adaptations
- Too many reminders
- Perceived judgment
- Big changes after little data

#### How system trust is repaired
- Acknowledge uncertainty (“It looks like evenings may be harder — want to try mornings?”)  
- Reduce recommendation frequency if ignored  
- Ask permission before larger changes

### 8.3 Trust Maintenance Framework

1. Be right often enough to be useful.  
2. Be transparent when uncertain.  
3. Never shame.  
4. Never override silently.  
5. Prefer small, reversible recommendations.

**Product behavior change:** Adaptations should be explainable and reversible, and ignored suggestions should reduce future aggressiveness.

---

## Part 9 – Communication Framework by Daily State

### On Track
- **Tone:** calm, validating, non-excitable
- **Message style:** observational, confidence-preserving
- **Intervention style:** minimal; maintain or offer optional small progression

Examples:
- “Your plan seems to fit your week well.”
- “You completed 3 of 3 workouts. Want to keep this plan or make a small change?”

### At Risk
- **Tone:** supportive, practical, non-alarmist
- **Message style:** identify mismatch without blame
- **Intervention style:** recommend a simpler or better-fitting plan

Examples:
- “It looks like this plan is getting harder to follow. Want to make this week easier?”
- “Evenings seem tough lately. We can move one session earlier.”

### Recovering
- **Tone:** encouraging, careful, protective
- **Message style:** comeback-focused, not celebratory
- **Intervention style:** small wins, maintain fragility awareness

Examples:
- “Good restart. Let’s keep this light for now.”
- “One completed session after a rough stretch is exactly how momentum comes back.”

### Restarting
- **Tone:** gentle, low-pressure, simplifying
- **Message style:** reduce emotional weight, lower the threshold
- **Intervention style:** one tiny next step, not a full reboot

Examples:
- “Let’s make the next step very easy.”
- “You don’t need a reset. You just need one doable session.”

**Product behavior change:** Communication should vary by state, but always remain calm, collaborative, and non-judgmental.

---

## Part 10 – Intervention Acceptance Model

Users accept recommendations when they feel accurate, respectful, low-cost, and autonomy-preserving. Users reject recommendations when they feel misunderstood, controlled, or embarrassed.

### 10.1 What increases compliance

- Clear rationale tied to observed data
- Small, reversible changes
- Timing recommendations to moments of friction or reflection
- Preserving dignity (“the plan didn’t fit”) 
- Offering 2–3 reasonable choices instead of one command

### 10.2 What creates resistance

- Commands without explanation
- Aggressive reductions that feel insulting
- Large changes after a single bad day
- Recommendations that threaten identity
- Repeated prompts after the user has ignored prior ones

### 10.3 Intervention Acceptance Framework

When presenting an adaptation, include:
1. **Observation** – what happened  
2. **Interpretation** – likely mismatch  
3. **Suggestion** – recommended change  
4. **Choice** – accept / adjust / keep current plan

Example:
- “You’ve missed the last two evening sessions. Evenings may not be the best fit right now. We can move them to mornings or shorten them this week. What would you prefer?”

**Product behavior change:** Every major adaptation should be presented as observed mismatch + recommended change + user choice.

---

## Part 11 – Psychological Anti-Patterns

### 11.1 Guilt and shame

Harmful because they increase avoidance, reduce self-trust, and can make the app itself feel threatening after lapses. Never use disappointment framing, red-failure screens, or language implying the user let the system down.

### 11.2 Streak obsession

Harmful because it turns adherence into fragility: one miss can feel like total collapse. It also encourages users to protect streaks rather than build resilient routines.

### 11.3 Over-notification

Harmful because it creates fatigue, reactance, and learned ignoring. Once users feel chased, the product stops feeling supportive.

### 11.4 Toxic positivity

Harmful because it invalidates genuine friction and makes recommendations feel generic. “You’ve got this!” is not useful if the plan is objectively too hard.

### 11.5 Perfectionism reinforcement

Harmful because it frames reduced plans, recovery weeks, or shorter sessions as inferior rather than strategic. This directly undermines recovery-first design.

### 11.6 Unrealistic commitments

Harmful because they generate repeated broken promises, which damage both self-efficacy and self-trust.

**Product behavior change:** The app should remove features or copy that moralize misses, worship streaks, or reward unrealistic ambition.

---

## Part 12 – MVP Influence Layer

For MAOM V2, the MVP does **not** need a full coaching system. It needs a focused influence layer that strengthens the adaptive loop.

### 12.1 Influence mechanisms required for MVP

1. **Mastery-first planning** – starter plans should feel achievable.
2. **Recovery-first messaging** – immediate non-shaming response to misses.
3. **Adaptation rationale** – explain why changes are suggested.
4. **Choice-preserving adaptation UI** – users can accept, modify, or defer changes.
5. **Promise-repair framing** – smaller next commitments restore self-trust.
6. **State-sensitive communication** – tone varies by On Track / At Risk / Recovering / Restarting.

### 12.2 Messaging required for MVP

Needed now:
- Missed workout messages
- Recovery prompts
- Adaptation recommendation copy
- Weekly summaries framed around fit and follow-through
- Progression copy that is optional, not pushy

Can wait until PMF:
- Rich reflective journaling
- Long-form educational content
- Identity journeys
- Social support scripts
- Motivational interviewing-style conversations at scale

### 12.3 Coaching behaviors required for MVP

The product should mimic only the most essential coach behaviors:
- Notice misses
- Interpret them as mismatch, not moral failure
- Make the next action easier
- Explain the adjustment
- Protect autonomy
- Reinforce comeback behavior

That is enough to test the adaptation hypothesis.

---

## Part 13 – Founder Recommendations

### 13.1 Rank influence mechanisms by evidence, complexity, impact

| Influence mechanism | Evidence strength | Implementation complexity | Expected adherence impact | MVP priority |
|---|---|---:|---:|---|
| Right-sized initial plans | High | Low | Very high | 1 |
| Early recovery after misses | High | Medium | Very high | 2 |
| Smaller “micro-win” substitutions | High | Low | High | 3 |
| Adaptation with explicit rationale | High | Low | High | 4 |
| User choice on adaptations | High | Medium | High | 5 |
| Non-shaming lapse messaging | High | Low | High | 6 |
| Reflecting concrete wins | Medium-high | Low | Medium-high | 7 |
| Progress only after stability | Medium-high | Low | Medium-high | 8 |
| Time-slot adaptation | Medium | Medium | Medium-high | 9 |
| Identity-earned messaging | Medium | Medium | Medium | 10 |

### 13.2 Top 10 highest-leverage psychological interventions for MVP

1. Start users on plans that are easier than their aspirational self wants.  
2. Trigger soft recovery after early misses instead of waiting for full collapse.  
3. Offer a smaller version of the behavior rather than a binary fail state.  
4. Explain every adaptation in plain language tied to observed reality.  
5. Let users choose among a small set of reasonable adaptations.  
6. Remove guilt, disappointment, and streak-protection from core copy.  
7. Reflect specific follow-through as evidence of capability.  
8. Keep progression optional and stability-based.  
9. Use schedule-fit learning to recommend better slots.  
10. Treat comeback behavior as a major success signal.

### 13.3 Final founder guidance

The core question for BIM is always:

> **What product behavior changes because of this?**

If a psychological concept does not change:
- how the app responds to misses,
- how it sizes plans,
- how it explains adaptations,
- how it protects autonomy,
- or how it repairs self-trust,

then it should not be in the MVP influence layer.

The strongest initial psychological position for the product is not “we motivate you.” It is:

> **We help you keep going without making you feel bad when life gets messy.**

That is credible, differentiated, and implementable in a consumer product.