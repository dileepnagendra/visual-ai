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

interface FeatureItem {
  title?: string;
  description?: string;
}

interface FeatureCardData {
  title?: string;
  subtitle?: string;
  icon?: string;
  items?: FeatureItem[];
}

interface FeatureGridProps {
  cards?: FeatureCardData[];
}

function FeatureGrid({ cards }: FeatureGridProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <div data-viz="feature-grid" className="grid gap-5 md:grid-cols-2">
      {cards.map((card, cardIdx) => {
        const IconComponent = card.icon
          ? iconMap[card.icon] || null
          : null;

        return (
          <div key={cardIdx} className="viz-card p-7">
            {/* Card Header */}
            <div className="flex items-center gap-3">
              {IconComponent && (
                <div className="viz-icon-circle">
                  <IconComponent
                    className="h-4 w-4"
                    style={{ color: "var(--viz-primary)" }}
                  />
                </div>
              )}
              {card.title && (
                <h3
                  className="text-lg font-extrabold"
                  style={{ color: "var(--viz-text)" }}
                >
                  {card.title}
                </h3>
              )}
            </div>
            {card.subtitle && (
              <p
                className="mt-2 text-sm"
                style={{ color: "var(--viz-text-muted)" }}
              >
                {card.subtitle}
              </p>
            )}

            {/* Items with themed left border + tinted bg */}
            {card.items && card.items.length > 0 && (
              <div className="mt-5 space-y-3">
                {card.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className="rounded-lg border-l-[3px] py-2.5 pr-3 pl-4"
                    style={{
                      borderColor: "var(--viz-primary)",
                      backgroundColor: "var(--viz-primary-muted)",
                    }}
                  >
                    {item.title && (
                      <p
                        className="text-sm font-bold"
                        style={{ color: "var(--viz-text)" }}
                      >
                        {item.title}
                      </p>
                    )}
                    {item.description && (
                      <p
                        className="mt-0.5 text-xs leading-relaxed"
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
      })}
    </div>
  );
}

FeatureGrid.displayName = "FeatureGrid";
export default FeatureGrid;
