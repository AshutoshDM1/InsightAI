import {
  MonitorIcon,
  CircleUserRound,
  Paperclip,
  Code2,
  Palette,
  Layers,
  Rocket,
  StopCircle,
  SendIcon,
} from "lucide-react";
import QuickAction from "./QucikAction";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Message, useChatStore } from "@/store/store";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const models = [
  { name: "Gemini 3.1 Flash Lite", key: "google/gemini-3.1-flash-lite" },
  { name: "Gemini 2.5 Flash", key: "google/gemini-2.5-flash" },
  { name: "Groq Compound", key: "groq/compound" },
  { name: "Groq Compound Mini", key: "groq/compound-mini" },
  { name: "Llama 3.1", key: "llama-3.1-8b-instant" },
  { name: "GPT 4.1 Mini", key: "openai/gpt-4.1-mini" },
  { name: "GPT 5.4 Mini", key: "openai/gpt-5.4-mini" },
  { name: "GPT OSS", key: "openai/gpt-oss-20b" },
  { name: "Qwen3", key: "qwen/qwen3-32b" },
];

interface ChatInputProps {
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  input: string;
  setInput: (input: string) => void;
  adjustHeight: () => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  isLoading: boolean;
  handleStop: () => void;
  handleSend: () => void;
  messages: Message[];
}

const ChatInput = ({
  textareaRef,
  input,
  setInput,
  adjustHeight,
  handleKeyDown,
  isLoading,
  handleStop,
  messages,
  handleSend,
}: ChatInputProps) => {
  const selectedModel = useChatStore((state) => state.selectedModel);
  const setSelectedModel = useChatStore((state) => state.setSelectedModel);

  return (
    <div className="w-full max-w-4xl">
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
              isLoading && "opacity-50",
            )}
            style={{ overflow: "hidden" }}
          />

          {/* Footer Buttons */}
          <div className="flex items-center justify-between p-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                toast.info("This feature is coming soon");
              }}
              className="text-white "
              disabled={isLoading}
            >
              <Paperclip className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-2">
              <Select
                value={selectedModel}
                onValueChange={setSelectedModel}
                disabled={isLoading}
              >
                <SelectTrigger className="w-[170px] bg-neutral-900 border-neutral-800 text-white focus:ring-0 focus:ring-offset-0 focus:border-neutral-800 text-xs">
                  <SelectValue placeholder="Select Model" />
                </SelectTrigger>
                <SelectContent className="bg-black border-neutral-800 text-white">
                  {models.map((model) => (
                    <SelectItem
                      key={model.key}
                      value={model.key}
                      className="focus:bg-neutral-800 focus:text-white cursor-pointer text-xs"
                    >
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {isLoading ? (
                <Button
                  onClick={handleStop}
                  className={cn(
                    "flex items-center gap-1 px-3 py-2 rounded-lg transition-colors",
                    "bg-red-600 hover:bg-red-700 text-white",
                  )}
                >
                  <StopCircle className="w-4 h-4" />
                  <span className="text-xs">Stop</span>
                </Button>
              ) : (
                <button
                  title="Send message"
                  aria-label="Send message"
                  type="button"
                  disabled={!input.trim()}
                  onClick={() => handleSend()}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg transition-colors bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Send
                  <SendIcon className="w-4 h-4 p-0.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions - Show only when no messages */}
        </div>
        <QuickActionsSection messages={messages} setInput={setInput} />
      </div>
    </div>
  );
};

export default ChatInput;

interface QuickActionsSectionProps {
  messages: Message[];
  setInput: (input: string) => void;
}

const QuickActionsSection = ({
  messages,
  setInput,
}: QuickActionsSectionProps) => {
  const quickActions = [
    {
      accent: "amber" as const,
      icon: <Code2 className="w-4 h-4" />,
      label: "Tell Me a Joke",
      onClick: () => setInput("Tell me a joke"),
    },
    {
      accent: "sky" as const,
      icon: <Rocket className="w-4 h-4" />,
      label: "Give me React Roadmap",
      onClick: () => setInput("Give me React Roadmap"),
    },
    {
      accent: "emerald" as const,
      icon: <Layers className="w-4 h-4" />,
      label: "Give me React Native Roadmap",
      onClick: () => setInput("Give me React Native Roadmap"),
    },
    {
      accent: "violet" as const,
      icon: <Palette className="w-4 h-4" />,
      label: "Give me Next.js Roadmap",
      onClick: () => setInput("Give me Next.js Roadmap"),
    },
    {
      accent: "rose" as const,
      icon: <CircleUserRound className="w-4 h-4" />,
      label: "What is SSE",
      onClick: () => setInput("What is SSE"),
    },
    {
      accent: "fuchsia" as const,
      icon: <MonitorIcon className="w-4 h-4" />,
      label: "What is AI",
      onClick: () => setInput("What is AI"),
    },
  ];

  return (
    <>
      {messages.length === 0 && (
        <div className="mx-auto mt-5 w-full max-w-4xl px-1">
          <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-widest text-white">
            Quick start
          </p>
          <div className="flex flex-wrap items-stretch justify-center gap-2 sm:gap-2.5">
            {quickActions.map((action) => (
              <QuickAction
                key={action.label}
                accent={action.accent}
                icon={action.icon}
                label={action.label}
                onClick={action.onClick}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};
