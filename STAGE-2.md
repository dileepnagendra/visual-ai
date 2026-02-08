# Stage 2: Core Visual Components

## What was done

Built 5 generative UI components matching the Superagent visual design system, and registered them with Tambo using Zod schemas.

### Design System (extracted from Superagent screenshots)

| Token | Value |
|-------|-------|
| Primary blue | `#1e3a8a` (navy) |
| Background | White cards on light gray page |
| Borders | `border-zinc-200` (thin, subtle) |
| Title font | `font-extrabold`, `text-4xl`/`text-5xl` |
| Body font | `text-sm`, `text-zinc-600` |
| Spacing | Generous padding (`p-5`, `p-6`), `my-6` between blocks |

### Components Built

All located in `src/components/viz/`:

#### 1. `SectionHeader` → `section-header.tsx`
Large bold section title + gray subtitle. Used at the start of each document section.
- **When AI uses it**: Start of major sections like "Executive Summary", "Market Strategy"
- **Props**: `title`, `subtitle?`

#### 2. `StatCard` → `stat-card.tsx`
Prominent metric card with a large navy-blue number, label, and optional trend arrow.
- **When AI uses it**: Key quantitative data — market sizes, percentages, revenue figures
- **Props**: `value`, `label`, `trend?` ("up" | "down" | "neutral")

#### 3. `InsightCallout` → `insight-callout.tsx`
Full-width navy-blue callout block for key insights and strategic takeaways.
- **When AI uses it**: The single most important conclusion from a section
- **Props**: `title`, `content`, `icon?` ("sparkles" | "target" | "lightbulb" | "alert" | "shield" | "zap")

#### 4. `TextBlock` → `text-block.tsx`
Paragraph with icon-prefixed heading. Used for narrative/explanatory content.
- **When AI uses it**: Describing markets, landscapes, strategies, technologies
- **Props**: `title`, `content`, `icon?` ("trending" | "target" | "users" | "layers" | "globe" | "shield" | "zap" | "chart")

#### 5. `ContentCard` → `content-card.tsx`
Bordered card with a list of items having blue left-border accents. Items have title, description, and optional tags.
- **When AI uses it**: Structured lists — capability gaps, advantages, customer segments, features
- **Props**: `title`, `subtitle?`, `icon?`, `items[]` (each with `title`, `description`, `tag?`)

### Tambo Registration

All components registered in `src/lib/tambo.ts` with:
- **Detailed descriptions** telling the AI exactly when and how to use each component
- **Zod schemas** with `.describe()` on every field giving the AI examples and guidance
- **Streaming enabled** (inherited from TamboProvider)

### File Structure After Stage 2

```
src/
├── components/
│   ├── viz/                          ← NEW: visual document components
│   │   ├── section-header.tsx
│   │   ├── stat-card.tsx
│   │   ├── insight-callout.tsx
│   │   ├── text-block.tsx
│   │   └── content-card.tsx
│   ├── providers.tsx
│   ├── chat-input.tsx
│   └── message-thread.tsx
├── lib/
│   └── tambo.ts                      ← UPDATED: 5 components registered
└── app/
    ├── layout.tsx
    ├── page.tsx
    ├── globals.css
    └── chat/
        └── page.tsx
```

---

## How to test

1. Make sure you have your API key in `.env.local`
2. Run `npm run dev`
3. Open `localhost:3000`
4. Try these prompts:

**Simple test:**
> "The global AI market is worth $150 billion and growing at 36% CAGR. Show me the key stats."

**Full section test:**
> "Here is some research: The electric vehicle market reached $384 billion in 2024 with a projected CAGR of 23.1% through 2030. Tesla leads with 19% market share, followed by BYD at 16%. Key challenges include battery supply chains and charging infrastructure. The strategic opportunity lies in solid-state batteries which could reduce costs by 40%. Transform this into a visual document."

**What you should see:**
- `SectionHeader` at the top with a title like "EV Market Analysis"
- `StatCard` components for "$384B", "23.1%", "19%"
- `TextBlock` components for market analysis paragraphs
- `ContentCard` for structured lists (challenges, opportunities)
- `InsightCallout` for the key strategic takeaway

---

## How it all connects

```
User pastes research text
        ↓
  ChatInput sends to Tambo (streaming)
        ↓
  Tambo AI reads component descriptions + Zod schemas
        ↓
  AI decides: "This research has stats → StatCard"
              "This has a key insight → InsightCallout"
              "This has structured items → ContentCard"
        ↓
  Components render inside message.renderedComponent
        ↓
  User sees visual document in the chat
```

---

## Next: Stage 3

Stage 3 adds advanced visual components to complete the full report experience:
- `ComparisonTable` — side-by-side comparison matrix
- `PhaseCard` — numbered phase cards with capabilities
- `FeatureGrid` — 2-column grid of feature cards
- `ProgressBarList` — horizontal bars with percentages
- `LineChart` — data trend visualization (using Recharts)
