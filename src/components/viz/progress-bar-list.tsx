"use client";

interface ProgressItem {
  label?: string;
  value?: number;
  tag?: string;
}

interface ProgressBarListProps {
  title?: string;
  icon?: string;
  items?: ProgressItem[];
}

function ProgressBarList({
  title,
  items,
}: ProgressBarListProps) {
  if (!items || items.length === 0) return null;

  return (
    <div data-viz="progress-bar-list" className="viz-card p-7">
      {title && (
        <h3
          className="mb-6 text-xl font-extrabold"
          style={{ color: "var(--viz-text)" }}
        >
          {title}
        </h3>
      )}

      <div className="space-y-5">
        {items.map((item, idx) => (
          <div key={idx}>
            {/* Label row */}
            <div className="mb-2.5 flex items-center justify-between">
              <span
                className="flex items-center gap-2 text-sm font-bold"
                style={{ color: "var(--viz-text)" }}
              >
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black text-white"
                  style={{ backgroundColor: "var(--viz-primary)" }}
                >
                  {idx + 1}
                </span>
                {item.label || ""}
              </span>
              <div className="flex items-center gap-2">
                {item.tag && (
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{
                      backgroundColor: "var(--viz-primary-muted)",
                      color: "var(--viz-primary)",
                    }}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
            </div>

            {/* Bar */}
            <div className="flex items-center gap-3">
              <div
                className="h-3 flex-1 overflow-hidden rounded-full"
                style={{ backgroundColor: "var(--viz-primary-light)" }}
              >
                <div
                  className="viz-bar-fill h-full rounded-full"
                  style={{
                    width: `${Math.min(item.value ?? 0, 100)}%`,
                    background: `linear-gradient(90deg, rgba(var(--viz-primary-rgb), 0.6), rgba(var(--viz-primary-rgb), 1))`,
                    animationDelay: `${idx * 100}ms`,
                  }}
                />
              </div>
              <span
                className="w-12 text-right text-sm font-black tabular-nums"
                style={{ color: "var(--viz-primary)" }}
              >
                {item.value ?? 0}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ProgressBarList.displayName = "ProgressBarList";
export default ProgressBarList;
