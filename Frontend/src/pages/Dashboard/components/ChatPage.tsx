import { useRef, useEffect } from "react";
import useChat from "@/hooks/useChat";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextarea";
import ChatSection from "./ChatSection";
import ChatInput from "./Chat-Input";

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
  }, [messages.length]);

  return (
    <div className="w-full min-h-[110vh] flex flex-col justify-center items-center relative">
      <ChatSection
        messages={messages}
        error={error}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput
        textareaRef={textareaRef}
        input={input}
        setInput={setInput}
        adjustHeight={adjustHeight}
        handleKeyDown={handleKeyDown}
        isLoading={isLoading}
        handleStop={handleStop}
        handleSend={handleSend}
        messages={messages}
      />
    </div>
  );
}
