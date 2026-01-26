# CLAUDE.md

## Project
Personal blog for Kevin Manase. Engineering thoughts, notes-to-self published publicly. Co-authored with Claude.

## Tech
- Next.js 16 (App Router, Turbopack)
- pnpm
- MDX posts in `/content/posts/`
- Tailwind CSS
- Deploy: Vercel
- Domain: kevinmanase.com

## Writing Style
- Informal, note-like, messy but not convoluted
- Not polished or perfect — raw thinking is fine
- Technical and direct
- GIFs: yes (Giphy/Tenor URLs inline)
- Emojis: no
- Mermaid diagrams: yes (for workflows, architecture)
- Code snippets: yes, liberally

## Content Structure
Building a series on Kevin's AI coding workflow:
1. Overview post (links to all deep dives)
2. Deep dive: Multi-LLM plan critique (Gemini + Codex hook)
3. Deep dive: Test-first enforcement
4. Deep dive: Vibecheck (staying on course)
5. More as needed

Posts should backlink to each other. Overview is the hub.

## Kevin's Dev Workflow (context for content)
```
User story → Acceptance criteria (CBC format) → Plan (test files first)
→ ExitPlanMode triggers hook
→ Gemini 3 Flash critiques
→ Codex reviews Gemini's critique, adds missed points
→ Claude sees combined feedback, revises plan
→ Implement
→ /vibecheck verifies stayed on course
→ Commit
```

Key tools: Claude Code (Opus), OpenCode (Gemini via OpenRouter), Codex CLI

## Acceptance Criteria Format: CBC (Context-Behavior-Constraint)

Kevin uses a structured AC format that maps directly to test code:

```markdown
**context**
- actor: who/what triggers this behavior
- preconditions: state that must exist before (test fixtures)
- inputs: function arguments or request parameters

**behavior**
- when: the trigger action (function call)
- then: primary expected outcome
- and: additional outcomes (each becomes an assertion)

**constraints**
- edge case: boundary condition → expected handling
- non-goal: explicitly out of scope for this story
```

### Field → Test Mapping
| Field | Test Code |
|-------|-----------|
| actor | Test class/context |
| preconditions | setUp(), fixtures, mocks |
| inputs | Function arguments |
| when | Function call |
| then | Primary assert |
| and | Additional asserts |
| edge case | Separate test methods |
| non-goal | What NOT to test |

### Why CBC over alternatives
- **Gherkin**: Too verbose, no edge case section
- **Prose**: Hard to parse, buries details
- **Tables**: Loses context, can't express complex assertions
- **Checklists**: No structure, can't distinguish preconditions from outcomes

## Commands
```bash
pnpm dev      # local dev
pnpm build    # build
pnpm lint     # lint
```

## File Conventions
- Posts: `/content/posts/{slug}.mdx`
- Components: `/src/components/`
- Lib: `/src/lib/`

## Post Frontmatter
```yaml
---
title: "Post Title"
description: "SEO description"
date: "YYYY-MM-DD"
tags: ["tag1", "tag2"]
published: true
---
```

## Notes
- Kevin reviews via conversation, not PR comments
- Tone matters more than polish
- When in doubt, keep it real
