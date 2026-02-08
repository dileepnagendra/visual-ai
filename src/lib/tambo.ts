import { type TamboComponent, type TamboTool } from "@tambo-ai/react";
import { z } from "zod";

// ── Stage 2: Core Visual Components ─────────────────────────
import SectionHeader from "@/components/viz/section-header";
import StatCard from "@/components/viz/stat-card";
import InsightCallout from "@/components/viz/insight-callout";
import TextBlock from "@/components/viz/text-block";
import ContentCard from "@/components/viz/content-card";

// ── Stage 3: Advanced Visual Components ─────────────────────
import HeroSection from "@/components/viz/hero-section";
import ComparisonTable from "@/components/viz/comparison-table";
import PhaseCard from "@/components/viz/phase-card";
import FeatureGrid from "@/components/viz/feature-grid";
import ProgressBarList from "@/components/viz/progress-bar-list";
import LineChartBlock from "@/components/viz/line-chart-block";

// ── Stage 5: New Visual Components ──────────────────────────
import RadarChartBlock from "@/components/viz/radar-chart-block";
import BarChartBlock from "@/components/viz/bar-chart-block";
import StatCardGroup from "@/components/viz/stat-card-group";

// ============================================================
// Tambo Component Registry
// All props are optional in the schema to support Tambo's
// progressive streaming — props arrive incrementally.
// Components handle missing props with null returns / fallbacks.
// ============================================================

export const tamboComponents: TamboComponent[] = [
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STAGE 2: Core Components
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ── Section Header ─────────────────────────────────────────
  {
    name: "SectionHeader",
    description:
      "A large, bold section title with optional subtitle. Use this to start a new major section of the visual document, like 'Executive Summary', 'Market Strategy', 'Competitive Landscape Analysis', or 'Strategic Recommendations'. This should be the first component in each logical section.",
    component: SectionHeader,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .describe(
          "The main section title, kept short and impactful (2-5 words). Examples: 'Executive Summary', 'Market Strategy', 'Competitive Landscape Analysis'"
        ),
      subtitle: z
        .string()
        .optional()
        .describe(
          "A brief one-line description of the section. Example: 'Strategic positioning in the AI video generation market'"
        ),
    }),
  },

  // ── Stat Card ──────────────────────────────────────────────
  {
    name: "StatCard",
    description:
      "A prominent statistic card displaying a single key metric or number. Use this when the research text contains important quantitative data like market sizes, growth percentages, revenue figures, user counts, or other numeric KPIs. Displays a large bold number with a label and optional trend indicator. Best used in groups of 2-4 for maximum visual impact.",
    component: StatCard,
    propsSchema: z.object({
      value: z
        .string()
        .optional()
        .describe(
          "The statistic value as a formatted string. Include units and symbols. Examples: '$3.35B', '18.8%', '65%+', '52M+', '$480B'"
        ),
      label: z
        .string()
        .optional()
        .describe(
          "Short description of what the statistic represents. Example: 'Projected market size by 2034', 'Market CAGR through 2034'"
        ),
      trend: z
        .string()
        .optional()
        .describe(
          "Optional trend direction. Options: 'up' for growing metrics, 'down' for declining, 'neutral' for stable."
        ),
    }),
  },

  // ── Insight Callout ────────────────────────────────────────
  {
    name: "InsightCallout",
    description:
      "A visually prominent navy-blue callout block for key insights, strategic takeaways, or important conclusions extracted from the research. Use this for the single most important insight or conclusion from a section — like a 'Strategic Insight', 'Final Insight', 'Key Takeaway', or 'Value Proposition'. Should contain a punchy, memorable statement. Use sparingly — one per section maximum.",
    component: InsightCallout,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .describe(
          "Short title for the insight. Examples: 'Strategic Insight', 'Final Insight', 'Key Takeaway', 'Value Proposition'"
        ),
      content: z
        .string()
        .optional()
        .describe(
          "The insight text — a concise, impactful statement summarizing the key finding or strategic conclusion. 1-3 sentences."
        ),
      icon: z
        .string()
        .optional()
        .describe(
          "Icon to display. Options: 'sparkles' for insights, 'target' for strategy, 'lightbulb' for ideas, 'alert' for warnings, 'shield' for compliance/safety, 'zap' for innovation."
        ),
    }),
  },

  // ── Text Block ─────────────────────────────────────────────
  {
    name: "TextBlock",
    description:
      "A text paragraph with an optional icon-prefixed heading. Use this for explanatory body content within a section — describing market opportunities, competitive landscapes, strategic positioning, technology details, or any narrative content from the research. Multiple TextBlocks can be used within a section to cover different sub-topics.",
    component: TextBlock,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .describe(
          "Sub-heading for the text block. Examples: 'The Market Opportunity', 'Competitive Landscape', 'Strategic Positioning'"
        ),
      content: z
        .string()
        .optional()
        .describe(
          "The paragraph text. Can include analysis, explanations, and context. Keep to 2-4 sentences for readability."
        ),
      icon: z
        .string()
        .optional()
        .describe(
          "Optional icon for the heading. Options: 'trending' for market/growth, 'target' for strategy, 'users' for people/teams, 'layers' for technology, 'globe' for global topics, 'shield' for security, 'zap' for innovation, 'chart' for data."
        ),
    }),
  },

  // ── Content Card ───────────────────────────────────────────
  {
    name: "ContentCard",
    description:
      "A bordered card containing a list of items with blue left-border accents. Use this for structured lists like 'Critical Capability Gaps', 'Unique Advantages', 'Target Customer Segments', 'Core Capabilities', 'Key Features', or 'Resource Requirements'. Each item has a bold title, description, and optional tag/badge. Best used in pairs (2 cards side by side) for comparisons or grouped information.",
    component: ContentCard,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .describe(
          "Card title. Examples: 'Critical Capability Gaps', 'Unique Advantages', 'Target Customer Segments'"
        ),
      subtitle: z
        .string()
        .optional()
        .describe("Optional short subtitle under the title."),
      icon: z
        .string()
        .optional()
        .describe(
          "Icon for the card header. Options: 'zap' for gaps/challenges, 'shield' for advantages/strengths, 'users' for people/segments, 'check' for capabilities, 'target' for goals, 'layers' for technology, 'trending' for growth, 'lightbulb' for ideas, 'globe' for global, 'chart' for data."
        ),
      items: z
        .array(
          z.object({
            title: z.string().optional().describe("Bold item title"),
            description: z
              .string()
              .optional()
              .describe("Brief description of the item (1 sentence)"),
            tag: z
              .string()
              .optional()
              .describe(
                "Optional badge/tag like 'Primary', 'Phase 1', 'Critical', 'Required'"
              ),
          })
        )
        .optional()
        .describe("List of 2-5 items to display in the card"),
    }),
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STAGE 3: Advanced Components
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ── Hero Section ───────────────────────────────────────────
  {
    name: "HeroSection",
    description:
      "A full-width navy-blue hero banner for the top of a visual document. Displays a large white title, subtitle, optional badge, and optional stat pills. Use this ONCE at the very beginning of a document as the opening visual — like a report cover page. Only use when generating a comprehensive document from substantial research text.",
    component: HeroSection,
    propsSchema: z.object({
      badge: z
        .string()
        .optional()
        .describe(
          "Small badge/pill text above the title. Example: 'Product Roadmap 2026-2028', 'Market Report Q4 2025'"
        ),
      title: z
        .string()
        .optional()
        .describe(
          "The main document title — big and bold. Examples: 'Adobe AI Video Agent', 'EV Market Analysis 2025'"
        ),
      subtitle: z
        .string()
        .optional()
        .describe(
          "Subtitle below the title. Example: 'Transforming Video Creation Through Ecosystem Integration'"
        ),
      stats: z
        .array(
          z.object({
            value: z
              .string()
              .optional()
              .describe("Stat value like '$3.35B', '18.8%'"),
            label: z
              .string()
              .optional()
              .describe("Stat label like 'Market by 2034'"),
          })
        )
        .optional()
        .describe("2-4 key stat pills shown at the bottom of the hero"),
      navItems: z
        .array(z.string())
        .optional()
        .describe(
          "Navigation pill labels that scroll to matching SectionHeaders. Use the same titles as the SectionHeaders in the document. Example: ['Executive Summary', 'Market Overview', 'Competition', 'Strategy']"
        ),
    }),
  },

  // ── Comparison Table ───────────────────────────────────────
  {
    name: "ComparisonTable",
    description:
      "A clean comparison table for side-by-side analysis of multiple items, competitors, or options. Use when the research contains feature comparisons, competitive matrices, platform evaluations, or any tabular data comparing 2+ entities across multiple criteria. The last column can be highlighted to emphasize the primary subject.",
    component: ComparisonTable,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .describe(
          "Table title. Examples: 'Platform Capabilities Matrix', 'Competitive Comparison', 'Feature Analysis'"
        ),
      headers: z
        .array(z.string())
        .optional()
        .describe(
          "Column headers. First should be the criteria label (e.g. 'Capability'), rest are entities being compared (e.g. 'HeyGen', 'Synthesia', 'Adobe')"
        ),
      rows: z
        .array(
          z.object({
            label: z
              .string()
              .optional()
              .describe("Row label (the criterion being compared)"),
            values: z
              .array(z.string())
              .optional()
              .describe(
                "Values for each column (same order as headers, excluding the label column)"
              ),
          })
        )
        .optional()
        .describe("Table rows — each with a label and values for each column"),
      highlightLastColumn: z
        .boolean()
        .optional()
        .describe(
          "Highlight the last column with a subtle blue background to emphasize the primary subject. Defaults to true."
        ),
    }),
  },

  // ── Phase Card ─────────────────────────────────────────────
  {
    name: "PhaseCard",
    description:
      "A numbered phase/milestone card showing a phase of a roadmap, plan, or strategy. Displays a phase number badge, title, timeframe, list of capabilities/features, and strategic impact statement. Use when the research describes phased rollouts, product roadmaps, implementation plans, or multi-stage strategies.",
    component: PhaseCard,
    propsSchema: z.object({
      phaseNumber: z
        .number()
        .optional()
        .describe("Phase number (1, 2, 3, etc.)"),
      title: z
        .string()
        .optional()
        .describe(
          "Phase title. Examples: 'MVP Foundation', 'Competitive Parity', 'Ecosystem Dominance'"
        ),
      timeframe: z
        .string()
        .optional()
        .describe(
          "Timeframe string. Examples: 'Months 0-6', 'Months 12-18', 'Q1-Q2 2026'"
        ),
      capabilities: z
        .array(z.string())
        .optional()
        .describe(
          "List of capabilities/features in this phase. Example: ['Text-to-Video Generation', 'Photo Avatars', 'Brand Foundations']"
        ),
      strategicImpact: z
        .string()
        .optional()
        .describe(
          "One-line strategic impact statement. Example: 'Competitive baseline with Adobe integration advantage'"
        ),
    }),
  },

  // ── Feature Grid ───────────────────────────────────────────
  {
    name: "FeatureGrid",
    description:
      "A 2-column grid of feature/topic cards, each with an icon, title, subtitle, and list of items with blue left borders. Use when the research describes multiple categories, features, departments, or topics that should be shown in a grid layout — like 'Content Authenticity' and 'Consent Management' side by side, or 'Deepfake Prevention' and 'Content Moderation'. Best for 2-4 cards.",
    component: FeatureGrid,
    propsSchema: z.object({
      cards: z
        .array(
          z.object({
            title: z.string().optional().describe("Card title"),
            subtitle: z
              .string()
              .optional()
              .describe("Short description under the title"),
            icon: z
              .string()
              .optional()
              .describe("Icon for the card. Options: 'shield', 'users', 'zap', 'check', 'target', 'layers', 'globe', 'lightbulb', 'chart', 'trending'."),
            items: z
              .array(
                z.object({
                  title: z.string().optional().describe("Item title"),
                  description: z
                    .string()
                    .optional()
                    .describe("Item description"),
                })
              )
              .optional()
              .describe("Items with blue left-border accents"),
          })
        )
        .optional()
        .describe("Array of 2-4 feature cards to display in a grid"),
    }),
  },

  // ── Progress Bar List ──────────────────────────────────────
  {
    name: "ProgressBarList",
    description:
      "A card with numbered items showing horizontal progress bars and percentages. Use when the research contains ranked items with quantitative scores, market share breakdowns, adoption rates, priority rankings, or any ordered list where items have a percentage or score value. Examples: 'Prioritized Use Cases', 'Market Share Breakdown', 'Feature Adoption Rates'.",
    component: ProgressBarList,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .describe(
          "Card title. Examples: 'Prioritized Use Cases', 'Market Share', 'Adoption Rates'"
        ),
      items: z
        .array(
          z.object({
            label: z
              .string()
              .optional()
              .describe(
                "Item label. Example: 'Marketing & Advertising', 'Social Media Content'"
              ),
            value: z
              .number()
              .optional()
              .describe("Percentage value (0-100). Example: 95"),
            tag: z
              .string()
              .optional()
              .describe(
                "Optional tag shown to the right. Example: '23.5% CAGR', 'Leader'"
              ),
          })
        )
        .optional()
        .describe("Ordered list of items with progress values"),
    }),
  },

  // ── Line Chart Block ───────────────────────────────────────
  {
    name: "LineChartBlock",
    description:
      "A line chart visualization showing data trends over time. Use when the research contains time-series data, growth trajectories, market projections, historical trends, or any data that shows change over a period. Examples: 'Market Growth Trajectory (2026-2034)', 'Revenue Forecast', 'User Growth Over Time'.",
    component: LineChartBlock,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .describe(
          "Chart title. Examples: 'Market Growth Trajectory (2026-2034)', 'Revenue Forecast'"
        ),
      data: z
        .array(
          z.object({
            name: z
              .string()
              .optional()
              .describe(
                "X-axis label (typically a year or time period). Example: '2026', 'Q1'"
              ),
            value: z
              .number()
              .optional()
              .describe("Y-axis value. Example: 0.8, 1.7, 3.4"),
          })
        )
        .optional()
        .describe("Array of data points for the line chart"),
      yAxisLabel: z
        .string()
        .optional()
        .describe(
          "Optional label for the Y-axis. Example: 'Revenue ($B)', 'Users (M)'"
        ),
    }),
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // STAGE 5: New Components
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  // ── Radar Chart Block ─────────────────────────────────────
  {
    name: "RadarChartBlock",
    description:
      "A radar/spider chart with a scored list beside it, showing multi-dimensional assessment data. Use when the research evaluates multiple categories, technologies, or criteria on a common scale (0-100). Shows both a visual radar shape and a detailed scored breakdown. Examples: 'Technology Maturity Assessment', 'Competitive Capability Scoring', 'Team Skill Matrix'. Best with 3-6 dimensions.",
    component: RadarChartBlock,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .describe(
          "Chart title. Examples: 'Foundational Model Technologies', 'Competitive Capability Assessment'"
        ),
      subtitle: z
        .string()
        .optional()
        .describe(
          "Subtitle under the title. Example: 'Maturity assessment of key AI approaches'"
        ),
      dimensions: z
        .array(
          z.object({
            label: z
              .string()
              .optional()
              .describe(
                "Dimension name. Example: 'Graph Neural Networks', 'Explainable AI'"
              ),
            value: z
              .number()
              .optional()
              .describe("Score from 0-100. Example: 85"),
            description: z
              .string()
              .optional()
              .describe(
                "Brief description of this dimension's assessment. Example: 'Dominate molecular property prediction and drug-target interaction modeling'"
              ),
          })
        )
        .optional()
        .describe("Array of 3-6 dimensions to plot on the radar chart"),
    }),
  },

  // ── Bar Chart Block ───────────────────────────────────────
  {
    name: "BarChartBlock",
    description:
      "A vertical bar chart with gradient-colored bars showing comparative data. Use when the research contains categorical comparisons, periodic data (quarterly/yearly), investment amounts, or any data where bars are more appropriate than lines. Bars shade from light to dark for visual appeal. Examples: 'Quarterly Investment Trends', 'Revenue by Segment', 'Funding Rounds by Year'.",
    component: BarChartBlock,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .describe(
          "Chart title. Examples: '2024-2026 Investment Surge', 'Revenue by Business Unit'"
        ),
      subtitle: z
        .string()
        .optional()
        .describe(
          "Subtitle with context. Example: 'Healthcare AI captured 55% of all health tech funding in 2025'"
        ),
      data: z
        .array(
          z.object({
            name: z
              .string()
              .optional()
              .describe(
                "X-axis category label. Example: 'Q1 2024', '2025', 'Series A'"
              ),
            value: z
              .number()
              .optional()
              .describe("Bar height value. Example: 4.2"),
          })
        )
        .optional()
        .describe("Array of data points for the bar chart"),
      yAxisLabel: z
        .string()
        .optional()
        .describe(
          "Optional label for the Y-axis. Example: 'Investment ($B)', 'Revenue ($M)'"
        ),
    }),
  },

  // ── Stat Card Group ───────────────────────────────────────
  {
    name: "StatCardGroup",
    description:
      "A titled container card that groups 2-4 related statistics together with a tinted background. Use instead of multiple individual StatCards when the stats belong to a single category or theme — like 'Partnership Economics', 'Market Size Metrics', 'Key Performance Indicators'. Each stat has a large colored value, bold label, and optional description. Creates a visually cohesive grouped layout.",
    component: StatCardGroup,
    propsSchema: z.object({
      title: z
        .string()
        .optional()
        .describe(
          "Group title. Examples: 'Partnership Economics & Deal Structures', 'Key Market Metrics'"
        ),
      stats: z
        .array(
          z.object({
            value: z
              .string()
              .optional()
              .describe(
                "The stat value as a formatted string. Examples: '$100M-$1.65B', '20%', '7,000+'"
              ),
            label: z
              .string()
              .optional()
              .describe(
                "Bold label for the stat. Examples: 'Upfront Payments', 'CAGR Growth Rate'"
              ),
            description: z
              .string()
              .optional()
              .describe(
                "Brief context line. Example: 'Initial licensing fees for promising assets'"
              ),
          })
        )
        .optional()
        .describe("Array of 2-4 stats to display in the group"),
    }),
  },
];

// ============================================================
// Tambo Tool Registry
// ============================================================

export const tamboTools: TamboTool[] = [
  {
    name: "analyze-research-text",
    description:
      "Analyzes raw research text and extracts structured metadata to help decide which visual components to use. Call this FIRST before rendering any components when the user pastes a large block of research text.",
    tool: (params: { text: string }) => {
      const text = params.text || "";
      const words = text.split(/\s+/).filter(Boolean);
      const wordCount = words.length;

      // Detect numbers/statistics
      const numberMatches = text.match(
        /\$[\d,.]+[BMKTbmkt]?|\d+\.?\d*%|\d{1,3}(?:,\d{3})+/g
      );
      const statistics = numberMatches ? numberMatches.slice(0, 10) : [];

      // Detect potential comparisons (vs, compared to, versus)
      const hasComparisons = /\bvs\.?\b|\bversus\b|\bcompared to\b/i.test(
        text
      );

      // Detect phases/timelines
      const hasPhases =
        /\bphase\s*\d/i.test(text) ||
        /\bstage\s*\d/i.test(text) ||
        /\bstep\s*\d/i.test(text);
      const hasTimeline =
        /\b\d{4}\s*[-–]\s*\d{4}\b/.test(text) ||
        /\bQ[1-4]\b/i.test(text) ||
        /\bmonths?\s*\d/i.test(text);

      // Detect lists/bullets
      const hasBulletPoints =
        (text.match(/^[\s]*[-•*]\s/gm) || []).length >= 2;

      // Simple topic extraction (capitalize nouns that appear frequently)
      const wordFreq: Record<string, number> = {};
      words.forEach((w) => {
        const clean = w.replace(/[^a-zA-Z]/g, "").toLowerCase();
        if (clean.length > 4) {
          wordFreq[clean] = (wordFreq[clean] || 0) + 1;
        }
      });
      const topTopics = Object.entries(wordFreq)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([word]) => word);

      return {
        wordCount,
        statistics,
        hasComparisons,
        hasPhases,
        hasTimeline,
        hasBulletPoints,
        topTopics,
        suggestedComponents: [
          "SectionHeader",
          ...(statistics.length > 0 ? ["StatCard", "StatCardGroup"] : []),
          "TextBlock",
          "InsightCallout",
          ...(hasComparisons ? ["ComparisonTable", "RadarChartBlock"] : []),
          ...(hasPhases ? ["PhaseCard"] : []),
          ...(hasTimeline ? ["LineChartBlock", "BarChartBlock"] : []),
          ...(hasBulletPoints ? ["ContentCard"] : []),
          ...(wordCount > 200 ? ["HeroSection"] : []),
        ],
      };
    },
    inputSchema: z.object({
      text: z
        .string()
        .describe("The raw research text to analyze"),
    }),
    outputSchema: z.object({
      wordCount: z.number(),
      statistics: z.array(z.string()),
      hasComparisons: z.boolean(),
      hasPhases: z.boolean(),
      hasTimeline: z.boolean(),
      hasBulletPoints: z.boolean(),
      topTopics: z.array(z.string()),
      suggestedComponents: z.array(z.string()),
    }),
  },
];
