"use client";

import { useCountUp } from "@/hooks/use-count-up";
import { ArrowDown } from "lucide-react";

interface HeroStatPill {
  value?: string;
  label?: string;
}

interface HeroSectionProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  stats?: HeroStatPill[];
  navItems?: string[];
}

function HeroStat({ stat, index }: { stat: HeroStatPill; index: number }) {
  const { displayValue, ref } = useCountUp(stat.value);

  return (
    <div
      className="viz-glass rounded-xl px-8 py-5 text-center"
      style={{ animationDelay: `${600 + index * 100}ms` }}
    >
      {stat.value && (
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className="text-2xl font-black tracking-tight"
        >
          {displayValue}
        </div>
      )}
      {stat.label && (
        <div className="mt-1 text-xs font-medium tracking-wide text-white/60">
          {stat.label}
        </div>
      )}
    </div>
  );
}

function HeroSection({
  badge,
  title,
  subtitle,
  stats,
  navItems,
}: HeroSectionProps) {
  if (!title) return null;

  const handleScrollDown = () => {
    const heroEl = document.querySelector('[data-viz="hero-section"]');
    if (heroEl) {
      const wrapper = heroEl.closest(".viz-wrapper") || heroEl;
      const nextTarget = wrapper.nextElementSibling;
      if (nextTarget) {
        nextTarget.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div
      data-viz="hero-section"
      className="relative flex min-h-[calc(100vh-60px)] flex-col items-center justify-center overflow-hidden px-8 text-center text-white"
      style={{ backgroundColor: "var(--viz-hero-bg, var(--viz-primary))" }}
    >
      {/* Gradient radial glow behind title */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255,255,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Dot pattern texture overlay */}
      <div className="viz-dot-pattern pointer-events-none absolute inset-0" />

      {/* Subtle gradient fade at bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.15), transparent)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center">
        {badge && (
          <span className="mb-8 inline-block rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold tracking-wide text-white/90 backdrop-blur-sm">
            {badge}
          </span>
        )}

        <h1
          className="max-w-5xl text-5xl font-black leading-[1.02] tracking-tight md:text-7xl lg:text-8xl"
          style={{ fontFamily: "var(--viz-font-heading)" }}
        >
          {title}
        </h1>

        {subtitle && (
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/70 md:text-xl">
            {subtitle}
          </p>
        )}

        {stats && stats.length > 0 && (
          <div className="mt-14 flex flex-wrap justify-center gap-4">
            {stats.map((stat, i) => (
              <HeroStat key={i} stat={stat} index={i} />
            ))}
          </div>
        )}

        {/* Scroll-down CTA */}
        <button
          onClick={handleScrollDown}
          className="group mt-20 flex flex-col items-center gap-2 text-white/50 transition-colors hover:text-white"
        >
          <span className="text-sm font-semibold tracking-widest uppercase">
            Explore Report
          </span>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 transition-all group-hover:border-white/40 group-hover:bg-white/10">
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </div>
        </button>
      </div>
    </div>
  );
}

HeroSection.displayName = "HeroSection";
export default HeroSection;
