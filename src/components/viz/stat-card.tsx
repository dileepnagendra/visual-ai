"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useCountUp } from "@/hooks/use-count-up";

interface StatCardProps {
  value?: string;
  label?: string;
  trend?: string;
}

function StatCard({ value, label, trend }: StatCardProps) {
  if (!value) return null;

  const { displayValue, ref } = useCountUp(value);

  return (
    <div
      data-viz="stat-card"
      className="viz-card viz-card-accent flex flex-col justify-between p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <span
          ref={ref as React.RefObject<HTMLSpanElement>}
          className="text-3xl font-black tracking-tight md:text-4xl"
          style={{ color: "var(--viz-primary)" }}
        >
          {displayValue}
        </span>
        {trend && (
          <span
            className="mt-1 flex h-8 w-8 items-center justify-center rounded-lg"
            style={{
              backgroundColor:
                trend === "up"
                  ? "rgba(22, 163, 74, 0.1)"
                  : trend === "down"
                    ? "rgba(220, 38, 38, 0.1)"
                    : "var(--viz-primary-muted)",
              color:
                trend === "up"
                  ? "#16a34a"
                  : trend === "down"
                    ? "#dc2626"
                    : "var(--viz-text-muted)",
            }}
          >
            {trend === "up" && <TrendingUp className="h-4 w-4" />}
            {trend === "down" && <TrendingDown className="h-4 w-4" />}
            {trend === "neutral" && <Minus className="h-4 w-4" />}
          </span>
        )}
      </div>
      {label && (
        <p
          className="mt-4 text-sm font-medium leading-snug"
          style={{ color: "var(--viz-text-muted)" }}
        >
          {label}
        </p>
      )}
    </div>
  );
}

StatCard.displayName = "StatCard";
export default StatCard;
