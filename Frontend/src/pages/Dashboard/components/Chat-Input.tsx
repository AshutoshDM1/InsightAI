import {
  MonitorIcon,
  CircleUserRound,
  Paperclip,
  Code2,
  Palette,
  Layers,
  Rocket,
  StopCircle,
} from "lucide-react";
import QuickAction from "./QucikAction";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Message } from "@/store/store";
import { SendButton } from "./SendButton";
import { toast } from "sonner";

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
  handleSend,
  messages,
}: ChatInputProps) => {
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
              isLoading && "opacity-50"
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

                <SendButton onClick={handleSend} disabled={!input.trim()} />
                
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
      icon: <Code2 className="w-4 h-4" />,
      label: "Tell Me a Joke",
      onClick: () => setInput("Tell me a joke"),
    },
    {
      icon: <Rocket className="w-4 h-4" />,
      label: "Give me React Roadmap",
      onClick: () => setInput("Give me React Roadmap"),
    },
    {
      icon: <Layers className="w-4 h-4" />,
      label: "Give me React Native Roadmap",
      onClick: () => setInput("Give me React Native Roadmap"),
    },
    {
      icon: <Palette className="w-4 h-4" />,
      label: "Give me Next.js Roadmap",
      onClick: () => setInput("Give me Next.js Roadmap"),
    },
    {
      icon: <CircleUserRound className="w-4 h-4" />,
      label: "What is SSE",
      onClick: () => setInput("What is SSE"),
    },
    {
      icon: <MonitorIcon className="w-4 h-4" />,
      label: "What is AI",
      onClick: () => setInput("What is AI"),
    },
  ];

  return (
    <>
      {messages.length === 0 && (
        <div className="flex items-center justify-center flex-wrap gap-3 my-4">
          {quickActions.map((action) => (
            <QuickAction
              key={action.label}
              icon={action.icon}
              label={action.label}
              onClick={action.onClick}
            />
          ))}
        </div>
      )}
    </>
  );
};
