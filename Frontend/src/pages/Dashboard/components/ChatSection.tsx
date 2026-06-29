import { Message } from "@/store/store";
import { cn } from "@/lib/utils";
import MarkdownShowV2 from "./MarkdownShowV2";

interface ChatSectionProps {
  messages: Message[];
  error: string | null;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const ChatSection = ({ messages, error, messagesEndRef }: ChatSectionProps) => {
  return (
    <div className="w-full max-w-4xl px-4 py-8 mb-4">
      <ChatSectionTitle messages={messages} />
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
                  "rounded-md px-5 py-2  transition-all duration-200",
                  "backdrop-blur-md",
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-transparent text-neutral-100",
                  msg.role === "user" ? "self-end" : "self-start"
                )}
              >
                <div className="whitespace-pre-wrap break-words leading-snug">
                  {msg.content ? (
                    <MarkdownShowV2 content={msg.content} />
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
                      <span className="animate-pulse animation-delay-200">
                        .
                      </span>
                      <span className="animate-pulse animation-delay-400">
                        .
                      </span>
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
  );
};

export default ChatSection;

const ChatSectionTitle = ({ messages }: { messages: Message[] }) => {
  const conditionClassName =
    messages.length > 0
      ? "static"
      : "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full";
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center pb-28",
        conditionClassName
      )}
    >
      <div className="text-center">
        <h1 className="text-6xl font-semibold leading-normal text-clip bg-gradient-to-r from-purple-500 to-orange-400 text-transparent bg-clip-text drop-shadow-sm">
          Insight AI
        </h1>
        <p className="mt-2 text-neutral-200">
          Take amazing insights — just start typing below.
        </p>
      </div>
    </div>
  );
};
