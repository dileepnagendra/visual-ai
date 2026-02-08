"use client";

import {
  Shield,
  Users,
  Zap,
  CheckCircle2,
  Target,
  Layers,
  Globe,
  Lightbulb,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  shield: Shield,
  users: Users,
  zap: Zap,
  check: CheckCircle2,
  target: Target,
  layers: Layers,
  globe: Globe,
  lightbulb: Lightbulb,
  chart: BarChart3,
  trending: TrendingUp,
};

interface ContentItem {
  title?: string;
  description?: string;
  tag?: string;
}

interface ContentCardProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  items?: ContentItem[];
}

function ContentCard({
  title,
  subtitle,
  icon,
  items,
}: ContentCardProps) {
  if (!title && (!items || items.length === 0)) return null;

  const IconComponent = icon ? iconMap[icon] || null : null;

  return (
    <div data-viz="content-card" className="viz-card p-7">
      {/* Header */}
      {title && (
        <div className="flex items-center gap-3">
          {IconComponent && (
            <div className="viz-icon-circle">
              <IconComponent
                className="h-4 w-4"
                style={{ color: "var(--viz-primary)" }}
              />
            </div>
          )}
          <h3
            className="text-xl font-extrabold"
            style={{ color: "var(--viz-text)" }}
          >
            {title}
          </h3>
        </div>
      )}
      {subtitle && (
        <p
          className="mt-2 text-sm"
          style={{ color: "var(--viz-text-muted)" }}
        >
          {subtitle}
        </p>
      )}

      {/* Items with themed left border + tinted background */}
      {items && items.length > 0 && (
        <div className="mt-6 space-y-3">
          {items.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border-l-[3px] py-3 pr-4 pl-4"
              style={{
                borderColor: "var(--viz-primary)",
                backgroundColor: "var(--viz-primary-muted)",
              }}
            >
              <div className="flex items-center gap-2.5">
                {item.title && (
                  <span
                    className="text-sm font-bold"
                    style={{ color: "var(--viz-text)" }}
                  >
                    {item.title}
                  </span>
                )}
                {item.tag && (
                  <span
                    className="inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                    style={{
                      backgroundColor:
                        "rgba(var(--viz-primary-rgb), 0.1)",
                      color: "var(--viz-primary)",
                    }}
                  >
                    {item.tag}
                  </span>
                )}
              </div>
              {item.description && (
                <p
                  className="mt-1 text-sm leading-relaxed"
                  style={{ color: "var(--viz-text-muted)" }}
                >
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

ContentCard.displayName = "ContentCard";
export default ContentCard;
