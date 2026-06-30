import { Message } from "@/store/store";
import { cn } from "@/lib/utils";
import MarkdownShowV2 from "./MarkdownShowV2";
import { useState } from "react";
import { Copy, Check, ThumbsUp, ThumbsDown, MoreHorizontal } from "lucide-react";

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
        <div className="space-y-6 pb-24 w-full">
          {messages.map((msg: Message) => (
            <div
              key={msg.id}
              className={cn(
                "flex gap-3 w-full",
                msg.role === "user" ? "justify-end" : "justify-start w-full",
              )}
            >
              <div
                className={cn(
                  "rounded-md px-5 py-2 transition-all duration-200",
                  "",
                  msg.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-transparent text-neutral-100 w-full ",
                  msg.role === "user" ? "self-end" : "self-start w-full",
                )}
              >
                <div className="whitespace-pre-wrap break-words leading-snug">
                  {msg.image && (
                    <div className="mb-3 max-w-sm rounded-lg overflow-hidden border border-white/10 shadow-md">
                      <img
                        src={msg.image.base64}
                        alt="Uploaded content"
                        className="max-h-60 w-auto object-contain rounded-md"
                      />
                    </div>
                  )}
                  {msg.content ? (
                    <>
                      <MarkdownShowV2 content={msg.content} />
                      {msg.role === "assistant" && (
                        <MessageActions content={msg.content} />
                      )}
                    </>
                  ) : (
                    <div className="pb-20">
                      <span className="text-neutral-400 italic flex items-center gap-2 ">
                        <svg
                          className="w-4 h-4 animate-spin text-blue-400 "
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
                    </div>
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
        conditionClassName,
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

const MessageActions = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState<boolean | null>(null);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="flex items-center gap-3 mt-4 pl-1 text-neutral-500 border-t border-neutral-900/20 pt-2 w-fit">
      <button
        onClick={handleCopy}
        className="p-1 rounded hover:bg-neutral-900 hover:text-neutral-200 transition-colors cursor-pointer"
        title="Copy response"
      >
        {copied ? (
          <Check className="w-3.5 h-3.5 text-emerald-500" />
        ) : (
          <Copy className="w-3.5 h-3.5" />
        )}
      </button>
      <button
        onClick={() => setLiked(liked === true ? null : true)}
        className={cn(
          "p-1 rounded hover:bg-neutral-900 hover:text-neutral-200 transition-colors cursor-pointer",
          liked === true && "text-emerald-500 hover:text-emerald-400"
        )}
        title="Thumbs up"
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </button>
      <button
        onClick={() => setLiked(liked === false ? null : false)}
        className={cn(
          "p-1 rounded hover:bg-neutral-900 hover:text-neutral-200 transition-colors cursor-pointer",
          liked === false && "text-red-500 hover:text-red-400"
        )}
        title="Thumbs down"
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </button>
      <button
        className="p-1 rounded hover:bg-neutral-900 hover:text-neutral-200 transition-colors cursor-pointer"
        title="More options"
      >
        <MoreHorizontal className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
