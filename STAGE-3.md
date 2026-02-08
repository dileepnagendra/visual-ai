# Stage 3: Advanced Visual Components

## What was done

Built 6 advanced generative UI components to complete the full Superagent-style report experience. Installed `recharts` for data visualization.

### New dependency
- `recharts` — React charting library for the LineChartBlock component

### Components Built

All located in `src/components/viz/`:

#### 6. `HeroSection` → `hero-section.tsx`
Full-width navy-blue hero banner for the document cover page. Shows badge, large white title, subtitle, and stat pills.
- **When AI uses it**: Once at the very top of a comprehensive document
- **Props**: `badge?`, `title?`, `subtitle?`, `stats?[]` (each with `value`, `label`)
- **Visual match**: Screenshot 6 — the big blue "Adobe AI Video Agent" banner

#### 7. `ComparisonTable` → `comparison-table.tsx`
Clean comparison matrix with highlighted last column. For side-by-side analysis of competitors or features.
- **When AI uses it**: Feature comparisons, competitive matrices, evaluations
- **Props**: `title?`, `headers?[]`, `rows?[]` (each with `label`, `values[]`), `highlightLastColumn?`
- **Visual match**: Screenshot 2 — "Platform Capabilities Matrix"

#### 8. `PhaseCard` → `phase-card.tsx`
Numbered phase card with badge, title, timeframe, capabilities checklist, and strategic impact.
- **When AI uses it**: Roadmaps, phased rollouts, implementation plans
- **Props**: `phaseNumber?`, `title?`, `timeframe?`, `capabilities?[]`, `strategicImpact?`
- **Visual match**: Screenshots 1, 3, 9 — "Phase 1: MVP Foundation", "Phase 2: Competitive Parity"

#### 9. `FeatureGrid` → `feature-grid.tsx`
2-column grid of feature cards, each with icon, title, subtitle, and blue-bordered list items.
- **When AI uses it**: Multiple categories/features shown side-by-side
- **Props**: `cards?[]` (each with `title`, `subtitle`, `icon`, `items[]`)
- **Visual match**: Screenshot 4 — "Content Authenticity" / "Consent Management" grid

#### 10. `ProgressBarList` → `progress-bar-list.tsx`
Numbered list with horizontal navy-blue progress bars and percentage values.
- **When AI uses it**: Rankings, market share, adoption rates, scored items
- **Props**: `title?`, `items?[]` (each with `label`, `value` (0-100), `tag`)
- **Visual match**: Screenshot 7 — "Prioritized Use Cases" with bars

#### 11. `LineChartBlock` → `line-chart-block.tsx`
Line chart using Recharts showing data trends over time.
- **When AI uses it**: Growth projections, time-series data, market forecasts
- **Props**: `title?`, `data?[]` (each with `name`, `value`), `yAxisLabel?`
- **Visual match**: Screenshot 9 — "Market Growth Trajectory (2026-2034)"

### Complete Component Registry (11 total)

| # | Component | Type | Stage |
|---|-----------|------|-------|
| 1 | SectionHeader | Core | 2 |
| 2 | StatCard | Core | 2 |
| 3 | InsightCallout | Core | 2 |
| 4 | TextBlock | Core | 2 |
| 5 | ContentCard | Core | 2 |
| 6 | HeroSection | Advanced | 3 |
| 7 | ComparisonTable | Advanced | 3 |
| 8 | PhaseCard | Advanced | 3 |
| 9 | FeatureGrid | Advanced | 3 |
| 10 | ProgressBarList | Advanced | 3 |
| 11 | LineChartBlock | Advanced | 3 |

---

## How to test

Run the app and try these prompts to exercise the new components:

**Hero + Full report:**
> "Here is a research report about the global AI chip market. The market is valued at $53.6B in 2025 and projected to reach $227B by 2032, growing at 23.2% CAGR. NVIDIA leads with 80% GPU market share, followed by AMD at 12% and Intel at 5%. Key segments: Data Center (65% market share), Edge Computing (20%), Consumer (15%). The market is evolving in 3 phases: Phase 1 (2025-2027) focuses on scaling current architectures, Phase 2 (2027-2029) introduces chiplet designs, Phase 3 (2029-2032) brings neuromorphic computing. Create a full visual document."

**Comparison table:**
> "Compare these cloud platforms: AWS has 32% market share, 200+ services, best for enterprise. Azure has 23%, strong MS integration, best for hybrid. GCP has 11%, best AI/ML tools, best for startups. Create a comparison table."

**Phase cards:**
> "Our product roadmap has 3 phases: Phase 1 (Q1-Q2) covers MVP with user auth, dashboard, and API. Phase 2 (Q3) adds analytics, integrations, and mobile app. Phase 3 (Q4) delivers enterprise features, AI, and marketplace."

---

## File Structure After Stage 3

```
src/components/viz/
├── section-header.tsx        (Stage 2)
├── stat-card.tsx             (Stage 2)
├── insight-callout.tsx       (Stage 2)
├── text-block.tsx            (Stage 2)
├── content-card.tsx          (Stage 2)
├── hero-section.tsx          (Stage 3) ← NEW
├── comparison-table.tsx      (Stage 3) ← NEW
├── phase-card.tsx            (Stage 3) ← NEW
├── feature-grid.tsx          (Stage 3) ← NEW
├── progress-bar-list.tsx     (Stage 3) ← NEW
└── line-chart-block.tsx      (Stage 3) ← NEW
```

---

## Next: Stage 4

Stage 4 will add:
- Split-panel layout (chat on left, visual document on right)
- Research processing tool (analyzes text before rendering)
- Additional context for Tambo (document type preferences)
