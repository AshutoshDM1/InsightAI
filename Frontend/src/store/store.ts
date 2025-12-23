import { create } from "zustand";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  streamingMessageId: string | null;
  addMessage: (message: Message) => void;
  updateStreamingMessage: (id: string, content: string) => void;
  setMessages: (messages: Message[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setStreamingMessageId: (id: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [], 
  isLoading: false,
  error: null,
  streamingMessageId: null,
  
  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
    })),
  
  updateStreamingMessage: (id: string, content: string) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content } : msg
      ),
    })),
  
  setMessages: (messages: Message[]) => set({ messages }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
  setStreamingMessageId: (id: string | null) => set({ streamingMessageId: id }),
}));
