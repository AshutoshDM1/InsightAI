import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant" | "system";
  isSummary?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  backendMessages: Message[];
  conversationSummary: string | null;
  summaryLastMessageId: string | null;
  selectedModel: string;
  createdAt: number;
}

interface ChatState {
  // Existing state fields (backwards compatible, kept in sync with the active session)
  messages: Message[];
  backendMessages: Message[];
  isLoading: boolean;
  error: string | null;
  streamingMessageId: string | null;
  selectedModel: string;
  conversationSummary: string | null;
  summaryLastMessageId: string | null;

  // New multi-chat state fields
  sessions: ChatSession[];
  currentSessionId: string | null;
  isSidebarOpen: boolean;

  // Existing Actions
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

  // New multi-chat actions
  createNewChat: (model?: string) => void;
  switchChat: (id: string) => void;
  deleteChat: (id: string) => void;
  updateChatTitle: (id: string, title: string) => void;
  clearAllChats: () => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      // Initial values (will be synced/hydrated on load)
      messages: [],
      backendMessages: [],
      isLoading: false,
      error: null,
      streamingMessageId: null,
      selectedModel: "openai/gpt-oss-20b",
      conversationSummary: null,
      summaryLastMessageId: null,

      sessions: [],
      currentSessionId: null,
      isSidebarOpen: false, // Default closed on desktop

      addMessage: (message: Message) =>
        set((state) => {
          const updatedSessions = state.sessions.map((s) => {
            if (s.id === state.currentSessionId) {
              let title = s.title;
              // Auto-generate title from first user message
              if (s.messages.length === 0 && message.role === "user") {
                title = message.content.slice(0, 30) + (message.content.length > 30 ? "..." : "");
              }
              return {
                ...s,
                title,
                messages: [...s.messages, message],
                backendMessages: [...s.backendMessages, message],
              };
            }
            return s;
          });

          const activeSession = updatedSessions.find((s) => s.id === state.currentSessionId);
          return {
            sessions: updatedSessions,
            messages: activeSession ? activeSession.messages : [],
            backendMessages: activeSession ? activeSession.backendMessages : [],
          };
        }),

      updateStreamingMessage: (id: string, content: string) =>
        set((state) => {
          const updatedSessions = state.sessions.map((s) => {
            if (s.id === state.currentSessionId) {
              return {
                ...s,
                messages: s.messages.map((msg) =>
                  msg.id === id ? { ...msg, content } : msg
                ),
                backendMessages: s.backendMessages.map((msg) =>
                  msg.id === id ? { ...msg, content } : msg
                ),
              };
            }
            return s;
          });

          const activeSession = updatedSessions.find((s) => s.id === state.currentSessionId);
          return {
            sessions: updatedSessions,
            messages: activeSession ? activeSession.messages : [],
            backendMessages: activeSession ? activeSession.backendMessages : [],
          };
        }),

      setMessages: (messages: Message[]) =>
        set((state) => {
          const updatedSessions = state.sessions.map((s) => {
            if (s.id === state.currentSessionId) {
              return {
                ...s,
                messages,
                backendMessages: messages,
              };
            }
            return s;
          });

          return {
            sessions: updatedSessions,
            messages,
            backendMessages: messages,
          };
        }),

      setBackendMessages: (backendMessages: Message[]) =>
        set((state) => {
          const updatedSessions = state.sessions.map((s) => {
            if (s.id === state.currentSessionId) {
              return {
                ...s,
                backendMessages,
              };
            }
            return s;
          });

          return {
            sessions: updatedSessions,
            backendMessages,
          };
        }),

      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setError: (error: string | null) => set({ error }),
      setStreamingMessageId: (id: string | null) => set({ streamingMessageId: id }),

      setSelectedModel: (selectedModel: string) =>
        set((state) => {
          const updatedSessions = state.sessions.map((s) => {
            if (s.id === state.currentSessionId) {
              return {
                ...s,
                selectedModel,
              };
            }
            return s;
          });

          return {
            sessions: updatedSessions,
            selectedModel,
          };
        }),

      setConversationSummary: (conversationSummary: string | null) =>
        set((state) => {
          const updatedSessions = state.sessions.map((s) => {
            if (s.id === state.currentSessionId) {
              return {
                ...s,
                conversationSummary,
              };
            }
            return s;
          });

          return {
            sessions: updatedSessions,
            conversationSummary,
          };
        }),

      setSummaryLastMessageId: (summaryLastMessageId: string | null) =>
        set((state) => {
          const updatedSessions = state.sessions.map((s) => {
            if (s.id === state.currentSessionId) {
              return {
                ...s,
                summaryLastMessageId,
              };
            }
            return s;
          });

          return {
            sessions: updatedSessions,
            summaryLastMessageId,
          };
        }),

      // New multi-chat actions
      createNewChat: (model?: string) =>
        set((state) => {
          const id = `session-${Date.now()}`;
          const newSession: ChatSession = {
            id,
            title: "New Chat",
            messages: [],
            backendMessages: [],
            conversationSummary: null,
            summaryLastMessageId: null,
            selectedModel: model || "openai/gpt-oss-20b",
            createdAt: Date.now(),
          };
          return {
            sessions: [newSession, ...state.sessions],
            currentSessionId: id,
            messages: [],
            backendMessages: [],
            conversationSummary: null,
            summaryLastMessageId: null,
            selectedModel: newSession.selectedModel,
            error: null,
          };
        }),

      switchChat: (id: string) =>
        set((state) => {
          const activeSession = state.sessions.find((s) => s.id === id);
          if (!activeSession) return {};
          return {
            currentSessionId: id,
            messages: activeSession.messages || [],
            backendMessages: activeSession.backendMessages || [],
            selectedModel: activeSession.selectedModel || "openai/gpt-oss-20b",
            conversationSummary: activeSession.conversationSummary || null,
            summaryLastMessageId: activeSession.summaryLastMessageId || null,
            error: null,
          };
        }),

      deleteChat: (id: string) =>
        set((state) => {
          const updatedSessions = state.sessions.filter((s) => s.id !== id);

          // If no sessions remain, create a new default one
          if (updatedSessions.length === 0) {
            const defaultId = `session-${Date.now()}`;
            const defaultSession: ChatSession = {
              id: defaultId,
              title: "New Chat",
              messages: [],
              backendMessages: [],
              conversationSummary: null,
              summaryLastMessageId: null,
              selectedModel: "openai/gpt-oss-20b",
              createdAt: Date.now(),
            };
            return {
              sessions: [defaultSession],
              currentSessionId: defaultId,
              messages: [],
              backendMessages: [],
              conversationSummary: null,
              summaryLastMessageId: null,
              selectedModel: "openai/gpt-oss-20b",
              error: null,
            };
          }

          // If we deleted the active session, switch to the first remaining one
          let nextActiveId = state.currentSessionId;
          if (state.currentSessionId === id) {
            nextActiveId = updatedSessions[0].id;
          }

          const activeSession = updatedSessions.find((s) => s.id === nextActiveId)!;
          return {
            sessions: updatedSessions,
            currentSessionId: nextActiveId,
            messages: activeSession.messages || [],
            backendMessages: activeSession.backendMessages || [],
            selectedModel: activeSession.selectedModel || "openai/gpt-oss-20b",
            conversationSummary: activeSession.conversationSummary || null,
            summaryLastMessageId: activeSession.summaryLastMessageId || null,
            error: null,
          };
        }),

      updateChatTitle: (id: string, title: string) =>
        set((state) => {
          const updatedSessions = state.sessions.map((s) =>
            s.id === id ? { ...s, title } : s
          );
          return { sessions: updatedSessions };
        }),

      clearAllChats: () => {
        const defaultId = `session-${Date.now()}`;
        const defaultSession: ChatSession = {
          id: defaultId,
          title: "New Chat",
          messages: [],
          backendMessages: [],
          conversationSummary: null,
          summaryLastMessageId: null,
          selectedModel: "openai/gpt-oss-20b",
          createdAt: Date.now(),
        };
        set({
          sessions: [defaultSession],
          currentSessionId: defaultId,
          messages: [],
          backendMessages: [],
          conversationSummary: null,
          summaryLastMessageId: null,
          selectedModel: "openai/gpt-oss-20b",
          error: null,
        });
      },

      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isSidebarOpen: boolean) => set({ isSidebarOpen }),
    }),
    {
      name: "insight-ai-chat-history",
      // Restrict what keys are persisted in localStorage
      partialize: (state) => ({
        sessions: state.sessions,
        currentSessionId: state.currentSessionId,
        isSidebarOpen: state.isSidebarOpen,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error("Failed to rehydrate store:", error);
          } else if (state) {
            if (!state.sessions || state.sessions.length === 0) {
              const defaultId = `session-${Date.now()}`;
              const defaultSession: ChatSession = {
                id: defaultId,
                title: "New Chat",
                messages: [],
                backendMessages: [],
                conversationSummary: null,
                summaryLastMessageId: null,
                selectedModel: "openai/gpt-oss-20b",
                createdAt: Date.now(),
              };
              state.sessions = [defaultSession];
              state.currentSessionId = defaultId;
              state.messages = [];
              state.backendMessages = [];
              state.selectedModel = "openai/gpt-oss-20b";
              state.conversationSummary = null;
              state.summaryLastMessageId = null;
            } else {
              // Ensure root state is in sync with current session
              const active = state.sessions.find((s) => s.id === state.currentSessionId) || state.sessions[0];
              state.currentSessionId = active.id;
              state.messages = active.messages || [];
              state.backendMessages = active.backendMessages || [];
              state.selectedModel = active.selectedModel || "openai/gpt-oss-20b";
              state.conversationSummary = active.conversationSummary || null;
              state.summaryLastMessageId = active.summaryLastMessageId || null;
            }
          }
        };
      },
    }
  )
);
