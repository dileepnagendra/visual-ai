"use client";

import { useTamboThreadInput } from "@tambo-ai/react";
import { ArrowUp, Loader2 } from "lucide-react";

export function ChatInput() {
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="workspace-input-card">
        <textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask VisualAI..."
          rows={2}
          className="workspace-textarea"
          disabled={isPending}
        />
        <div className="workspace-input-actions">
          <span className="workspace-input-hint">Enter to send</span>
          <button
            type="submit"
            disabled={!value.trim() || isPending}
            className="workspace-send-btn"
          >
            {isPending ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ArrowUp className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
}
