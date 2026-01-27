#!/bin/bash
set -euo pipefail

# Usage: ./scripts/generate-diagram.sh <name> "<prompt>"
# Example: ./scripts/generate-diagram.sh multi-llm-critique "Flowchart showing Claude creates plan, triggers hook, Gemini critiques, Codex reviews, feedback returns to Claude"
#
# Generates both light and dark theme PNGs using only 1 AI call:
# - First call: AI generates diagram + returns DSL code
# - Second call: Non-AI render of same DSL in other theme

if [[ $# -lt 2 ]]; then
    echo "Usage: $0 <name> <prompt>"
    echo "Example: $0 multi-llm-critique \"Flowchart showing multi-LLM plan critique workflow\""
    exit 1
fi

NAME="$1"
PROMPT="$2"
OUTPUT_DIR="$(dirname "$0")/../public/diagrams"

# Load from .env.local if not already set
if [[ -z "${ERASER_API_KEY:-}" ]]; then
    SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
    ENV_FILE="$SCRIPT_DIR/../.env.local"
    if [[ -f "$ENV_FILE" ]]; then
        ERASER_API_KEY=$(grep ERASER_API_KEY "$ENV_FILE" | cut -d'=' -f2)
        export ERASER_API_KEY
    fi
fi

if [[ -z "${ERASER_API_KEY:-}" ]]; then
    echo "Error: ERASER_API_KEY not found in environment or .env.local"
    exit 1
fi

mkdir -p "$OUTPUT_DIR"

echo "Generating diagrams for: $NAME"

# Step 1: Generate with AI (light theme) - this is the paid call
echo "  -> Generating with AI (light theme)..."
AI_RESPONSE=$(curl -s 'https://app.eraser.io/api/render/prompt' \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $ERASER_API_KEY" \
    -d @- <<EOF
{
    "theme": "light",
    "background": false,
    "mode": "standard",
    "diagramType": "flowchart-diagram",
    "text": "$PROMPT"
}
EOF
)

LIGHT_URL=$(echo "$AI_RESPONSE" | jq -r '.imageUrl')
DIAGRAM_TYPE=$(echo "$AI_RESPONSE" | jq -r '.diagrams[0].diagramType')
DSL_CODE=$(echo "$AI_RESPONSE" | jq -r '.diagrams[0].code')

if [[ "$LIGHT_URL" == "null" || -z "$LIGHT_URL" ]]; then
    echo "Error generating diagram:"
    echo "$AI_RESPONSE" | jq .
    exit 1
fi

curl -s "$LIGHT_URL" -o "$OUTPUT_DIR/${NAME}-light.png"
echo "     Saved: $OUTPUT_DIR/${NAME}-light.png"

# Step 2: Render same DSL in dark theme (non-AI, just rendering)
echo "  -> Rendering dark theme (non-AI)..."

# Escape the DSL code for JSON
DSL_ESCAPED=$(echo "$DSL_CODE" | jq -Rs .)

DARK_RESPONSE=$(curl -s 'https://app.eraser.io/api/render/elements' \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $ERASER_API_KEY" \
    -d @- <<EOF
{
    "theme": "dark",
    "background": false,
    "elements": [
        {
            "type": "diagram",
            "diagramType": "$DIAGRAM_TYPE",
            "code": $DSL_ESCAPED
        }
    ]
}
EOF
)

DARK_URL=$(echo "$DARK_RESPONSE" | jq -r '.imageUrl')

if [[ "$DARK_URL" == "null" || -z "$DARK_URL" ]]; then
    echo "Error rendering dark theme:"
    echo "$DARK_RESPONSE" | jq .
    exit 1
fi

curl -s "$DARK_URL" -o "$OUTPUT_DIR/${NAME}-dark.png"
echo "     Saved: $OUTPUT_DIR/${NAME}-dark.png"

echo ""
echo "Done! Use in MDX:"
echo ""
echo "<ThemedImage"
echo "  lightSrc=\"/diagrams/${NAME}-light.png\""
echo "  darkSrc=\"/diagrams/${NAME}-dark.png\""
echo "  alt=\"$NAME diagram\""
echo "/>"
