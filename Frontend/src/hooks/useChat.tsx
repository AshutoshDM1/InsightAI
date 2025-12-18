import { useCallback, useEffect } from 'react';
import { useChatStore } from '@/store/store';
import { chatService } from '@/services/chat.service';

export const useChat = () => {
  const { messages, isLoading, error } = useChatStore();

  const sendMessage = useCallback(async (input: string) => {
    await chatService.sendMessage(input);
  }, []);

  const abortStream = useCallback(() => {
    chatService.abortStream();
  }, []);

  const clearMessages = useCallback(() => {
    useChatStore.getState().clearMessages();
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (chatService.isStreaming()) {
        chatService.abortStream();
      }
    };
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    abortStream,
    clearMessages,
  };
};
