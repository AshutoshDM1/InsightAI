import { useRef, useEffect } from "react";
import useChat from "@/hooks/useChat";
import useAutoResizeTextarea from "@/hooks/useAutoResizeTextarea";
import ChatSection from "./ChatSection";
import ChatInput from "./Chat-Input";
import { Menu } from "lucide-react";
import { useChatStore } from "@/store/store";

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

  const toggleSidebar = useChatStore((state) => state.toggleSidebar);
  const isSidebarOpen = useChatStore((state) => state.isSidebarOpen);

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
    <div className="flex-1 flex flex-col h-screen overflow-hidden w-full relative">
      {/* Fixed Hamburger Toggle Button always in top left when sidebar is closed */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-3 z-30 rounded-lg p-2 text-white hover:bg-neutral-900 hover:text-white cursor-pointer transition-colors"
          title="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
      )}

      {/* Messages Scroll Area - Full screen height */}
      <div className="flex-1 overflow-y-auto w-full flex flex-col items-center pt-16">
        <ChatSection
          messages={messages}
          error={error}
          messagesEndRef={messagesEndRef}
        />
        {/* Spacer at bottom to prevent input area from overlaying message content */}
        <div className="h-44 shrink-0" />
      </div>

      {/* Floating Chat Input */}
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
