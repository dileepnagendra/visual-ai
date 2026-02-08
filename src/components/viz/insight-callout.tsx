"use client";

import {
  Sparkles,
  Target,
  Lightbulb,
  AlertCircle,
  Shield,
  Zap,
} from "lucide-react";

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  sparkles: Sparkles,
  target: Target,
  lightbulb: Lightbulb,
  alert: AlertCircle,
  shield: Shield,
  zap: Zap,
};

interface InsightCalloutProps {
  title?: string;
  content?: string;
  icon?: string;
}

function InsightCallout({
  title,
  content,
  icon = "sparkles",
}: InsightCalloutProps) {
  if (!title && !content) return null;

  const IconComponent = icon ? iconMap[icon] || Sparkles : Sparkles;

  return (
    <div
      data-viz="insight-callout"
      className="relative overflow-hidden px-8 py-8"
      style={{
        backgroundColor: "var(--viz-accent-bg)",
        borderRadius: "var(--viz-radius)",
        color: "var(--viz-accent-fg)",
      }}
    >
      {/* Dot pattern texture */}
      <div className="viz-dot-pattern pointer-events-none absolute inset-0" />

      {/* Subtle gradient overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            <IconComponent
              className="h-5 w-5"
              style={{ color: "var(--viz-accent-fg)" }}
            />
          </div>
          <h3
            className="text-lg font-black tracking-tight"
            style={{ fontFamily: "var(--viz-font-heading)", color: "var(--viz-accent-fg)" }}
          >
            {title || ""}
          </h3>
        </div>
        {content && (
          <p
            className="mt-4 text-base leading-relaxed"
            style={{ color: "var(--viz-accent-fg)", opacity: 0.85 }}
          >
            {content}
          </p>
        )}
      </div>
    </div>
  );
}

InsightCallout.displayName = "InsightCallout";
export default InsightCallout;
