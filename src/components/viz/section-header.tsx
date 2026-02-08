"use client";

interface SectionHeaderProps {
  title?: string;
  subtitle?: string;
}

function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  if (!title) return null;

  const sectionId = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <div
      data-viz="section-header"
      id={sectionId}
      style={{ scrollMarginTop: "64px" }}
    >
      {/* Decorative accent bar */}
      <div
        className="mb-5 h-1 w-12 rounded-full"
        style={{ backgroundColor: "var(--viz-primary)" }}
      />

      <h2
        className="text-4xl font-black tracking-tight md:text-5xl lg:text-6xl"
        style={{
          color: "var(--viz-text)",
          fontFamily: "var(--viz-font-heading)",
        }}
      >
        {title}
      </h2>

      {subtitle && (
        <p
          className="mt-4 max-w-2xl text-lg leading-relaxed"
          style={{ color: "var(--viz-text-muted)" }}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}

SectionHeader.displayName = "SectionHeader";
export default SectionHeader;
