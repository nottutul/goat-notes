"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Bot, User, Send, Loader2 } from "lucide-react";

interface AiChatProps {
  noteContent: string;
}

export function AiChat({ noteContent }: AiChatProps) {
  const { messages, sendMessage, status, error } = useChat();
  const [input, setInput] = useState("");

  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({ text: input }, { body: { noteContent } });
    setInput("");
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-card rounded-lg border shadow-sm overflow-hidden">
      <div className="p-4 border-b bg-muted/50">
        <h3 className="font-semibold flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          Note Assistant
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Ask me anything about your current note!
        </p>
      </div>

      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-3 pt-12">
            <Bot className="w-12 h-12 opacity-20" />
            <p className="text-sm text-center px-4">
              I&apos;m ready to help! You can ask me to summarize, expand, or fix the grammar of your note.
            </p>
          </div>
        ) : (
          <div className="space-y-4 pb-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-3 ${
                  m.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {m.role !== "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}
                
                <div
                  className={`px-4 py-2 rounded-2xl max-w-[80%] text-sm ${
                    m.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm whitespace-pre-wrap"
                  }`}
                >
                  {m.parts.map((p, i) => {
                    if (p.type === "text") {
                      return <span key={i}>{p.text}</span>;
                    }
                    return null;
                  })}
                </div>

                {m.role === "user" && (
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="px-4 py-2 rounded-2xl bg-muted rounded-bl-sm flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      <div className="p-3 border-t bg-background">
        {error && (
          <div className="mb-3 p-3 text-sm text-red-500 bg-red-50 dark:bg-red-950/50 rounded-lg border border-red-200 dark:border-red-900">
            Error: {error.message || "Failed to fetch response"}
          </div>
        )}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask about your note..."
            className="flex-1"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
