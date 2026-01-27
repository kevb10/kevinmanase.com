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

### Layout Strategy: STACKED ROWS

Eraser AI prefers horizontal flow. To get vertical layouts, use **groups as rows** that stack top-to-bottom.

```
ROW 1 (top):    [Start] → [Step 1]
                    ↓
ROW 2:          [Step 2] → [Branch]
                    ↓
ROW 3:          [Step 3] → [Error]
                    ↓
ROW 4 (bottom): [End Success] [End Fail]
```

**Key insight:** Each GROUP becomes a horizontal row. Groups stack vertically. This gives us top-to-bottom flow while working with Eraser's horizontal preference.

### Prompt Template

```
Flowchart with STACKED HORIZONTAL ROWS (groups stack vertically):

ROW 1 - [LABEL] (top):
- [Start node] (gray oval, start)
- [Optional: first step]

ROW 2 - [LABEL]:
- [Main step] (color)
- [Branch/alternative]: branches to [Alternative] (color)

ROW 3 - [LABEL]:
- [Next step] (color)
- [Error case]: branches to [Error] (red)

ROW 4 - [LABEL] (bottom):
- [End success] (green oval)
- [End fail] (red oval) - error paths connect here

Each ROW is a separate group. Groups stack top to bottom.
Within each row, flow is left to right.
Errors/alternatives on right side of each row.
Success path flows down through rows.
```

### Row Design Guidelines

- **2-4 nodes per row** max (fits 800px)
- **Start node** in ROW 1, top-left
- **End nodes** in final ROW, bottom
- **Decisions** get their own row with the branch target
- **Error paths** stay in their row, flow down to final FAIL
- **Success path** flows down left side through each row

### Color Coding
- Claude/Anthropic: purple
- Gemini/Google: blue
- OpenAI/Codex: green
- User actions/system: gray
- Errors/failures: red
- Success: green
- Warnings: yellow

### Connections
- `A > B` means A flows to B
- `A > B: label` adds a label
- For loops: explicitly state "loops back to ROW X"
- For decisions: "Yes: continues down" / "No: branches right to [X]"

## Script Location

```bash
./scripts/generate-diagram.sh <name> "<prompt>"
```

Requires `ERASER_API_KEY` from `.env.local`.

## After Generation

1. Show generated image to user
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

## Example: Decision Tree

User: `/diagram test-validator Plan validation with test-first checks`

You craft:
```
Flowchart with STACKED HORIZONTAL ROWS (groups stack vertically):

ROW 1 - INPUT (top):
- Plan Content (gray oval, start)

ROW 2 - FIRST CHECK:
- Has Test Section? (blue diamond)
- No: branches to No Test Section (red box)

ROW 3 - SECOND CHECK:
- Has Test Files? (blue diamond)
- No: branches to No Test Files (red box)

ROW 4 - ORDER CHECK:
- Tests Before Impl? (blue diamond)
- No: branches to Wrong Order (red box)

ROW 5 - COVERAGE:
- Coverage OK? (blue diamond)
- Less than 50%: branches to Low Coverage (yellow box)

ROW 6 - RESULTS (bottom):
- PASS (green oval) - success path and warnings connect here
- FAIL (red oval) - all red error boxes connect here

Each ROW is a separate group. Groups stack top to bottom.
Within each row, flow is left to right.
Errors on right side flow down to FAIL.
Success path flows down to PASS.
```

## Example: Multi-Phase Workflow

User: `/diagram deploy-flow Code to production pipeline`

You craft:
```
Flowchart with STACKED HORIZONTAL ROWS (groups stack vertically):

ROW 1 - TRIGGER (top):
- Push to main (gray oval, start)

ROW 2 - BUILD:
- Run build (blue box)
- Build fails: branches to Build Error (red box)

ROW 3 - TEST:
- Run tests (blue box)
- Tests fail: branches to Test Error (red box)

ROW 4 - REVIEW:
- Approval required? (diamond)
- Yes: branches to Wait for approval (yellow box)

ROW 5 - DEPLOY:
- Deploy to staging (purple box)
- Deploy to prod (purple box)

ROW 6 - RESULTS (bottom):
- Success (green oval)
- Failed (red oval) - errors connect here

Each ROW is a separate group. Groups stack top to bottom.
Build Error and Test Error flow down to Failed.
Approval flows down to Deploy when approved.
```
