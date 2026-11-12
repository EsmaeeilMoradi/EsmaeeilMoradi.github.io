This article is the written companion to **Episode 0**. Read it for the full argument; watch the video for the spoken walkthrough. Same ideas, different medium.

## The real question

This series is for Android engineers.

Not for people who want to ship an App Store clone with one English sentence and zero fundamentals.

If you’ve used an AI agent to write Android code — and sometimes it felt amazing, and sometimes two days later you wanted to throw half the project away — this is for you.

We’re not debating whether developers should use AI. That debate is over.

The useful question is simpler and harder:

**How do you brief the agent?**

## What this episode gives you

By the end you should have five things:

1. A clear map of four ways Android teams actually use agents  
2. An honest cost model: tokens, rework, and device risk  
3. Why spec-driven work is usually the cheapest path for real apps  
4. What bad Android specs quietly destroy  
5. Where this series goes next — a real product angle with Android constraints (offline, FOSS-minded, device-verified)

No habit-tracker demo. No Instagram clone.

## The shift

A few years ago the main questions were: Do you know Kotlin? Do you know Compose? Can you design an architecture that survives a second feature?

Now there’s a new layer: the agent. It can create files, read your repository, propose tests, and keep working for minutes without you typing every line.

Hard truth:

**Agents multiply speed. They do not replace engineering judgment.**

On Android that matters more than on a disposable web demo.

A green Gradle build is not success. You still own lifecycle, configuration changes, permissions, background limits, offline storage, navigation edge cases, and what happens on a cheap phone with a slow disk.

So stop asking “Do you use AI?”  
Ask: **What method are you using when you talk to the agent?**

## Four methods teams actually use

In real work these modes blend. For decisions, keep them separate. If you can’t name the mode you’re in, you’re probably vibe-coding by accident.

### 1) Hand-coding

You write it. AI is at most a strong autocomplete.

**Strength:** full control and deep understanding. Still the right tool for security-sensitive paths, tricky concurrency, or anything where a wrong abstraction becomes a year of pain.

**Cost:** if you hand-write every screen and every repository in a large product, you will lose to teams who brief agents well.

Hand-coding isn’t dead. It’s just no longer the only professional mode.

### 2) Copilot / assistive coding

You still drive. The agent suggests a function, a ViewModel method, a small patch. You understand the change before you accept it.

**Strength:** healthy daily mode for experienced engineers. Architecture stays in your head; the model is a multiplier.

**Cost:** if you mash Accept because you’re tired, vibe debt enters through the back door. Assistive mode fails quietly when review disappears.

**Rule:** if you can’t explain the diff, don’t keep the diff.

### 3) Vibe coding

You describe a feeling in natural language. No hard product boundaries. No sharp acceptance criteria. You hope more than you steer.

**Strength:** excellent for spikes. You might see something on an emulator in an hour. Great for learning an API shape.

**Cost:** on Android it gets expensive later. Permissions are half-done. State is weird. Navigation is glued. Local storage uses a content URI that dies after reboot. Feature two arrives and the agent gets lost in the mess it created with your blessing.

Vibe coding isn’t evil.  
Mistaking vibe coding for a maintainable product is.

**Vibe is for discovery. Serious delivery usually needs more.**

### 4) Spec-driven

Before the agent writes code, you write decisions:

- What we build — and what we refuse to build  
- Project laws that must not drift between sessions  
- Exact feature behavior with empty states and errors  
- How you’ll verify success on a real device  

Then the agent implements. Then you verify: compile, run, walk the acceptance path, optionally get a second review pass.

**Strength:** control plus sustainable speed. Less context amnesia between chats. Fewer “rewrite half the app” weekends.

**Cost:** you must think and write first. Ten focused minutes of specification often buys hours of rewrite — and a pile of burned tokens you never notice until later.

If you want multi-agent review, keep it under this umbrella. One agent builds. Another reviews. That’s still discipline — not a new religion.

## Cost model (remember this)

| Mode | Control | Speed early | Risk later |
|------|---------|-------------|------------|
| Hand-coding | High | Low | Low (if you finish) |
| Copilot | High | Medium | Low if you review |
| Vibe | Low | Explosive | Explosive on Android |
| Spec-driven | High | Medium after brief | Lowest for real apps |

Android golden rule: if the feature goes beyond a simple UI — if storage, notifications, permissions, navigation, or multiple layers are involved — do not ride vibe alone.

**Cheap prompts are expensive mistakes.**

## Harness files (short)

You’ve seen filenames like README, CLAUDE, AGENTS, SKILL, and a `specs` folder. They’re all Markdown. The filename decides the audience.

- **README** — for humans  
- **AGENTS.md / CLAUDE.md** — project-wide rules the agent should load every session  
- **SKILL** — procedure for one job, loaded only when that job appears  
- **specs** — product behavior, screens, edge cases, non-goals  

Simple rule:

- Whole-project law → AGENTS / CLAUDE  
- One job’s procedure → SKILL  
- What the product must do → specs  

## Bad Android specs

This is where senior Android judgment still earns its keep.

A vague prompt like “build a nice health app” can produce a beautiful Compose UI that is wrong for reality. Failures agents create when the brief is soft:

- The UI assumes network even when the product promised offline  
- The app stores a gallery content URI instead of copying bytes into app-private storage — then the document vanishes  
- The manifest gains an internet permission nobody asked for — deadly if you care about trust and F-Droid posture  
- The copy sounds like medical diagnosis  
- The architecture works for one screen and collapses when you add folders, prep checklists, and settings  

The agent didn’t randomly betray you.  
You under-specified the world the app has to survive in.

## How to brief an agent (four layers)

Tool logos are secondary. Use this loop:

1. **Product intent** — what we build, what we refuse (example: offline care-document shelf + prep checklist; no forced account; no cloud; no diagnosis claims)  
2. **Project constitution** — non-negotiables: Kotlin, Compose, local-first data, FOSS-friendly deps, clean layers, no business logic in Composables  
3. **Feature spec** — user actions, system responses, empty states, errors, done criteria on hardware. Short. Precise. Not a novel.  
4. **Verify loop** — build, run, walk acceptance, fix. Optionally review with a second pass. You are the supervisor. Blind Accept is vibe coding wearing a suit.  

Gemini, Claude, Cursor, Android Studio Agent — same loop.  
A stronger model without a spec just fails faster.

## What this series builds next

The series vehicle is a calm offline archive for care documents: simple folders (labs, prescriptions, insurance), a prep checklist before a visit, and a FOSS path toward F-Droid.

Not a habit tracker. Not a social network. Not a clinic marketplace.

We’ll write the specs in public, then implement with agents under those contracts — and verify on a real device.

## Keep these four pictures

1. Hand-coding — when you must fully own the kernel  
2. Copilot — controlled speed on small edits  
3. Vibe — discovery, not serious delivery  
4. Spec-driven — the default for real apps  

Agents are not here to replace Android engineers.  
They’re here to execute your decisions faster — if you write the decisions down.

**Don’t guess the code. Guide it.**

---

Watch the Episode 0 video on this page for the spoken version, then try one exercise: write a one-page brief for a tiny Android task you already know, run the agent once, and review lifecycle / permissions / offline assumptions yourself before you keep the diff.
