"use client";

import { CheckCircle2 } from "lucide-react";

interface PhaseCardProps {
  phaseNumber?: number;
  title?: string;
  timeframe?: string;
  capabilities?: string[];
  strategicImpact?: string;
}

function PhaseCard({
  phaseNumber,
  title,
  timeframe,
  capabilities,
  strategicImpact,
}: PhaseCardProps) {
  if (!title) return null;

  return (
    <div
      data-viz="phase-card"
      className="viz-card overflow-hidden"
      style={{ borderColor: "var(--viz-primary)", borderWidth: "1.5px" }}
    >
      {/* Header row */}
      <div className="flex items-start gap-5 p-7">
        {/* Phase number badge */}
        {phaseNumber != null && (
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center text-xl font-black"
            style={{
              backgroundColor: "var(--viz-accent-bg)",
              color: "var(--viz-accent-fg)",
              borderRadius: "var(--viz-radius)",
              boxShadow: "0 4px 12px rgba(var(--viz-primary-rgb), 0.25)",
            }}
          >
            {phaseNumber}
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <h3
            className="text-2xl font-black"
            style={{ color: "var(--viz-text)" }}
          >
            {title}
          </h3>
          {timeframe && (
            <span
              className="rounded-full px-3.5 py-1 text-xs font-semibold"
              style={{
                backgroundColor: "var(--viz-primary-muted)",
                color: "var(--viz-primary)",
                border: "1px solid rgba(var(--viz-primary-rgb), 0.15)",
              }}
            >
              {timeframe}
            </span>
          )}
        </div>
      </div>

      {/* Capabilities */}
      {capabilities && capabilities.length > 0 && (
        <div className="px-7 pb-6">
          <p
            className="mb-3 text-xs font-extrabold uppercase tracking-wider"
            style={{ color: "var(--viz-text-muted)" }}
          >
            Core Capabilities
          </p>
          <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
            {capabilities.map((cap, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{
                    backgroundColor: "var(--viz-primary-muted)",
                  }}
                >
                  <CheckCircle2
                    className="h-3.5 w-3.5"
                    style={{ color: "var(--viz-primary)" }}
                  />
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--viz-text)" }}
                >
                  {cap}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Strategic Impact */}
      {strategicImpact && (
        <div
          className="px-7 py-5"
          style={{
            borderTop: "1.5px solid var(--viz-primary)",
            backgroundColor: "var(--viz-primary-muted)",
          }}
        >
          <p
            className="mb-1.5 text-xs font-extrabold uppercase tracking-wider"
            style={{ color: "var(--viz-text-muted)" }}
          >
            Strategic Impact
          </p>
          <p
            className="text-sm font-semibold"
            style={{ color: "var(--viz-text)" }}
          >
            {strategicImpact}
          </p>
        </div>
      )}
    </div>
  );
}

PhaseCard.displayName = "PhaseCard";
export default PhaseCard;
