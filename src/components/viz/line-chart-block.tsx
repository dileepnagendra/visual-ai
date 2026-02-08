"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts";

interface DataPoint {
  name?: string;
  value?: number;
}

interface LineChartBlockProps {
  title?: string;
  data?: DataPoint[];
  yAxisLabel?: string;
}

function LineChartBlock({
  title,
  data,
  yAxisLabel,
}: LineChartBlockProps) {
  if (!data || data.length === 0) return null;

  return (
    <div data-viz="line-chart-block" className="viz-card p-7">
      {title && (
        <h3
          className="mb-6 text-xl font-extrabold"
          style={{ color: "var(--viz-text)" }}
        >
          {title}
        </h3>
      )}

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id="vizAreaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--viz-primary, #1e3a8a)"
                  stopOpacity={0.15}
                />
                <stop
                  offset="95%"
                  stopColor="var(--viz-primary, #1e3a8a)"
                  stopOpacity={0.01}
                />
              </linearGradient>
            </defs>
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
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="none"
              fill="url(#vizAreaGradient)"
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--viz-primary, #1e3a8a)"
              strokeWidth={2.5}
              dot={{
                r: 4,
                fill: "var(--viz-surface, white)",
                stroke: "var(--viz-primary, #1e3a8a)",
                strokeWidth: 2.5,
              }}
              activeDot={{
                r: 6,
                fill: "var(--viz-primary, #1e3a8a)",
                stroke: "var(--viz-surface, white)",
                strokeWidth: 2,
              }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

LineChartBlock.displayName = "LineChartBlock";
export default LineChartBlock;
