# Stage 1: Project Setup & Basic Chat

## What was done

### 1. Project Scaffolded
- Created a Next.js 16 app with TypeScript, Tailwind CSS 4, and ESLint
- Bun 1.3.8 installed as the runtime (npm used as package manager for compatibility)
- Project directory: `/Users/dileepnagendra/research-viz`

### 2. Dependencies Installed
| Package | Purpose |
|---------|---------|
| `@tambo-ai/react` | Tambo Generative UI SDK - the core of this project |
| `zod` | Schema validation for component props (required by Tambo) |
| `lucide-react` | Icon library for the UI |
| `next` | React framework |
| `tailwindcss` | Utility-first CSS |

### 3. File Structure Created

```
research-viz/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with TamboProvider
│   │   ├── page.tsx            # Redirects to /chat
│   │   ├── globals.css         # Tailwind + theme variables
│   │   └── chat/
│   │       └── page.tsx        # Main chat page
│   ├── components/
│   │   ├── providers.tsx       # TamboProvider wrapper (client component)
│   │   ├── chat-input.tsx      # Chat input with textarea + submit
│   │   └── message-thread.tsx  # Message display with generative UI support
│   └── lib/
│       └── tambo.ts            # Component & tool registry (empty, ready for Stage 2)
├── .env.local                  # Your Tambo API key (NOT committed)
├── .env.example                # Template for env vars (committed)
├── package.json
└── STAGE-1.md                  # This file
```

### 4. How Tambo is Wired Up

**Provider hierarchy** (in `layout.tsx`):
```
<html>
  <body>
    <Providers>           ← src/components/providers.tsx
      <TamboProvider>     ← from @tambo-ai/react
        {children}        ← your pages
      </TamboProvider>
    </Providers>
  </body>
</html>
```

**Key files to understand**:

- **`src/lib/tambo.ts`** - This is where you register components and tools. The AI uses these registrations to decide what to render. Currently empty arrays — Stage 2 fills these.

- **`src/components/providers.tsx`** - Client component that wraps `TamboProvider` with your API key, components, and tools. Streaming is enabled.

- **`src/components/message-thread.tsx`** - Renders the conversation. Key line: `{message.renderedComponent}` — this is where Tambo's generative UI components appear in the chat.

- **`src/components/chat-input.tsx`** - Uses `useTamboThreadInput()` hook for input state and submission. Calls `submit({ streamResponse: true })` to enable streaming.

---

## Before you run

### Get your Tambo API key

1. Go to [https://tambo.co/dashboard](https://tambo.co/dashboard) and sign up (free)
2. Create a new project
3. Copy the API key
4. Paste it in `.env.local`:
   ```
   NEXT_PUBLIC_TAMBO_API_KEY=sk-your-actual-key-here
   ```

   **OR** run this command which does it automatically:
   ```bash
   cd research-viz
   npx tambo init
   ```

### Run the app

```bash
cd research-viz
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/chat`.

### What you should see

- A clean chat interface with a header ("ResearchViz")
- An empty state message explaining what the app does
- A textarea input at the bottom to paste research text
- When you send a message, Tambo will respond with **text only** for now (no visual components yet — that's Stage 2)

---

## Key Tambo Concepts Used

| Concept | Where | What it does |
|---------|-------|--------------|
| `TamboProvider` | `providers.tsx` | Wraps the app, provides AI context to all children |
| `useTamboThreadInput` | `chat-input.tsx` | Manages input state + message submission |
| `useTamboThread` | `message-thread.tsx` | Access current thread, messages, generation status |
| `components` prop | `providers.tsx` | Array of registered components (empty for now) |
| `tools` prop | `providers.tsx` | Array of registered tools (empty for now) |
| `streamResponse: true` | `chat-input.tsx` | Enables real-time streaming of AI responses |

---

## Next: Stage 2

Stage 2 will add the first visual components:
- `SectionBlock` — titled section with content
- `KeyFinding` — highlighted insight card
- `StatCard` — numeric statistic display
- `TextBlock` — formatted paragraph with bullet points

Each component gets registered in `src/lib/tambo.ts` with a Zod schema, and Tambo's AI will automatically start rendering them in responses.
