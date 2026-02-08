# Stage 4: Document Layout & Research Tool

## What was done

### 1. Split-Panel Layout

The chat page now has a professional split-panel layout:

```
┌─────────────────────────────────────────────────────┐
│  [Logo] ResearchViz              [Toggle: mobile]   │
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│   CHAT       │         DOCUMENT PANEL               │
│   PANEL      │                                      │
│  (380px)     │   Visual components rendered here    │
│              │   in a clean document layout on      │
│  Compact     │   light gray background.             │
│  messages    │                                      │
│  with        │   Max-width 4xl, centered.           │
│  truncation  │                                      │
│              │                                      │
├──────────────┤                                      │
│  [Input]     │                                      │
└──────────────┴──────────────────────────────────────┘
```

- **Left panel** (380px): Compact chat with truncated messages, status indicators
- **Right panel** (flex-1): Document view showing only rendered visual components
- **Mobile**: Toggle button switches between Chat and Document views
- **Responsive**: Full split on desktop, toggle on mobile

### 2. Document Panel (`document-panel.tsx`)

- Extracts all `renderedComponent` from assistant messages
- Displays them in a clean, scrollable document layout (no chat bubbles)
- Light gray background (`bg-zinc-50`) like Superagent
- Max-width container with generous padding
- Shows "generating" indicator while streaming
- Empty state when no components yet

### 3. Compact Message Thread (updated)

- User messages: truncated to 300 chars in a small bubble
- Assistant messages: shows truncated text + blue indicator "→ Visual component rendered in document panel"
- Much smaller avatars (24px) and text (12px) to fit the narrow panel
- Generation stage indicator at bottom

### 4. Research Processing Tool

A local Tambo tool (`analyze-research-text`) that runs in the browser:

```
Input: raw research text
Output: {
  wordCount,
  statistics: ["$3.35B", "18.8%", ...],
  hasComparisons: true/false,
  hasPhases: true/false,
  hasTimeline: true/false,
  hasBulletPoints: true/false,
  topTopics: ["market", "growth", ...],
  suggestedComponents: ["HeroSection", "StatCard", ...]
}
```

The AI calls this tool FIRST when it receives research text, then uses the analysis to decide which visual components to render.

### 5. Additional Context (System Prompt)

The `TamboProvider` now includes `contextHelpers` that tell the AI:
- It is "ResearchViz" — an AI that transforms research into visual documents
- It MUST use visual components (not just plain text)
- It should start with HeroSection for large documents
- It should render 3-5+ components per response
- It should think of itself as generating Superagent-style reports

### Files Changed

| File | Change |
|------|--------|
| `src/app/chat/page.tsx` | Rewritten: split-panel layout with mobile toggle |
| `src/components/document-panel.tsx` | **NEW**: visual document view panel |
| `src/components/message-thread.tsx` | Updated: compact format for narrow chat panel |
| `src/components/chat-input.tsx` | Updated: smaller sizing for narrow panel |
| `src/components/providers.tsx` | Updated: added contextHelpers with system guidance |
| `src/lib/tambo.ts` | Updated: added `analyze-research-text` tool |

---

## How to test

1. Run `npm run dev` and open `localhost:3000`
2. You should see the split-panel layout (chat left, empty document right)
3. Paste this research text:

> "The global AI chip market is valued at $53.6 billion in 2025, projected to reach $227 billion by 2032 at a 23.2% CAGR. NVIDIA dominates with 80% GPU market share, while AMD holds 12% and Intel 5%. Key market segments include Data Center (65% share), Edge Computing (20%), and Consumer (15%). The industry is evolving through three phases: Phase 1 (2025-2027) focuses on scaling current GPU architectures and expanding CUDA ecosystem. Phase 2 (2027-2029) introduces chiplet-based designs and heterogeneous computing. Phase 3 (2029-2032) brings neuromorphic computing and quantum-classical hybrid processors. The strategic insight is that the winner won't be who makes the fastest chip — it will be who builds the most complete developer ecosystem."

4. Watch the document panel fill with visual components:
   - HeroSection at the top
   - SectionHeaders dividing sections
   - StatCards for the numbers
   - PhaseCards for the 3 phases
   - InsightCallout for the strategic insight
   - Possibly a LineChartBlock or ComparisonTable

---

## Next: Stage 5

Stage 5 is the final push:
- Deploy to Vercel
- Record YouTube demo (max 3 min)
- Push to GitHub
- Submit hackathon form
