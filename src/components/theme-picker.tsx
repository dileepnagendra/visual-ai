"use client";

import { Palette } from "lucide-react";
import { useState } from "react";

const THEMES = [
  { id: "ink", label: "Ink", color: "#2563eb", description: "Tech-forward" },
  { id: "sage", label: "Sage", color: "#512E2E", description: "Dark editorial" },
  { id: "rose", label: "Rose", color: "#CF2431", description: "Warm classical" },
  { id: "carbon", label: "Carbon", color: "#06251F", description: "Deep technical" },
  { id: "violet", label: "Violet", color: "#7c3aed", description: "Creative" },
] as const;

interface ThemePickerProps {
  activeTheme: string;
  onThemeChange: (theme: string) => void;
}

export function ThemePicker({ activeTheme, onThemeChange }: ThemePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="workspace-btn"
        title="Change theme"
      >
        <div
          className="h-3 w-3 rounded-full"
          style={{
            backgroundColor:
              THEMES.find((t) => t.id === activeTheme)?.color ||
              THEMES[0].color,
          }}
        />
        <Palette className="h-3.5 w-3.5" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          <div
            className="absolute right-0 top-full z-50 mt-2 w-52 rounded-xl border bg-white p-2 shadow-xl"
            style={{ borderColor: "#ede9e3" }}
          >
            <p className="mb-2 px-2.5 text-[10px] font-bold uppercase tracking-widest"
              style={{ color: "#b8b0a4" }}
            >
              Document Theme
            </p>
            {THEMES.map((theme) => {
              const isActive = activeTheme === theme.id;
              return (
                <button
                  key={theme.id}
                  onClick={() => {
                    onThemeChange(theme.id);
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left transition-colors"
                  style={{
                    backgroundColor: isActive ? "#faf5ee" : "transparent",
                  }}
                >
                  <div
                    className="h-5 w-5 shrink-0 rounded-full"
                    style={{
                      backgroundColor: theme.color,
                      boxShadow: isActive
                        ? `0 0 0 2px white, 0 0 0 3.5px ${theme.color}`
                        : "none",
                    }}
                  />
                  <div>
                    <p
                      className="text-xs font-semibold"
                      style={{ color: "#1a1a1a" }}
                    >
                      {theme.label}
                    </p>
                    <p
                      className="text-[10px]"
                      style={{ color: "#a8a29e" }}
                    >
                      {theme.description}
                    </p>
                  </div>
                  {isActive && (
                    <div
                      className="ml-auto h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: theme.color }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
