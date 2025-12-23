/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useCallback, createElement } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  MonitorIcon,
  CircleUserRound,
  ArrowUpIcon,
  Paperclip,
  Code2,
  Palette,
  Layers,
  Rocket,
  StopCircle,
} from "lucide-react";
import { Message } from "@/store/store";
import useChat from "@/hooks/useChat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Markdown from "markdown-to-jsx";

interface AutoResizeProps {
  minHeight: number;
  maxHeight?: number;
}

function useAutoResizeTextarea({ minHeight, maxHeight }: AutoResizeProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = useCallback(
    (reset?: boolean) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      if (reset) {
        textarea.style.height = `${minHeight}px`;
        return;
      }

      textarea.style.height = `${minHeight}px`; // reset first
      const newHeight = Math.max(
        minHeight,
        Math.min(textarea.scrollHeight, maxHeight ?? Infinity)
      );
      textarea.style.height = `${newHeight}px`;
    },
    [minHeight, maxHeight]
  );

  useEffect(() => {
    if (textareaRef.current)
      textareaRef.current.style.height = `${minHeight}px`;
  }, [minHeight]);

  return { textareaRef, adjustHeight };
}

export default function ChatComponent() {
  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight: 48,
    maxHeight: 150,
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    input,
    setInput,
    messages,
    isLoading,
    error,
    sendMessage,
    stopStreaming,
  } = useChat();

  const handleSend = () => {
    if (input.trim() && !isLoading) {
      sendMessage();
      adjustHeight(true); // Reset textarea height after sending
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleStop = () => {
    stopStreaming();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-center items-center">
      {/* Messages Area or Empty State */}
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="flex flex-col items-center justify-center pb-28">
          <div className="text-center">
            <h1 className="text-4xl font-semibold text-clip bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text drop-shadow-sm">
              Insight AI
            </h1>
            <p className="mt-2 text-neutral-200">
              take amazing insights — just start typing below.
            </p>
          </div>
        </div>
        {messages.length > 0 && (
          <div className="space-y-6 pb-24">
            {messages.map((msg: Message) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "justify-end" : "flex-1 justify-start"
                )}
              >
                <div
                  className={cn(
                    "rounded-md px-4 py-3 backdrop-blur-md",
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-black/35 text-neutral-100"
                  )}
                >
                  <div className="whitespace-pre-wrap break-words leading-snug">
                    {msg.content ? (
                      <Markdown
                        options={{
                          createElement: (tag, props, children) => {
                            // Add vertical spacing if a "p" is next to another tag
                            if (tag === "h1") {
                              return <h1 className="text-2xl font-bold">{children}</h1>;
                            }
                            if (tag === "p") {
                              // Add margin-y unless parent already manages it
                              return <p className="my-2 leading-6">{children}</p>;
                            }
                            if (tag === "li") {
                              // Add margin-y unless parent already manages it
                              return <li className="my-2">{children}</li>;
                            }
                            // For all block-level elements (not inline), add a bit of vertical margin if you want,
                            // but according to the prompt, only "p" gets spacing to visually separate from other tags.
                            return createElement(tag, props, children);
                          },
                        }}
                      >
                        {msg.content}
                      </Markdown>
                    ) : (
                      <span className="text-neutral-400 italic flex items-center gap-2">
                        <svg
                          className="w-4 h-4 animate-spin text-blue-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        Thinking
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse animation-delay-200">.</span>
                        <span className="animate-pulse animation-delay-400">.</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {error && (
              <div className="flex justify-center">
                <div className="bg-red-600/20 border border-red-600 text-red-400 rounded-lg px-4 py-2 text-sm">
                  Error: {error}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Box Section - Fixed at bottom */}
      <div className="fixed bottom-0 w-full max-w-4xl px-4 pb-8">
        <div className="relative bg-black/60 backdrop-blur-md rounded-xl border border-neutral-700">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              adjustHeight();
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type your request..."
            disabled={isLoading}
            className={cn(
              "w-full px-4 py-3 resize-none border-none",
              "bg-transparent text-white text-sm",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "placeholder:text-neutral-400 min-h-[48px]",
              isLoading && "opacity-50"
            )}
            style={{ overflow: "hidden" }}
          />

          {/* Footer Buttons */}
          <div className="flex items-center justify-between p-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-neutral-700"
              disabled={isLoading}
            >
              <Paperclip className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              {isLoading ? (
                <Button
                  onClick={handleStop}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                    "bg-red-600 hover:bg-red-700 text-white"
                  )}
                >
                  <StopCircle className="w-4 h-4" />
                  <span className="text-xs">Stop</span>
                </Button>
              ) : (
                <Button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                    input.trim()
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-neutral-700 text-neutral-400 cursor-not-allowed"
                  )}
                >
                  <ArrowUpIcon className="w-4 h-4" />
                  <span className="sr-only">Send</span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions - Show only when no messages */}
        {messages.length === 0 && (
          <div className="flex items-center justify-center flex-wrap gap-3 mt-6">
            <QuickAction
              icon={<Code2 className="w-4 h-4" />}
              label="Generate Code"
              onClick={() => setInput("Generate a React component for ")}
            />
            <QuickAction
              icon={<Rocket className="w-4 h-4" />}
              label="Launch App"
              onClick={() => setInput("Help me build an app that ")}
            />
            <QuickAction
              icon={<Layers className="w-4 h-4" />}
              label="UI Components"
              onClick={() => setInput("Create a UI component for ")}
            />
            <QuickAction
              icon={<Palette className="w-4 h-4" />}
              label="Theme Ideas"
              onClick={() => setInput("Suggest color themes for ")}
            />
            <QuickAction
              icon={<CircleUserRound className="w-4 h-4" />}
              label="User Dashboard"
              onClick={() => setInput("Design a user dashboard with ")}
            />
            <QuickAction
              icon={<MonitorIcon className="w-4 h-4" />}
              label="Landing Page"
              onClick={() => setInput("Create a landing page for ")}
            />
          </div>
        )}
      </div>
    </div>
  );
}

interface QuickActionProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function QuickAction({ icon, label, onClick }: QuickActionProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="flex items-center gap-2 rounded-full border-neutral-700 bg-black/50 text-neutral-300 hover:text-white hover:bg-neutral-700"
    >
      {icon}
      <span className="text-xs">{label}</span>
    </Button>
  );
}
