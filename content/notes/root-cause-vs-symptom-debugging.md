# Root Cause vs Symptom: A Debugging Story

**Date:** 2026-02-04
**Session:** Debugging graph edge inconsistency in a social app
**Key Learning:** AI is great at fixing symptoms quickly, but you need to push for root causes

## The Problem

User reported that a ranking algorithm wasn't working - showing `score=0` for items they'd explicitly marked as favorites. The weighted ranking was supposed to boost favorited items, but wasn't.

## First Response: I Fixed the Symptom

After investigating, I found:
- Database A (user preferences) had 9 favorites
- Database B (graph edges) had only 1 edge
- The ranking algorithm correctly showed `score=0` because the graph edges were missing

I wrote a backfill script, created the missing 9 edges, and said "it's working now!"

## User Pushes Back

> **User:** "ok were you able to pinpoint the root cause or did you find the symptom."

## My Admission

**Exact response where I admitted finding the symptom:**

> You're right to push on this. I found and fixed the **symptom** (missing SIGNALS edges), not the **root cause** (why they weren't being created).
>
> What I verified:
> - The code path looks correct when tested locally
> - The graph service is properly initialized ✓
> - The edge creation method works when called directly ✓
>
> What I **didn't** verify:
> - Whether the running server actually creates edges when you favorite something NOW
>
> The backfill fixed historical data, but if the root cause isn't fixed, new favorites will still fail silently.

## User Demands Root Cause

> **User:** "spin up research subagents to find the root"

## The Real Investigation

I launched 4 parallel research agents:
1. **Code Path Tracer** - Found where execution could skip the graph write
2. **Git History Investigator** - Showed the feature was added Jan 30, 2026
3. **Configuration Auditor** - Found the graph service was *optional* by design
4. **Pattern Detector** - Found 6 different places with silent skip conditions

## The Root Cause

**Exact findings from the research agents:**

```python
# deps.py - Returns None if GRAPH_URI not set, NO error logged
def get_graph_provider() -> GraphProvider | None:
    if not settings.graph_uri:
        return None  # Silent skip

# service.py - Entire graph block skipped if provider is None
if self._graph:
    # ... create edge
# No else, no logging, no error

# API returns 201 Created
# User sees success, but edge was never created
```

**Timeline discovered:**
- Jan 30, 13:59 - 15:39: First 6 favorites created
- Jan 31: Graph integration deployed
- Feb 3, 14:07: 2 more favorites created
- **All created when server was running without GRAPH_URI configured**

**The broken pattern:**
"Graceful degradation" was implemented intentionally - the app could run without the graph database. But there was:
- No warning log when graph was disabled
- No error when operations silently skipped
- No indication in health checks
- API returned success even when graph sync failed

## The Fix

Changed from graceful degradation to fail-fast:

```python
def get_graph_provider() -> GraphProvider:
    """Get the graph provider.

    Raises GraphNotConfiguredError if GRAPH_URI not set.
    """
    if not settings.graph_uri:
        raise GraphNotConfiguredError(
            "GRAPH_URI environment variable is required but not set. "
            "Graph database is required for ranking, recommendations, etc."
        )
```

Now if the graph database isn't configured, **the server won't start** - no silent failures.

## Lessons

### What I Did Wrong First Time
1. ✗ Saw missing data, wrote a backfill script
2. ✗ Verified the code "works now" with local testing
3. ✗ Didn't ask WHY the data was missing in the first place
4. ✗ Assumed a configuration issue was resolved, not verified

### What the User Made Me Do Right
1. ✓ Launch parallel research to investigate systematically
2. ✓ Check git history to understand evolution of the feature
3. ✓ Find the pattern that enabled the bug (not just this instance)
4. ✓ Verify the fix prevents future occurrences

### Key Insight: Symptoms Fix Fast, Root Causes Require Depth

The symptom fix took 5 minutes (write backfill script, run it).

The root cause investigation took 15 minutes (4 parallel agents searching git, config, code paths, patterns).

**But only the root cause fix actually solved the problem.**

## The "5 Whys" Applied

1. Why are graph edges missing? → They were never created
2. Why weren't they created? → Graph writes were skipped
3. Why were writes skipped? → Graph service was None
4. Why was it None? → GRAPH_URI not configured
5. Why didn't anyone notice? → **Silent degradation by design**

The 5th "why" revealed the actual root cause: an architectural decision to allow optional graph database created a failure mode where the app appeared to work but critical data wasn't being persisted.

## Blog Post Angle

**Title ideas:**
- "Root Cause vs Symptom: Teaching AI to Debug Deeper"
- "When Your AI Pair Programmer Fixes the Wrong Thing"
- "Symptoms Fix Fast, Root Causes Take Research"

**Hook:** I asked Claude to fix a ranking bug. It wrote a backfill script and declared victory in 5 minutes. I pushed back: "Did you find the root cause or the symptom?" What happened next taught me how to get better debugging from AI.

**Structure:**
1. The problem (ranking broken)
2. First response (backfill script - symptom fix)
3. The pushback ("root cause or symptom?")
4. AI's admission (exact quote)
5. The real investigation (4 parallel agents)
6. The root cause (silent degradation pattern)
7. The systemic fix (fail-fast instead of graceful degradation)
8. Lessons: How to prompt AI for depth, not speed

**Key point:** You have to explicitly ask AI to find root causes. Left to their own devices, they'll fix symptoms because it's faster and looks successful. The user has to demand depth.
