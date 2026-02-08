"use client";

import {
  TrendingUp,
  Target,
  Users,
  Layers,
  Globe,
  Shield,
  Zap,
  BarChart3,
} from "lucide-react";

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; style?: React.CSSProperties }>
> = {
  trending: TrendingUp,
  target: Target,
  users: Users,
  layers: Layers,
  globe: Globe,
  shield: Shield,
  zap: Zap,
  chart: BarChart3,
};

interface TextBlockProps {
  title?: string;
  content?: string;
  icon?: string;
}

function TextBlock({ title, content, icon }: TextBlockProps) {
  if (!title && !content) return null;

  const IconComponent = icon ? iconMap[icon] || null : null;

  return (
    <div data-viz="text-block">
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
            className="text-lg font-extrabold"
            style={{ color: "var(--viz-text)" }}
          >
            {title}
          </h3>
        </div>
      )}
      {content && (
        <p
          className="mt-3 text-base leading-[1.75]"
          style={{ color: "var(--viz-text-muted)" }}
          dangerouslySetInnerHTML={{
            __html: content.replace(
              /\*\*(.*?)\*\*/g,
              `<strong style="color: var(--viz-text); font-weight: 700">$1</strong>`
            ),
          }}
        />
      )}
    </div>
  );
}

TextBlock.displayName = "TextBlock";
export default TextBlock;
