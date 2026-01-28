# How I Got Here: AI Coding Tools I Tried

**Status:** Outline (draft)
**Thesis:** The job isn't coding anymore. It's managing AI that codes. Here's what I tried, what broke, and where I landed.

---

## Style Direction

- lowercase throughout (trying it)
- ellipses for casual pauses.. trailing thoughts..
- no em dashes
- short sentences. fragments.
- raw, note-like. not polished.
- GIFs + Mermaid diagrams yes
- avoid: "actually", "basically", hedging, hype words

---

## Structure

### 1. The Principles (open with the punchline)
- Don't outsource the thinking
- Bad research → bad plan → 100 bad lines
- Context is everything
- Link to the South By 2025 talk for the "engineer as manager" framing

### 2. The Experiments (chronological)

| Tool | What I Tried | What Worked | What Broke |
|------|--------------|-------------|------------|
| Copilot tab model | Vibe coding with stubs + comments | Manual work forces clarity | Smaller model, no broad context |
| ChatGPT/Claude (chat) | Planning, brainstorming, bug fixes | Good for high-level direction | No codebase access, limited window |
| Cursor | Full agent mode | Productivity skyrocketed | So did tech debt. Model picker = more unpredictability. Rules files ignored. |
| Claude Code | Plan mode, subagents, CLAUDE.md | Felt in control. Less slop. Claude "knew me." | Stuck with one model family |
| Devin | Autonomous task completion | — | Slow. Human in the loop still required. |
| Google spec-kit | 4-step workflow | Thorough | Too many tasks. Wanted to be perfect. Startups need narrow scope. |

### 3. The Slop Era (the confession)
- Months of slop on slop
- Shipped a fragile product
- Even with better models later, the context was polluted
- What polluted looks like:
  - Inconsistent patterns
  - Stale docs
  - Code that says one thing but does another
  - Abandoned experiment crumbs — "where did this come from?"

### 4. What Made Claude Code Different
- Manual acceptance of edits = micro control
- CLAUDE.md respected (vs Cursor rules ignored)
- Subagents = parallel work without burning context on research
- Plan mode = staying on track
- The "Claude knew me" feeling — progressive disclosure, indexed context

### 5. How I Structure CLAUDE.md Now
- Subfolder CLAUDE.md files (sliced per domain)
- What goes in: how you work, must-knows, what to do when confused
- Index, don't dump — point to ADRs, stories, examples
- Only read what's relevant

### 6. The Identity Shift
- South By 2025: engineers are managers now
- Coding is easy. Thinking and shipping is hard.
- On time, on scope, no slop.

### 7. Where I Landed
- Link to the [AI Coding Workflow Overview](/posts/the-system)
- "This is my current system. It's not perfect, still iterating."

---

## Title Options
- "How I Got Here"
- "The Slop Era and What Came After"
- "From Cursor to Claude Code"

---

## Raw Notes (from interview)

### On Cursor → Claude Code transition:
- Felt "in control" with Claude Code
- Manual acceptance of each edit ("micro coderies") made me feel in charge
- TUI aspect was cool
- CLAUDE.md was respected vs Cursor's rules files weren't
- "Claude knew me" - hard to explain but felt like it understood what I wanted
- Sub-agents were a huge unlock - parallel work, reduced token burn on research
- Sonnet/Opus were flagship models, and Claude Code as the "harness" was built by the model creator

### On the slop:
- Not one story - it was months of slop on slop
- Shipped a product that performed poorly, was fragile
- Even when better models/techniques came, the context was polluted
- Hard to recover from polluted codebase

### On polluted codebase:
- Inconsistent patterns
- Convoluted logic
- Documentation stale, not aligned with code
- LLM gets confused about which is truth
- Says one thing but does the other
- Abandoned experiments that left crumbs - "where did this come from?"

### On Devin:
- Hyped about autonomous task completion
- But very slow
- "Human in the loop is very much required" right now
- As an investor it makes sense (long term play)

### On Google Spec Kit:
- Creates too many tasks (up to 75)
- Some say greenfield, some say brownfield
- Seems like something Google would use (mature codebases)
- Very thorough but thoroughness isn't always needed
- Startups need narrow scope, it couldn't do that
- "Wanted to be perfect" = counterproductive

### On CLAUDE.md:
- Used to need to be long, now can be organized with subfolders
- Per-folder CLAUDE.md files = sliced and diced per domain
- Contents: how you work, must-knows, what to do when confused
- Examples: ADRs, stories, acceptance criteria format
- Key insight: INDEX things, don't dump them
- "Full of information but indexed and organized so it only reads what is relevant"
- Pattern: progressive disclosure

### On the "engineer as manager" framing:
- From South By 2025 talk
- "We're hiring managers. Your job is to manage your AI agent."
- Coding is boring/easy now
- What's hard: thinking, shipping a product/idea/vision
- "On time, on scope, no slop"

### On team adoption:
- Not much resistance
- People using AI are generally open to trying new things
- Leading by example with conviction
- Sharing expertise from trial and error
