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
    let assistantMessageId = "";
    
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
      assistantMessageId = `assistant-${Date.now()}`;
      const assistantMessage: Message = {
        id: assistantMessageId,
        content: "",
        role: "assistant",
      };
      store.addMessage(assistantMessage);
      store.setStreamingMessageId(assistantMessageId);

      // Create abort controller for cancellation
      abortControllerRef.current = new AbortController();

      // Determine messages to send (excluding the empty assistant placeholder at the end of store.backendMessages)
      const freshStore = useChatStore.getState();
      const messagesToSend = freshStore.backendMessages.slice(0, -1);

      // Make streaming request
      const response = await fetch(`${baseURL}/ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messagesToSend.map(({ id, role, content, isSummary }) => ({ id, role, content, isSummary })),
          model: freshStore.selectedModel,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        let serverErrorMessage = `HTTP error! status: ${response.status}`;
        try {
          const errorData = await response.json();
          if (errorData && errorData.error) {
            serverErrorMessage = errorData.error;
          }
        } catch (_) {
          // Fallback if parsing fails
        }
        throw new Error(serverErrorMessage);
      }

      // Extract updated backend messages if returned
      const updatedBackendMessagesHeader = response.headers.get("x-updated-backend-messages");
      if (updatedBackendMessagesHeader) {
        try {
          const updated = JSON.parse(decodeURIComponent(updatedBackendMessagesHeader));
          // Keep the empty assistant placeholder at the end
          const assistantPlaceholder = freshStore.backendMessages[freshStore.backendMessages.length - 1];
          if (assistantPlaceholder) {
            store.setBackendMessages([...updated, assistantPlaceholder]);
          } else {
            store.setBackendMessages(updated);
          }
        } catch (e) {
          console.error("Failed to parse updated backend messages:", e);
        }
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

      store.setIsLoading(false);
      store.setStreamingMessageId(null);

      if (!accumulatedContent.trim()) {
        store.updateStreamingMessage(
          assistantMessageId,
          "⚠️ The model failed to generate a response. Please verify that your API keys are correct and set up in your local configuration."
        );
      }
      
    } catch (err) {
      // Handle abort (user clicked stop)
      const error = err as Error;
      if (error.name === 'AbortError') {
        console.log('Stream aborted by user');
      } else {
        console.error("Error fetching AI data:", error);
        store.setError(error.message || "Failed to fetch AI response");
        if (assistantMessageId) {
          store.updateStreamingMessage(
            assistantMessageId,
            `❌ Error: ${error.message || "Failed to fetch AI response. Please check your network and API keys."}`
          );
        }
      }
      store.setStreamingMessageId(null);
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
