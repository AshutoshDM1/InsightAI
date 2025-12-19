/* eslint-disable no-constant-condition */
import { baseURL } from "@/services/api.config";
import { useChatStore, Message } from "@/store/store";
import { useState, useRef } from "react";

export const useChat = () => {
  const [input, setInput] = useState("");
  const messages = useChatStore((state) => state.messages);
  const isLoading = useChatStore((state) => state.isLoading);
  const error = useChatStore((state) => state.error);
  const abortControllerRef = useRef<AbortController | null>(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const store = useChatStore.getState();
    
    try {
      // Clear any previous errors
      store.setError(null);
      store.setIsLoading(true);

      // Add user message
      const userMessage: Message = {
        id: `user-${Date.now()}`,
        content: input.trim(),
        role: "user",
      };
      store.addMessage(userMessage);

      // Clear input
      setInput("");

      // Create assistant message placeholder
      const assistantMessageId = `assistant-${Date.now()}`;
      const assistantMessage: Message = {
        id: assistantMessageId,
        content: "",
        role: "assistant",
      };
      store.addMessage(assistantMessage);
      store.setStreamingMessageId(assistantMessageId);

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      // Make streaming request
      const response = await fetch(`${baseURL}/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: userMessage.content }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Failed to get reader from response");
      }

      const decoder = new TextDecoder();
      let accumulatedContent = "";

      // Read the stream
      while (true) {
        const { done, value } = await reader.read();
        
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        accumulatedContent += chunk;
        
        // Update the streaming message
        store.updateStreamingMessage(assistantMessageId, accumulatedContent);
      }

      // Mark streaming as complete
      store.setStreamingMessageId(null);
      
    } catch (err) {
      // Handle abort (user clicked stop)
      const error = err as Error;
      if (error.name === 'AbortError') {
        console.log('Stream aborted by user');
        store.setStreamingMessageId(null);
      } else {
        console.error("Error fetching AI data:", error);
        store.setError(error.message || "Failed to fetch AI response");
      }
    } finally {
      store.setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const stopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      useChatStore.getState().setIsLoading(false);
      useChatStore.getState().setStreamingMessageId(null);
    }
  };

  return { 
    input, 
    setInput, 
    messages, 
    isLoading, 
    error, 
    sendMessage,
    stopStreaming
  };
};

export default useChat;
