import { create } from "zustand";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  isSummary?: boolean;
}

interface ChatState {
  messages: Message[];
  backendMessages: Message[];
  isLoading: boolean;
  error: string | null;
  streamingMessageId: string | null;
  selectedModel: string;
  conversationSummary: string | null;
  summaryLastMessageId: string | null;
  addMessage: (message: Message) => void;
  updateStreamingMessage: (id: string, content: string) => void;
  setMessages: (messages: Message[]) => void;
  setBackendMessages: (messages: Message[]) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setStreamingMessageId: (id: string | null) => void;
  setSelectedModel: (model: string) => void;
  setConversationSummary: (summary: string | null) => void;
  setSummaryLastMessageId: (id: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  backendMessages: [],
  isLoading: false,
  error: null,
  streamingMessageId: null,
  selectedModel: "openai/gpt-5.4-mini",
  conversationSummary: null,
  summaryLastMessageId: null,

  addMessage: (message: Message) =>
    set((state) => ({
      messages: [...state.messages, message],
      backendMessages: [...state.backendMessages, message],
    })),

  updateStreamingMessage: (id: string, content: string) =>
    set((state) => ({
      messages: state.messages.map((msg) =>
        msg.id === id ? { ...msg, content } : msg
      ),
      backendMessages: state.backendMessages.map((msg) =>
        msg.id === id ? { ...msg, content } : msg
      ),
    })),

  setMessages: (messages: Message[]) => set({ messages, backendMessages: messages }),
  setBackendMessages: (messages: Message[]) => set({ backendMessages: messages }),
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
  setError: (error: string | null) => set({ error }),
  setStreamingMessageId: (id: string | null) => set({ streamingMessageId: id }),
  setSelectedModel: (model: string) => set({ selectedModel: model }),
  setConversationSummary: (summary: string | null) => set({ conversationSummary: summary }),
  setSummaryLastMessageId: (id: string | null) => set({ summaryLastMessageId: id }),
}));
