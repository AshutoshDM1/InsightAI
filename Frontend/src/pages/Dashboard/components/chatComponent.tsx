/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useEffect, useCallback } from "react";
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
    <div className="relative w-full min-h-screen flex flex-col items-center">
      {/* Messages Area or Empty State */}
      <div className="flex-1 w-full max-w-3xl px-4 py-8">
        {messages.length === 0 ? (
          /* Empty State - Centered AI Title */
          <div className="flex h-[calc(100vh-20rem)] flex-col items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-white drop-shadow-sm">
                Insight AI
              </h1>
              <p className="mt-2 text-neutral-200">
                take amazing insights — just start typing below.
              </p>
            </div>
          </div>
        ) : (
          /* Messages List */
          <div className="space-y-6 pb-6">
            {messages.map((msg: Message) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3",
                    msg.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-800 text-neutral-100"
                  )}
                >
                  <div className="whitespace-pre-wrap break-words ">
                    {msg.content ? (
                      <span className="text-neutral-100 italic animate-in">
                        {msg.content}
                      </span>
                    ) : (
                      <span className="text-neutral-400 italic">
                        Thinking...
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
      <div className="fixed bottom-0 w-full max-w-3xl px-4 pb-8">
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
