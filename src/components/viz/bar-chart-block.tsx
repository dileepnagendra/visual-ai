"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface DataPoint {
  name?: string;
  value?: number;
}

interface BarChartBlockProps {
  title?: string;
  subtitle?: string;
  data?: DataPoint[];
  yAxisLabel?: string;
}

function BarChartBlock({
  title,
  subtitle,
  data,
  yAxisLabel,
}: BarChartBlockProps) {
  if (!data || data.length === 0) return null;

  const getBarOpacity = (index: number, total: number) => {
    const minOpacity = 0.35;
    const maxOpacity = 1;
    if (total <= 1) return maxOpacity;
    return minOpacity + (maxOpacity - minOpacity) * (index / (total - 1));
  };

  return (
    <div data-viz="bar-chart-block" className="viz-card p-7">
      {(title || subtitle) && (
        <div className="mb-6">
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

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--viz-border, #e4e4e7)"
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{
                fontSize: 12,
                fill: "var(--viz-text-muted, #71717a)",
                fontWeight: 500,
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fontSize: 12,
                fill: "var(--viz-text-muted, #71717a)",
                fontWeight: 500,
              }}
              axisLine={false}
              tickLine={false}
              label={
                yAxisLabel
                  ? {
                      value: yAxisLabel,
                      angle: -90,
                      position: "insideLeft",
                      style: {
                        fontSize: 12,
                        fill: "var(--viz-text-muted, #71717a)",
                        fontWeight: 600,
                      },
                    }
                  : undefined
              }
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
              cursor={{ fill: "rgba(var(--viz-primary-rgb, 30, 58, 138), 0.04)" }}
            />
            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={52}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`rgba(var(--viz-primary-rgb, 30, 58, 138), ${getBarOpacity(index, data.length)})`}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

BarChartBlock.displayName = "BarChartBlock";
export default BarChartBlock;
