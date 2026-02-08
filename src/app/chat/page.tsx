"use client";

import { AutoContinue } from "@/components/auto-continue";
import { ChatInput } from "@/components/chat-input";
import { MessageThread } from "@/components/message-thread";
import { DocumentPanel } from "@/components/document-panel";
import { ThemePicker } from "@/components/theme-picker";
import {
  useTamboThread,
  useTamboThreadInput,
} from "@tambo-ai/react";
import {
  ArrowRight,
  ExternalLink,
  Loader2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ── Demo prompts for the landing page ──────────────────────
const DEMOS = [
  {
    label: "AI Chip Market",
    text: "The global AI chip market is valued at $53.6 billion in 2025, projected to reach $227 billion by 2032 at a 23.2% CAGR. NVIDIA dominates with 80% GPU market share, while AMD holds 12% and Intel 5%. Key market segments include Data Center (65% share), Edge Computing (20%), and Consumer (15%). The industry is evolving through three phases: Phase 1 (2025-2027) focuses on scaling current GPU architectures and expanding CUDA ecosystem. Phase 2 (2027-2029) introduces chiplet-based designs and heterogeneous computing. Phase 3 (2029-2032) brings neuromorphic computing and quantum-classical hybrid processors. The strategic insight is that the winner won't be who makes the fastest chip — it will be who builds the most complete developer ecosystem.",
  },
  {
    label: "EV Industry",
    text: "The electric vehicle market reached $384 billion in 2024 with a projected CAGR of 23.1% through 2030. Tesla leads with 19% market share, followed by BYD at 16%, and legacy OEMs (VW, GM, Ford) collectively at 28%. Key challenges include battery supply chain concentration (75% lithium processing in China), charging infrastructure gaps (2.7M public chargers needed by 2030 vs 1.1M today), and grid capacity constraints. Solid-state batteries represent the most disruptive technology, promising 50% more energy density and 40% cost reduction by 2028. Three strategic phases: Phase 1 (2024-2026) price parity push with LFP batteries, Phase 2 (2026-2028) solid-state commercialization, Phase 3 (2028-2030) autonomous EV fleet deployment. The strategic opportunity lies in vertical integration from mining to manufacturing.",
  },
  {
    label: "Biotech Pipeline",
    text: "The AI drug discovery market is projected to reach $3.35 billion by 2034, growing at 18.8% CAGR. Over 200 AI-discovered molecules are currently in clinical trials, up from just 20 in 2020. Key technology platforms include AlphaFold (protein structure prediction, 85% accuracy), graph neural networks (molecular property prediction), and generative chemistry (de novo drug design). Major partnerships: Recursion-NVIDIA ($50B compute deal), Insilico-Sanofi ($1.2B multi-target deal), Isomorphic Labs-Eli Lilly ($1.7B biologics deal). Phase success rates for AI-discovered drugs are 80-90% in Phase I vs 50-60% industry average. The competitive landscape features 3 tiers: platform leaders (Recursion, Insilico, Exscientia), pharma-embedded AI (Roche-Genentech, Sanofi), and specialist startups (AbSci, Generate Biomedicines). The strategic insight: the winner in AI drug discovery won't be who has the best algorithm — it will be who controls the most proprietary biological data.",
  },
  {
    label: "Cybersecurity",
    text: "The global cybersecurity market is valued at $203 billion in 2025, projected to reach $350 billion by 2030. AI-powered threats have increased cyberattack sophistication by 300%, with deepfake fraud losses hitting $25 billion annually. Market segments: Cloud Security (28% share, fastest growing at 24% CAGR), Identity & Access Management (22%), Endpoint Security (18%), and Network Security (15%). CrowdStrike leads cloud-native endpoint security with 35% market share, followed by Palo Alto Networks (22%) and Microsoft (18%). Key trends: Zero Trust architecture adoption (78% of enterprises by 2027), AI-native SOC automation (reducing response time from hours to seconds), and supply chain security regulation (NIS2 directive, SEC cyber disclosure rules). Three investment phases: Phase 1 (2025-2026) AI-native detection platforms, Phase 2 (2026-2028) autonomous threat remediation, Phase 3 (2028-2030) quantum-resistant cryptography. The strategic imperative: cybersecurity is shifting from cost center to business enabler.",
  },
];

// ── Landing Page (no messages yet) ──────────────────────────
function LandingView() {
  const { value, setValue, submit, isPending } = useTamboThreadInput();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || isPending) return;
    submit({ streamResponse: true });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleDemo = (text: string) => {
    setValue(text);
  };

  return (
    <div className="landing-root">
      <div className="landing-grain" />

      <div className="landing-content">
        {/* Logo Text */}
        <div className="landing-logo-text">VisualAI</div>

        {/* Heading */}
        <h1 className="landing-heading">
          Turn your research into visual documents
        </h1>

        {/* Input Card — deep shadows */}
        <form onSubmit={handleSubmit} className="landing-input-card">
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Paste research text, data, or describe a topic..."
            rows={4}
            className="landing-textarea"
            disabled={isPending}
          />
          <div className="landing-input-footer">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" style={{ color: "#b8b0a4" }} />
              <span style={{ fontSize: "0.75rem", color: "#b8b0a4" }}>
                Generative UI
              </span>
            </div>
            <button
              type="submit"
              disabled={!value.trim() || isPending}
              className="landing-run-btn"
            >
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Run
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Demo Pills */}
        <div className="landing-demos">
          <span className="landing-demos-label">Try a demo:</span>
          {DEMOS.map((d, i) => (
            <button
              key={i}
              onClick={() => handleDemo(d.text)}
              className="landing-demo-pill"
              disabled={isPending}
            >
              {d.label}
            </button>
          ))}
        </div>

        {/* Powered by */}
        <div className="landing-powered">
          <span className="landing-powered-text">Powered by</span>
          <a
            href="https://tambo.co"
            target="_blank"
            rel="noopener noreferrer"
            className="landing-powered-link"
          >
            tambo.co
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Workspace View (split panel: activity sidebar + document) ─
function WorkspaceView({
  theme,
  setTheme,
  onGoHome,
}: {
  theme: string;
  setTheme: (t: string) => void;
  onGoHome: () => void;
}) {
  return (
    <div className="workspace-root">
      {/* Header — warm, minimal */}
      <header className="workspace-header">
        <div className="flex items-center gap-3">
          <button onClick={onGoHome} className="workspace-logo-text" title="Back to home">
            VisualAI
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/report"
            className="workspace-btn hidden sm:flex"
            title="Open full-screen document view"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View Report
          </Link>

          <ThemePicker activeTheme={theme} onThemeChange={setTheme} />
        </div>
      </header>

      {/* Content: sidebar + document */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar: activity feed + input */}
        <div className="workspace-sidebar flex">
          {/* Activity feed — faded scrolling log */}
          <div className="workspace-activity">
            <MessageThread />
          </div>

          {/* Input at bottom */}
          <div className="workspace-input-area">
            <ChatInput />
          </div>

          <AutoContinue />
        </div>

        {/* Right panel: Document */}
        <div className="flex-1">
          <DocumentPanel theme={theme} />
        </div>
      </div>
    </div>
  );
}

// ── Main Page Component ─────────────────────────────────────
export default function ChatPage() {
  const { thread } = useTamboThread();
  const [theme, setTheme] = useState("ink");

  const hasMessages = (thread?.messages?.length ?? 0) > 0;

  const handleGoHome = () => {
    window.location.reload();
  };

  if (!hasMessages) {
    return <LandingView />;
  }

  return <WorkspaceView theme={theme} setTheme={setTheme} onGoHome={handleGoHome} />;
}
