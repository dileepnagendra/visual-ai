"use client";

import { useCountUp } from "@/hooks/use-count-up";

interface StatItem {
  value?: string;
  label?: string;
  description?: string;
}

interface StatCardGroupProps {
  title?: string;
  stats?: StatItem[];
}

function AnimatedStat({ stat }: { stat: StatItem }) {
  const { displayValue, ref } = useCountUp(stat.value);

  return (
    <div
      className="rounded-xl border p-5 text-center"
      style={{
        backgroundColor: "var(--viz-primary-muted)",
        borderColor: "rgba(var(--viz-primary-rgb), 0.1)",
      }}
    >
      {stat.value && (
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="text-2xl font-black tracking-tight md:text-3xl"
          style={{ color: "var(--viz-primary)" }}
        >
          {displayValue}
        </div>
      )}
      {stat.label && (
        <div
          className="mt-2 text-sm font-bold"
          style={{ color: "var(--viz-text)" }}
        >
          {stat.label}
        </div>
      )}
      {stat.description && (
        <p
          className="mt-1 text-xs leading-relaxed"
          style={{ color: "var(--viz-text-muted)" }}
        >
          {stat.description}
        </p>
      )}
    </div>
  );
}

function StatCardGroup({ title, stats }: StatCardGroupProps) {
  if (!stats || stats.length === 0) return null;

  return (
    <div data-viz="stat-card-group" className="viz-card p-7">
      {title && (
        <h3
          className="mb-6 text-xl font-extrabold"
          style={{ color: "var(--viz-text)" }}
        >
          {title}
        </h3>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat, idx) => (
          <AnimatedStat key={idx} stat={stat} />
        ))}
      </div>
    </div>
  );
}

StatCardGroup.displayName = "StatCardGroup";
export default StatCardGroup;
