"use client";

import { DocumentPanel } from "@/components/document-panel";
import { ThemePicker } from "@/components/theme-picker";
import { ArrowLeft, Download } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ReportPage() {
  const [theme, setTheme] = useState("ink");

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="flex h-screen flex-col" style={{ backgroundColor: "#f5f0ea" }}>
      {/* Top bar — hidden when printing */}
      <header
        className="flex items-center justify-between px-6 py-3 print:hidden"
        style={{ borderBottom: "1px solid #e8e3dc", backgroundColor: "#f5f0ea" }}
      >
        <div className="flex items-center gap-3">
          <Link
            href="/chat"
            className="workspace-btn"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back
          </Link>

          <span
            className="hidden sm:inline-block"
            style={{
              fontFamily: "var(--font-serif-display), Georgia, serif",
              fontSize: "1rem",
              color: "#1a1a1a",
              letterSpacing: "-0.01em",
            }}
          >
            VisualAI Report
          </span>
        </div>

        <div className="flex items-center gap-2">
          <ThemePicker activeTheme={theme} onThemeChange={setTheme} />

          <button
            onClick={handleExportPDF}
            className="workspace-btn"
          >
            <Download className="h-3.5 w-3.5" />
            Export PDF
          </button>
        </div>
      </header>

      {/* Full-width document */}
      <div className="flex-1 overflow-hidden">
        <DocumentPanel theme={theme} fullWidth />
      </div>
    </div>
  );
}
