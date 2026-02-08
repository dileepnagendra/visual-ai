"use client";

import { useTamboThread, useTamboThreadInput } from "@tambo-ai/react";
import { useEffect, useRef } from "react";

const MAX_AUTO_CONTINUES = 3;
const AUTO_CONTINUE_DELAY_MS = 1500;
const CONTINUE_MESSAGE =
  "Continue building the visual document from where you left off. Do NOT repeat components you already rendered — only add the remaining sections and components.";

/**
 * Auto-continue component.
 *
 * When Tambo finishes a response (hits tool call limit), this component
 * automatically sends a "continue" message so the AI keeps building
 * the document. Stops after MAX_AUTO_CONTINUES to prevent infinite loops.
 *
 * Resets the counter when the user manually sends a new message.
 */
export function AutoContinue() {
  const { thread, generationStage } = useTamboThread();
  const { setValue, submit, isPending } = useTamboThreadInput();

  const continueCount = useRef(0);
  const lastMessageCount = useRef(0);
  const isAutoContinuing = useRef(false);
  const userSentMessage = useRef(false);

  // Track when user sends a message (message count jumps by 1 with role "user")
  useEffect(() => {
    const messages = thread?.messages || [];
    const currentCount = messages.length;

    if (currentCount > lastMessageCount.current) {
      const newMessages = messages.slice(lastMessageCount.current);
      const hasUserMessage = newMessages.some((m) => m.role === "user");

      if (hasUserMessage && !isAutoContinuing.current) {
        // User manually sent a message — reset counter
        continueCount.current = 0;
        userSentMessage.current = true;
      }
    }

    lastMessageCount.current = currentCount;
  }, [thread?.messages]);

  // Watch for COMPLETE state and auto-continue if needed
  useEffect(() => {
    if (generationStage !== "COMPLETE") return;
    if (isPending) return;
    if (continueCount.current >= MAX_AUTO_CONTINUES) return;

    // Only auto-continue after a user-initiated message or a previous auto-continue
    const messages = thread?.messages || [];
    if (messages.length === 0) return;

    // Check the last assistant message — if it has a rendered component,
    // the AI was actively building a document and might have more to render
    const assistantMessages = messages.filter((m) => m.role === "assistant");
    const lastAssistant = assistantMessages[assistantMessages.length - 1];

    if (!lastAssistant?.renderedComponent) return;

    // Count total rendered components so far
    const totalComponents = assistantMessages.filter(
      (m) => m.renderedComponent
    ).length;

    // If we have few components and this is the first continue, likely more to render
    // After the first user message, auto-continue; after auto-continues, keep going
    // if the AI is still producing components
    if (totalComponents < 2 && continueCount.current > 0) {
      // AI stopped producing components — don't continue
      return;
    }

    const timer = setTimeout(() => {
      continueCount.current += 1;
      isAutoContinuing.current = true;

      // Set the continue message and submit
      setValue(CONTINUE_MESSAGE);

      // Small delay to let setValue propagate, then submit
      setTimeout(() => {
        submit({ streamResponse: true });
        // Clear the textarea so user doesn't see the continue message
        setTimeout(() => setValue(""), 50);
        isAutoContinuing.current = false;
      }, 100);
    }, AUTO_CONTINUE_DELAY_MS);

    return () => clearTimeout(timer);
  }, [generationStage, isPending, thread?.messages, setValue, submit]);

  // This component renders nothing — it's purely logic
  return null;
}
