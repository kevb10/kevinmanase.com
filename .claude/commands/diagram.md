# /diagram - Generate Eraser Diagrams

Generate light and dark theme diagrams via Eraser API. Completely hands-off.

## Usage

```
/diagram <name> <description>
```

Example:
```
/diagram auth-flow User logs in, server validates credentials, returns JWT token
```

## Your Job

1. **Analyze** the user's description
2. **Craft a detailed Eraser prompt** following the rules below
3. **Run the script** to generate both themes
4. **Show the result** to the user
5. **Output the MDX snippet** they can copy

## Prompt Engineering Rules

The diagram must fit in **800px width**. This is critical.

### Structure
- Use **horizontal flow** (left-to-right) for linear processes
- Use **vertical flow** (top-to-bottom) only when there are parallel branches
- **Max 4-5 nodes per row** to fit width
- Group related nodes in labeled containers

### Explicit Connections
Always specify connections explicitly. Eraser needs clear arrows:
- `A > B` means A flows to B
- `A > B: label` adds a label to the connection
- For loops: `D > B: retry` (explicitly connect back)
- For decisions: use `> Yes:` and `> No:` labels

### Decision Points
For conditionals, be explicit:
```
Decision diamond: "Tests pass?"
- If yes: flows to Deploy
- If no: flows to Fix Bugs, then loops back to [specific node]
```

### Prompt Template
```
[Diagram type]: [flow direction]

Nodes:
- [Node 1]: [description] [color if relevant]
- [Node 2]: [description]
...

Flow:
- Start > [Node 1]
- [Node 1] > [Node 2]
- [Node 2] > Decision: "[question]?"
- Decision > [Node 3]: "Yes"
- Decision > [Node 4]: "No"
- [Node 4] > [Node 1]: "retry" (loop back)

Groups:
- Group "[Name]": [Node A], [Node B]

Constraints:
- Max 800px width
- Horizontal layout preferred
- Clear loop-back arrows for cycles
```

### Color Coding (for multi-system diagrams)
- Claude/Anthropic: purple
- Gemini/Google: blue
- OpenAI/Codex: green
- User actions: gray
- Errors/failures: red
- Success: green

## Script Location

```bash
./scripts/generate-diagram.sh <name> "<prompt>"
```

Requires `ERASER_API_KEY` from `.env.local`.

## After Generation

1. Show both generated images to user
2. Ask if adjustments needed
3. If yes, refine prompt and regenerate
4. Output final MDX:

```mdx
<ThemedImage
  lightSrc="/diagrams/<name>-light.png"
  darkSrc="/diagrams/<name>-dark.png"
  alt="<descriptive alt text>"
/>
```

## Example Session

User: `/diagram ci-pipeline Code pushed, tests run, if pass deploy to staging, if fail notify developer and stop`

You craft:
```
Flowchart, horizontal layout, max 800px width:

Nodes:
- Start: "Code Pushed" (gray oval)
- Tests: "Run Tests" (yellow box)
- Decision: "Pass?" (diamond)
- Deploy: "Deploy to Staging" (green box)
- Notify: "Notify Developer" (red box)
- End-success: "Done" (green oval)
- End-fail: "Stopped" (red oval)

Flow:
- Start > Tests
- Tests > Decision
- Decision > Deploy: "Yes"
- Decision > Notify: "No"
- Deploy > End-success
- Notify > End-fail

Groups:
- "CI Pipeline": Tests, Decision
- "Outcomes": Deploy, Notify

Keep compact, horizontal flow, fit in 800px.
```

Then run:
```bash
./scripts/generate-diagram.sh ci-pipeline "<the prompt above>"
```
