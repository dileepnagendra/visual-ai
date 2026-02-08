"use client";

import { useTamboThread } from "@tambo-ai/react";
import React, { useEffect, useRef } from "react";

/**
 * Compact activity feed — shows meaningful build progress (section names)
 * instead of repetitive "Rendered visual component" lines.
 * Fades at top/bottom with auto-scroll.
 */
export function MessageThread() {
  const { thread, generationStage } =
    useTamboThread();

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread?.messages?.length, generationStage]);

  if (!thread?.messages || thread.messages.length === 0) {
    return null;
  }

  const AUTO_CONTINUE_PREFIX = "Continue building the visual document";
  const isGenerating =
    generationStage !== "IDLE" &&
    generationStage !== "COMPLETE" &&
    generationStage !== "ERROR";
  const isComplete = generationStage === "COMPLETE";

  // Build smart activity entries
  const entries: { id: string; text: string; type: "user" | "ai" | "section" }[] = [];
  let builtSections: string[] = [];
  let hasUserMessage = false;

  thread.messages.forEach((message) => {
    const isUser = message.role === "user";

    const rawText = Array.isArray(message.content)
      ? message.content
          .filter((p) => p.type === "text")
          .map((p) => ("text" in p ? p.text : ""))
          .join("")
      : message.content
        ? String(message.content)
        : "";

    // Skip auto-continue messages entirely
    if (isUser && rawText.startsWith(AUTO_CONTINUE_PREFIX)) return;

    if (isUser) {
      hasUserMessage = true;
      const preview =
        rawText.length > 60 ? rawText.slice(0, 60) + "..." : rawText;
      entries.push({
        id: message.id,
        text: `Research submitted`,
        type: "user",
      });
      return;
    }

    // AI messages
    const hasComponent = !!message.renderedComponent;

    // Skip tool-call limit / continue messages
    const lower = rawText.toLowerCase();
    const isSystemMessage =
      lower.includes("tool-call limit") ||
      lower.includes("tool call limit") ||
      lower.includes("hit the limit") ||
      lower.includes("reply continue") ||
      lower.includes('reply "continue') ||
      lower.includes("continue building") ||
      lower.includes("pick up where");
    if (isSystemMessage && !hasComponent) return;

    // Skip raw tool result JSON
    if (rawText.trim().startsWith("{") && rawText.includes("wordCount")) return;

    if (hasComponent) {
      // Extract a meaningful name from the component
      const sectionName = getComponentLabel(message.renderedComponent);
      if (sectionName && !builtSections.includes(sectionName)) {
        builtSections.push(sectionName);
        entries.push({
          id: message.id,
          text: `Building ${sectionName}`,
          type: "section",
        });
      }
      // Skip duplicate section entries (e.g., multiple stat cards in same section)
      return;
    }

    // Regular AI text (summaries, analysis intros)
    if (rawText.trim() && rawText.length > 10) {
      const firstSentence = rawText.split(/[.!?]/)[0]?.trim() || rawText;
      const preview =
        firstSentence.length > 55
          ? firstSentence.slice(0, 55) + "..."
          : firstSentence;
      entries.push({ id: message.id, text: preview, type: "ai" });
    }
  });

  return (
    <div className="activity-feed">
      <div className="activity-feed-scroll">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className={`activity-entry ${
              entry.type === "user"
                ? "activity-entry-user"
                : entry.type === "section"
                  ? "activity-entry-ai"
                  : "activity-entry-ai"
            }`}
          >
            <span className="activity-dot" />
            <span className="activity-text">{entry.text}</span>
          </div>
        ))}

        {/* Live generation status */}
        {isGenerating && (
          <div className="activity-entry activity-entry-live">
            <span className="activity-dot activity-dot-live" />
            <span className="activity-text">
              Building visual document...
            </span>
          </div>
        )}

        {/* Completion message */}
        {isComplete && hasUserMessage && entries.length > 1 && (
          <div className="activity-entry activity-entry-ai">
            <span className="activity-dot" style={{ backgroundColor: "#22c55e" }} />
            <span className="activity-text" style={{ color: "#57534e" }}>
              Document complete — ask for changes or new research
            </span>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
}

/**
 * Extract a human-readable label from a rendered component.
 * E.g., SectionHeader with title "Market Analysis" → "Market Analysis"
 * StatCard → "statistics" (grouped, so only shown once)
 */
function getComponentLabel(element: React.ReactNode): string | null {
  if (!React.isValidElement(element)) return null;

  const componentName =
    typeof element.type === "function"
      ? (element.type as { displayName?: string; name?: string }).displayName ||
        (element.type as { name?: string }).name ||
        ""
      : "";

  const props = element.props as Record<string, unknown>;

  switch (componentName) {
    case "HeroSection":
      return "cover page";
    case "SectionHeader":
      return typeof props.title === "string" ? props.title : "new section";
    case "StatCard":
      return "statistics";
    case "StatCardGroup":
      return typeof props.title === "string" ? props.title : "statistics";
    case "InsightCallout":
      return "key insight";
    case "TextBlock":
      return "narrative";
    case "ContentCard":
      return typeof props.title === "string" ? props.title : "content section";
    case "ComparisonTable":
      return "comparison analysis";
    case "PhaseCard":
      return "roadmap phase";
    case "FeatureGrid":
      return "feature overview";
    case "ProgressBarList":
      return "progress rankings";
    case "LineChartBlock":
      return typeof props.title === "string" ? props.title : "trend chart";
    case "BarChartBlock":
      return typeof props.title === "string" ? props.title : "bar chart";
    case "RadarChartBlock":
      return typeof props.title === "string" ? props.title : "radar analysis";
    default:
      // Fallback: try to get a title prop
      if (typeof props.title === "string") return props.title;
      return null;
  }
}
