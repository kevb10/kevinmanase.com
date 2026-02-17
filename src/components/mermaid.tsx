"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  look: "classic",
  theme: "dark",
  themeVariables: {
    primaryColor: "#6366f1",
    primaryTextColor: "#f4f4f5",
    primaryBorderColor: "#818cf8",
    lineColor: "#a5b4fc",
    secondaryColor: "#4f46e5",
    tertiaryColor: "#3730a3",
    background: "#18181b",
    mainBkg: "#27272a",
    nodeBorder: "#818cf8",
    clusterBkg: "#1e1b4b",
    titleColor: "#f4f4f5",
    edgeLabelBackground: "#27272a",
  },
  fontFamily: "ui-sans-serif, system-ui, sans-serif",
  flowchart: {
    useMaxWidth: false,
    htmlLabels: true,
    padding: 15,
  },
});

interface MermaidProps {
  chart: string;
}

export function Mermaid({ chart }: MermaidProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const renderChart = async () => {
      if (!containerRef.current || !chart) return;

      try {
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
        const { svg } = await mermaid.render(id, chart);
        setSvg(svg);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to render diagram");
        console.error("Mermaid rendering error:", err);
      }
    };

    renderChart();
  }, [chart]);

  if (error) {
    return (
      <div className="my-6 p-4 bg-red-950/50 border border-red-900 rounded-lg text-red-400 text-sm">
        <p className="font-medium">Diagram error</p>
        <pre className="mt-2 text-xs overflow-x-auto">{error}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-6 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
