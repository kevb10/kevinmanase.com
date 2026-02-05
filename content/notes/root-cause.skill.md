# Root Cause Debugging Skill

**Pattern:** Push AI past symptom fixes to find architectural root causes

**Context:** When AI quickly fixes a data inconsistency or bug but you suspect there's a deeper issue

## The Pattern

### Symptom Fix (Fast but Incomplete)
AI sees problem → writes script → fixes data → declares success

**Red flags:**
- "This should work now"
- "I backfilled the missing data"
- "The code looks correct when I test it locally"
- No explanation of WHY the problem happened

### Root Cause Investigation (Slower but Complete)

**The key question:**
> "Did you find the root cause or the symptom?"

**Follow up with:**
> "Spin up research subagents to find the root"

### What Research Agents Should Do

Launch 4+ parallel agents:

1. **Code Path Tracer**
   - Where could execution skip the critical operation?
   - Any silent exception handling?
   - Conditional blocks that might not execute?

2. **Git History Investigator**
   - When was this feature added?
   - Were there related bug fixes?
   - Timeline of when broken data was created

3. **Configuration Auditor**
   - Are required services actually required?
   - What happens when env vars are missing?
   - Silent degradation patterns?

4. **Pattern Detector**
   - How many places have this anti-pattern?
   - What other features might silently fail?
   - Systemic issues beyond this instance?

## Example from Real Session

**Symptom:** 9 user favorites in Firestore, only 1 graph edge in Neo4j

**Symptom fix (5 min):** Backfill script creates 9 missing edges

**Root cause (15 min):**
- Graph service was optional by design
- Missing `NEO4J_URI` → service returns `None`
- Code silently skips graph writes when service is `None`
- API returns 201 success, user sees no error
- Historical favorites created when config was missing

**Actual fix:**
```python
# Before: Silent degradation
def get_graph_provider() -> GraphProvider | None:
    if not settings.graph_uri:
        return None  # No error

# After: Fail fast
def get_graph_provider() -> GraphProvider:
    if not settings.graph_uri:
        raise GraphNotConfiguredError(
            "GRAPH_URI required for ranking, recommendations"
        )
```

## The "5 Whys" Technique

Keep asking why until you hit an architectural decision:

1. Why are edges missing? → Never created
2. Why weren't they created? → Writes were skipped
3. Why were writes skipped? → Service was None
4. Why was service None? → Config missing
5. **Why didn't anyone notice?** → Silent degradation by design ← ROOT CAUSE

The 5th "why" reveals the pattern, not just the instance.

## When to Use This

- AI fixes data but doesn't explain the gap
- "It works now" without "here's why it broke"
- Quick script solves immediate problem
- No changes to prevent recurrence
- Tests pass but production was broken

## Success Criteria

Root cause found when you can answer:

1. **What pattern enabled this?** (not just "config missing")
2. **How many instances exist?** (not just "these 9 edges")
3. **What prevents recurrence?** (code change, not backfill)
4. **What else might fail this way?** (systemic view)

## Anti-Patterns to Avoid

**Don't accept:**
- "The code is correct now" without verifying why it wasn't before
- Local testing that works when production didn't
- Backfill scripts without understanding the gap
- "Must have been a deployment issue" without evidence

**Do demand:**
- Timeline correlation (git history + data timestamps)
- Full code path analysis (all skip conditions)
- Pattern detection (other places with same issue)
- Preventive fix (not just data correction)

## Time Investment

- Symptom fix: 5-10 minutes
- Root cause: 15-30 minutes
- **ROI:** Root cause prevents future incidents, symptom fix is temporary

## Commands

```bash
# Don't just fix the data:
python scripts/backfill_missing_edges.py

# Find the root cause:
# 1. Timeline analysis
git log --since="2026-01-15" --oneline -- path/to/service.py

# 2. Data correlation
# When was bad data created? Compare to deployment timeline

# 3. Pattern search
grep -r "if.*is None:" src/app/ --include="*.py"
grep -r "return None" src/app/deps.py

# 4. Configuration audit
grep -r "| None" src/app/config.py
```

## Integration with Claude Code

When debugging with Claude:

```
User: "ok were you able to pinpoint the root cause or did you find the symptom"

User: "spin up research subagents to find the root"
```

Claude will launch parallel Explore/Bash agents to investigate systematically.

## Related

- **Note:** `notes/root-cause-vs-symptom-debugging.md` - Full debugging session story
- **Concept:** "5 Whys" technique from lean manufacturing
- **Anti-pattern:** "Works on my machine" debugging
