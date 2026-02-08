"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Dimension {
  label?: string;
  value?: number;
  description?: string;
}

interface RadarChartBlockProps {
  title?: string;
  subtitle?: string;
  dimensions?: Dimension[];
}

function RadarChartBlock({
  title,
  subtitle,
  dimensions,
}: RadarChartBlockProps) {
  if (!dimensions || dimensions.length === 0) return null;

  const chartData = dimensions.map((d) => ({
    subject: d.label || "",
    value: d.value ?? 0,
    fullMark: 100,
  }));

  return (
    <div data-viz="radar-chart-block" className="viz-card overflow-hidden">
      {/* Header */}
      {(title || subtitle) && (
        <div className="px-7 pt-7 pb-2">
          {title && (
            <h3
              className="text-xl font-extrabold"
              style={{ color: "var(--viz-text)" }}
            >
              {title}
            </h3>
          )}
          {subtitle && (
            <p
              className="mt-1.5 text-sm"
              style={{ color: "var(--viz-text-muted)" }}
            >
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Content: chart + scored list */}
      <div className="flex flex-col items-center gap-6 px-7 pb-7 md:flex-row">
        {/* Radar chart */}
        <div className="h-72 w-full md:w-1/2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid stroke="var(--viz-border, #e4e4e7)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{
                  fontSize: 11,
                  fill: "var(--viz-text-muted, #71717a)",
                  fontWeight: 500,
                }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{
                  fontSize: 10,
                  fill: "var(--viz-text-muted, #a1a1aa)",
                }}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--viz-surface, white)",
                  border: "1px solid var(--viz-border, #e4e4e7)",
                  borderRadius: "var(--viz-radius, 8px)",
                  fontSize: "12px",
                  fontWeight: 600,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              />
              <Radar
                name="Score"
                dataKey="value"
                stroke="var(--viz-primary, #1e3a8a)"
                fill="var(--viz-primary, #1e3a8a)"
                fillOpacity={0.12}
                strokeWidth={2.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Scored list */}
        <div className="w-full space-y-2.5 md:w-1/2">
          {dimensions.map((dim, idx) => (
            <div
              key={idx}
              className="rounded-lg border px-4 py-3"
              style={{
                backgroundColor: "var(--viz-surface-alt, #f4f4f5)",
                borderColor: "var(--viz-border)",
              }}
            >
              <div className="flex items-center justify-between">
                <span
                  className="text-sm font-bold"
                  style={{ color: "var(--viz-text)" }}
                >
                  {dim.label || ""}
                </span>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-black tabular-nums"
                  style={{
                    backgroundColor:
                      "rgba(var(--viz-primary-rgb), 0.1)",
                    color: "var(--viz-primary)",
                  }}
                >
                  {dim.value ?? 0}/100
                </span>
              </div>
              {dim.description && (
                <p
                  className="mt-1 text-xs leading-relaxed"
                  style={{ color: "var(--viz-text-muted)" }}
                >
                  {dim.description}
                </p>
              )}
              {/* Mini progress bar */}
              <div
                className="mt-2 h-1.5 w-full overflow-hidden rounded-full"
                style={{ backgroundColor: "var(--viz-primary-light)" }}
              >
                <div
                  className="viz-bar-fill h-full rounded-full"
                  style={{
                    width: `${Math.min(dim.value ?? 0, 100)}%`,
                    background: `linear-gradient(90deg, rgba(var(--viz-primary-rgb), 0.5), rgba(var(--viz-primary-rgb), 1))`,
                    animationDelay: `${idx * 80}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

RadarChartBlock.displayName = "RadarChartBlock";
export default RadarChartBlock;
