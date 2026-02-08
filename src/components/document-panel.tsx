"use client";

import { useTamboThread } from "@tambo-ai/react";
import { FileText, Loader2 } from "lucide-react";
import React, { useEffect, useRef, useState, useCallback } from "react";

interface DocumentPanelProps {
  theme?: string;
  fullWidth?: boolean;
}

export function DocumentPanel({ theme = "ink", fullWidth = false }: DocumentPanelProps) {
  const { thread, generationStage } = useTamboThread();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("");

  const assistantMessages = thread?.messages?.filter(
    (m) => m.role === "assistant"
  );

  const hasComponents = assistantMessages?.some((m) => m.renderedComponent);

  const isGenerating =
    generationStage !== "IDLE" &&
    generationStage !== "COMPLETE" &&
    generationStage !== "ERROR";

  // ── Separate hero, extract nav items, build component groups ──
  const collected = {
    hero: null as { id: string; component: React.ReactNode } | null,
    heroNav: [] as string[],
    sectionTitles: [] as string[],
    groups: [] as {
      type: string;
      items: { id: string; component: React.ReactNode }[];
    }[],
  };

  assistantMessages?.forEach((message) => {
    if (!message.renderedComponent) return;

    const componentType = getComponentType(message.renderedComponent);

    if (componentType === "hero-section" && !collected.hero) {
      collected.hero = { id: message.id, component: message.renderedComponent };
      if (React.isValidElement(message.renderedComponent)) {
        const props = message.renderedComponent.props as {
          navItems?: string[];
        };
        if (props.navItems && props.navItems.length > 0) {
          collected.heroNav = props.navItems;
        }
      }
      return;
    }

    if (
      componentType === "section-header" &&
      React.isValidElement(message.renderedComponent)
    ) {
      const props = message.renderedComponent.props as { title?: string };
      if (props.title) collected.sectionTitles.push(props.title);
    }

    const lastGroup = collected.groups[collected.groups.length - 1];
    if (componentType === "stat-card" && lastGroup?.type === "stat-card") {
      lastGroup.items.push({
        id: message.id,
        component: message.renderedComponent,
      });
    } else {
      collected.groups.push({
        type: componentType,
        items: [{ id: message.id, component: message.renderedComponent }],
      });
    }
  });

  const heroItem = collected.hero;
  const componentGroups = collected.groups;

  const navItems =
    collected.heroNav.length > 0
      ? collected.heroNav
      : collected.sectionTitles;

  const handleNavClick = useCallback((item: string) => {
    const id = item
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  const navKey = JSON.stringify(navItems);

  useEffect(() => {
    if (navItems.length === 0 || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: scrollContainer,
        rootMargin: "-5% 0px -80% 0px",
        threshold: 0,
      }
    );

    const timer = setTimeout(() => {
      navItems.forEach((item) => {
        const id = item
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 600);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navKey]);

  // ── Empty state ──
  if (!hasComponents && !isGenerating) {
    return (
      <div
        className="flex h-full flex-col items-center justify-center gap-5 text-center"
        style={{ backgroundColor: "var(--viz-bg, #f8fafc)" }}
        data-theme={theme}
      >
        <div
          className="flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{
            backgroundColor: "var(--viz-surface)",
            border: "1.5px solid var(--viz-border)",
          }}
        >
          <FileText className="h-10 w-10" style={{ color: "var(--viz-text-muted)" }} />
        </div>
        <div>
          <h2
            className="text-lg font-bold"
            style={{ color: "var(--viz-text-muted)" }}
          >
            Visual Document
          </h2>
          <p
            className="mt-2 max-w-sm text-sm leading-relaxed"
            style={{ color: "var(--viz-text-muted)", opacity: 0.7 }}
          >
            Your research will be transformed into a rich, interactive
            visual document here. Paste text in the chat to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={scrollRef}
      className="h-full overflow-y-auto"
      style={{ backgroundColor: "var(--viz-bg, #f8fafc)" }}
      data-theme={theme}
    >
      {/* ── Hero Section: full-width landing, no container ── */}
      {heroItem && (
        <div className="viz-wrapper" data-component="hero-section">
          {heroItem.component}
        </div>
      )}

      {/* ── Sticky Navigation Bar ── */}
      {navItems.length > 0 && (
        <div
          className="sticky top-0 z-20 border-b px-6 py-3 backdrop-blur-md"
          style={{
            backgroundColor: "var(--viz-surface)",
            borderColor: "var(--viz-border)",
            boxShadow: "0 1px 3px rgba(0, 0, 0, 0.04)",
          }}
        >
          <div
            className={`mx-auto flex flex-wrap items-center gap-2 ${fullWidth ? "max-w-[1400px]" : "max-w-7xl"}`}
          >
            {navItems.map((item, i) => {
              const id = item
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
              const isActive = activeSection === id;
              return (
                <button
                  key={i}
                  onClick={() => handleNavClick(item)}
                  className="rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: isActive
                      ? "var(--viz-primary)"
                      : "transparent",
                    color: isActive ? "var(--viz-surface)" : "var(--viz-text-muted)",
                    border: isActive
                      ? "1.5px solid var(--viz-primary)"
                      : "1.5px solid var(--viz-border)",
                    boxShadow: isActive
                      ? "0 2px 8px rgba(var(--viz-primary-rgb), 0.2)"
                      : "none",
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Document Content: wide container ── */}
      <div
        className={`mx-auto px-8 py-10 md:px-12 ${fullWidth ? "max-w-[1400px]" : "max-w-7xl"}`}
      >
        <div className="viz-document-flow">
          {componentGroups.map((group, groupIdx) => {
            if (group.type === "stat-card" && group.items.length > 1) {
              return (
                <div key={`group-${groupIdx}`} className="viz-stat-grid">
                  {group.items.map((item) => (
                    <div
                      key={item.id}
                      className="viz-wrapper viz-card-hover"
                      data-component="stat-card"
                    >
                      {item.component}
                    </div>
                  ))}
                </div>
              );
            }

            return group.items.map((item) => (
              <div
                key={item.id}
                className={`viz-wrapper ${isCardType(group.type) ? "viz-card-hover" : ""}`}
                data-component={group.type}
              >
                {item.component}
              </div>
            ));
          })}

          {/* Generating indicator */}
          {isGenerating && (
            <div
              className="flex items-center gap-3 rounded-xl border px-5 py-4 text-sm"
              style={{
                borderColor: "var(--viz-border)",
                backgroundColor: "var(--viz-surface)",
                color: "var(--viz-text-muted)",
              }}
            >
              <Loader2
                className="h-4 w-4 animate-spin"
                style={{ color: "var(--viz-primary)" }}
              />
              <span className="font-medium">Building visual document...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Helper: detect component type from rendered element ──────
function getComponentType(element: React.ReactNode): string {
  if (React.isValidElement(element)) {
    const props = element.props as Record<string, unknown>;
    const componentName =
      typeof element.type === "function"
        ? (element.type as { displayName?: string; name?: string })
            .displayName ||
          (element.type as { name?: string }).name ||
          ""
        : "";

    const nameMap: Record<string, string> = {
      SectionHeader: "section-header",
      StatCard: "stat-card",
      InsightCallout: "insight-callout",
      TextBlock: "text-block",
      ContentCard: "content-card",
      HeroSection: "hero-section",
      ComparisonTable: "comparison-table",
      PhaseCard: "phase-card",
      FeatureGrid: "feature-grid",
      ProgressBarList: "progress-bar-list",
      LineChartBlock: "line-chart-block",
      RadarChartBlock: "radar-chart-block",
      BarChartBlock: "bar-chart-block",
      StatCardGroup: "stat-card-group",
    };

    if (nameMap[componentName]) return nameMap[componentName];

    if (props && typeof props === "object") {
      if ("phaseNumber" in props) return "phase-card";
      if ("dimensions" in props) return "radar-chart-block";
      if ("stats" in props && "title" in props) return "stat-card-group";
      if ("headers" in props && "rows" in props) return "comparison-table";
      if ("cards" in props) return "feature-grid";
      if ("data" in props && "yAxisLabel" in props) return "line-chart-block";
      if ("trend" in props && "value" in props) return "stat-card";
      if ("badge" in props) return "hero-section";
      if ("items" in props && "title" in props) return "content-card";
    }
  }
  return "unknown";
}

function isCardType(type: string): boolean {
  return [
    "stat-card",
    "content-card",
    "insight-callout",
    "phase-card",
    "stat-card-group",
    "comparison-table",
    "feature-grid",
    "progress-bar-list",
    "radar-chart-block",
    "bar-chart-block",
    "line-chart-block",
  ].includes(type);
}
